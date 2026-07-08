import Campaign from "../models/campaign.models.js";
import jobQueue from "../queues/jobQueue.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// campaign create karna
const createCampaign = asyncHandler(async (req, res) => {
    // frontend se data lena
    const { template, recruiterEmails, schedule } = req.body;

    // template empty nahi hona chahiye
    if (!template || !template.trim()) {
        throw new ApiError(400, "Template is required");
    }

    // recruiter emails required hai
    if (!recruiterEmails) {
        throw new ApiError(400, "Recruiter emails are required");
    }

    // recruiterEmails array hona chahiye
    if (!Array.isArray(recruiterEmails)) {
        throw new ApiError(400, "Recruiter emails must be an array");
    }

    // kam se kam ek email hona chahiye
    if (recruiterEmails.length === 0) {
        throw new ApiError(400, "At least one recruiter email is required");
    }

    // basic email validation
    if (recruiterEmails.some(email => !email || !email.includes("@"))) {
        throw new ApiError(400, "Please provide valid recruiter emails");
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

    return res.status(201).json(
        new ApiResponse(201, campaign, "Campaign created successfully")
    );
});

// logged in user ke saare campaigns nikalna
const getUserCampaigns = asyncHandler(async (req, res) => {
    const campaigns = await Campaign.find({
        userId: req.user._id
    });

    return res.status(200).json(
        new ApiResponse(200, campaigns, "Campaigns fetched successfully")
    );
});

// campaign delete karna
const deleteCampaign = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // campaign find karna
    const campaign = await Campaign.findById(id);

    // campaign exist nahi karta
    if (!campaign) {
        throw new ApiError(404, "Campaign not found");
    }

    // dusre user ka campaign delete nahi kar sakta
    if (campaign.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized access to delete this campaign");
    }

    // campaign delete
    await campaign.deleteOne();

    return res.status(200).json(
        new ApiResponse(200, null, "Campaign deleted successfully")
    );
});

export {
    createCampaign,
    getUserCampaigns,
    deleteCampaign
};