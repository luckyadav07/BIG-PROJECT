import mongoose,{Schema} from "mongoose";

const emailSchema=new Schema({
    campaignId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Campaign"
    },
    email:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Queued"
    },
    sentAt:{
        type:Date,

    },
    

})

export default mongoose.model("Email",emailSchema)