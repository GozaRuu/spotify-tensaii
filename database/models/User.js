const Model = require("objection").Model;

class User extends Model {
  // Table name is required.
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "email"],
      properties: {
        id: { type: "integer" },
        email: { type: "string", minLength: 5, maxLength: 255 },
        username: { type: "string", minLength: 3, maxLength: 255 },
        password: { type: "string", minLength: 6, maxLength: 18 }
      }
    };
  }

  static get relationMappings() {
    return {
      rates: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + "/Album",
        join: {
          from: "users.id",
          // ManyToMany relation needs the `through` object to describe the join table.
          through: {
            from: "users_albums.userId",
            to: "users_albums.albumId"
          },
          to: "albums.id"
        }
      }
    };
  }
}

module.exports = User;
