import jwt from "jsonwebtoken"
import User from "../models/user.models.js"

const authMiddle= async(req,res,next)=>{

    try {
        const token=req.headers.authorization?.split(" ")[1]
    
        if(!token){
            return res.status(401).json({
                message:"No token , access nhi milegaa laadle"
            })
        }
    
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
    
        const user= await User.findById(decoded.id).select("-password")
    
        if(!user){
            return res.status(401).
            json({
                message:"User not found"
            })
        }
    
        req.user=user;
    
        next()

    } catch (error) {
        return res.status(401).
        json({ message: "Invalid token" })
    }

}



export default authMiddle