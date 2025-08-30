const Appointment = require('../models/Appointment');
const Case = require('../models/Case');
const Notification = require('../models/Notification');
const User = require('../User');
const nodemailer = require('nodemailer');

// @desc    Get all appointments for a user
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res) => {
  try {
    let appointments;
    if (req.user.userType === 'lawyer') {
      appointments = await Appointment.find({ lawyer: req.user.id })
        .populate('client', 'name email phone')
        .populate('case', 'title');
    } else {
      appointments = await Appointment.find({ client: req.user.id })
        .populate('lawyer', 'name email phone barNumber')
        .populate('case', 'title');
    }

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('client', 'name email phone')
      .populate('lawyer', 'name email phone barNumber')
      .populate('case', 'title');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user has access to this appointment
    if (req.user.userType === 'client' && appointment.client._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (req.user.userType === 'lawyer' && appointment.lawyer._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res) => {
  try {
    const { title, description, date, duration, caseId, clientId } = req.body;

    // For clients, they can only create appointments with their lawyer
    let lawyerId;
    if (req.user.userType === 'client') {
      const caseItem = await Case.findById(caseId);
      if (!caseItem || caseItem.client.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      lawyerId = caseItem.lawyer;
    } else {
      lawyerId = req.user.id;
    }

    const appointment = await Appointment.create({
      title,
      description,
      date,
      duration,
      case: caseId,
      client: clientId || req.user.id,
      lawyer: lawyerId
    });

    // Add appointment to client's appointments array
    await User.findByIdAndUpdate(appointment.client, {
      $push: { appointments: appointment._id }
    });

    // Add appointment to lawyer's appointments array
    await User.findByIdAndUpdate(appointment.lawyer, {
      $push: { appointments: appointment._id }
    });

    // Populate the appointment
    await appointment.populate('client', 'name email phone');
    await appointment.populate('lawyer', 'name email phone barNumber');
    await appointment.populate('case', 'title');

    // Create notification for the other party
    const recipient = req.user.userType === 'client' ? appointment.lawyer : appointment.client;
    
    await Notification.create({
      title: 'New Appointment Scheduled',
      message: `A new appointment "${title}" has been scheduled for ${date}.`,
      type: 'appointment',
      recipient,
      relatedEntity: appointment._id,
      onModel: 'Appointment'
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointment = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user has access to this appointment
    if (req.user.userType === 'client' && appointment.client.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (req.user.userType === 'lawyer' && appointment.lawyer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate('client', 'name email phone')
      .populate('lawyer', 'name email phone barNumber')
      .populate('case', 'title');

    // Create notification for the other party
    const recipient = req.user.userType === 'client' ? appointment.lawyer._id : appointment.client._id;
    
    await Notification.create({
      title: 'Appointment Updated',
      message: `The appointment "${appointment.title}" has been updated.`,
      type: 'appointment',
      recipient,
      relatedEntity: appointment._id,
      onModel: 'Appointment'
    });

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user has access to this appointment
    if (req.user.userType === 'client' && appointment.client.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (req.user.userType === 'lawyer' && appointment.lawyer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Remove appointment from client's appointments array
    await User.findByIdAndUpdate(appointment.client, {
      $pull: { appointments: appointment._id }
    });

    // Remove appointment from lawyer's appointments array
    await User.findByIdAndUpdate(appointment.lawyer, {
      $pull: { appointments: appointment._id }
    });

    await Appointment.findByIdAndDelete(req.params.id);

    // Create notification for the other party
    const recipient = req.user.userType === 'client' ? appointment.lawyer : appointment.client;
    
    await Notification.create({
      title: 'Appointment Cancelled',
      message: `The appointment "${appointment.title}" has been cancelled.`,
      type: 'appointment',
      recipient,
      relatedEntity: appointment._id,
      onModel: 'Appointment'
    });

    res.json({ message: 'Appointment removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Send appointment reminder
// @route   POST /api/appointments/:id/reminder
// @access  Private
exports.sendReminder = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('client', 'name email phone')
      .populate('lawyer', 'name email phone barNumber');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user has access to this appointment
    if (req.user.userType === 'client' && appointment.client._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (req.user.userType === 'lawyer' && appointment.lawyer._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    // Send email to client
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: appointment.client.email,
      subject: `Reminder: ${appointment.title}`,
      html: `
        <h2>Appointment Reminder</h2>
        <p>You have an appointment scheduled with ${appointment.lawyer.name}.</p>
        <p><strong>Title:</strong> ${appointment.title}</p>
        <p><strong>Date & Time:</strong> ${appointment.date}</p>
        <p><strong>Duration:</strong> ${appointment.duration} minutes</p>
        ${appointment.description ? `<p><strong>Description:</strong> ${appointment.description}</p>` : ''}
      `
    };

    // Send email to lawyer
    const lawyerMailOptions = {
      from: process.env.EMAIL_USER,
      to: appointment.lawyer.email,
      subject: `Reminder: ${appointment.title}`,
      html: `
        <h2>Appointment Reminder</h2>
        <p>You have an appointment scheduled with ${appointment.client.name}.</p>
        <p><strong>Title:</strong> ${appointment.title}</p>
        <p><strong>Date & Time:</strong> ${appointment.date}</p>
        <p><strong>Duration:</strong> ${appointment.duration} minutes</p>
        ${appointment.description ? `<p><strong>Description:</strong> ${appointment.description}</p>` : ''}
      `
    };

    await transporter.sendMail(clientMailOptions);
    await transporter.sendMail(lawyerMailOptions);

    // Update appointment reminder status
    appointment.reminderSent = true;
    await appointment.save();

    res.json({ message: 'Reminder sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
