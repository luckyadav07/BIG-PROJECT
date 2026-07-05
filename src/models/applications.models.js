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
        enum:[
        "Applied",
        "Shortlisted",
        "Interview",
        "Accepted",
        "Rejected"
        ],
        default: "Applied"
    }
},{
    timestamps:true
})

applicationSchema.index(
    { userId: 1, jobId: 1 },
    { unique: true }
);

export default mongoose.model("Application",applicationSchema)
