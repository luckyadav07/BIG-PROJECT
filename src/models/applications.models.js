import mongoose,{Schema} from "mongoose";

const applicationSchema=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },
    status:{
        type:String,
        enum:["Saved", "Applied", "Interview", "Offer", "Rejected"],
        default:"Saved"
    }
},{
    timestamps:true
})

export default mongoose.model("Application",applicationSchema)
