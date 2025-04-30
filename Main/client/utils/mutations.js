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
export const ADD_RECIPE = gql`
    mutation AddRecipe($name: String!, $herbs: [String]!, $instructions: String!) {
    addRecipe(name: $name, herbs: $herbs, instructions: $instructions) {
    _id
    recipes {
    name
    herbs
    instructions
    }
    }
    }
    `;

