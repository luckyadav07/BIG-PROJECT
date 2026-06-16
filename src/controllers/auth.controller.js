import bcrypt from "bcryptjs"
import User from "../models/user.models.js"
import jwt from "jsonwebtoken"

const register = async (req, res) => {

    // Step 1 - get name, email, password from request body
    const { name, email, password } = req.body

    // Step 2 - check if user already exists in database
    const existingUser = await User.findOne({ email })
    if(existingUser) {
        // if exists - stop here and send error
        return res.status(400).json({ message: "User already exist... tuu fraud h" })
    }

    // Step 3 - validate all fields are present
    if(!name || !email || !password) {
        return res.status(400).json({ message: "All FIELDS REQUIRED" })
    }

    // Step 4 - hash the password before saving
    // 10 = salt rounds (how many times password is scrambled)
    // never save raw password in database
    const hashedpassword = await bcrypt.hash(password, 10)

    // Step 5 - create new user in MongoDB
    // password field stores the hashed version not original
    const user = await User.create({ name, email, password: hashedpassword })

    const userWithoutPassword = await User.findById(user._id).select("-password")

    // Step 6 - send success response
    // 201 = created (new resource was created)
    res.status(201).json({
        message: "User registered successfully",
        user: userWithoutPassword
    })

}


const login = async(req, res) => {

    // Step 1 - get email and password from request body
    const { email, password } = req.body

    // Step 2 - find user in database by email
    const user = await User.findOne({ email })

    // Step 3 - if user not found send error
    if(!user) {
        return res.status(404).json({ message: "User not found" })
    }

    // Step 4 - compare entered password with hashed password in DB
    // bcrypt.compare returns true or false
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    // Step 5 - if password wrong send error
    // 401 = unauthorized
    if(!isPasswordCorrect) {
        return res.status(401).json({ message: "Wrong password baby" })
    }

    // Step 6 - generate JWT token
    // token stores user id and role inside it
    // expires in 1 day
    const token = jwt.sign(
        { 
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    // Step 7 - send token and user data back
    // 200 = success
    res.status(200).json({
        message: "Login successful",
        token: token,
        user: user
    })

}

export { register, login }