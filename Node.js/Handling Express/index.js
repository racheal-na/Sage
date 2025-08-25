
const express = require("express")
const app = express();

app.get("/send",(req,res)=>{
    res.send("users <br/> list!!")
})

app.get("/json",(req,res)=>{
    res.status(404).json({
        name:"rachel",
        age:16,
    })

   
})
app.get("/google",(req,res)=>{
    res.redirect("http://google.com");
})


app.listen(2018,()=>{
 console.log("server started on http://localhost:2018")
});