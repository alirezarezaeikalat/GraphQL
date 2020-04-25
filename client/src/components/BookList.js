import React from "react";
import {gql} from 'apollo-boost';
import { useQuery } from "@apollo/react-hooks";

const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`;
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
      const books = data.books.map(book => {
        return (
          <li key={book.id}>{book.name}</li>
        );
      });
      return(
        <div>
          <ul>
            {books}
          </ul>
        </div>
      );
    }
  
}

export default BookList;
