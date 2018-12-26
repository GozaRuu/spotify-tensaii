exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { email: "kais1@g.com", username: "kais1", password: "kais1" },
        { email: "kais2@g.com", username: "kais2", password: "kais2" }
      ]);
    });
};
