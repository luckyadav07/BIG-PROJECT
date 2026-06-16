import express from "express";
import {
    getAllJobs,
    getJobById,
    getRecommendedJobs,
} from "../controllers/job.controller.js";

import authMiddle from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/", getAllJobs);
router.get("/recommended", authMiddle,getRecommendedJobs); //<- moves UP
router.get("/:id", getJobById);  //<- moved Down


export default router;
