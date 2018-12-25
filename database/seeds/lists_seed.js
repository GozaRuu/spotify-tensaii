exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users_albums")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users_albums").insert([
        {
          userId: "1",
          albumId: "1",
          rank: "1",
          description: "nice album!!"
        },
        {
          userId: "1",
          albumId: "2",
          rank: "2",
          description: "greaat album!!"
        },
        {
          userId: "1",
          albumId: "3",
          rank: "3",
          description: "dope record"
        },
        {
          userId: "1",
          albumId: "4",
          rank: "4",
          description: "kraaaa"
        },
        {
          userId: "1",
          albumId: "5",
          rank: "5",
          description: "beee beeee!"
        }
      ]);
    });
};
