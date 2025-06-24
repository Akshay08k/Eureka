import mongoose, { Schema, model, models } from "mongoose";

const ResetTokenSchema = new Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export default models.ResetToken || model("ResetToken", ResetTokenSchema);
