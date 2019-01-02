const { RESTDataSource } = require("apollo-datasource-rest");

class ListAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spotify.com/v1";
  }

  willSendRequest(req) {
    req.headers.set("Authorization", "Bearer " + this.context.token);
    console.log(req);
  }

  async getAlbumById({ albumSpotifyId }) {
    const res = await this.get(`albums/${albumSpotifyId}`);
    console.log(res);
  }
}

module.exports = ListAPI;
