import gql from 'graphql-tag';

export default gql`
  mutation Auth($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      __typename
      _id
      email
    }
  }
`;
