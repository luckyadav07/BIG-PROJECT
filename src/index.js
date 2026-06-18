import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import connectdb from "./config/db.js";
import jobRoutes from "./routes/job.routes.js";
import authRouter from "./routes/auth.routes.js"
import adminRouter from "./routes/admin.routes.js"
import notificationRouter from "./routes/notification.routes.js";
import campaignRoutes from "./routes/campaign.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import jobQueue from "./queues/jobQueue.js";

import "./workers/jobWorker.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;

// middlewares first

app.use(helmet());                              // hides server info from hackers
app.use(cors());                                // allows frontend to talk to backend
app.use(morgan("dev"));                         // logs every request in terminal
app.use(express.json());                        // reads JSON data from requests
app.use(express.urlencoded({ extended: true })); // reads form data from requests

// routes after
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter)
app.use("/api/notifications", notificationRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/campaigns", campaignRoutes);


app.get("/", async (req, res) => {
    await jobQueue.add("test-job", {
        name: "Narendar Damodardas Modi",
        message: "BullMQ Working"
    });
    res.json({
        message: "Job Added To Queue"
    });

});

// global errror handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went worng";

    res.status(statusCode).json({
        statusCode,
        message,
        success: false,
        errors: err.errors || []
    });
});

connectdb().then(() => {
    app.listen(PORT, () => {
        console.log(`SERVER RUNNING ka LIYE YHA pa jayye <--> nhi jaayege  ${PORT}`)
    })
})