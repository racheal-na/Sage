const express = require("express")
const app= express()

app.get("/error",(req,res,next)=>{
   let err=new error("error happenned")
})