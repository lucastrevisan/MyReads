import React from 'react';

const Book = ({ data, onChangeReadStatus }) => (
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url("${data.imageLinks &&
            data.imageLinks.thumbnail}")`
        }}
      ></div>
      <div className="book-shelf-changer">
        <select onChange={onChangeReadStatus} value={data.shelf || 'none'}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{data.title}</div>
    {data.authors &&
      data.authors.map((author, index) => (
        <div key={index} className="book-authors">
          {author}
        </div>
      ))}
  </div>
);

export default Book;
