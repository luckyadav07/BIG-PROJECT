import mongoose from "mongoose";
import Notification from "../models/notifications.models.js"
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

//get all notifications of logged in user

export const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({ userId: req.user._id });
    
    res.status(200).json(
        new ApiResponse(200, notifications, "Notifications fetched successfully")
    );
});

//mark a notification as read
export const markAsRead = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Notification ID");
    }

    const notification = await Notification.findById(id);

    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    // check if this notification belongs to logged in user
    if (notification.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only update your own notifications");
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json(
        new ApiResponse(200, notification, "Notification marked as read")
    );
});

// delete a notification
export const deleteNotification = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Notification ID");
    }

    const notification = await Notification.findById(id)
        ;
    
    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    if (notification.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only delete your own notification");
    }

    await notification.deleteOne();

    res.status(200).json(
        new ApiResponse(200, {}, "Notification  deleted successfully")
    );
});