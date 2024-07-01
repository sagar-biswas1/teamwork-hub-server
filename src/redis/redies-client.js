require("dotenv").config();
const { Redis } = require("ioredis");
const config = require("../config/defaults");

// const config = {
//   url: process.env.REDIS_HOST || "localhost",
//   port: process.env.REDIS_PORT || 6379,
//   password: process.env.RADIS_PASSWORD,
//   cart_ttl: 10,
// };

const redis = new Redis(config.redisURL);

// Event listeners for connection status
redis.on("connect", () => {
  console.log("Redis client connected");
});

redis.on("ready", () => {
  console.log("Redis client ready");
});

redis.on("error", (err) => {
  //console.error("Redis client error:", err);
});

redis.on("end", () => {
  console.log("Redis client disconnected");
});

module.exports = { redis };
