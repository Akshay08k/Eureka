import dbConnect from "@/app/lib/dbCon";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/lib/Auth";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized session not found please login" },
        { status: 401 }
      );
    }

    if (!session.user) {
      return NextResponse.json(
        { message: "Unauthorized session not found please login" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session?.user?.email });
    console.log("user", user);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("[GET /api/user/me]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
