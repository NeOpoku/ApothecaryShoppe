type Herb {
    name: String
    description: String
    use: String
    image: String
  }
  
  extend type User {
    savedHerbs: [Herb]
  }
  
  extend type Mutation {
    saveHerb(herb: HerbInput!): User
  }
  
  input HerbInput {
    name: String!
    description: String!
    use: String!
    image: String!
  }