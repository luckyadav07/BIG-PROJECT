import User from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// logged-in user apna name aur skills update kar sakta hai
export const updateProfile = asyncHandler(async (req, res) => {
    const { name, skills } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (name !== undefined) {
        if (!name.trim()) {
            throw new ApiError(400, "Name cannot be empty");
        }
        user.name = name.trim();
    }

    if (skills !== undefined) {
        if (!Array.isArray(skills)) {
            throw new ApiError(400, "Skills must be an array");
        }
        user.skills = skills.map((skill) => String(skill).trim()).filter(Boolean);
    }

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    return res.status(200).json(
        new ApiResponse(200, updatedUser, "Profile updated successfully")
    );
});
