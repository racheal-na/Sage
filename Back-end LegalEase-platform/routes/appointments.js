const express = require('express');
const { protect } = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const Case = require('../models/Case');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { getIo } = require('../utils/socket');

const router = express.Router();

// Get all appointments
router.get('/', protect, async (req, res) => {
  try {
    let appointments;
    if (req.user.role === 'admin') {
      appointments = await Appointment.find()
        .populate('client', 'name email phone')
        .populate('lawyer', 'name email')
        .populate('case', 'title')
        .sort({ date: 1 });
    } else {
      appointments = await Appointment.find({ client: req.user._id })
        .populate('client', 'name email phone')
        .populate('lawyer', 'name email')
        .populate('case', 'title')
        .sort({ date: 1 });
    }
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create appointment
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, date, caseId } = req.body;

    let lawyerId;
    if (req.user.role === 'admin') {
      // Admin creates appointment for a client with a specific lawyer
      const caseItem = await Case.findById(caseId);
      if (!caseItem) {
        return res.status(404).json({ message: 'Case not found' });
      }
      lawyerId = caseItem.lawyer;
    } else {
      // User creates appointment - find an admin lawyer
      const lawyer = await User.findOne({ role: 'admin' });
      if (!lawyer) {
        return res.status(404).json({ message: 'No lawyer available' });
      }
      lawyerId = lawyer._id;
    }

    const appointment = new Appointment({
      title,
      description,
      date,
      client: req.user.role === 'admin' ? req.body.clientId : req.user._id,
      lawyer: lawyerId,
      case: caseId || null
    });

    const createdAppointment = await appointment.save();
    const populatedAppointment = await Appointment.findById(createdAppointment._id)
      .populate('client', 'name email phone')
      .populate('lawyer', 'name email')
      .populate('case', 'title');

    // Create notification for lawyer
    const notification = new Notification({
      user: lawyerId,
      message: `New appointment: ${title} on ${new Date(date).toLocaleDateString()}`,
      type: 'appointment',
      relatedId: createdAppointment._id
    });
    await notification.save();

    // Emit real-time event
    const io = getIo();
    io.to(`user-${lawyerId}`).emit('new-appointment', populatedAppointment);

    res.status(201).json(populatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update appointment
router.put('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user has access to this appointment
    if (req.user.role !== 'admin' && appointment.client.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { title, description, date, status } = req.body;

    appointment.title = title || appointment.title;
    appointment.description = description || appointment.description;
    appointment.date = date || appointment.date;
    appointment.status = status || appointment.status;

    const updatedAppointment = await appointment.save();
    const populatedAppointment = await Appointment.findById(updatedAppointment._id)
      .populate('client', 'name email phone')
      .populate('lawyer', 'name email')
      .populate('case', 'title');

    res.json(populatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user has access to this appointment
    if (req.user.role !== 'admin' && appointment.client.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Appointment.deleteOne({ _id: req.params.id });
    res.json({ message: 'Appointment removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;