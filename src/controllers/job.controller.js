import Job from "../models/job.models.js";
import User from "../models/user.model.js";

// saari job nikal ke dega jab frontend request karega
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json({
            success: true,
            jobs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// single job nikal ke dega jab frontend request karega

export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }
        res.status(200).json({
            success: true,
            job,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// recommended jobs nikal ke dega jab frontend request karega 

export const getRecommendedJobs = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
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

        res.status(200).json({
            success: true,
            jobs: recommendedJobs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};