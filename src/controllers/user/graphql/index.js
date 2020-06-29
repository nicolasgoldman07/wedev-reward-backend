const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

export const findAll = (obj, args, context) => {
  console.log(context.models.user);
  return context.models.user.findAll(args);
};

export const findUserById = async (obj, args, context) => {
  return context.models.user.findOne({
    where: {
      id: args.id,
    },
  });
};

export const getCurrentUser = async (obj, args, context) => {
  return context.user;
};

export const signUpUser = async (obj, args, context) => {
  let user = {};
  let token = null;
  let authError = null;
  try {
    // Creates de user in DB
    user = await context.models.user.create({
      id: uuidv4(),
      firstName: args.data.firstName,
      lastName: args.data.lastName,
      username: args.data.username,
      password: args.data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const payload = {
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    // Creates JWT
    token = jwt.sign(payload, process.env.SECRET);
  } catch (e) {
    user = null;
    token = null;
    authError = e.name;
  }

  const authenticationResult = {
    user,
    jwt: token,
    authError,
  };

  return authenticationResult;
};

export const signInUser = async (obj, args, context) => {
  let user = {};
  let token = null;
  let authError = null;

  // Searchs for user in DB
  user = await context.models.user.findOne({
    where: {
      username: args.data.username,
    },
  });

  if (user && user.passwordMatches(args.data.password)) {
    const payload = {
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    // Creates JWT
    token = jwt.sign(payload, process.env.SECRET);
  } else if (user && !user.passwordMatches(args.data.password)) {
    user = null;
    token = null;
    authError = 'Incorrect password';
  } else {
    user = null;
    token = null;
    authError = 'User not in DB';
  }

  const authenticationResult = {
    user,
    jwt: token,
    authError,
  };

  return authenticationResult;
};

// export const createUser = async (obj, args, context) => {
//   const newUser = await context.models.user.create({
//     id: uuidv4(),
//     firstName: args.firstName,
//     lastName: args.lastName,
//     username: args.username,
//     password: args.password,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   });

//   return newUser;
// };
