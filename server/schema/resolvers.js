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
    signup: async (obj, { email, password }, req) => {
      const res = await AuthService.signup({ email, password, req }); // req is the express req
      return res;
    },
    login: async (obj, { email, password }, req) => {
      console.log('email', email);
      console.log('password', password);
      const res = await AuthService.login({ email, password, req });
      console.log('res', res);
      return res;
    },
    logout: (obj, args, req) => {
      // could create service but this is small
      const { user } = req;
      req.logout();
      return user;
    }
  }
};

module.exports = resolvers;
