const graphql = require('graphql');
const _ = require('lodash');
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

/// dummy data 
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "The final empire", genre: "Fantasy", id: "2" },
  { name: "The long earth", genre: "Sci-Fi", id: "3" }
];
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString}
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    book: { // we use this book name for querying
      type: BookType, // show the return type
      args: {id: {type: GraphQLString}},
      resolve(parent, args){
        // this functions fires when the query to book run
        /// code to get data from db/ other sources
        return _.find(books, {id: args.id});
        
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQueryType
});