const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("../database");

require("dotenv").config();

const JWTSecret = process.env.JWTSecret || "123";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      User.query()
        .where("email", email)
        .first()
        .then(user => {
          if (!user) return done(null, false, "Unknown User");

          user.verifyPassword(password, (err, passwordCorrect) => {
            if (err) throw err;
            if (!passwordCorrect) {
              return done(null, false, "Wrong Password");
            }
            return done(null, user);
          });
        })
        .catch(err => done(err));
    }
  )
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWTSecret;

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.query()
      .findById(jwt_payload.id)
      .then((err, user) => {
        if (err) return done(err);
        return user ? done(null, user) : done(null, false);
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.query()
    .findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});
