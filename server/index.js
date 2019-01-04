require("dotenv").config();

const express = require("express");
const next = require("next");
const { ApolloServer, gql } = require("apollo-server-express");
const Knex = require("knex");
const { Model } = require("objection");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const parser = require("body-parser");

const axios = require("axios");

const knexConfig = require("../database/knexfile");
const store = require("../database");

const authRouter = require("./auth-router");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const ListAPI = require("./datasources/list");
const UserAPI = require("./datasources/user");

require("./passport.config");

// Initialize knex and objection DB connection.
const knex = Knex(knexConfig.development);
Model.knex(knex);

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== "production";
const spotifyClientId = process.env.SPOTIFY_API_CLIENT_ID || "";
const spotifyClientSecret = process.env.SPOTIFY_API_CLIENT_SECRET || "";

//get next app instance
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  //Initialize express app
  const app = express();
  app.use(parser.urlencoded({ extended: true }));
  app.use(parser.json());
  app.use(morgan("dev"));
  app.use(cors());
  app.set("json spaces", 2);
  app.set("port", port);

  //config passport
  app.use(passport.initialize());

  //setup auth Router
  app.use("/auth", authRouter);

  //setup authenication for graphql
  // app.use("/graphql", (req, res, next) => {
  //   passport.authenticate("jwt", function(user, _, err) {
  //     if (err)
  //       return res.json({
  //         success: false,
  //         message: "Wrong Access Token"
  //       });
  //
  //     req.user = user;
  //     return next();
  //   })(req, res, next);
  // });

  // set up dataSources for the resolvers
  const dataSources = () => ({
    listAPI: new ListAPI(),
    userAPI: new UserAPI({ store })
  });

  // set up shared context between resolvers
  const context = async ({ req }) => {
    const token = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      params: {
        grant_type: "client_credentials"
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(spotifyClientId + ":" + spotifyClientSecret).toString(
            "base64"
          )
      }
    });
    return { user: { id: 1 }, token: token.data.access_token };
  };

  //Initialize and connect a graphql endpoint to express
  const apolloApp = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context
  });
  apolloApp.applyMiddleware({ app, path: "/graphql" });

  //redirect every GET query to the next app
  app.get("*", (req, res) => {
    return handle(req, res);
  });

  // Start server if we're not in a test env.
  if (process.env.NODE_ENV !== "test")
    app.listen(app.get("port"), () =>
      console.log(
        `🚀 Server ready at http://localhost:4000, gql playground on /graphql`
      )
    );
});
