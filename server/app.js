const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// connect to mlab

mongoose.connect(
  "mongodb+srv://alireza:Shukufe1372@graphql-cxfmm.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.once('open', () => {
  console.log('Connected to database');
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.get('/', (req, res) => {
  res.send('salam');
});
app.listen(5000, () => {
  console.log('The app is now running on port 5000');
});