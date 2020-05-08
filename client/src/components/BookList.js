import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {getBooksQuery} from '../queries/queries';




const BookList = () =>  {
    const {error, loading, data} = useQuery(getBooksQuery);
    if(error) {
      return(
        <p>There is an error :(</p>
      );
    }
    if(loading) {
      return(
        <div>Loading Books...</div>
      );
    } else {
      const booksList = data.books.map(book => {
        return (
          <li key={book.id}>{book.name}</li>
        );
      });
      return(
        <div>
          <ul>
            {booksList}
          </ul>
        </div>
      );
    }
  
}

export default BookList;
