import React from 'react'
import PropType from 'prop-types'

export default function Book (props) {
  const determineShelfString = (shelf) => {
    if(shelf==='currentlyReading'){
      return "Currently Reading"
    }
    else if(shelf==='read'){
      return "Read"
    }
    else if(shelf==='wantToRead'){
      return "Want to Read"
    }
    else
      return undefined
  }
  return(
    <li>
      <div className="book">
        <div className="book-top">
          {props.book.imageLinks?(
            <div className="book-cover" style={{ width: '100%', height: '100%', backgroundSize: 'cover', backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}></div>
          ):(
            <div className="book-cover" style={{ width: '100%', height: '100%', backgroundSize: 'cover' }}></div>
          )}
          <div className="book-shelf-changer">
            <select onChange={e=>props.updateBook(props.book,e.target.value,props.shelf)} value={props.book.shelf}>
              <option value="move" disabled>Move to...</option>
              <option value="none">None</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        <div style={{color:"green"}} className="book-authors">{props.book.shelf && props.isFromSearch && (determineShelfString(props.book.shelf))}</div>
        {props.book.authors && props.book.authors.map(author=>(
          <div key={author} className="book-authors">{author}</div>
        ))}
      </div>
    </li>
  )
}

Book.propType = {
  book: PropType.object.isRequired,
  updateBook: PropType.func.isRequired,
  isFromSearch: PropType.bool
}