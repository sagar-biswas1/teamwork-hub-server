const config = require("../config/defaults");

const { Redis } = require("ioredis");
const { redis: r1 } = require("./redies-client");
const { getMycacheDocument } = require("./redisUtils");
const { updateById } = require("../lib/content");

const CHANNEl_KEY = "__keyevent@0__:expired";
const redis = new Redis(config.redisURL);
redis.config("set", "notify-keyspace-events", "Ex");

redis.subscribe(CHANNEl_KEY);

redis.on("message", async (channel, message) => {
  if (channel === CHANNEl_KEY) {
    const sessionId = message.replace("session:", "");

    const cachedContent = await getMycacheDocument(sessionId);

    if (cachedContent) {
      const { title, body, collaborators } = cachedContent;

      const updatedContent = await updateById(sessionId, {
        title,
        body,
        collaborators,
      });

      
    }
    // r1.del(`document:${sessionId}`).then((result) => {
   
    // });
  }
});
