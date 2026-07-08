import bcrypt from "bcryptjs"
import User from "../models/user.models.js"
import jwt from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import Activity from "../models/activity.models.js";

const register = asyncHandler(async (req, res) => {

    // Step 1 - get name, email, password from request body
    const { name, email, password } = req.body

    // Step 2 - validate all fields are present
    if (!name || !email || !password) {
        throw new ApiError(400, "All fields required")
    }

    // Step 3 - check if user already exists in database
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new ApiError(400, "User already exists")
    }

    // Step 4 - hash the password before saving
    const hashedpassword = await bcrypt.hash(password, 10)

    // Step 5 - create new user in MongoDB
    const user = await User.create({ name, email, password: hashedpassword })

    await Activity.create({
    type: "USER_REGISTERED",
    description: `${user.name} registered`
});

    const userWithoutPassword = await User.findById(user._id).select("-password")

    // Step 6 - generate JWT token
    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    // Step 7 - send success response
    res.status(201).json(
        new ApiResponse(
            201,
            {
                token,
                user: userWithoutPassword,
            },
            "User registered successfully"
        )
    );

})


const login = asyncHandler(async (req, res) => {

    // Step 1 - get email and password from request body
    const { email, password } = req.body

    // Step 2 - validate fields
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required")
    }

    // Step 3 - find user in database by email
    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    // Step 4 - compare entered password with hashed password in DB
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials")
    }

    // Step 5 - generate JWT token
    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    // Step 6 - get user without password
    const userWithoutPassword = await User.findById(user._id).select("-password")

    // Step 7 - send success response
    res.status(200).json(
        new ApiResponse(200, { token, user: userWithoutPassword }, "Login successful")
    )

})
const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(
        new ApiResponse(
            200,
            { user },
            "Current user fetched successfully"
        )
    );
});

export { register, login, getCurrentUser }