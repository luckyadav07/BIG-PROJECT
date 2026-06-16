import express from "express";
import {
    getNotifications,
    markAsRead,
    deleteNotification,
} from "../controllers/notification.controller.js";
import authMiddle from "../middleware/auth.middleware.js";

const router = express.Router();

// all routes are protected - must be logged in

router.get("/", authMiddle, getNotifications);
router.put("/:id", authMiddle, markAsRead);
router.delete("/:id", authMiddle, deleteNotification);

export default router;