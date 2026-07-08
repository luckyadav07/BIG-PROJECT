import express from "express"
import {
    analyzeResume,
    getLatestAnalysis,
    getAllAnalyses,
    deleteAnalysis,
} from "../controllers/resume.controller.js"
import authMiddle from "../middleware/auth.middleware.js"

const router = express.Router()

// Main endpoint — Analyze parsed resume JSON
// POST /api/resume/analyze
// Body: { resumeData: { name, email, skills, experience, ... } }
router.post("/analyze", authMiddle, analyzeResume)

// Get latest analysis
router.get("/latest", authMiddle, getLatestAnalysis)

// Get all analyses
router.get("/all", authMiddle, getAllAnalyses)

// Delete analysis
router.delete("/:id", authMiddle, deleteAnalysis)

export default router