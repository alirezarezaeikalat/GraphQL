import React, {useState} from "react";
import { useQuery } from "@apollo/react-hooks";
import {GET_BOOKS} from '../queries/queries';

// components
import BookDetails from './BookDetails';


const BookList = () =>  {
  const [selected, setSelected] = useState('')
  const {error, loading, data} = useQuery(GET_BOOKS);
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
        <li onClick={(e) => setSelected(book.id)} key={book.id}>{book.name}</li>
      );
    });
    return(
      <div>
        <ul>
          {booksList}
        </ul>
        <BookDetails selected={selected}></BookDetails>
      </div>
    );
  }
  
}

export default BookList;
