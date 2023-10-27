import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {
  const [books,setBooks] = useState([])

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8800/books") ;
        console.log(response.data)
        setBooks(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllBooks()
  }, [])

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const booksComponents = books.map((book)=> {
    return (
      <div>
        <h4>{book.book_title}</h4>
        <h6>{book.book_desc}</h6>
        <h6>{book.book_cover}</h6>
        <h6>{book.book_price}</h6>
        <button className='delete' onClick={() => deleteBook(book.book_id)} >Delete</button>
        <button className='update'> <Link to={`/update/${book.book_id}`}>Update</Link> </button>
      </div>
    )
  })
  return (
    <div>
      <h1>Books</h1>
      <div>
        {booksComponents}
      </div>
      <button><Link to="/add">Add new Book</Link> </button>

    </div> 
  )
}

export default Books;