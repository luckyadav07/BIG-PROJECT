import mongoose from "mongoose";

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("DATA BASE CONNECTED GUYSSSSS") 
    } catch (error) {
        console.error(error.message) 
        process.exit(1); 
    }
}

export default connectdb;