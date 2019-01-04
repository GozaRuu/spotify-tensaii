const DatabaseAPI = require("../database");

const mockStore = {
  AlbumList: {
    query: () => ({
      insertGraph: jest.fn(),
      where: () => ({ orderBy: jest.fn() })
    })
  }
};

const ds = new DatabaseAPI({ store: mockStore });
ds.initialize({ context: { user: { id: 1, email: "kais1@g.com" } } });

module.exports.mockStore = mockStore;
