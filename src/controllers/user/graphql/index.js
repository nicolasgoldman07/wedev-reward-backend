export const findAll = (obj, args, context) => {
  return context.models.user.findAll(args);
};

export const findUserById = (obj, args, context) => {
  return context.models.user.findOne({
    where: {
      id: args.id,
    },
  });
};

export const getCurrentUser = (obj, args, context) => {
  return context.user;
};

export const signUpUser = async (obj, args, context) => {
  try {
    const user = await context.models.user.create(args.data);
    return { user, jwt: user.getJWT() };
  } catch (error) {
    return { authError: error.message };
  }
};

export const signInUser = async (obj, args, context) => {
  const user = await context.models.user.findUserByUsername(args.data.username);
  if (!user) return { authError: 'User not in DB' };

  if (!user.passwordMatches(args.data.password))
    return { authError: 'Incorrect password' };

  return { user, jwt: user.getJWT() };
};
