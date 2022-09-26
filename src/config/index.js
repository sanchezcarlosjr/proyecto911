import "dotenv/config";

export default {
  port: process.env.PORT || 4000,
  databaseURL: process.env.DATABASE_URL || "mongodb://localhost:27017/test",
  jwtSecret: process.env.JWT_SECRET || "secret",
  jwtAlgorithm: process.env.JWT_ALGORITHM || "RS256",
};
