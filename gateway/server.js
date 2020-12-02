const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schemas/schema');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const port = process.env.PORT || '8080';

app.listen(port, () => {
  console.log(
    `API gateway is running on port: ${port} (${process.env.NODE_ENV})`
  );
});
