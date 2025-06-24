import mongoose from "mongoose";

const academicInfoSchema = new mongoose.Schema({
  year: String,
  branch: String,
  semester: String
}, { _id: false });

const facultyInfoSchema = new mongoose.Schema({
  department: String,
  subjects: [String],
  institution: String
}, { _id: false });

const preferencesSchema = new mongoose.Schema({
  visibility: { type: String, enum: ["public", "private"], default: "private" },
  notifications: { type: Boolean, default: true },
  darkMode: { type: Boolean, default: false }
}, { _id: false });

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },

  academicInfo: academicInfoSchema,
  facultyInfo: facultyInfoSchema,
  interests: [String],
  preferences: preferencesSchema,
  profilePictureUrl: String,
  bio: String,
}, { timestamps: true });

module.exports = mongoose.model("UserProfile", userProfileSchema);
