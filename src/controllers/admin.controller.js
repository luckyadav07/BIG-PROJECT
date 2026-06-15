import User from '../models/user.model.js';
import Job from "../models/job.models.js";

// sab user nikal ke dega
export const getallusers = async(req,res)=>{
  try {
        const users = await User.find().select("-password");
        res.status(200).json({ success: true, users});
    } catch (error) {
        res.status(500).json({ success: false,message: error.message });
    }
};

// specific user nikal ke dega

export const getuserbyid = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id).select("-password");
         if (!user) {
            return res.status(404).json({success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user});
    }catch (error) {
        res.status(500).json({ success: false,message: error.message });
    }
};

// user delete karega
export const deleteuser = async(req,res)=>{
try{
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
                success: false,
                message: "User not found"
            });
    }
    await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true,  message: "User deleted successfully"});
}catch (error) {
    res.status(500).json({ success: false,message: error.message });
}
}


//To ye API basically user ko admin banana ya admin ko user banana ka kaam kar rahi hai


export const updateuser = async(req,res)=>{
try{
    const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
         const { role } = req.body;
  if(role !== "user" && role !== "admin"){
    return res.status(400).json({
        success:false,
        message:"Invalid role"
    });
}
    user.role = role;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Role updated successfully",
            user
        });
}   catch (error) {
    res.status(500).json({ success: false,message: error.message });
}
}



// create job ka API
export const createjobs = async(req,res)=>{
    try {
        const { title, company, location, skills, stipend, deadline, duration, jobUrl } = req.body;
         if (!title || !company || !jobUrl) {
            return res.status(400).json({
                success: false,
                message: "Title, company and jobUrl are required"
            });
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
        res.status(201).json({
            success: true,
            message: "Job created successfully",
            job
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();

        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// saari jobs nikal ke dega
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }
        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// job ko update karne ka kaam karega ye API

export const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job: updatedJob
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// job ko delete karne ka kaam karega ye API

export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Job deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

