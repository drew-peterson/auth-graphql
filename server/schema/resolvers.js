const AuthService = require('../services/auth');
const PubSub = require('graphql-subscriptions').PubSub;
const withFilter = require('graphql-subscriptions').withFilter;
const log = require('node-pretty-log');
const pubsub = new PubSub();

const NAME_CHANGED = 'onNameChange';
// use helper functions as much as possible
const resolvers = {
  Query: {
    // user: (obj, args, { user }) => user // auth check if user is logged in
    user: (obj, args, req) => {
      return req.user;
    } // auth check if user is logged in
  },
  Mutation: {
    signup: async (obj, { email, password }, req) => {
      const res = await AuthService.signup({ email, password, req }); // req is the express req
      return res;
    },
    login: async (obj, { email, password }, req) => {
      const res = await AuthService.login({ email, password, req });
      return res;
    },
    logout: (obj, args, req) => {
      // could create service but this is small
      const { user } = req;
      req.logout();
      return user;
    },
    updateName: async (obj, { name }, req) => {
      const { _id, email } = req.user;

      // update name in DB here....

      pubsub.publish(NAME_CHANGED, {
        onNameChange: {
          _id,
          name,
          email
        }
      });

      return { _id, email, name };
    }
  },
  Subscription: {
    onNameChange: {
      subscribe: () => pubsub.asyncIterator(NAME_CHANGED)
      // how to subscribe to specific things in collection
      // subscribe: withFilter(
      //   () => pubsub.asyncIterator(NAME_CHANGED),
      //   (payload, variables) => {
      //     console.log('payload', payload);
      //     console.log('variables', variables);
      //     return true;
      //   }
      // )
    }
  }
};

module.exports = resolvers;
