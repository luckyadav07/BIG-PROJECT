import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    // email should be unique
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // phone number is better as string
    phone: {
      type: String,
    },

    skills: {
        type: [String],
        default: [],
      
    },

    resume: {
      type: String,
      
    },

    // role-based access control
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    profilePic: {
      type: String,
    },
  },

  // much better than manually writing createdAt and updatedAt
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);