import * as userController from '../../controllers/user/graphql';

const resolvers = {
  Query: {
    users: userController.findAll,
  },
};

export default resolvers;
