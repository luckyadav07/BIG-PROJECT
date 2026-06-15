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
        required:true
    },
    role:{
        type:String,
        default:"user"
    }

})

export default mongoose.model("User",userSchema)