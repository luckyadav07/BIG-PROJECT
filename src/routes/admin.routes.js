import express from "express";

import { getAllUsers, getUserById, deleteUser, updateUser, createJobs, getAllJobs, getJobById, updateJob, deleteJob } from "../controllers/admin.controller.js"

const router = express.Router();

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