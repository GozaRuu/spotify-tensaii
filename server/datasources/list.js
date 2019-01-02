const { RESTDataSource } = require("apollo-datasource-rest");

class ListAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spotify.com/v1";
  }

  willSendRequest(req) {
    req.headers.set("Authorization", "Bearer " + this.context.token);
  }

  //TODO: figure out where I want a full artist object from here or not
  albumReducer(album) {
    return {
      id: album.id || 0,
      name: album.name,
      artists: album.artists.map(artist => ({
        id: artist.id,
        name: artist.name
      })),
      release_date: album.release_date,
      total_tracks: album.total_tracks,
      images: album.images
    };
  }

  async getAlbumById({ albumSpotifyId }) {
    const res = await this.get(`albums/${albumSpotifyId}`);
    return this.albumReducer(res);
  }

  async getAlbumsByIds({ albumSpotifyIds }) {
    const res = await this.get(`albums`, { ids: albumSpotifyIds });
    return res.albums.map(album => this.albumReducer(album));
  }
}

module.exports = ListAPI;
