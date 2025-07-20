import { hash } from "bcrypt";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/dbCon";
import generateRandomUsername from "@/utils/GenRandomUsername";
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Missing credentials" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const user = await User.create({
      username: generateRandomUsername(),
      name: username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User created",
        user: { id: user._id, email: user.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
