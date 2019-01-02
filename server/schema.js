const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    albums(ids: [ID]!): [Album]
    album(id: ID!): Album
    hello: String
  }

  type Album {
    id: ID!
    name: String
    artists: [Artist]
    release_date: String
    total_tracks: Int
    images: [Image]
  }

  type Artist {
    id: ID!
    name: String
    genres: [String]
    images: [Image]
  }

  type Image {
    height: Int
    width: Int
    url: String
  }
`;

module.exports = typeDefs;
