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

  artistReducer(artist) {
    return {
      id: artist.id || 0,
      name: artist.name,
      genres: artist.genres,
      images: artist.images
    };
  }

  async getAlbumById({ id }) {
    const res = await this.get(`albums/${id}`);
    return this.albumReducer(res);
  }

  async getAlbumsByIds({ ids }) {
    const res = await this.get(`albums`, { ids: ids });
    return res.albums.map(album => this.albumReducer(album));
  }

  async getArtistById({ id }) {
    const res = await this.get(`artists/${id}`);
    return this.artistReducer(res);
  }

  async getArtistsById({ ids }) {
    const res = await this.get(`artists`, { ids: ids });
    return res.albums.map(artist => this.artistReducer(artist));
  }
}

module.exports = ListAPI;
