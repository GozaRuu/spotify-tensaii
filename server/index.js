const express = require("express");
const next = require("next");
const { ApolloServer, gql } = require("apollo-server-express");
const schema = require("./schema");
const resolvers = require("./resolvers");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = express();
  const apolloApp = new ApolloServer({ typeDefs: schema, resolvers });
  apolloApp.applyMiddleware({ app: server, path: "/graphql" });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  );
});
