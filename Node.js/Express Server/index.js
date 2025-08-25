const express=require("express")
const app=express()

app.get('/',(req,res)=>{
res.send 
('Hello from express get method!!')})
app.get('/Home',(req,res)=>{
res.send 
('Home Page')})

//paras

app.get("/users/:id",(req,res)=>{
    const user = req.params.id
    res.send("users id from param is:"+user)
})
app.get("/users/:id",(req,res)=>{
   
    res.status(404).json({
        name:'rachel',
        age: 23,
    })
})
//query
app.get("/search",(req,res)=>{

    res.send("user name: "+ req.query.userName +"<br/>"+"password:"+req.query.password)
})

//Boddy
app.post("/user",(req,res)=>{
    res.send("user name: " +req.body?.userName+ "<br/>" + "password: "+ req.body?.password)
})
app.listen(2017,()=>{
 console.log("server started on http://localhost:2017")
});