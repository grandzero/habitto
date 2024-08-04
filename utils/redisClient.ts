// utils/redisClient.ts
import Redis from "ioredis";
const redis = "redis://" + (process?.env?.REDIS_URL ?? "localhost:6379");
const redisClient = new Redis(redis, { tls: {} });

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redisClient;
