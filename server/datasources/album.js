const { DataSource } = require("apollo-datasource");

class AlbumAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  findOrCreateAlbum() {
    return null;
  }
}

module.exports = AlbumAPI;
