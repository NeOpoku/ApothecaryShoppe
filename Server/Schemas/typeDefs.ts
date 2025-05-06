import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    hello: String
    me: User
  }

  type Mutation {
    signup(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;