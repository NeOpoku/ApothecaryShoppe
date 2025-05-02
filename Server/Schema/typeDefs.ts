import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String
    herbs(page: Int, limit: Int): HerbsResponse
    searchHerbs(query: String!): HerbSearchResponse
    herbDetails(name: String!): HerbDetailsResponse
    herbRecommendations(purpose: String!): HerbRecommendationsResponse
  }

  type Herb {
    id: ID
    name: String!
    scientificName: String
    description: String!
    properties: [String]
    uses: [String]
    preparations: [String]
    contraindications: [String]
    createdAt: String
    updatedAt: String
  }

  type Pagination {
    total: Int
    page: Int
    limit: Int
    pages: Int
  }

  type HerbsResponse {
    herbs: [Herb]!
    pagination: Pagination
  }

  type HerbSearchResponse {
    source: String!
    herbs: [Herb]!
    query: String
  }

  type HerbDetailsResponse {
    source: String!
    herb: Herb!
  }

  type HerbRecommendation {
    herb: Herb!
    reason: String
  }

  type HerbRecommendationsResponse {
    purpose: String!
    recommendations: [HerbRecommendation]!
  }
`;