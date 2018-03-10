import gql from 'graphql-tag';

// return fields has to match the query return fields
// match CurrentUser
export default gql`
  subscription OnNameChange($userID: ID!) {
    onNameChange(userID: $userID) {
      _id
      __typename
      email
      name
    }
  }
`;
