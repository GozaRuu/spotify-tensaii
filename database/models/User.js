const Model = require("objection").Model;
const bcrypt = require("bcryptjs");

class User extends Model {
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
        hash: { type: "string" },
        isAdmin: { type: "boolean", default: false }
      }
    };
  }

  static get relationMappings() {
    return {
      lists: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + "/AlbumList",
        join: {
          from: "users.id",
          to: "album_lists.userId"
        }
      }
    };
  }

  set password(password) {
    this.hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  verifyPassword(password, callback) {
    bcrypt.compare(password, this.hash, callback);
  }
}

module.exports = User;
