exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("albums")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("albums").insert([
        {
          name: "Veteran",
          artist: "JPEGMAFIA",
          link: "https://open.spotify.com/album/51WLEfPEEkzAWurvuY6Gco"
        },
        {
          name: "Some Rap Songs",
          artist: "Earl Sweatshit",
          link: "https://open.spotify.com/album/66at85wgO2pu5CccvqUF6i"
        },
        {
          name: "TESTING",
          artist: "A$AP Rocky",
          link: "https://open.spotify.com/album/3MATDdrpHmQCmuOcozZjDa"
        },
        {
          name: "Kids See Ghosts",
          artist: "Kids See Ghosts",
          link: "https://open.spotify.com/album/6pwuKxMUkNg673KETsXPUV"
        },
        {
          name: "Die Lit",
          artist: "Playboi Carti",
          link: "https://open.spotify.com/album/7dAm8ShwJLFm9SaJ6Yc58O"
        }
      ]);
    });
};
