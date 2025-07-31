import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredintialProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./clientPromise";
import connectDB from "./dbCon";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredintialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(
          credentials?.password as string,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        // console.log("Authorized user:", user);
        return {
          id: user._id.toString(),
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
          image: user.image,
          createdAt: user.createdAt,
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.picture = user.image;
        token.role = user.role;
        token.createdAt = user.createdAt;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.image = token.image;
        session.user.role = token.role;
        session.user.image = token.picture;
        session.user.createdAt = token.createdAt;
      }
      return session;
    },
  },
};
