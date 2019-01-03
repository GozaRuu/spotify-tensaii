const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    albums(ids: [ID]!): [Album]
    album(id: ID!): Album
    list: ListResponse
  }

  type Mutation {
    addListItem(listItem: ListItemInput): ListResponse
    addListItems(listItems: [ListItemInput]!): ListResponse
  }

  input ListItemInput {
    AlbumSpotifyId: String!
    rank: Int
    description: String
  }

  type ListResponse {
    success: Boolean!
    message: String
    list: [ListItem]
  }

  type ListItem {
    userId: ID!
    AlbumSpotifyId: ID
    rank: Int
    description: String
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
