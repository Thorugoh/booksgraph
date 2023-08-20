const graphql = require('graphql');
const books = require("../db/books");
const publishers = require("../db/publishers");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLNonNull } = graphql;

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
    }
  })
});

const BooksType = new GraphQLObjectType({
  name: 'Books',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    description: { type: GraphQLString },
    publisherId: { type: GraphQLID },
    publisher: {
      type: PublisherType,
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
      resolve: async (parent, args) => {
        try {
          return await books.getAllByPublisherId(parent.id)
        } catch (error) {
          console.error(error.message)
          return error.message
        }
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
    books: {
      type: new GraphQLList(BookType),
      resolve: async (parent, args) => {
        try {
          return await books.getAll();
        } catch (error) {
          console.error(error.message);
          return [];
        }
      }
    },
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve: async (parent, args) => {
        try {
          const book = await books.getById(args.id);
          return book;
        }catch(error) {
          console.error(error.message);
          return null;
        }          
      }
    },
    publisher: {
      type: PublisherType,
      args: {id:{type: GraphQLID}},
      resolve: async (parent, args) => {
        try {
          return await publishers.getById(args.id);
        }catch(error){
          console.error(error.message);
          return null;
        }
      }
    }
  }
})


const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addBook: {
      type: BookType,
      args: {
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        author: {type: new GraphQLNonNull(GraphQLString)},
        publisherId: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve: async (parent, args) => {
        try{
          return await books.create({
            title: args.title,
            description: args.description,
            author: args.author,
            publisherId: args.publisherId,
          })
        }catch{
          console.error(error.message)
        }
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
  query: RootQuery,
  mutation: Mutation
})