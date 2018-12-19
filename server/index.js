const express = require("express");
const next = require("next");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const parser = require("body-parser");
const schema = require("./schema");
const resolvers = require("./resolvers");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  app.use(parser.urlencoded({ extended: true }));
  app.use(parser.json());
  app.set("port", port);

  app.use(cors());
  const apolloApp = new ApolloServer({ typeDefs: schema, resolvers });
  apolloApp.applyMiddleware({ app, path: "/graphql" });

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  );
});
