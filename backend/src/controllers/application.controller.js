// APPLICATION CONTROLLER
// applyJob → user applies to a job, checks if already applied, creates application
// getUserApplications → gets all applications of logged in user
// updateApplicationStatus → updates application status (Applied/Interview/Offer/Rejected)

import Application from "../models/applications.models.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import Job from "../models/job.models.js";


// Apply to a job
export const applyJob = asyncHandler(async (req, res) => {

    const { jobId } = req.body;
    console.log("Received jobId:", jobId);

    const job = await Job.findById(jobId);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }
    const userId = req.user._id
    console.log("User:", userId);


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
    

    return res.status(200).json(
        new ApiResponse(200, applications, "Applications fetched successfully")
    )

})


export const withdrawApplication = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const application = await Application.findOneAndDelete({
        _id: id,
        userId: req.user._id,
    });

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Application withdrawn successfully"
        )
    );
});

export const getAllApplications = asyncHandler(async (req, res) => {

    const applications = await Application.find()
        .populate("userId", "name email")
        .populate("jobId", "title company location")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            applications,
            "Applications fetched successfully"
        )
    );
});


export const updateApplicationStatus = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
        "Applied",
        "Shortlisted",
        "Interview",
        "Accepted",
        "Rejected",
    ];

    if (!validStatuses.includes(status)) {
        throw new ApiError(400, "Invalid application status");
    }

    const application = await Application.findById(id);

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    application.status = status;

    await application.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            application,
            "Application status updated successfully"
        )
    );
});