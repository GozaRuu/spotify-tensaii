require("dotenv").config();

module.exports = {
  host: process.env.HOST || "localhost",
  port: parseInt(process.env.PORT, 10) || 4000,
  dev: process.env.NODE_ENV !== "production",
  spotifyClientId: process.env.SPOTIFY_API_CLIENT_ID || "",
  spotifyClientSecret: process.env.SPOTIFY_API_CLIENT_SECRET || "",
  JWTSecret: process.env.JWTSecret || "123"
};
