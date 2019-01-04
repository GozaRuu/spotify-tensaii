//TODO: fetch album items instead of returning the album ID
const queries = {
  album: (_, { id }, { dataSources }) =>
    dataSources.listAPI.getAlbumById({ id }),
  albums: (_, { ids }, { dataSources }) =>
    dataSources.listAPI.getAlbumsByIds({ ids }),
  artist: (_, { id }, { dataSources }) =>
    dataSources.listAPI.getArtistById({ id }),
  artists: (_, { ids }, { dataSources }) =>
    dataSources.listAPI.getArtistsByIds({ ids }),
  list: (_, __, { dataSources }) => dataSources.userAPI.getListByUserId()
};

module.exports = queries;
