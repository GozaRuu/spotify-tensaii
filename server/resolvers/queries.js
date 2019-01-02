const queries = {
  hello: () => "Hello world!",
  album: (_, { id }, { dataSources }) =>
    dataSources.listAPI.getAlbumById({ id }),
  albums: (_, { ids }, { dataSources }) =>
    dataSources.listAPI.getAlbumsByIds({ ids })
};

module.exports = queries;
