import dbConnect from "@/app/lib/dbCon";
import ResetToken from "@/models/ResetToken";
import User from "@/models/User";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(req: Request) {
  await dbConnect();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return new Response("User not found", { status: 404 });

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 min

  await ResetToken.create({ email, token, expiresAt });

  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  // setup nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Reset your Eureka password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 15 minutes.</p>`,
  });

  return new Response("Reset email sent", { status: 200 });
}
