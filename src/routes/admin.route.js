import express from "express";

import { getAllUsers, getUserById, deleteuser, updateUser, createJobs, getAllJobs, getJobById, updateJob, deleteJob} from "../controllers/admin.controller.js";

const router = express.Router();

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
export default router;
