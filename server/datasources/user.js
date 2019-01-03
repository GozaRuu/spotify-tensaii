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
      return {
        success: true,
        message: "item inserted successfully",
        list: [data]
      };
    } catch (err) {
      return { success: false, message: "wrong data input" };
    }
  }

  async addListItemsByUserId(listItems) {
    const userId = this.context.user.id;
    try {
      const list = await this.store.AlbumList.query().insertGraph(
        listItems.map(listItem => ({
          userId,
          ...listItem
        }))
      );
      return { success: true, message: "items inserted successfully", list };
    } catch (err) {
      return { success: false, message: "wrong data input" };
    }
  }

  async getListByUserId() {
    const userId = this.context.user.id;
    try {
      const list = await this.store.AlbumList.query()
        .where("userId", userId)
        .orderBy("rank");
      return { success: true, list };
    } catch (err) {
      return { success: false, message: "database error" };
    }
  }
}

module.exports = UserAPI;
