import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import Bookshelf from './components/bookshelf';
import SearchBooks from './components/searchBooks';
import Loader from './components/loader';
import './App.css';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    loading: true
  };

  fetchBooks = async () => {
    const books = await BooksAPI.getAll();
    const currentlyReading = books.filter(
      book => book.shelf === 'currentlyReading'
    );
    const wantToRead = books.filter(book => book.shelf === 'wantToRead');
    const read = books.filter(book => book.shelf === 'read');

    this.setState({
      currentlyReading,
      wantToRead,
      read,
      loading: false
    });
  };

  updateBookshelf = async (book, shelf) => {
    this.setState({
      loading: true
    });
    await BooksAPI.update(book, shelf);
    await this.fetchBooks();
  };

  async componentDidMount() {
    await this.fetchBooks();
  }

  render() {
    const { currentlyReading, wantToRead, read, loading } = this.state;
    return (
      <Fragment>
        {loading && <Loader />}
        <Route
          exact
          path="/"
          render={() => (
            <Fragment>
              <h1 className="list-books-title">MyReads</h1>
              <Bookshelf
                title="Currently Reading"
                books={currentlyReading}
                changeReadStatus={this.updateBookshelf}
              ></Bookshelf>
              <Bookshelf
                title="Want to Read"
                books={wantToRead}
                changeReadStatus={this.updateBookshelf}
              ></Bookshelf>
              <Bookshelf
                title="Read"
                books={read}
                changeReadStatus={this.updateBookshelf}
              ></Bookshelf>
              <Link to="/search" className="open-search">
                Add a book
              </Link>
            </Fragment>
          )}
        />
        <Route
          path="/search"
          render={() => <SearchBooks changeReadStatus={this.updateBookshelf} />}
        />
      </Fragment>
    );
  }
}

export default BooksApp;
