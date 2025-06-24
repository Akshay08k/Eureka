import dbConnect from "@/app/lib/dbCon"
import ResetToken from "@/models/ResetToken";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  await dbConnect();
  const { token, password } = await req.json();

  const resetToken = await ResetToken.findOne({ token });
  if (!resetToken || resetToken.expiresAt < new Date()) {
    return new Response("Token invalid or expired", { status: 400 });
  }

  const user = await User.findOne({ email: resetToken.email });
  if (!user) return new Response("User not found", { status: 404 });

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();

  await ResetToken.deleteOne({ token }); 

  return new Response("Password updated", { status: 200 });
}
