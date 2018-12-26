const { Model } = require("objection");
const { User } = require("..");

exports.seed = knex => {
  Model.knex(knex);
  return knex("users")
    .del()
    .then(async () => {
      await User.query().insertGraph([
        { email: "kais1@g.com", username: "kais1", password: "kais1" },
        { email: "kais2@g.com", username: "kais2", password: "kais2" }
      ]);
    });
};
