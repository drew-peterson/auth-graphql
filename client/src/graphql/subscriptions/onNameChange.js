import gql from 'graphql-tag';

export default gql`
  subscription OnNameChange {
    onNameChange {
      _id
      __typename
      email
      name
    }
  }
`;
