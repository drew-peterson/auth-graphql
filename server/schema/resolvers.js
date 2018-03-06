import { signup, login } from '../services/auth';

const resolvers = {
  Query: {
    user: (obj, { email }, req) => {
      return {
        email: 'drew@test.com'
      };
    }
  },
  Mutation: {
    signup: async (obj, { email, password }, req) => {
      // req is the express req
      return signup({ email, password, req });
    }
  }
};

export default resolvers;
