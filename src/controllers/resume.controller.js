import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import ResumeAnalysis from "../models/resumeAnalysis.models.js"
import { analyzeResumeWithAI } from "../services/openaiService.js"

// Main endpoint — Analyze already-parsed resume JSON
// This is the core feature as per assignment
export const analyzeResume = asyncHandler(async (req, res) => {
    const { resumeData } = req.body
    const userId = req.user.id

    // Validate input
    if (!resumeData) {
        throw new ApiError(400, "Resume data (parsed JSON) is required")
    }

    if (typeof resumeData !== "object") {
        throw new ApiError(400, "Resume data must be a JSON object")
    }

    if (Object.keys(resumeData).length === 0) {
        throw new ApiError(400, "Resume data cannot be empty")
    }

    if (!resumeData.skills || !Array.isArray(resumeData.skills)) {
        throw new ApiError(400, "Skills array is required")
    }

    try {
        // Call OpenAI to analyze resume
        const analysis = await analyzeResumeWithAI(resumeData)

        // Save to MongoDB
        const savedAnalysis = await ResumeAnalysis.create({
            userId,
            resumeData,
            analysis,
            aiModel: process.env.GROQ_MODEL
        })

        res.status(201).json(
            new ApiResponse(201, {
                analysis,
                analysisId: savedAnalysis._id,
            }, "Resume analyzed successfully")
        )
    } catch (error) {
        console.error("Analysis Error:", error)
        throw new ApiError(500, `Resume analysis failed: ${error.message}`)
    }
})

// Get latest analysis
export const getLatestAnalysis = asyncHandler(async (req, res) => {
    const userId = req.user.id

    const analysis = await ResumeAnalysis.findOne({ userId }).sort({ createdAt: -1 })

    if (!analysis) {
        throw new ApiError(404, "No analysis found")
    }

    res.status(200).json(
        new ApiResponse(200, analysis, "Analysis retrieved")
    )
})

// Get all analyses (paginated)
export const getAllAnalyses = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const { page = 1, limit = 10 } = req.query

    const analyses = await ResumeAnalysis.find({ userId })
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)

    const total = await ResumeAnalysis.countDocuments({ userId })

    res.status(200).json(
        new ApiResponse(200, {
            analyses,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
        }, "Analyses retrieved")
    )
})

// Delete analysis
export const deleteAnalysis = asyncHandler(async (req, res) => {
    const { id } = req.params
    const userId = req.user.id

    const analysis = await ResumeAnalysis.findById(id)

    if (!analysis) {
        throw new ApiError(404, "Analysis not found")
    }

    if (analysis.userId.toString() !== userId) {
        throw new ApiError(403, "Unauthorized")
    }

    await ResumeAnalysis.findByIdAndDelete(id)

    res.status(200).json(
        new ApiResponse(200, null, "Analysis deleted")
    )
})

export default {
    analyzeResume,
    getLatestAnalysis,
    getAllAnalyses,
    deleteAnalysis,
}