const AuthService = require('../services/auth');

// use helper functions as much as possible

const resolvers = {
  Query: {
    // user: (obj, args, { user }) => user // auth check if user is logged in
    user: (obj, args, req) => {
      console.log('user...', req.user);
      return req.user;
    } // auth check if user is logged in
  },
  Mutation: {
    signup: async (obj, { email, password }, req) =>
      AuthService.signup({ email, password, req }), // req is the express req
    login: async (obj, { email, password }, req) => {
      console.log('login', req.user);
      AuthService.login({ email, password, req });
    },
    logout: async (obj, args, req) => {
      // could create service but this is small
      const { user } = req;
      req.logout();
      return user;
    }
  }
};

module.exports = resolvers;
