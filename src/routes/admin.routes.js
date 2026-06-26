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
} from "../controllers/admin.controller.js";

// 1. IMPORT YOUR MIDDLEWARE
import authMiddle from "../middleware/auth.middleware.js";

// 2. IMPORT YOUR NEW MIDDLEWARE
import isAdmin from "../middleware/isAdmin.middleware.js";
const router = express.Router();


// 3. APPLY MIDDLEWARE TO ALL ROUTES IN THIS FILE
// This line ensures every route below it requires a valid token

// First check if they are logged in (authMiddle), THEN check if they are an admin (isAdmin)
router.use(authMiddle,isAdmin);
router.get("/dashboard", getDashboardStats);

// User Routes 
router.get("/users", getAllUsers)      // was getallusers
router.get("/users/:id", getUserById)  // was getuserbyid
router.put("/users/:id", updateUser)   // was updateuser
router.delete("/users/:id", deleteUser) // was deleteuser

// Job Routes
router.post("/jobs", createJobs)       
router.get("/jobs", getAllJobs)
router.get("/jobs/:id", getJobById)
router.put("/jobs/:id", updateJob)
router.delete("/jobs/:id", deleteJob)


export default router;