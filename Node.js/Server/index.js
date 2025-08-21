
// import fs from 'fs';
// fs.readFile("output.txt",'utf8',(err,data)=>{
//     if(err) throw err
//     console.log(data)
// })
//  fs.writeFile('writerFileExampale.csv',"name,age,gender",(err)=>{
//           if(err) throw err
//     console.log('completed')
//  })

//server http
import http from 'http';

const Server=http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':"text/plain"})
    res.end("hello from node server")
})
Server.listen(8000,()=>{
    console.log("server started");
})

//callback
import fs from 'fs'

fs.readFile("output.txt","utf8",(err,data)=>{
    if(err)
        throw err
      console.log("file output: ",data)
})



async function getPost(){
    console.log('function started')
    const res = await fetch("http://jsonplaceholder.typicode.com/posts/1")
    const data =await res.json()
    console.log("from function: ",data)
    console.log('function ended')
 }
  getPost()
console.log("out of fs")