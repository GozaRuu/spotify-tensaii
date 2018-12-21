exports.up = knex => {
  return knex.schema
    .createTable("users", table => {
      table.increments("id").primary();
      table.string("username");
      table.string("password");
    })
    .createTable("albums", table => {
      table.increments("id").primary();
      table.string("name");
      table.string("artist");
      table.string("link");
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
