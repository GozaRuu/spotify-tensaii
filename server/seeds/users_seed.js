exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "kais1", password: "kais1" },
        { username: "kais2", password: "kais2" }
      ]);
    });
};
