const AuthService = require('../services/auth');
const RedisPubSub = require('graphql-redis-subscriptions').RedisPubSub;
const withFilter = require('graphql-subscriptions').withFilter;
const log = require('node-pretty-log');

const Redis = require('ioredis');

const options = {
  connection: {
    host:
      'redis://rediscloud:Tle4JpIrmHpHg4q5Hjkb3Hg6khylMg1u@redis-16841.c9.us-east-1-4.ec2.cloud.redislabs.com',
    port: 16841,
    retry_strategy: options => {
      // reconnect after upto 3000 milis
      return Math.max(options.attempt * 100, 3000);
    }
  }
};
const pubsub = new RedisPubSub({
  // publisher: new Redis(),
  // subscriber: new Redis()
  publisher: new Redis(options),
  subscriber: new Redis(options)
});

const NAME_CHANGED = 'onNameChange';
// use helper functions as much as possible
const resolvers = {
  Query: {
    user: (obj, args, req) => {
      // auth check if user is logged in
      return req.user;
    }
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
      log('warn', 'updateName - NOT SAVING TO DB...', req.user._id);
      const res = { _id, name, email };

      pubsub.publish(NAME_CHANGED, {
        onNameChange: res
      });

      return { _id, email, name };
    }
  },
  Subscription: {
    onNameChange: {
      // subscribe: () => pubsub.asyncIterator(NAME_CHANGED)
      // how to subscribe to specific things in collection
      subscribe: withFilter(
        () => pubsub.asyncIterator(NAME_CHANGED),
        (payload, variables, req) => {
          // userID is a string??? so ==
          // need to figure out how to get req...
          // console.log('req', req);
          return payload.onNameChange._id == variables.userID;
        }
      )
    }
  }
};

module.exports = resolvers;
