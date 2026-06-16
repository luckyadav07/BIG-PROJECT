import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import connectdb from "./config/db.js";
import jobRoutes from "./src/routes/job.routes.js";
import authRouter from "./routes/auth.routes.js"
import adminRouter from "./routes/admin.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use("/api/jobs", jobRoutes);

app.use(helmet());                              // hides server info from hackers
app.use(cors());                                // allows frontend to talk to backend
app.use(morgan("dev"));                         // logs every request in terminal
app.use(express.json());                        // reads JSON data from requests
app.use(express.urlencoded({ extended: true })); // reads form data from requests
app.use("/api/auth",authRouter)
app.use("/api/admin",adminRouter)

app.get("/", (req, res) => {
    res.json({ message: "YEAH BABY SERVER IS RUNNING.........." })
})

connectdb().then(() => {
    app.listen(PORT, () => {
        console.log(`SERVER RUNNING ka LIYE YHA pa jayye ${PORT}`)
    })
})