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