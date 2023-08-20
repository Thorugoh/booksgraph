import express from 'express';
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4"
import cors from 'cors'
import { ApolloServer } from '@apollo/server';
import { resolvers } from './graphql/resolvers.js';
import { readFile } from "node:fs/promises"
const app = express();

app.use(cors(), express.json())
app.options("*", cors())
/*
 * GraphQL endpoint, it's a common practice to name it as /graphql.
 * graphqlHTTP takes a schema as mandatory parameter
 * graphiql: true provides a in-browser GraphQL query tool (nice).
 */


const typeDefs = await readFile("./graphql/schema.graphql", "utf8");

const apolloServer = new ApolloServer({ resolvers, typeDefs })
await apolloServer.start();

app.use("/graphql", apolloMiddleware(apolloServer));

app.listen(5000, () => {
  console.log("Server running on port 5000");
  console.log(`GraphQL endpoint https://localhost:5000/graphql`);
})