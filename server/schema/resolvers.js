import { signup, login } from '../services/auth';

// use helper functions as much as possible

const resolvers = {
  Query: {
    user: (obj, args, { user }) => user // auth check if user is logged in
  },
  Mutation: {
    signup: async (obj, { email, password }, req) =>
      signup({ email, password, req }), // req is the express req
    login: async (obj, { email, password }, req) =>
      login({ email, password, req }),
    logout: async (obj, args, req) => {
      // could create service but this is small
      const { user } = req;
      req.logout();
      return user;
    }
  }
};

export default resolvers;
