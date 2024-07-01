const { redis } = require("./redies-client");
const config = require("../config/defaults");
const setSessionInRedis = async (sessionId) => {
    const exist = await redis.exists(`session:${sessionId}`);
    console.log({ exist });
    if (exist) {
      console.log("Session already exists");
    } else {
      await redis.setex(`session:${sessionId}`,config.redisDocttl , sessionId);
      console.log("Session created");
    }
  };
  
  const cacheDocument = async (sessionId, doc) => {
    await redis.hset(`document:${sessionId}`, doc?._id, JSON.stringify(doc));
  
    console.log("added to document", `document:${sessionId}`);
  };
  
  const getMycacheDocument = async (sessionId) => {
    const doc = await redis.hgetall(`document:${sessionId}`);
    if (doc[sessionId]) return JSON.parse(doc[sessionId]);
    else return null;
  };
  

  module.exports = {
    setSessionInRedis,
    cacheDocument,
    getMycacheDocument
  };