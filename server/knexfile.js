require("dotenv").config();

module.exports = {
  client: "postgresql",
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10
  }
};