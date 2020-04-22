const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/Book');
const Author = require('../models/Author');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;


// Author type
const AuthorType = new GraphQLObjectType({
  name: 'Author', 
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        //return _.filter(books, {authorId: parent.id});
      }
    }
  })
});

// BookType
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
        //eturn _.find(authors, {id: parent.authorId});
      }
    }
  })
});

// RootQuery
const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    book: { // we use this book name for querying
      type: BookType, // show the return type
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        // this functions fires when the query to book run
        /// code to get data from db/ other sources
        //return _.find(books, {id: args.id});
        
      }
    },
    // Author 
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        //return _.find(authors, {id: args.id});
      }
    },
    // books
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        //return books;
      }
    },
    // authors
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        //return authors;
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQueryType
});