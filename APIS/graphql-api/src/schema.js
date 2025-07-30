import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    year: Int
    categories: [String]
  }

  type Query {
    book(id: ID!): Book
    allBooks: [Book!]!
    totalBooks: Int!
  }
`;
