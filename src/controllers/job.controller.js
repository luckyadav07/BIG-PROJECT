import mongoose from "mongoose";
import Job from "../models/job.models.js";
import User from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// saari job nikal ke dega jab frontend request karega
export const getAllJobs = asyncHandler(async (req, res) => {

    const jobs = await Job.find();
    res.status(200).json(
        new ApiResponse(200, jobs, "Jobs fetched successfully")
    );
});

// single job nikal ke dega jab frontend request karega

export const getJobById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    // check if id is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Job ID");
    }

    const job = await Job.findById(id);
    if (!job) {
        throw new ApiError(404, "Job not found");
    }
    res.status(200).json(
        new ApiResponse(200, job, "JOb fetched successfully")
    );
});

// recommended jobs nikal ke dega jab frontend request karega 

export const getRecommendedJobs = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const jobs = await Job.find();
    const recommendedJobs = jobs
        .map((job) => {
            const score = job.skills.filter((skill) =>
                user.skills.includes(skill)
            ).length;

            return {
                ...job.toObject(),
                score,
            };
        })
        .sort((a, b) => b.score - a.score);

    res.status(200).json(
        new ApiResponse(200, recommendedJobs, "Recommended jobs fetched successfully")
    );

});