const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const resolvers = require('./resolvers');

// mutation: put patch delete post schema data
// query: get schema data
// type: schema data collections

// resolvers handle the querys to mongo for each mutation / query

const typeDefs = `
  type Query {
    user: User
  }

  type Mutation {
    signup(email: String!, password: String!): User
    login(email: String!, password: String!): User
    updateName(name: String!): User
    logout: User

  }

  type User {
    _id: ID!
    email: String!
    name: String
  }

  type Subscription {
    onNameChange(userID: ID!): User
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
