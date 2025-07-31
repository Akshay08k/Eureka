import dbConnect from "@/app/lib/dbCon";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  await dbConnect();

  const body = await req.json();

  const user = await User.findOneAndUpdate({ email: body.email }, body, {
    new: true,
  });

  return NextResponse.json(user);
}
