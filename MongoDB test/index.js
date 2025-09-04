const express = require("express");
const mongoose =require("mongoose");
const app = express()
mongoose.connect("mongodb+srv://legalease-user:lura1216@legalease-cluster.d56df2s.mongodb.net/?retryWrites=true&w=majority&appName=legalease-cluster")
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err))

const laptopSchema = new mongoose.Schema({brand:{type:String,required:true},model:{type:String,required:true},price:{type:Number,required:true}})
app.use(express.json())
const LaptopModel = mongoose.model("laptop",laptopSchema)
app.get("/laptops", async (req, res) => {
  const laptops = await  LaptopModel.find()
});
app.post("/laptops/create", async (req, res) => { 
   const laptop = new LaptopModel(req.body)
   await laptop.save()
   res.status(200).json(laptop)
});
app.delete("/laptops/:id",async (req, res) => {
  const laptop = await LaptopModel.deleteOne({_id:params.id},req.body)
  res.status(200).json(laptop)
});
app.put("/laptops/:id", (req, res) => async (req,res)=>{
  const laptop =await LaptopModel.updateOne({_id:req.params.id},req.body) 
  res.status(200).json(laptop)
});

app.listen(4800,()=>{
    console.log("server started!")
})
