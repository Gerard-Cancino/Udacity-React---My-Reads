import React from 'react'
import './App.css'
import {Route} from 'react-router'
import {BrowserRouter} from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import Bookshelf from './component/Bookcase'
import Search from './component/Search'

class BooksApp extends React.Component {
  state = {
    booklist: {},
    bookSearchList: [],
    searchQuery: '',
    isSearching: false
  }
  componentDidMount(){
    BooksAPI.getAll()
    .then(res=>{
      let booklist={}
      res.map(book=>
        booklist[book.id]=book
      )
      this.setState({booklist:booklist})
    })
  }

  updateBook = (book,newShelf) => {
    // book is referenced
    if(newShelf==='none'){
      let booklist = Object.keys(this.state.booklist)
        .reduce((booklist,key)=>{
          if(key!==book.id){
            booklist[key]=this.state.booklist[key]
          }
          return booklist
        },{})
      this.setState({booklist:booklist})
    }
    else{
      let booklist = Object.assign({},this.state.booklist)
      if(!booklist[book.id])
        booklist[book.id]=JSON.parse(JSON.stringify(book))
      booklist[book.id].shelf=newShelf
      this.setState({booklist:booklist})
    }
    BooksAPI.update(book,newShelf)
  }

  changeSearchQuery = (query) => {
    this.setState({searchQuery:query,isSearching:true})
  }

  searchBookList = (query) => {
    BooksAPI.search(query)
    .then(bookList=>{if(query===this.state.searchQuery)this.setState({bookSearchList:bookList,isSearching:false})})
  }

  handleSearchQuery = (e) => {
    e.preventDefault()
    this.changeSearchQuery(e.target.value)
    this.searchBookList(e.target.value)
  }

  render(){
    return(
      <div className="app">
        <BrowserRouter>
          <Route exact path="/" component={()=><Bookshelf booklist={this.state.booklist} updateBook={this.updateBook.bind(this)}/>} />
          <Route exact path="/search" render={()=><Search isSearching={this.state.isSearching} searchQuery={this.state.searchQuery} handleSearchQuery={this.handleSearchQuery} booklist={this.state.booklist} bookSearchList={this.state.bookSearchList} updateBook={this.updateBook.bind(this)}/>} />
        </BrowserRouter>
      </div>
    )
  }
}
export default BooksApp
