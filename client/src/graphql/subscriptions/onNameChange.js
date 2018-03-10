import gql from 'graphql-tag';

// return fields has to match the query return fields
// match CurrentUser
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
