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
  GraphQLList,
  GraphQLNonNull
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
        return Book.find({authorId: parent.id});
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
        return Author.findById(parent.authorId);
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
        return Book.findById(args.id);
      }
    },
    // Author 
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        //return _.find(authors, {id: args.id});
        return Author.findById(args.id);
      }
    },
    // books
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return Book.find({});
      }
    },
    // authors
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return Author.find({});
      }
    }
  }
});

// Mutation 
const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // addAuthor
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    // addBook
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});


module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType
});