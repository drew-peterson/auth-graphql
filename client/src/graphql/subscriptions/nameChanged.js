import gql from 'graphql-tag';

export default gql`
  subscription nameChanged {
    _id
    name
    email
  }
`;
