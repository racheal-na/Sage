const cron = require('node-cron');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { sendAppointmentReminder } = require('./emailService');

// Schedule daily check for appointments
cron.schedule('0 8 * * *', async () => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
    const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));
    
    const appointments = await Appointment.find({
      date: { $gte: startOfDay, $lte: endOfDay },
      status: 'scheduled'
    }).populate('client lawyer');
    
    for (const appointment of appointments) {
      // Send reminder to client
      await sendAppointmentReminder(appointment, appointment.client);
      
      // Also send to lawyer if needed
      await sendAppointmentReminder(appointment, appointment.lawyer);
    }
    
    console.log(`Sent ${appointments.length} appointment reminders`);
  } catch (error) {
    console.error('Error in appointment reminder job:', error);
  }
});