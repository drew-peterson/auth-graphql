import gql from 'graphql-tag';

export default gql`
  mutation {
    logout {
      _id
      __typename
      email
      name
    }
  }
`;
