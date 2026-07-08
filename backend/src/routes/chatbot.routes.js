import express from "express";
import { chatWithCoach } from "../controllers/chatbot.controller.js";

const router = express.Router();

router.post("/", chatWithCoach);

export default router;