const Model = require("objection").Model;

class AlbumList extends Model {
  static get tableName() {
    return "album_lists";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["rank"],
      properties: {
        id: { type: "integer" },
        AlbumSpotifyId: { type: "string" },
        rank: { type: "string", minLength: 1, maxLength: 255 },
        description: { type: "text" }
      }
    };
  }

  static get relationMappings() {
    return {
      lister: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/User",
        join: {
          from: "album_lists.id",
          to: "users.id"
        }
      }
    };
  }
}

module.exports = AlbumList;
