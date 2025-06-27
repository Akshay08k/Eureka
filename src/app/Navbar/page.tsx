// components/Navbar.tsx
"use client";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Forum", href: "/forums" },
    { name: "Resources", href: "/resources" },
    { name: "Groups", href: "/groups" },
    { name: "Roadmaps", href: "/roadmaps" },
  ];

  return (
    <nav className="fixed top-6 left-4 right-4 z-50">
      <div className="bg-[#1f1f1f]/70 backdrop-blur-md  rounded-2xl shadow-2xl max-w-6xl mx-auto">
        <div className="px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative text-center text-2xl font-bold bg-gradient-to-r from-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                <Link href="/">Eureka</Link>
              </div>
            </div>

            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-white/80 hover:text-white font-medium transition-all duration-300 group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Image
                  src={session?.user?.image || "/vercel.svg"}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2hover:border-purple-400 transition-all duration-300 cursor-pointer"
                />

                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur"></div>
              </div>

              <button
                className="md:hidden text-white/80 hover:text-white text-xl transition-colors duration-300"
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
