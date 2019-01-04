const { RESTDataSource } = require("apollo-datasource-rest");

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spotify.com/v1";
  }

  willSendRequest(req) {
    req.headers.set("Authorization", "Bearer " + this.context.token);
  }

  albumReducer(album) {
    return {
      id: album.id || 0,
      name: album.name,
      artists: album.artists.map(artist => this.artistReducer(artist)),
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
    const album = await this.get(`albums/${id}`);
    const artists = await this.getArtistsByIds({
      ids: album.artists.map(artist => artist.id)
    });
    return this.albumReducer({ ...album, artists });
  }

  async getAlbumsByIds({ ids }) {
    const albums = await this.get(`albums`, { ids: ids });
    const pArtists = albums.albums.map(
      async album =>
        await this.getArtistsByIds({
          ids: album.artists.map(artist => artist.id)
        })
    );

    return Promise.all(pArtists).then(artists =>
      albums.albums.map((album, index) =>
        this.albumReducer({ ...album, artists: artists[index] })
      )
    );
  }

  async getArtistById({ id }) {
    const res = await this.get(`artists/${id}`);
    return this.artistReducer(res);
  }

  async getArtistsByIds({ ids }) {
    const res = await this.get(`artists`, { ids: ids });
    return res.artists.map(artist => this.artistReducer(artist));
  }
}

module.exports = SpotifyAPI;
