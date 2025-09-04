const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendAppointmentReminder = async (appointment, user) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Appointment Reminder - Legal Ease Lite',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c3e50;">Appointment Reminder</h2>
        <p>Dear ${user.name},</p>
        <p>This is a reminder for your upcoming appointment:</p>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3 style="margin-top: 0;">${appointment.title}</h3>
          <p><strong>Date & Time:</strong> ${new Date(appointment.date).toLocaleString()}</p>
          <p><strong>Description:</strong> ${appointment.description || 'N/A'}</p>
        </div>
        <p>Please make sure to be prepared for the appointment.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #7f8c8d;">This is an automated message from Legal Ease Lite.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendAppointmentReminder };