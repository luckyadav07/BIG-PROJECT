import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import  asyncHandler  from "../utils/asyncHandler.js";
import  ApiError  from "../utils/ApiError.js";

const authMiddle = asyncHandler(async (req, res, next) => {
    // 1. Token nikalna (Bearer <token>)
    const token = req.headers.authorization?.split(" ")[1];

    console.log("TOKEN:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    if (!token) {
        throw new ApiError(401, "No token, access nhi milegaa laadle");
    }

    try {
        // 2. Token verify karna
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. User find karna (password hata ke)
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        // 4. Request me user daalna taaki aage ke controllers isko use kar sake
        req.user = user;
        
        // 5. Agle function (controller) ko call karna
        next();

    } catch (error) {
        // Agar token expire ho gaya ya galat hai
        throw new ApiError(401, "Invalid or expired token");
    }
});

export default authMiddle;