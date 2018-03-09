import gql from 'graphql-tag';

export default gql`
  nameChanged {
    _id
    __typename
    email
    name
  }
`;
