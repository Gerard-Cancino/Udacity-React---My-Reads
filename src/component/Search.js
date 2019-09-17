import React from 'react'
import {Link} from 'react-router-dom'
import PropType from 'prop-types'

import Book from './Book'

export default class Search extends React.Component {
  findShelf = (book) => {
    if(this.props.booklist[book.id] !== undefined){
      return this.props.booklist[book.id]
    }
    else return book
  }
  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">        
          <Link
            to="/"
            className="close-search button-search"
          >Close</Link>
          {/* <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button> */}
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input key="search-input" value={this.props.searchQuery} onChange={(e)=>this.props.handleSearchQuery(e)} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.isSearching?(
              <p>Searching Library</p>
            ):(
              this.props.searchQuery && (this.props.bookSearchList===undefined || this.props.bookSearchList.error?(
                <p>No Results Found</p>
              ):(
                this.props.bookSearchList.map(book=>(
                  <Book key={book.id} book={this.findShelf(book)} updateBook={this.props.updateBook} isFromSearch={true}/>
                ))
              )
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

Search.propType = {
  handleSearchQuery: PropType.func.isRequired,
  booklist: PropType.object.isRequired,
  searchQuery: PropType.string.isRequired,
  isSearching: PropType.bool.isRequired,
  bookSearchList: PropType.array,
  updateBook: PropType.func.isRequired
}