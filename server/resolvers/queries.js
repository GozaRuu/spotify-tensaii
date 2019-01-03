//TODO: fetch album items instead of returning the album ID
const queries = {
  album: (_, { id }, { dataSources }) =>
    dataSources.listAPI.getAlbumById({ id }),
  albums: (_, { ids }, { dataSources }) =>
    dataSources.listAPI.getAlbumsByIds({ ids }),
  list: (_, __, { dataSources }) => dataSources.userAPI.getListByUserId()
};

module.exports = queries;
