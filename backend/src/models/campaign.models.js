import mongoose,{Schema} from "mongoose";

const campaignSchema=new Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        template:{
            type:String,
            required:true
        },
        recruiterEmails:{
            type:[String],
            required:true
        },
        schedule:{
            type:Date
        },
        status:{
            type:String,
            enum:["pending","scheduled","sent","failed"],
            default:"pending"
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Campaign",campaignSchema)