exports.up = knex => {
  return knex.schema
    .createTable("users", table => {
      table
        .increments("id")
        .primary()
        .unique();
      table.string("email").unique();
      table.string("username");
      table.string("hash");
      table.boolean("isAdmin");
    })
    .createTable("album_lists", table => {
      table.increments("id").primary();
      table
        .integer("userId")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("AlbumSpotifyId");
      table
        .integer("rank")
        .unsigned()
        .unique();
      table.text("description");
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists("album_lists")
    .dropTableIfExists("users");
};
