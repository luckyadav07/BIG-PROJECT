import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "USER_REGISTERED",
        "JOB_CREATED",
        "JOB_UPDATED",
        "JOB_DELETED",
        "ROLE_CHANGED",
        "APPLICATION_SUBMITTED",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Activity", activitySchema);