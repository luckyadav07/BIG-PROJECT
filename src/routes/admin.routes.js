import express from "express";

import {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  createJobs,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getDashboardStats,
  getRecentActivities,
  getAllApplications,
  updateApplicationStatus,
  getAnalytics,
  getStats,
} from "../controllers/admin.controller.js";

import authMiddle from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/isAdmin.middleware.js";

const router = express.Router();

// Protect all admin routes
router.use(authMiddle, isAdmin);

// Dashboard
router.get("/dashboard", getDashboardStats);
router.get("/activities", getRecentActivities);
router.get("/stats", getStats);
router.get("/analytics", getAnalytics);

// User Routes
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Job Routes
router.post("/jobs", createJobs);
router.get("/jobs", getAllJobs);
router.get("/jobs/:id", getJobById);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

// Application Routes
router.get("/applications", getAllApplications);
router.put("/applications/:id/status", updateApplicationStatus);

export default router;