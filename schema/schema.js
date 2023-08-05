const graphql = require('graphql');
const books = require('../data/books.json');
const publishers = require('../data/publishers.json');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList } = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    description: { type: GraphQLString },
    publisherId: { type: GraphQLID },
    publisher: {
      type: PublisherType,
      resolve(parent, args){
        return publishers.find(publisher => publisher.id === parent.publisherId)
      }
    }
  })
});

const PublisherType = new GraphQLObjectType({
  name: "Publisher",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books.filter(book => book.publisherId === parent.id)
      }
    }
  })
})

/*
  Root Query that will print Welcome to GraphQL when the query contains a filed named status.
  Woth noticing that the type is a GraphQLString
*/
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    status: {
      type: GraphQLString,
      resolve(parent, args){
        return "Welcome to GraphQL"
      }
    },
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        if(args.id){
          return books.find(book => book.id === args.id)
        }
        return books
      }
    },
    publisher: {
      type: PublisherType,
      args: {id:{type: GraphQLID}},
      resolve(parent, args){
        return publishers.find(publisher => publisher.id === args.id)
      }
    }
  }
})


/* 
  Exports the query as a GraphQLSchema type so that GraphQL can parse it
  as its schema. The GraphQLSchema takes an object with key-value pairs.
  Oney key is query.
*/
module.exports = new GraphQLSchema({
  query: RootQuery
})