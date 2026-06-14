import mongoose,{Schema} from "mongoose";

const campaignSchema=new Schema({
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
        type:String
    },
    status:{
        type:String,
        default:"pending"

    },

})

export default mongoose.model("Campaign",campaignSchema)