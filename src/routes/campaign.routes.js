import express from "express";

import {
    createCampaign, getUserCampaigns, deleteCampaign
} from "../controllers/campaign.controller.js";

import authMiddle from "../middleware/auth.middleware.js";

const router = express.Router();

// all routes are protected

router.post("/", authMiddle, createCampaign);
router.get("/", authMiddle, getUserCampaigns);
router.delete("/:id", authMiddle, deleteCampaign);

export default router;