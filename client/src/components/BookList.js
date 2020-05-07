import React from "react";
import {gql} from 'apollo-boost';
import { useQuery } from "@apollo/react-hooks";

// query
const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`;
// component

const BookList = () =>  {
    const {error, loading, data} = useQuery(getBooksQuery);
    //console
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
