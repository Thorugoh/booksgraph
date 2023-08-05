const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')

const app = express();

/**
 * GraphQL endpoint, it's a common practice to name it as /graphql.
 * graphqlHTTP takes a schema as mandatory parameter
 * graphiql: true provides a in-browser GraphQL query tool (nice).
 */

app.use("/graphql", graphqlHTTP({schema: schema, graphiql: true}))

app.listen(5000, () => {
  console.log("Listening on port 5000");
})