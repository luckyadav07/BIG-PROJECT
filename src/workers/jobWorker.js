import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";
import { sendSingleEmail } from "../services/email.service.js"

const worker = new Worker(
    "jobQueue",
    // queue se aayi hui job ko process karega
    async (job) => {
        // campaign email wali job hai
        if (job.name === "campaign-email") {
            console.log("Campaign Processing...");
            // queue me jo data bheja tha wo yaha milega
            console.log(job.data);

            // har recruiter ko email bhejne ka logic
            for (const email of job.data.recruiterEmails) {
                console.log(`Sending email to ${email}`);

                await sendSingleEmail(
                    email,
                    "Job Application Inquiry",
                    job.data.template,
                    job.data.template
                );
            }
        }
    },
    {
        connection: redisConnection
    }
);

// job successful complete hui
worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
});

// job fail hui
worker.on("failed", (job, err) => {
    console.log(`Job ${job.id} failed`);
    console.log(err.message);
});

export default worker;