const queries = {
  album: (_, { id }, { dataSources }) =>
    dataSources.listAPI.getAlbumById({ id }),
  albums: (_, { ids }, { dataSources }) =>
    dataSources.listAPI.getAlbumsByIds({ ids })
};

module.exports = queries;
