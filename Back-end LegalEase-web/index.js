const express = require('express');
const path = require('path');
const cors = require('cors');

// Import routers
const auth = require('./routes/auth');
const cases = require('./routes/cases');
const documents = require('./routes/document');
const appointments = require('./routes/appointments');
const notifications = require('./routes/notifications');

// Import database connection
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', auth);
app.use('/api/cases', cases);
app.use('/api/cases/:caseId/documents', documents);
app.use('/api/appointments', appointments);
app.use('/api/notifications', notifications);

// Production build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
