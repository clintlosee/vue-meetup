const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/users');
const config = require('../config/dev');

//* only for session authentication
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }

          if (!isMatch) {
            return done(null, false);
          }

          return done(null, user);
        });
      });
    }
  )
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload.id, function(err, user) {
      if (err) return done(err, false);

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  })
);
