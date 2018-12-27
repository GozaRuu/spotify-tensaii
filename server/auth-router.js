const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { User } = require("../database");

require("dotenv").config();
const JWTSecret = process.env.JWTSecret || "123";

const getToken = user => jwt.sign(user, JWTSecret, { expiresIn: 60 * 60 * 24 });

const router = express.Router();
router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { successRedirect: "/", failureRedirect: "/login" },
    (err, user, info) => {
      res.setHeader("Content-Type", "application/json");
      if (err) return next(err);
      try {
        if (!user) throw new Error();
        req.logIn(user, err => {
          if (err) throw err;
          const token = getToken({ id: req.user.id });
          res
            .status(200)
            .json({ success: true, status: "Login Successful", token });
        });
      } catch (e) {
        res.status(401).json({
          success: false,
          status: "Login Failed",
          err: info
        });
      }
    }
  )(req, res, next);
});

router.post("/signup", async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  const user = await User.query()
    .insertGraph(req.body)
    .then(res => {
      res.status(200).json({
        success: true,
        status: "Sign Up Successful",
        info: user
      });
    })
    .catch(err => {
      res.status(404).json({
        success: false,
        status: "Sign Up failed"
      });
    });
});

module.exports = router;
