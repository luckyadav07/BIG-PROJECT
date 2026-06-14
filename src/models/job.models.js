import mongoose,{Schema} from "mongoose";

const jobSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
    },
    location:{
        type:String

    },
    skills:{
        type:[String]
    },
    jobUrl:{
        type:String,
        required:true,
    }
})

export default mongoose.model("Job",jobSchema)