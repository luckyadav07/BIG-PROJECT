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


export const getRecommendedJobs = asyncHandler(async (req, res) => {

    const jobs = await Job.find();

    const resumeSkills = [
        "React",
        "Node.js",
        "MongoDB",
        "JavaScript"
    ];

    const recommendations = jobs.map(job => {

        const jobSkills = job.skills || [];

        const matchedSkills = jobSkills.filter(skill =>
            resumeSkills.some(
                resumeSkill =>
                    resumeSkill.toLowerCase() === skill.toLowerCase()
            )
        );

        const missingSkills = jobSkills.filter(skill =>
            !resumeSkills.some(
                resumeSkill =>
                    resumeSkill.toLowerCase() === skill.toLowerCase()
            )
        );

        const matchScore =
            jobSkills.length === 0
                ? 0
                : Math.round(
                      (matchedSkills.length / jobSkills.length) * 100
                  );

        return {
            ...job.toObject(),
            matchScore,
            matchedSkills,
            missingSkills,
        };
    });

    recommendations.sort(
        (a, b) => b.matchScore - a.matchScore
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            recommendations,
            "Recommended jobs fetched successfully"
        )
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

