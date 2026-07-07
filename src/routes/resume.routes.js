import express from "express"
import {
    uploadResume,
    getLatestAnalysis,
    getAllAnalyses,
    deleteAnalysis,
} from "../controllers/resume.controller.js"
import { upload } from "../middleware/multer.middleware.js"
import authMiddle from "../middleware/auth.middleware.js"

const router = express.Router()

// Upload and analyze resume (protected route)
router.post("/upload", authMiddle, upload.single("resume"), uploadResume)

// Get latest analysis (protected route)
router.get("/latest", authMiddle, getLatestAnalysis)

// Get all analyses (protected route)
router.get("/all", authMiddle, getAllAnalyses)

// Delete analysis (protected route)
router.delete("/:id", authMiddle, deleteAnalysis)

export default router