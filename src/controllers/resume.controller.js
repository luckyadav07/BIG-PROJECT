import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import ResumeAnalysis from "../models/resumeAnalysis.models.js"
import { analyzeResumeWithAI } from "../services/openaiService.js"
import { createRequire } from "module"

const require = createRequire(import.meta.url)
const pdfParse = require("pdf-parse")

// Upload resume PDF and analyze with AI
export const uploadResume = asyncHandler(async (req, res) => {
    // Check if file exists
    if (!req.file) {
        throw new ApiError(400, "Resume file is required")
    }

    const userId = req.user.id

    try {
        // Parse PDF file
        const pdfData = await pdfParse(req.file.buffer)
        const resumeText = pdfData.text
        const numPages = pdfData.numpages

        // Extract resume data from text (structured format)
        const resumeData = extractResumeData(resumeText)

        // Analyze resume with OpenAI
        const aiAnalysis = await analyzeResumeWithAI(resumeData)

        // Save analysis to MongoDB
        const savedAnalysis = await ResumeAnalysis.create({
            userId,
            resumeData: {
                text: resumeText,
                pages: numPages,
                ...resumeData,
            },
            analysis: aiAnalysis,
            aiModel: "gpt-3.5-turbo",
            analysisScore: aiAnalysis.analysisScore,
        })

        // Return response
        return res.status(201).json(
            new ApiResponse(201, {
                pdfInfo: {
                    text: resumeText,
                    pages: numPages,
                },
                analysis: aiAnalysis,
                savedAnalysisId: savedAnalysis._id,
            }, "Resume analyzed successfully")
        )
    } catch (error) {
        console.error("Resume Analysis Error:", error)
        throw new ApiError(500, `Failed to analyze resume: ${error.message}`)
    }
})

// Get latest analysis for user
export const getLatestAnalysis = asyncHandler(async (req, res) => {
    const userId = req.user.id

    // Find latest analysis
    const analysis = await ResumeAnalysis.findOne({ userId }).sort({ createdAt: -1 })

    if (!analysis) {
        throw new ApiError(404, "No analysis found for this user")
    }

    res.status(200).json(
        new ApiResponse(200, analysis, "Analysis retrieved successfully")
    )
})

// Get all user analyses (paginated)
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
        }, "All analyses retrieved successfully")
    )
})

// Delete analysis
export const deleteAnalysis = asyncHandler(async (req, res) => {
    const { id } = req.params
    const userId = req.user.id

    // Find and verify ownership
    const analysis = await ResumeAnalysis.findById(id)

    if (!analysis) {
        throw new ApiError(404, "Analysis not found")
    }

    if (analysis.userId.toString() !== userId) {
        throw new ApiError(403, "You can only delete your own analyses")
    }

    await ResumeAnalysis.findByIdAndDelete(id)

    res.status(200).json(
        new ApiResponse(200, null, "Analysis deleted successfully")
    )
})

// Helper function to extract structured data from resume text
// This extracts name, email, skills, etc. from the parsed PDF text
const extractResumeData = (resumeText) => {
    // Extract email
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/
    const emailMatch = resumeText.match(emailRegex)
    const email = emailMatch ? emailMatch[0] : ""

    // Extract phone (basic pattern)
    const phoneRegex = /(\+?1?\d{9,15})/
    const phoneMatch = resumeText.match(phoneRegex)
    const phone = phoneMatch ? phoneMatch[0] : ""

    // Extract skills (common tech skills)
    const commonSkills = [
        "JavaScript", "React", "Node.js", "Python", "Java", "C++", "SQL",
        "MongoDB", "PostgreSQL", "AWS", "Docker", "Kubernetes", "Git",
        "HTML", "CSS", "Vue", "Angular", "TypeScript", "GraphQL",
        "REST API", "Microservices", "Machine Learning", "Data Science",
    ]

    const foundSkills = commonSkills.filter(skill =>
        resumeText.toLowerCase().includes(skill.toLowerCase())
    )

    return {
        text: resumeText,
        email,
        phone,
        skills: foundSkills,
        experience: extractSection(resumeText, "experience"),
        education: extractSection(resumeText, "education"),
        projects: extractSection(resumeText, "projects"),
        certifications: extractSection(resumeText, "certifications"),
    }
}

// Helper to extract specific sections from resume text
const extractSection = (text, sectionName) => {
    const regex = new RegExp(`${sectionName}[:\s]*([\s\S]{0,500})`, "i")
    const match = text.match(regex)
    return match ? match[1].trim() : ""
}

export default {
    uploadResume,
    getLatestAnalysis,
    getAllAnalyses,
    deleteAnalysis,
}