const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../database");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (username, password, done) => {
      User.query()
        .where("username", username)
        .first()
        .then(user => {
          if (!user) return done(null, false, { message: "Unknown user" });

          user.verifyPassword(password, (err, passwordCorrect) => {
            if (err) throw err;
            if (!passwordCorrect) {
              return done(null, false, { message: "Wrong Password" });
            }
            return done(null, user);
          });
        })
        .catch(err => done(err));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Admin.query()
    .findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});
