import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';

import passport from 'passport';

import schema from './schema';
import models from './models';
import resolvers from './schema/resolvers';

require('dotenv').config();

const port = process.env.PORT || 3001;

const app = express();

const server = new ApolloServer({
  ...schema,
  resolvers,
  context: async ({ req, res }) => ({ models, user: req.user }),
  instrospection: true,
  playground: true,
  tracing: true,
});

app.use(function (req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    // JWT invalid
    // if (info) return next(new error_types.Error401(info.message));

    // DB Query error
    // if (err) return next(err);

    // No user match with JWT
    // if (!user)
    //   return next(new error_types.Error403('You are not allowed to access.'));

    // User data into request
    req.user = user;
    console.log('request user:', req.user);
    next();
  })(req, res, next);
});

var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    return done(
      null,
      await models.user.findOne({ where: { id: jwt_payload.sub } }),
    );
  }),
);

server.applyMiddleware({ app });

const httpServer = createServer(app);

server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
  console.log(
    `Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`,
  );
});
