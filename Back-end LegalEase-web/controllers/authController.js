const User =require('../models/User');
const jwt = require('jsonwebtoken');
const Notification =require('../models/Notification');

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};
 
exports.signup = async (req,res)=>{
    try{
        const{name,email,password,phone,userType,barNumber}=req.body;

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: 'User already exists'});
        }
        const user = await User.create({
            name,
            email,
            password,
            phone,
            userType,
            barNumber: userType === 'lawyer'? barNumber : undefined
        });
        if(user){
            await Notification.create({
                title:'Welcome to Legal Ease Lite',
                message:'Welcome${name}! Your account has been successfully created.',
                type:'system',
                recipient:user._id
            });

            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                userType:user.userType,
                barNumber:user.barNumber,
                token:generateToken(user._id),
            });
        }
    }catch(error){
        console.error('Signup error:', error);
        res.status(500).json({message: 'server error'});
    }
};

exports.login = async (req,res)=>{
    try{
        const{email,password}=req.body;
        const user = await User.findOne({email});
        
        if(user && (await user.comparePassword(password))){
            res.json({
                  _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                userType:user.userType,
                barNumber:user.userType,
                token:generateToken(user._id),
            });
        }else{
            res.status(401).json({massage: 'Invalid email or password'});
        }
    }catch(error){
        console.error('Login error:',error);
        res.status(500).json({message:'Server error'});
    }
};

exports.getMe = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id)
        .populate('cases')
        .populate('appointments');

        res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        phone:user.phone,
        userType:user.userType,
        barNumber:user.barNumber,
        cases:user.cases,
        appointments:user.appointments 
    })

    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};
exports.updateProfile = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id);
        if (user){
            user.name=req.body.name || user.name;
            user.email=req.body.email || user.email;
            user.phone=req.body.phone || user.phone;

            if(req.body.password){
                user.password= req.body.password;
            }
            const updatedUser= await user.save();
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                userType:user.userType,
                barNumber:user.barNumber,
                token:generateToken(user._id),
            });
        }else{
            res.status(404).json({message: 'User not found'})
        }
    }catch(error){
        console.error('Update profile error:',error);
        res.status(500).json({message:'Server error'});
    }
};