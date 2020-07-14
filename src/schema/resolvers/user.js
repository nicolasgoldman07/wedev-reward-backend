import * as userController from '../../controllers/user/graphql';

const resolvers = {
  Query: {
    users: userController.findAll,
    user: userController.findUserById,
    currentUser: userController.getCurrentUser,
  },

  Mutation: {
    signUpUser: userController.signUpUser,
    signInUser: userController.signInUser,
  },
};

export default resolvers;
