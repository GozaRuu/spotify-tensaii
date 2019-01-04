const DatabaseAPI = require("../database");

const mockStore = {
  AlbumList: {
    query: () => ({
      insertGraph: jest.fn(),
      where: () => ({ orderBy: jest.fn(() => mockList) })
    })
  }
};

const ds = new DatabaseAPI({ store: mockStore });
ds.initialize({ context: { user: { id: 1, email: "kais1@g.com" } } });

describe("[DatabaseAPI.getListByUserId]", () => {
  it("should return a {success, list} object", async () => {
    const res = await ds.getListByUserId();
    expect(res).toEqual(mockListResponse);
  });
});

describe("[DatabaseAPI.addListItemByUserId]", () => {});

describe("[DatabaseAPI.addListItemsByUserId]", () => {});

/**
 * MOCK DATA
 */

const mockList = [
  {
    id: 1,
    userId: 1,
    AlbumSpotifyId: "66at85wgO2pu5CccvqUF6i",
    rank: 1,
    description: "thebe"
  },
  {
    id: 2,
    userId: 1,
    AlbumSpotifyId: "22LKdgY3vLsAsWrOafwCM3",
    rank: 2,
    description: "damn peggy"
  },
  {
    id: 3,
    userId: 1,
    AlbumSpotifyId: "3MATDdrpHmQCmuOcozZjDa",
    rank: 3,
    description: "dope record"
  },
  {
    id: 4,
    userId: 1,
    AlbumSpotifyId: "6pwuKxMUkNg673KETsXPUV",
    rank: 4,
    description: "kraaaa"
  },
  {
    id: 5,
    userId: 1,
    AlbumSpotifyId: "7dAm8ShwJLFm9SaJ6Yc58O",
    rank: 5,
    description: "beee beeee!"
  }
];

const mockListResponse = {
  success: true,
  list: mockList
};

module.exports.mockStore = mockStore;
