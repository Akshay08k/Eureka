// app/api/test-db/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/clientPromise";
import connectDB from "@/app/lib/dbCon";
import User from "@/models/User"; // optional, only if using Mongoose User model

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collections = await db.collections();
    console.log("✅ MongoClient connection successful");

    await connectDB();
    console.log("✅ Mongoose connection successful");

    const userCount = await User.countDocuments();
    console.log("👤 Total users in DB:", userCount);

    return NextResponse.json({
      status: "success",
      mongoClientCollections: collections.map((c) => c.collectionName),
      userCount,
    });
  } catch (err: any) {
    console.error("❌ DB Test Failed:", err);
    return NextResponse.json({ status: "error", message: err.message });
  }
}
