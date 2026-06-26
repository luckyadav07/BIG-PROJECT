// APPLICATION CONTROLLER
// applyJob → user applies to a job, checks if already applied, creates application
// getUserApplications → gets all applications of logged in user
// updateApplicationStatus → updates application status (Applied/Interview/Offer/Rejected)

import Application from "../models/applications.models.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"


// Apply to a job
export const applyJob = asyncHandler(async (req, res) => {

    const { jobId } = req.body
    const userId = req.user._id

    // Check if already applied
    const existingApplication = await Application.findOne({ userId, jobId })
    if (existingApplication) {
        throw new ApiError(400, "Already applied to this job")
    }

    // Create new application
    const newApplication = await Application.create({
        userId,
        jobId,
        status: "Applied"
    })

    res.status(201).json(
        new ApiResponse(201, newApplication, "Applied successfully")
    )

})


// Get all applications of logged in user
export const getUserApplications = asyncHandler(async (req, res) => {

    const applications = await Application.find({
    userId: req.user._id
    }).populate(
    "jobId",
    "title company location"
    ).sort({ createdAt: -1 });
    // .find() returns empty array [] not null — so check length not !applications
    if (applications.length === 0) {
        throw new ApiError(404, "No applications found")
    }

    res.status(200).json(
        new ApiResponse(200, applications, "Applications fetched successfully")
    )

})


// Update application status
export const updateApplicationStatus = asyncHandler(async (req, res) => {

    const { id } = req.params
    const { status } = req.body
    const allowedStatuses = ["Saved", "Applied", "Interview", "Offer", "Rejected"]

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admins can update application status")
    }

    if (!allowedStatuses.includes(status)) {
        throw new ApiError(400, "Invalid application status")
    }

    // findByIdAndUpdate returns null if not found
    const application = await Application.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
    )

    if (!application) {
        throw new ApiError(404, "Application not found")
    }

    res.status(200).json(
        new ApiResponse(200, application, "Status updated successfully")
    )

})
