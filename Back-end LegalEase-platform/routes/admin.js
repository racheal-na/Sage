const express = require('express');
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User');
const Case = require('../models/Case');
const Appointment = require('../models/Appointment');

const router = express.Router();

// Get all users (admin only)
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID
router.get('/users/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get user's cases and appointments
    const cases = await Case.find({ client: user._id });
    const appointments = await Appointment.find({ 
      $or: [{ client: user._id }, { lawyer: user._id }] 
    });
    
    res.json({
      user,
      cases,
      appointments
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user
router.put('/users/:id', protect, admin, async (req, res) => {
  try {
    const { name, email, role, phone } = req.body;
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.phone = phone || user.phone;
    
    const updatedUser = await user.save();
    
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user
router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user has cases or appointments
    const userCases = await Case.find({ client: user._id });
    const userAppointments = await Appointment.find({ 
      $or: [{ client: user._id }, { lawyer: user._id }] 
    });
    
    if (userCases.length > 0 || userAppointments.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete user with active cases or appointments' 
      });
    }
    
    await User.deleteOne({ _id: req.params.id });
    res.json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get system statistics
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: 'admin' });
    const clientCount = await User.countDocuments({ role: 'user' });
    const caseCount = await Case.countDocuments();
    const appointmentCount = await Appointment.countDocuments();
    
    res.json({
      users: userCount,
      admins: adminCount,
      clients: clientCount,
      cases: caseCount,
      appointments: appointmentCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;