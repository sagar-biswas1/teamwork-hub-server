const { redis } = require("./redies-client");
const config = require("../config/defaults");
const setSessionInRedis = async (sessionId) => {
  const exist = await redis.exists(`session:${sessionId}`);

  if (!exist) {
    await redis.setex(`session:${sessionId}`, config.redisDocttl, sessionId);
  }
};

const cacheDocument = async (sessionId, doc) => {
  await redis.hset(`document:${sessionId}`, doc?._id, JSON.stringify(doc));
};

const getMycacheDocument = async (sessionId) => {
  const doc = await redis.hgetall(`document:${sessionId}`);
  if (doc[sessionId]) return JSON.parse(doc[sessionId]);
  else return null;
};

module.exports = {
  setSessionInRedis,
  cacheDocument,
  getMycacheDocument,
};
