export const findAll = (obj, args, context) => {
  console.log(context.models.user);
  return context.models.user.findAll(args);
};
