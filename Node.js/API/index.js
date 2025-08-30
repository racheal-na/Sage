const express = require("express")

const app = express()
app.use(express.json())

let books=[
    {id: 1, title: 'power',author: 'abebe girma'},
    {id: 2, title: 'From Love to Death ',author: 'addis alem'},
    {id: 3, title: 'Oromay',author: 'Bealu girma'}
]
app.get("/books",(req,res)=>{
    res.status(200).json(books)
})

app.get("/books/:id",(req,res)=>{
    const book =books.find((book)=>book.id==req.params.id)
    if(book){
        res.status(200).json(book)
    }else{
        res.status(404).json({
            message:'book not fund'
        })
    }
})
app.post("/createBook",(req.res) => {
    const body= req.body
    const book ={id: books.length + 1, title: body.title, author: body.author}
    books.push(book)
    res.status(200).json(book)

})
app.listen(2017,()=>{
    console.log("started")
})