import React from 'react';
import moment from 'moment';

export default function Book(props) {
  return(
    <div className="book">
      <h2>{props.title}</h2>
      <div className="book_author">{props.author}</div>
      <div className="book_publisher">
        published by: {props.publisher}
        on {moment(props.published_date).format("MMM Do YY")}
      </div>

      <div className="book_description">{props.description}</div>
      <div className="book_details">
        Currently ranked: {props.rank}
      </div>
    </div>
  )
}
