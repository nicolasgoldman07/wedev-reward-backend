const { v4: uuidv4 } = require('uuid');

export const findAll = (obj, args, context) => {
  console.log(context.models.user);
  return context.models.user.findAll(args);
};

export const findUserById = (obj, args, context) => {
  return context.models.user.findAll({
    where: {
      id: args.id,
    },
  });
};

export const createUser = async (obj, args, context) => {
  const newUser = await context.models.user.create({
    id: uuidv4(),
    firstName: args.firstName,
    lastName: args.lastName,
    username: args.username,
    password: args.password,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return newUser;
};

export const signUpUser = async (obj, args, context) => {
  console.dir(args.data);
  // Creates de user in DB

  const newUser = await context.models.user.create({
    id: uuidv4(),
    firstName: args.data.firstName,
    lastName: args.data.lastName,
    username: args.data.username,
    password: args.data.password,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const authenticationResult = {
    user: newUser,
    jwt: 'jwt',
    authError: 'authError',
  };

  return authenticationResult;
};
