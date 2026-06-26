import express from "express";
import { updateProfile } from "../controllers/user.controller.js";
import authMiddle from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/profile", authMiddle, updateProfile);

export default router;
