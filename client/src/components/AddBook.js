import React, {useState} from "react";
import { useQuery } from "@apollo/react-hooks";
import {getAuthorsQuery, addBookMutation} from '../queries/queries';

const AddBook = () => {
  // book state
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  // using apolo for querying data
  const { error, loading, data } = useQuery(getAuthorsQuery);
  if(loading) {
    console.log('still loading')
  } else {
    var options = data.authors.map(author => {
      return(
        <option key={author.id} value={author.id}>{author.name}</option>
      );
    });
  }
  // handling submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(genre);
    console.log(authorId);
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