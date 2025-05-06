import User from '../models/User';
import { signToken } from '../services/auth';

export const resolvers = {
  Query: {
    hello: () => 'Welcome to My Apothecary API!',
    me: async (_: any, __: any, context: any) => {
      if (!context.user) throw new Error('Not authenticated');
      return await User.findById(context.user._id);
    },
  },

  Mutation: {
    signup: async (_: any, { email, password }: any) => {
      const user = await User.create({ email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};