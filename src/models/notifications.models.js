import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("Notification", notificationSchema);

// Without notifications the user has to
//  manually check the platform every time.
//  With notifications the platform tells the user automatically
//  — just like how LinkedIn or Gmail sends you alerts.


// intern lgegii uskii notification aaygi guys
