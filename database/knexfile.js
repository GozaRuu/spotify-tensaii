require("dotenv").config();

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: __dirname + "/../store.sqlite3"
    },
    useNullAsDefault: true
  },
  production: {
    client: "postgresql",
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
