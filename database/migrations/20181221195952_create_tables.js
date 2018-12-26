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
    .createTable("albums", table => {
      table
        .increments("id")
        .primary()
        .unique();
      table.string("name");
      table.string("artist");
      table.string("link").unique();
    })
    .createTable("users_albums", table => {
      table.increments("id").primary();
      table
        .integer("userId")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table
        .integer("albumId")
        .unsigned()
        .references("id")
        .inTable("albums")
        .onDelete("CASCADE");
      table.integer("rank").unsigned();
      table.text("description");
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists("users_albums")
    .dropTableIfExists("albums")
    .dropTableIfExists("users");
};
