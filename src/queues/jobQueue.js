import { Queue } from "bullmq";
import redisConnection from "../config/redis.js";

const jobQueue = new Queue("jobQueue", {
    connection: redisConnection,
});

export default jobQueue;