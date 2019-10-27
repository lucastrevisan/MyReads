import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../../BooksAPI';
import Book from '../book';
import { isArray } from 'util';

let timeout = null;

class SearchBooks extends React.Component {
  state = {
    searchResult: [],
    currentShelfBooks: []
  };

  seachBooks = e => {
    clearTimeout(timeout);
    const value = e.target.value;
    const { currentShelfBooks } = this.state;

    value !== ''
      ? (timeout = setTimeout(async () => {
          const response = await BooksAPI.search(value);

          isArray(response) &&
            response.forEach(book => {
              const hasBookOnShelf = currentShelfBooks.find(
                shelfedBook => book.id === shelfedBook.id
              );
              hasBookOnShelf && (book.shelf = hasBookOnShelf.shelf);
            });

          this.setState({
            searchResult: response
          });
        }, 300))
      : this.setState({
          searchResult: []
        });
  };

  async componentDidMount() {
    const currentShelfBooks = await BooksAPI.getAll();

    this.setState({
      currentShelfBooks
    });
  }

  render() {
    const { searchResult } = this.state;
    const { changeReadStatus } = this.props;

    return (
      <Fragment>
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onInput={this.seachBooks}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        {searchResult.length ? (
          <ol className="books-grid">
            {searchResult.length > 0 &&
              searchResult.map(book => (
                <Book
                  key={book.id}
                  data={book}
                  onChangeReadStatus={e =>
                    changeReadStatus(book, e.target.value)
                  }
                />
              ))}
          </ol>
        ) : (
          <div className="unavailable-results">No available results</div>
        )}
      </Fragment>
    );
  }
}

export default SearchBooks;
