import mongoose, { Schema, model, models } from "mongoose";

const onBoardingSchema = new Schema(
  {
    completed: { type: Boolean, default: false },
    currentStep: { type: Number, default: 0 },
  },
  { _id: false }
);
const UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    //display name
    name: { type: String },
    bio: { type: String },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      default: "student",
    },
    phone: { type: String },
    followers: { type: Number },
    problemSolvedCount: { type: Number },
    contributions: { type: Number },

    location: { type: String },
    websiteLink: { type: String },
    githubUrl: { type: String },
    linkedinUrl: { type: String },
    twitterUrl: { type: String },
    portfolioUrl: { type: String },
    onboarding: { type: onBoardingSchema, default: () => ({}) },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
