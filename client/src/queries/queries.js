import { gql } from 'apollo-boost';

const GET_AUTHORS = gql`
  {
    authors{
      name
      id
    }
  }
`;

const GET_BOOKS = gql`
  {
    books{
      name
      id
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
      genre
    }
  }
`;

const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
          genre
        }
      }
    }
  }
`;

export {GET_AUTHORS, GET_BOOKS, ADD_BOOK, GET_BOOK};