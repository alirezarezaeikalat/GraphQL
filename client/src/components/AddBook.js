import React, {useState} from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {GET_AUTHORS, ADD_BOOK, GET_BOOKS} from '../queries/queries';

const AddBook = () => {
  // book state
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  // using apolo for querying data
  const { error, loading, data } = useQuery(GET_AUTHORS);
  if(loading) {
    
  } else {
    var options = data.authors.map(author => {
      return(
        <option key={author.id} value={author.id}>{author.name}</option>
      );
    });
  }
  var [addBook] = useMutation(
    ADD_BOOK,
    {
      update(cache, { data: { addBook } }) {
        console.log(addBook);
        const { books } = cache.readQuery({ query: GET_BOOKS});
        console.log(books);
        cache.writeQuery({
           query: GET_BOOKS,
           data: {books: books.concat([addBook])}
         });
      }
    }
  );
  //console.log(data);
  // handling submit
  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {name, genre, authorId},
      //refetchQueries: [{query: GET_BOOKS}]
    });
  }
  // displaying
  return(
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)}/>
      </div>

      <div className="field">
        <label>Genre</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)}/>
      </div>

      <div className="field">
        <label>Author</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select Author</option>
          { options }
        </select>
      </div>
      <button>+</button>
        
    </form>
  )
}

export default AddBook;