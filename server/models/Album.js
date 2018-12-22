const Model = require("objection").Model;

class Album extends Model {
  // Table name is required.
  static get tableName() {
    return "albums";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "artist", "link"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        artist: { type: "string", minLength: 1, maxLength: 255 },
        link: { type: "string", minLength: 10, maxLength: 255 }
      }
    };
  }

  static get relationMappings() {
    return {
      raters: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + "/User",
        join: {
          from: "albums.id",
          through: {
            from: "users_albums.albumId",
            to: "users_albums.userId"
          },
          to: "users.id"
        }
      }
    };
  }
}

module.exports = Album;
