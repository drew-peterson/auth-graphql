import gql from 'graphql-tag';

export default gql`
  mutation UpdateName($name: String!) {
    updateName(name: $name) {
      _id
      name
      email
    }
  }
`;
