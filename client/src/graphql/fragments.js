import gql from 'graphql-tag';

export const CURRENT_USER = gql`
  fragment CurrentUser on User {
    _id
    email
  }
`;
