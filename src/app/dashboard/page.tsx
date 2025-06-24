import { getServerSession } from "next-auth";
import { authOptions } from "../lib/Auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import LogoutButton from "../components/client-components/LogoutButton/page";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md w-full text-center space-y-6 border border-gray-700">
        <Image
          className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500 shadow-md"
          src={session.user?.image || "/vercel.svg"}
          alt={session.user?.name ?? "User"}
          width={96}
          height={96}
          priority
        />
        <h1 className="text-2xl font-bold">
          Welcome, {session.user?.name || "User"}!
        </h1>
        <p className="text-gray-400">{session.user?.email}</p>

        <LogoutButton />

        <p className="text-xs text-gray-600 pt-4">Project EUREKA © 2025</p>
      </div>
    </div>
  );
}
