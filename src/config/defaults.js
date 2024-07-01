require("dotenv").config();
const config = {
  limit: 10,
  page: 1,
  redisURL: process.env.REDIS_HOST || "localhost",
  redisPort: process.env.REDIS_PORT || 6379,
  redisPassword: process.env.RADIS_PASSWORD,
  redisDocttl: 120,
};

module.exports = Object.freeze(config);
