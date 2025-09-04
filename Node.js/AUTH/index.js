const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const app = express()


mongoose.connect("mongodb://localhost:27017/abay")
.then(()=>console.log("mongodb connected"))


app.use(express.json())


function auth(req,res,next){
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "No token" });
    jwt.verify(token,"sage",(err,decoded)=>{
        if(err) res.status(403).send("unauthorized")
        console.log(decoded)
        req.user = decoded
        next()
    })
}


const userSchema = new mongoose.Schema({
    name: {type:String, required: true},
    phoneNumber: {type:Number, unique: true, required: true},
    gender: {type:String},
    password: String,
    balance: {type:Number, default: 0}
})


const UserModel = mongoose.model("user",userSchema)


app.post("/createAccount",async (req,res)=>{
    const {name,phoneNumber,gender,password} = req.body
    const hashedPassword = await bcrypt.hash(password,8)
    const user = new UserModel({name,phoneNumber,gender,password:hashedPassword})
    await user.save()
    res.status(200).json(user)
})


app.post("/login", async (req,res)=>{
    const { phoneNumber, password } = req.body
    const user = await UserModel.findOne({phoneNumber})
    if(!user) return res.status(404).json({
        message: "user not found"
    })


    const isMatch = bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(404).json({
        message: "incorrect phone number or password"
    })
    delete user.password
    const token = jwt.sign({ id:user.id, name:user.name, phoneNumber: user.phoneNumber},"sage")
 
    return res.json({name:user.name, phoneNumber: user.phoneNumber, token:  token})


})


app.get("/showBalance",auth,async (req,res)=>{
    const user = await UserModel.findById(req.user.id)
    res.send("welcome user " + user.name +"<br/>>" + "your account Balance is: " + user.balance)
})






app.listen(5600,()=>{
    console.log("server started")
})

