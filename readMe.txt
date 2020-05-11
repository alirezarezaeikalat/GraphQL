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
    or editing data (It is like, delete, post, update in REST), 
    mutation is just like RootQueryType:
    
    const MutationType = new GraphQLObjectType({
      name: 'Mutation',
      fields: {
        addAuthor: {
          type: AuthorType,
          args: {
            name: {type: GraphQLString},
            age: {type: GraphQLInt}
          },
          resolve(parent, args){
            let author = new Author({
              name: args.name,
              age: args.age
            });
            return author.save();
          }
        }
      }
    });

    then you have to add this mutation in the schema: 
    
    module.exports = new GraphQLSchema({
      query: RootQueryType,
      mutation: MutationType
    });

12. To use this mutation in the graphiql we should perform like this: 

      mutation {
        addAuthor(name: "Alireza", age: 27){
          name  // data to receive back 
          age
        }
      }

13. To make something required in GraphQL, we have to require something:
    GraphQLNonNull and use this like this: 

      name: { type: new GraphQLNonNull(GraphQLString) },

14. Apolo is just like Axios for the GraphQl, to install it: 

    npm install apollo-boost @apollo/react-hooks graphql

after installing apolo we need to set it up: 

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
            </div>
          </ApolloProvider>
        );
      }
    }

15. After setting up the Apolo we can query data from the front end,
    we can query data from the client and react components:
    
    a. query data from client: 
          
          import { gql } from "apollo-boost";
          // or you can use `import gql from 'graphql-tag';` instead
          client
            .query({
              query: gql`
                {
                  rates(currency: "USD") {
                    currency
                  }
                }
              `
            })
            .then(result => console.log(result));

   
    b. query data in react component: 

        import React from "react";
        import {gql} from 'apollo-boost';
        import { useQuery } from "@apollo/react-hooks";
        const getBooksQuery = gql`
          {
            books{
              name
              id
            }
          }
        `;
        const BookList = () =>  {
            const { loading, error, data } = useQuery(getBooksQuery);
            console.log(data);
            return (
              <div>
                <ul id="book-list">
                  <li>Book name</li>
                </ul>
              </div>
            );
        }
        export default BookList;

[ATTENTION]
16. We can query data, in class based components in react without using 
    react hooks, we have to install react-apollo package: (check episode
    26)

17. When we make request to express server, from other server, we get an 
    error, we have to install another package to resolve this:

      npm install cors 

      then require it and use it :
      const cors = require('cors');
      ...
      // allow cross-origin requests
      app.use(cors());

18. to make a query to the server and get the data by apollo, we use, useQuery hook:
      import React, {useQuery} from 'react';
      const { error, loading, data } = useQuery(getAuthorsQuery);

      and getAuthorsQuery defined in another file and imported here:

        const getAuthorsQuery = gql`
          {
            authors{
              name
              id
            }
          }
        `

19. For mutation we can use, useMutation hook

a. 
  const ADD_BOOK = gql`
  // AddBook name is optional
  mutation AddBook($name: String!, $genre: String!, $authorId: String!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
! means that it is required

b.
 then we can call useMutation in the component:

  const [addBook, { data }] = useMutation(ADD_BOOK);

    addBook is a function that perform mutation, and data consist of the current 
    status of mutation. 

c. 
  Then we can call the addBook:

    addBook({variables: {name, genre, authorId}});


20. In this way, we successfully add data to the database, but we don't update the 
    UI, so we have to update the Apollo catch to update the UI, there are three ways
    that we can use to update the apollo catch: 

      1. when we use addBook function that we get from useMutation, add 
          refetchQueries, there is a problem with this, because we add new 
          request to the server

          addBook({
            variables: { name, genre, author },
            refetchQueries: [{ query: GET_BOOK, variables: {} }]
          });


      2. In this way, apollo automatically update the catch, but this way is 
         only working in the updating an entity, and it is not working in the
         creating and deleting
         (Check apollo website for the instruction, you have to return id in
         the mutation)

      3. updating in mutation in case of creating and deleting: 

          var [addBook] = useMutation(
            ADD_BOOK,
            {
              update(cache, { data: { addBook } }) {
                console.log(addBook);
                const { books } = cache.readQuery({ query: GET_BOOKS});
                console.log(books);
                cache.writeQuery({
                  query: GET_BOOKS,
                  data: {books: books.concat([addBook])}
                });
              }
            }
          );
    
    useMutation takes another object as parameter, in this object we have 
    update function, update function takes cache parameter and we can update 
    the cache with readQuery and writeQuery, readQuery reads the current cache
    and write query, write to the cache. data object and inside it(addBook)
    are the data that mutation returns to us

  
  21. to make a query with variables :

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

