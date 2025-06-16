import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI!);

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const existingUser = await User.findOne({ email });
  if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashed });
  await newUser.save();

  return NextResponse.json({ success: true });
}
