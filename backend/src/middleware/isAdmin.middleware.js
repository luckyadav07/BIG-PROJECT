import ApiError from "../utils/ApiError.js";

const isAdmin = (req, res, next) => {
    // authMiddle already sets req.user using the token
    if (req.user && req.user.role === "admin") {
        next(); // User is admin, allow them to continue
    } else {
        // User is not an admin, block them
        next(new ApiError(403, "Access Denied: Admin resources only."));
    }
};

export default isAdmin;