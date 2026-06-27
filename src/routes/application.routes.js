import express from "express";
import {
    applyJob,
    getUserApplications,
    withdrawApplication,
} from "../controllers/application.controller.js";
import authMiddle from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes require login
router.use(authMiddle);

// Apply for a job
router.post("/", applyJob);

// Get logged-in user's applications
router.get("/", getUserApplications);

// Withdraw an application
router.delete("/:id", withdrawApplication);

export default router;