const { DataSource } = require("apollo-datasource");

class ListAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }
}

module.exports = ListAPI;
