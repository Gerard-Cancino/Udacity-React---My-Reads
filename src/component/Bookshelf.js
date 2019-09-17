import React from 'react'
import PropType from 'prop-types'
import Book from './Book'

export default function Bookshelf(props){
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.booklist===undefined || props.booklist.length===0?(
            <p>No books on this list</p>
          )  
          :(props.booklist.map(book=>(
            <Book key={book.id} book={book} updateBook={props.updateBook}/>
          )))}
        </ol>
      </div>
    </div>
  ) 
}
Bookshelf.propType = {
  booklist: PropType.object.isRequired,
  name: PropType.string.isRequired
}