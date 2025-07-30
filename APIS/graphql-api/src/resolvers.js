import books from '../data/books.json' assert { type: 'json' };

export const resolvers = {
  Query: {
    book: (_, { id }) => books.find(book => book.id === id),
    allBooks: () => books,
    totalBooks: () => books.length
  }
};
