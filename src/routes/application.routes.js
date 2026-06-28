import express from "express";
import authMiddle from "../middleware/auth.middleware.js";
import {
    applyJob,
    getUserApplications,
    withdrawApplication,
    getAllApplications,
    updateApplicationStatus,
} from "../controllers/application.controller.js";
import isAdmin from "../middleware/isAdmin.middleware.js";

const router = express.Router();

// All routes require login
router.use(authMiddle);

// Apply for a job
router.post("/", applyJob);

// Get logged-in user's applications
router.get("/", getUserApplications);

// Withdraw an application
router.delete("/:id", withdrawApplication);

router.get(
    "/admin",
    isAdmin,
    getAllApplications
);

router.patch(
    "/:id/status",
    isAdmin,
    updateApplicationStatus
);

export default router;