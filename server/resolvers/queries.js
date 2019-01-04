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
  list: async (_, __, { dataSources }) => {
    const minifiedListResponse = await dataSources.userAPI.getListByUserId();
    if (!minifiedListResponse.success) return minifiedListResponse;
    const albums = await dataSources.listAPI.getAlbumsByIds({
      ids: minifiedListResponse.list.map(listItem => listItem.AlbumSpotifyId)
    });
    return {
      ...minifiedListResponse,
      list: minifiedListResponse.list.map((listItem, index) => ({
        userId: listItem.userId,
        album: albums[index],
        rank: listItem.rank,
        description: listItem.description
      }))
    };
  }
};

module.exports = queries;
