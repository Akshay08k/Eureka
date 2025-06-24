import jwt from "jsonwebtoken";

export function generateResetToken(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
}
