import * as userController from '../../controllers/user/graphql';

const resolvers = {
  Query: {
    users: userController.findAll,
    user: userController.findUserById,
  },

  Mutation: {
    createUser: userController.createUser,
  },
};

export default resolvers;
