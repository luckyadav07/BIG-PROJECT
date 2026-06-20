import mongoose from "mongoose";
// for logger
import logger from "../utils/logger.js";


const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        //  console.log("DATA BASE CONNECTED GUYSSSSS")
        logger.info("OHHH YEAHHHH Database connected"); 
    } catch (error) {
        //  console.error(error.message)
        logger.error(error.message) 
        process.exit(1); 
    }
}


export default connectdb;