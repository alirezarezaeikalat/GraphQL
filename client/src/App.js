import React, {Component} from 'react';
import BookList from './components/BookList';

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Ninja Reading List</h1>
        <BookList></BookList>
      </div>
    );
  }
}

export default App;
