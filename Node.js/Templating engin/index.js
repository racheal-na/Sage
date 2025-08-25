
const express = require("express")
const app = express()
app.use(express.static("public"))
app.set("view engine","ejs")
app.get("/",(req,res)=>{
    res.render("home",{name:'rachel',isLogdin:false})
});

app.listen(2017,()=>{
    console.log("started")
})