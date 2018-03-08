import gql from 'graphql-tag';
// import { CURRENT_USER } from '../fragments';

export default gql`
  {
    user {
      _id
      email
      __typename
    }
  }
`;
