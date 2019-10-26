import React from 'react';
import Book from '../book';

const Bookshelf = ({ books, title, changeReadStatus }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map(book => (
          <Book
            key={book.id}
            data={book}
            onChangeReadStatus={e => changeReadStatus(book, e.target.value)}
          />
        ))}
      </ol>
    </div>
  </div>
);

export default Bookshelf;
