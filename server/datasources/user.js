const { DataSource } = require("apollo-datasource");

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }
  initialize(config) {
    this.context = config.context;
  }

  async addListItemByUserId(listItem) {
    const userId = this.context.user.id;
    try {
      const data = await this.store.AlbumList.query().insertGraph({
        userId,
        ...listItem
      });
      return { success: true, data };
    } catch (err) {
      return { success: false, status: "wrong data", err };
    }
  }

  async addListItemsByUserId(listItems) {
    const userId = this.context.user.id;
    try {
      const data = await this.store.AlbumList.query().insertGraph(
        listItems.map(listItem => ({
          userId,
          ...listItem
        }))
      );
      return { success: true, data };
    } catch (err) {
      return { success: false, status: "wrong data", err };
    }
  }

  async getListByUserId(id) {
    const userId = this.context.user.id;
  }
}

module.exports = UserAPI;
