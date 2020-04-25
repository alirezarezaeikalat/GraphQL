import React, {Component} from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "@apollo/react-hooks";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Ninja Reading List</h1>
          <BookList></BookList>
          <AddBook></AddBook>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
