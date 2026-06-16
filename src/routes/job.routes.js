import express from "express";
import {
    getAllJobs,
    getJobById,
    getRecommendedJobs,
} from "../controllers/job.controller.js";

const router = express.Router();
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.get("/recommended", getRecommendedJobs);

export default router;
