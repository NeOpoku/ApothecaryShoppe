import { gql } from '@apollo/client';

export const GET_HERBS = gql`
query herbs($query: String!) {
herbs(query: $query) {
_id
name
description
image
remedies
}
}
`;
export const QUERY_ME = gql`
query Me {
me {
_id
email
savedSearches {
_id
query
results {
_id
name
}
}
}
}
`;
export const GET_USER_RECIPES = gql`
query Me {
me {
recipes {
name
herbs
instructions
}
}
}
`;
