import Campaign from "../models/campaign.models.js";
import jobQueue from "../queues/jobQueue.js";

const createCampaign = async (req, res) => {
    try {
        // frontend se data lena
        const { template, recruiterEmails, schedule } = req.body;

        // template empty nahi hona chahiye
        if (!template || !template.trim()) {
            return res.status(400).json({
                message: "template is required"
            });
        }

        // recruiter emails required hai
        if (!recruiterEmails) {
            return res.status(400).json({
                message: "Recruiter emails are required"
            });
        }

        // recruiterEmails array hona chahiye
        if (!Array.isArray(recruiterEmails)) {
            return res.status(400).json({
                message: "Recruiter emails must be an array"
            });
        }

        // kam se kam ek email hona chahiye
        if (recruiterEmails.length === 0) {
            return res.status(400).json({
                message: "At least one recruiter email is required"
            });
        }

        // basic email validation
        if (recruiterEmails.some(email => !email || !email.includes("@"))) {
            return res.status(400).json({
                message: "Please provide valid recruiter emails"
            });
        }

        // campaign database me save karna
        const campaign = await Campaign.create({
            userId: req.user._id,
            template,
            recruiterEmails,
            schedule
        });

        // BullMQ queue me job add karna
        // taaki future me background me emails send kar sake
        await jobQueue.add("campaign-email", {
            campaignId: campaign._id,
            template,
            recruiterEmails
        });

        return res.status(201).json({
            message: "Campaign created successfully",
            campaign
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// logged in user ke saare campaigns nikalna
const getUserCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({
            userId: req.user._id
        });

        return res.status(200).json({
            campaigns
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// campaign delete karna
const deleteCampaign = async (req, res) => {
    try {
        const { id } = req.params;

        // campaign find karna
        const campaign = await Campaign.findById(id);

        // campaign exist nahi karta
        if (!campaign) {
            return res.status(404).json({
                message: "Campaign not found"
            });
        }

        // dusre user ka campaign delete nahi kar sakta
        if (campaign.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        // campaign delete
        await campaign.deleteOne();

        return res.status(200).json({
            message: "Campaign deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export {
    createCampaign,
    getUserCampaigns,
    deleteCampaign
};