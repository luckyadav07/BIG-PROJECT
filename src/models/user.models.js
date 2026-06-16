import mongoose,{Schema} from "mongoose";
const userSchema=new Schema({
        name:{
            type:String,
            required:true
        },

        // email should be unique and also optimised 
        email:{
            type:String,
            required:true,
            unique: true,
            lowercase:true,
            trim:true
        },
        password:{
            type:String,
            required:true
        },

        // phone number is better in string
        phone:{
            type: String
        },
        skills:{
            type:[String],
            required:true
        },
        resume:{
            type:String,
            required:true
        },

        // better for designing
        role:{
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },

        isActive: {
            type: Boolean,
            default: true
        },
        profilePic: {
            type: String
        },
    }, 

    // much better than manully writing timestamps
        {
        timestamps: true
        }
    )

export default mongoose.model("User",userSchema)