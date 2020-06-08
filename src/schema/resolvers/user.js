import * as userController from '../../controllers/user/graphql';

const resolvers = {
  Query: {
    users: userController.findAll,
    user: userController.findUserById,
  },

  Mutation: {
    signUpUser: userController.signUpUser,
    signInUser: userController.signInUser,
  },
};

export default resolvers;
