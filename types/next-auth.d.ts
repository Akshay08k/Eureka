// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      bio: undefined;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null;
      createdAt?: string | null;
    };
  }
}
