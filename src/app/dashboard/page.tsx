import { getServerSession } from "next-auth";
import { authOptions } from "../lib/Auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import LogoutButton from "../LogoutButton/page";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin"); // not logged in
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">
        <Image
          className="w-12 h-12 rounded-full mx-2 "
          src={session.user?.image ?? ""}
          alt={session.user?.name ?? ""}
          width={180}
          height={37}
          priority
        />
        Welcome, {session.user?.name || "User"}!
      </h1>
      <LogoutButton />
    </div>
  );
}
