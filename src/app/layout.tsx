import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./lib/Providers";
import Navbar from "./Navbar/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/Auth";
import SessionGuard from "./lib/SessionWrapper";
import { Analytics } from "@vercel/analytics/next";
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Eureka",
  description: "A platform for learning and sharing knowledge",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} antialiased`}>
        <Providers>
          <SessionGuard>
            {session && <Navbar />}
            {children}
            <Analytics />
          </SessionGuard>
        </Providers>
      </body>
    </html>
  );
}
