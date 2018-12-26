const Model = require("objection").Model;
import bcrypt from "bcrypt";

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
      rates: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + "/Album",
        join: {
          from: "users.id",
          through: {
            from: "users_albums.userId",
            to: "users_albums.albumId"
          },
          to: "albums.id"
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
