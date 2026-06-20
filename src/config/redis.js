import Redis from "ioredis";

const redisOptions = {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
    maxRetriesPerRequest: null, // 👈 ADD THIS EXACT LINE
};

const redisClient = new Redis(redisOptions);

redisClient.on("connect", () => {
    console.log("✅ Redis Connected Successfully");
});

redisClient.on("error", (err) => {
    console.error("❌ Redis Error:", err);
});

export default redisClient;