1. GraphQl is a concept, like REST API, for example when you want
  to get data in REST API about a book we use:

  GET domain.com/book/:id 

  and after that if you want to get info about the author of the 
  book we use: 

  GET domain.com/author/:id

  and if you want to get all the books for this author you need 
  to use another request, and in this point we already made to 
  many request, the graphQl is used to address this issue.

2. We can test GraphQl backend with, the tool named GraphiQL

3. In order to use graphQl in express app we need to install two
    packages:
        a. npm install graphql
        b. npm install express-graphql

4. we use express-graphql as a middleware in express app:

      const graphqlHTTP = require('express-graphql');
      const app = express();

      app.use('/graphql', graphqlHTTP({

      }));
      app.listen(5000, () => {
        console.log('The app is now running on port 5000');
      });

5. We need to define schema for the graphqlHTTP, in fact define 
    the graph structure.
    [ATTENTION]
    in order to complete the structure of the graph, we need three
    things: 
      a. define the Types for the graph
      b. define the entry point for the graph
      c. define the relation between types in the graph 

    a. 
    const graphql = require('graphql');
    const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;
    const BookType = new GraphQLObjectType({
      name: 'Book',
      fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
      })
    });

    b. 
        const RootQueryType = new GraphQLObjectType({
        name: 'RootQuery',
        fields: {
          book: { // we use this book name for querying
            type: BookType, // show the return type
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
              // this functions fires when the query to book run
              /// code to get data from db/ other sources
              // we have to return data here
              return data;
            }
          }
        }
      });
      module.exports = new GraphQLSchema({
        query: RootQuery
      });

    then import this schema and add it to middleware:

      app.use('/graphql', graphqlHTTP({
        schema: schema,

      }));  

6. After we provide the schema for the graphqlHTTP, if we go to 
/graphql address that we have for graphqlHTTP, we get an error, that 
we have to provide query string, so we use Graphiql:

      app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true
      }));
  
  then we can use GraphiQL :
      {
        book(id: "1"){
          name
          genre
          id
        }
      }

7. We can use GraphQLID for the id, it finds int and string, 
    it changes the int to string in resolve function

8. to define the relation of the objects: 
    first we define the relation between objects, for example, 
    in this app, every book has an athor and each author can have 
    many books, so we add authorId to the books array for each 
    book, and add author to the BookType, when we make a request 
    for the book like this:

      {
        book(id: 2){
          name
          genre
          author{
            name
          }
        }
      }
      the resolve function in RootQuery get all the data for the 
      book and save that data in the parent element, and we can 
      use authorId in the books to get the author

    const BookType = new GraphQLObjectType({
      name: 'Book',
      fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
          type: AuthorType,
          resolve(parent, args){
            return _.find(authors, {id: parent.authorId})
          }
        }
      })
    });

9. When we want to use lists, for example an author has a list of 
books, First we have to import GraphQLList and then: 

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

10. If we want to get all the books or authors just add this 
    to RootQueryType:

      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args){
          return books;
        }
      },

11. In graphQL mutations are the way of adding data, removing data
    or editing data (It is like, delete, post, update in REST)
    
