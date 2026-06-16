import mongoose,{Schema} from "mongoose";

const userSchema = new Schema(
{
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },

    password:{
        type:String,
        required:true
    },

    phone:{
        type:String
    },

    skills:{
        type:[String],
        required:true
    },

    resume:{
        type:String
    },

    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },

    isActive:{
        type:Boolean,
        default:true
    },

    profilePic:{
        type:String
    }
},
{
    timestamps:true
});

export default mongoose.model("User",userSchema);