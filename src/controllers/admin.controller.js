import User from '../models/user.models.js';
import Job from "../models/job.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// sab user nikal ke dega
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");

    return res.status(200).json(
        new ApiResponse(200, users, "Users fetched successfully")
    );
});

// specific user nikal ke dega
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, user, "User fetched successfully")
    );
});

// user delete karega
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json(
        new ApiResponse(200, null, "User deleted successfully")
    );
});

// To ye API basically user ko admin banana ya admin ko user banana ka kaam kar rahi hai
export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const { role } = req.body;

    if (role !== "user" && role !== "admin") {
        throw new ApiError(400, "Invalid role");
    }

    user.role = role;
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, user, "Role updated successfully")
    );
});

// create job ka API
export const createJobs = asyncHandler(async (req, res) => {
    const { title, company, location, skills, stipend, deadline, duration, jobUrl } = req.body;

    if (!title || !company || !jobUrl) {
        throw new ApiError(400, "Title, company and jobUrl are required");
    }

    const job = await Job.create({
        title,
        company,
        location,
        skills,
        stipend,
        deadline,
        duration,
        jobUrl
    });

    return res.status(201).json(
        new ApiResponse(201, job, "Job created successfully")
    );
});

// saari jobs nikal ke dega
export const getAllJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find();

    return res.status(200).json(
        new ApiResponse(200, { count: jobs.length, jobs }, "Jobs fetched successfully")
    );
});

// specific job nikal ke dega
export const getJobById = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    return res.status(200).json(
        new ApiResponse(200, job, "Job fetched successfully")
    );
});

// job ko update karne ka kaam karega ye API
export const updateJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    const updatedJob = await Job.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    return res.status(200).json(
        new ApiResponse(200, updatedJob, "Job updated successfully")
    );
});

// job ko delete karne ka kaam karega ye API
export const deleteJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    await Job.findByIdAndDelete(req.params.id);

    return res.status(200).json(
        new ApiResponse(200, null, "Job deleted successfully")
    );
});