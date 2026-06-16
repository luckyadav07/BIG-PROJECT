// APPLICATION CONTROLLER
// applyJob → user applies to a job, checks if already applied, creates application
// getUserApplications → gets all applications of logged in user
// updateApplicationStatus → updates application status (Applied/Interview/Offer/Rejected)

import Application from "../models/applications.models.js"

// Apply to a job
export const applyJob = async (req, res) => {
    try {

        const { jobId } = req.body


        const userId = req.user._id


        const existingApplication = await Application.findOne({ userId, jobId })
        if(existingApplication) {
            return res.status(400).json({
                success: false,
                message: "Already applied to this job"
            })
        }


        const newapplication = await Application.create({
            userId,
            jobId,
            status: "Applied"
        })


        return res.status(201).json({
            success: true,
            message: "Applied successfully",
            application: newapplication
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


export const getUserApplications = async (req, res) => {
    try {

        const applications = await Application.find({ userId: req.user._id })


        if(!applications) {
            return res.status(404).json({
                success: false,
                message: "No application found"
            })
        }


        return res.status(200).json({
            success: true,
            applications: applications
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// Update application status
export const updateApplicationStatus = async (req, res) => {
    try {

        const { id } = req.params


        const { status } = req.body


        const application = await Application.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        )


        if(!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            })
        }


        return res.status(200).json({
            success: true,
            message: "Status updated successfully",
            application: application
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export { applyJob, getUserApplications, updateApplicationStatus }