import React from "react";
import { gql } from 'apollo-boost';
import { useQuery } from "@apollo/react-hooks";

const getAuthorsQuery = gql`
  {
    authors{
      name
      id
    }
  }
`;

const AddBook = () => {
  const { error, loading, data } = useQuery(getAuthorsQuery);
  return(
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Genre</label>
        <input type="text"/>
      </div>

      <div className="field">
        <label>Author</label>
        <select>
          <option>Select Author</option>
        </select>
      </div>
      <button>+</button>
        
    </form>
  )
}

export default AddBook;