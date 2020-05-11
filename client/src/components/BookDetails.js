import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOK } from '../queries/queries';

const BookDetails = ({selected}) => {
    const { error, loading, data } = useQuery(GET_BOOK, 
    {
        variables: {id: selected}
    });
    const diplayBookDetails = () => {
        if(data){
            return(
                <div>
                    <h2>{data.book.name}</h2>
                    <p>{data.book.genre}</p>
                    <p>{data.book.author.name}</p>
                    <p>All books by this author</p>
                    <ul className="other-books">
                        {
                            data.book.author.books.map(item => {
                                return <li key={item.id}>{item.name}</li>
                            })
                        }
                    </ul>
                </div>
            );
        } else {
            return(
                <div>No book selected</div>
            );
        }     
    }
    return(
      <div id="book-details">
          {diplayBookDetails()}
      </div>
    )
  }
  
  export default BookDetails;