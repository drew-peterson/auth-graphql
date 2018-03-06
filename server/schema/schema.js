import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

// mutation: put patch delete post schema data
// query: get schema data
// type: schema data collections

// resolvers handle the querys to mongo for each mutation / query

const typeDefs = `
  type Query {
    user(email: String!): User
  }

  type Mutation {
    signup(email: String!, password: String!): User

  }

  type User {
    email: String!
  }
`;

export default makeExecutableSchema({ typeDefs, resolvers });
