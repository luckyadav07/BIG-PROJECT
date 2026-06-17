import Campaign from "../models/campaign.models.js";

const createCampaign = async (req, res) => {
    try {
        const {template, recruiterEmails, schedule} = req.body

        if (!template || !template.trim()) {
            return res.status(400).json({
                message: "template is required"})
        } 


        if (!recruiterEmails) {
            return res.status(400).json({
                message: "Recruiter emails are required"
            })
        }


        if (!Array.isArray(recruiterEmails)) {
            return res.status(400).json({
                message: "Recruiter emails must be an array"
            })
        }


        if (recruiterEmails.length === 0) {
            return res.status(400).json({
                message: "At least one recruiter email is required"
            })
        }


        if (recruiterEmails.some(email => !email || !email.includes("@"))) {
            return res.status(400).json({
                message: "Please provide valid recruiter emails"
            })
        }

        // extracting data from schema

        const campaign = await Campaign.create({
            userId: req.user._id,
            template,
            recruiterEmails,
            schedule
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
}

// Get all the template and recruiter mail to send by user

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
}

// delete campaign

const deleteCampaign = async (req, res) => {
    try {
        const { id } = req.params;

        const campaign = await Campaign.findById(id);

        if (!campaign) {
            return res.status(404).json({
                message: "Campaign not found"
            });
        }

        if (campaign.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        // you can also use this one to delete
        // await Campaign.findByIdAndDelete(id);

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


export {createCampaign, getUserCampaigns, deleteCampaign}