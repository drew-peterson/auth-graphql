import gql from 'graphql-tag';

export default gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      __typename
      _id
      email
    }
  }
`;
