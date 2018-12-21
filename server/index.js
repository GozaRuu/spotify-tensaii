const express = require("express");
const next = require("next");
const { ApolloServer, gql } = require("apollo-server-express");
const Knex = require("knex");
const { Model } = require("objection");
const cors = require("cors");
const morgan = require("morgan");
const parser = require("body-parser");
const knexConfig = require("./knexfile");
const schema = require("./schema");
const resolvers = require("./resolvers");

require("dotenv").config();

// Initialize knex and objection DB connection.
const knex = Knex(knexConfig.development);
Model.knex(knex);

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== "production";

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

  //Initialize intialze and connect a graphql endpoint to express
  const apolloApp = new ApolloServer({ typeDefs: schema, resolvers });
  apolloApp.applyMiddleware({ app, path: "/graphql" });

  //redirect every query to the next app
  app.get("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(app.get("port"), () =>
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  );
});
