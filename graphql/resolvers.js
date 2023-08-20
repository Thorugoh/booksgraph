import { GraphQLError } from "graphql";
import books from "../db/books.js";
import publishers from "../db/publishers.js";

export const resolvers = {
  Query: {
    books: () => books.getAll(),
    book: async (_root, { id }) => {
      const book = await books.getById(id);
      if(!book){
        throw notFoundError(`Book wiht id ${id} was not found`)
      }
      return book;
    },
    publisher: async (_root, { id }) => {
      const publisher = await publishers.getById(id)
      if(!publisher){
        throw notFoundError(`Publisher with id ${id} was not found`)
      }
      return publisher;
    }
  },

  Book: {
    publisher: (book) => publishers.getById(book.publisherId)
  },

  Publisher: {
    books: (publisher) => books.getAllByPublisherId(publisher.id)
  }
}


function notFoundError(message){
  return new GraphQLError(message, { extensions: { code: 'NOT_FOUND' } })
}