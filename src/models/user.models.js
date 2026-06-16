import mongoose,{Schema} from "mongoose";
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number
    },
    skills:{
        type:[String],
        required:true
    },
    resume:{
        type:String,

    },
    role:{
        type:String,
        default:"user"
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    profilePic: {
        type: String
    }
})

export default mongoose.model("User",userSchema)