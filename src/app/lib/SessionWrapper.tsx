// components/SessionGuard.tsx
"use client";
import { useSession } from "next-auth/react";
import Loader from "../components/RocketLoader";
export default function SessionGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  if (status === "loading") {
    return <Loader />;
  }

  return <>{children}</>;
}
