import { gql } from '@apollo/client';
import {gpl} from '@apollo/client';

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
export const GET_ME = gql`
  query GetMe {
    me {
      savedHerbs {
        name
        description
        use
        image
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
