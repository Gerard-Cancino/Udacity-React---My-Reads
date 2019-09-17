import React from 'react'
import {Link} from 'react-router-dom'
import PropType from 'prop-types'
import Bookshelf from './Bookshelf';


const bookShelfList = [
  {
    name:"Currently Read",
    shelf:"currentlyReading"
  },
  {
    name:"Want to Read",
    shelf:"wantToRead"
  },
  {
    name:"Read",
    shelf:"read"
  }
]

export default function Bookcase (props) {
  let booklist = {
    'currentlyReading':[],
    'read':[],
    'wantToRead':[]
  }
  const booklistToArray = () => {
    Object.keys(props.booklist).map(key=>(
      booklist[props.booklist[key].shelf].push(props.booklist[key])
    ))
  }
  booklistToArray()
  return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookShelfList.map(bookshelf=>(
            <Bookshelf key={bookshelf.shelf} name={bookshelf.name} booklist={booklist[bookshelf.shelf]} updateBook={props.updateBook}/>
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link
            to="/search"
            className="button-search"
          >Add a book</Link>
      </div>
    </div>
  )
}
Bookcase.propTypes = {
  booklist: PropType.object.isRequired,
  updateBook: PropType.func.isRequired
}

