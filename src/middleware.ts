import withAuth from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  matcher: ["/", "/groups", "/forums", "/resources", "/roadmaps"],
};
