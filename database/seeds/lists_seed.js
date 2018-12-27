const { Model } = require("objection");
const { AlbumList } = require("..");

exports.seed = knex => {
  Model.knex(knex);
  return knex("album_lists")
    .del()
    .then(async () => {
      await AlbumList.query().insertGraph([
        {
          userId: "1",
          AlbumSpotifyId: "66at85wgO2pu5CccvqUF6i",
          rank: "1",
          description: "thebe"
        },
        {
          userId: "1",
          AlbumSpotifyId: "22LKdgY3vLsAsWrOafwCM3",
          rank: "2",
          description: "damn peggy"
        },
        {
          userId: "1",
          AlbumSpotifyId: "3MATDdrpHmQCmuOcozZjDa",
          rank: "3",
          description: "dope record"
        },
        {
          userId: "1",
          AlbumSpotifyId: "6pwuKxMUkNg673KETsXPUV",
          rank: "4",
          description: "kraaaa"
        },
        {
          userId: "1",
          AlbumSpotifyId: "7dAm8ShwJLFm9SaJ6Yc58O",
          rank: "5",
          description: "beee beeee!"
        }
      ]);
    });
};
