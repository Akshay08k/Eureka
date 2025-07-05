import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth({
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: [
    "/",
    "/groups",
    "/forums",
    "/resources",
    "/roadmaps",
    "/test",
    "/signin",
  ],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/signin") {
    const token =
      req.cookies.get("next-auth.session-token") ||
      req.cookies.get("__Secure-next-auth.session-token");
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
