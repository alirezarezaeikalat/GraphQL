const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

/// dummy data 
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: '1' },
  { name: "The final empire", genre: "Fantasy", id: "2", authorId: '2' },
  { name: "The long earth", genre: "Sci-Fi", id: "3", authorId: '3' },
  { name: "The hero of ages", genre: "Fantasy", id: "4", authorId: '2' },
  { name: "The Color of magic", genre: "Fantasy", id: "5", authorId: '3' },
  { name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: '3' }

];
var authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' },
];

const AuthorType = new GraphQLObjectType({
  name: 'Author', 
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return _.filter(books, {authorId: parent.id});
      }
    }
  })
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        console.log(parent);
        return _.find(authors, {id: parent.authorId});
      }
    }
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    book: { // we use this book name for querying
      type: BookType, // show the return type
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        // this functions fires when the query to book run
        /// code to get data from db/ other sources
        return _.find(books, {id: args.id});
        
      }
    },
    // Author 
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return _.find(authors, {id: args.id});
      }
    },
    // books
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books;
      }
    },
    // authors
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return authors;
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQueryType
});