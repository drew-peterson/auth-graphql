const AuthService = require('../services/auth');
const PubSub = require('graphql-subscriptions').PubSub;
const pubsub = new PubSub();
// module.exports = new PubSub();

const NAME_CHANGED = 'something_changed';
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
    updateName: async (obj, { _id, name }, req) => {
      console.log('update name', _id, name);

      // update name here....

      pubsub.publish(NAME_CHANGED, {
        nameChanged: {
          name,
          _id,
          email: 'drew@test.com'
        }
      });

      return req.user;
    }
  },
  Subscription: {
    nameChanged: {
      subscribe: () => pubsub.asyncIterator(NAME_CHANGED)
    }
  }
};

module.exports = resolvers;
