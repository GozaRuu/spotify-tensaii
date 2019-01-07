const { ApolloClient, InMemoryCache, HttpLink } = require("apollo-boost");
const fetch = require("isomorphic-unfetch");

const { host, port } = require("./lib/config");

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

const create = initialState => {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: new HttpLink({
      uri: `http://${host}:${port}/graphql`, // Server URL (must be absolute)
      credentials: "same-origin" // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
};

module.exports = initialState => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
};
