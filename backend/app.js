const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const dbConfig = require("./dbConfig");
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
})



app.get("/", (req,res) => {
  res.json({message: "Welcome to the Books application."});
})
app.get("/book", (req,res) => {
  res.json({message: "Your Books "});
})

app.get("/books", (req,res) => {
  const q = "SELECT * FROM nodejs_test.books"
  db.query(q,(err,data)=> {
    err ? res.json(err) : res.json(data) ;
  })
})

app.post("/books", (req,res)=> {
  const q = "INSERT INTO books (book_title, book_desc, book_cover, book_price) VALUES (?)"
  // const values = ["title from backend" , "desc from backend", "cover from backend"]
  const values = [ 
    req.body.book_title,
    req.body.book_desc,
    req.body.book_cover,
    req.body.book_price
  ]
  db.query(q,[values],(err,data)=> {
    err ? res.json(err) : res.json("Book Added Successfully") ;
  })
})

app.delete("/books/:id",(req,res) =>{
  const bookId = req.params.id ;
  const q = "DELETE FROM `nodejs_test`.`books` WHERE (`book_id` = ? );"
  db.query(q,[bookId],(err,data)=> {
    err ? res.json(err) : res.json("Book Deleted Successfully") ;
  })
})

app.put("/books/:id",(req,res)=>{
  const bookId = req.params.id ;
  const q = "UPDATE `nodejs_test`.`books` SET `book_title` = ?,`book_desc` = ?, `book_cover` = ?, `book_price` = ? WHERE `book_id` = ?;"
  const values = [
    req.body.book_title,
    req.body.book_desc,
    req.body.book_cover,
    req.body.book_price,
    bookId
  ]
  db.query(q,values,(err,data)=> {
    err ? res.json(err) : res.json("Book Updated Successfully") ;
  }) 
})

app.listen(8800, () => {
  console.log("Server is running on port 8800.");
});