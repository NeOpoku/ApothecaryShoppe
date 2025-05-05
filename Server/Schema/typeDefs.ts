import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String
  }
`;
extend type Query {
  me: User
}

extend type User {
  savedHerbs: [Herb]
}

extend type Herb {
  name: String
  description: String
  use: String
  image: String
}
extend type Mutation {
  saveHerb(herb: HerbInput!): User
}