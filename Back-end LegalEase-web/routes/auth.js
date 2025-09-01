const express = require('express');
const {
    signup,
    login,
    getMe,
    updateProfile
}=require('../controllers/authController');
const{protect}=require('../middleware/auth');

const router=express.Router();
router.post('/signup',signup);
router.post('/login',login);
router.get('/me',protect,getMe);
router.put('/update',protect,updateProfile);

module.exports=router;