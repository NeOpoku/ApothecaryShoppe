import { gql } from '@apollo/client';
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
login(email: $email, password: $password) {
token
user {
_id
email
}
}
}
`;

export const REGISTER_USER = gql`
mutation register($email: String!, $password: String!) {
register(email: $email, password: $password) {
token
user {
_id
email
}
}
}
`;
export const SAVE_HERB = gql`
  mutation SaveHerb($herb: HerbInput!) {
    saveHerb(herb: $herb) {
      savedHerbs {
        name
      }
    }
  }
`;
export const DELETE_SAVED_SEARCH = gql`
    mutation deleteSearch($searchId: ID!) {
    deleteSearch(searchId: $searchId) {
    _id
    savedSearches {
    _id
    query
    }
    }
    }
    `;


