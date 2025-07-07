"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import ProviderBtns from "../components/ProviderBtns";

export default function SignInPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "CredentialsSignin") {
      setError("Invalid email or password");
    } else if (error === "Unauthorized") {
      setError("Please Login first");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-black flex items-center justify-center px-4 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent mb-2">
            Eureka
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Welcome back
          </p>
        </div>

        {/* Main card */}
        <div className="backdrop-blur-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
            Sign in to your Account
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/30 rounded-lg">
              <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none  transition-all duration-200"
                required
              />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all duration-200"
                required
              />
            </div>

            {/* Forgot password link */}
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold transform hover:scale-[1.02] transition-all duration-200 hover:outline outline-white hover:bg-transparent hover:text-white  dark:hover:text-white"
            >
              Sign In
            </button>
          </form>

          <ProviderBtns />
        </div>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 font-medium transition-colors duration-200"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
