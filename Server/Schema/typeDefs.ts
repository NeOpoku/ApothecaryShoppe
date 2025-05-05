import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String
    me: User
  }

  type User {
    savedHerbs: [Herb]
  }

  type Herb {
    name: String
    description: String
    use: String
    image: String
  }

  input HerbInput {
    name: String
    description: String
    use: String
    image: String
  }

  type Mutation {
    saveHerb(herb: HerbInput!): User
  }
`;