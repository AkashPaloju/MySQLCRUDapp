import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Add = () => {
  const [book,setBook] = useState({
    book_title:"",
    book_desc:"",
    book_cover:"",
    book_price: null
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setBook((prev)=>{
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8800/books",book) ;
      navigate("/Books")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1>Add New Book</h1>
      <form>
        <label>Book Title</label>
        <input 
          type='text'
          placeholder='Title of the Book'
          name='book_title'
          value={book.book_title} 
          onChange={handleChange}
          required
        />
        <label>Book Description</label>
        <input 
          type='text'
          placeholder='About the Book'
          name='book_desc'
          value={book.book_desc}
          onChange={handleChange}
          required
        />
        <label>Book Cover</label>
        <input 
          type='text'
          placeholder='Book Cover'
          name='book_cover'
          value={book.book_cover}
          onChange={handleChange}
        />
        <label>Book Price</label>
        <input 
          type='number'
          placeholder='Price of the Book'
          name='book_price'
          value={book.book_price}
          onChange={handleChange}
          required
        />
        <button onClick={handleClick} >Submit</button>
      </form>

    </div>
  )
}

export default Add