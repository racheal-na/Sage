const express = require('express');
const { protect } = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const { google } = require('googleapis');

const router = express.Router();

// Google Calendar integration
router.post('/sync-google', protect, async (req, res) => {
  try {
    const { code } = req.body; // Authorization code from OAuth flow
    
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    
    // Store tokens for user (simplified)
    req.user.googleTokens = tokens;
    await req.user.save();
    
    // Get appointments to sync
    const appointments = await Appointment.find({
      $or: [{ client: req.user._id }, { lawyer: req.user._id }],
      status: 'scheduled'
    }).populate('client lawyer case');
    
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    
    // Sync each appointment
    for (const appointment of appointments) {
      const event = {
        summary: appointment.title,
        description: appointment.description || '',
        start: {
          dateTime: appointment.date,
          timeZone: 'UTC',
        },
        end: {
          dateTime: new Date(appointment.date.getTime() + 60 * 60 * 1000), // 1 hour
          timeZone: 'UTC',
        },
        attendees: [
          { email: appointment.client.email },
          { email: appointment.lawyer.email }
        ],
        reminders: {
          useDefault: true,
        },
      };
      
      await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
    }
    
    res.json({ message: 'Calendar synced successfully' });
  } catch (error) {
    console.error('Error syncing with Google Calendar:', error);
    res.status(500).json({ message: 'Calendar sync failed' });
  }
});

// Export calendar as ICS
router.get('/export-ics', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      $or: [{ client: req.user._id }, { lawyer: req.user._id }],
      status: 'scheduled'
    }).populate('client lawyer case');
    
    let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Legal Ease Lite//EN\n';

    for (const appointment of appointments) {
      icsContent += `BEGIN:VEVENT
UID:${appointment._id}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${new Date(appointment.date).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${new Date(appointment.date.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${appointment.title}
DESCRIPTION:${appointment.description || ''}
END:VEVENT
`;
    }

    icsContent += 'END:VCALENDAR';
    
    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader('Content-Disposition', 'attachment; filename="legal-ease-calendar.ics"');
    res.send(icsContent);
  } catch (error) {
    console.error('Error exporting calendar:', error);
    res.status(500).json({ message: 'Calendar export failed' });
  }
});

module.exports = router;