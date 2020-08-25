import passport from 'passport';
import models from './models';

require('dotenv').config();

export default function (req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    req.user = user;
    next();
  })(req, res, next);
}

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
