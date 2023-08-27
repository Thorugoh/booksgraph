import { GraphQLError } from "graphql";
import books from "../db/books.js";
import authors, { authorsLoader } from "../db/authors.js";

export const resolvers = {
  Query: {
    books: async (_root, { limit, offset }) => {
      const result = await books.getAll(limit, offset)
      const totalCount = await books.count();
      return { items: result, totalCount };
    },
    book: async (_root, { id }) => {
      const book = await books.getById(id);
      if(!book){
        throw notFoundError(`Book wiht id ${id} was not found`)
      }
      return book;
    },
    author: async (_root, { id }) => {
      const author = await authors.getById(id)
      if(!author){
        throw notFoundError(`author with id ${id} was not found`)
      }
      return author;
    }
  },

  Book: {
    author: async (book) => await authorsLoader.load(book.authorId)
  },

  Author: {
    books: (author) => books.getAllByauthorId(author.id)
  }
}


function notFoundError(message){
  return new GraphQLError(message, { extensions: { code: 'NOT_FOUND' } })
}