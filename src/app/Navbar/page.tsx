// components/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Forum", href: "/forums" },
    { name: "Resources", href: "/resources" },
    { name: "Groups", href: "/groups" },
    { name: "Roadmaps", href: "/roadmaps" },
  ];
  return (
    <nav className="fixed top-6 left-4 right-4 z-50 ">
      <div className="dark:bg-[#1f1f1f]/70 bg-[#F8FAFC] dark:text-white backdrop-blur-md  rounded-2xl shadow-2xl max-w-6xl mx-auto">
        <div className="px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative text-center text-2xl font-bold bg-gradient-to-r dark:from-indigo-200 dark:to-indigo-400 from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                <Link href="/">Eureka</Link>
              </div>
            </div>

            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-black dark:text-white/80 font-medium transition-all duration-300 group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Image
                  src={
                    session?.user?.image ||
                    "https://avatars.githubusercontent.com/u/96125015?v=4"
                  }
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2hover:border-purple-400 transition-all duration-300 cursor-pointer"
                />
              </div>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-white/80 hover:text-white text-xl transition-colors duration-900 dark:bg-white/35 bg-black/10 p-2 rounded-full"
                title="Toggle between themes"
              >
                {theme === "dark" ? (
                  <FaMoon className="w-4 h-4 text-black dark:text-white" />
                ) : (
                  <FaSun className="w-4 h-4 text-black dark:text-white" />
                )}
              </button>

              <button
                onClick={() => signOut({ callbackUrl: "/signin" })}
                className="px-4 py-2 bg-red-400 hover:bg-red-700 text-black rounded-lg transition duration-200"
              >
                Logout
              </button>

              <button
                className="md:hidden  text-white/80 hover:text-white text-xl transition-colors duration-300"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <IoCloseSharp /> : <IoMdMenu />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-purple-500/20 px-6 py-4 bg-black/95 rounded-b-2xl">
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-white/80 hover:text-white font-medium transition-all duration-300 py-2 px-2 rounded-lg hover:bg-purple-500/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
