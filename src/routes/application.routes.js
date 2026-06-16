import express from "express"
import { applyJob, getUserApplications, updateApplicationStatus } from "../controllers/application.controller.js"
import authMiddle from "../middleware/auth.middleware.js"

const router = express.Router()

// all routes are protected - user must be logged in
router.post("/", authMiddle, applyJob)
router.get("/", authMiddle, getUserApplications)
router.put("/:id", authMiddle, updateApplicationStatus)

export default router