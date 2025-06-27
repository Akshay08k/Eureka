import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./lib/Providers";
import Navbar from "./Navbar/page";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Eureka",
  description: "A platform for learning and sharing knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className}  antialiased`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
