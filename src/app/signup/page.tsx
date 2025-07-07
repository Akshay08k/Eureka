"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProviderBtns from "../components/ProviderBtns";
import axios from "axios";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/register", formData);
      const data = res.data;

      if (res.status !== 200) {
        throw new Error(data.message || "Something went wrong!");
      }

      const loginRes = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (loginRes?.ok) {
        router.push("/");
      } else {
        setError("Login failed after signup");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-black flex items-center justify-center px-4 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent mb-2">
            Eureka
          </h1>
          <p className="text-gray-600 dark:text-gray-200 text-lg">
            Discover your potential
          </p>
        </div>

        {/* Card */}
        <div className="backdrop-blur-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
            Create your account
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/30 rounded-lg">
              <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 focus:outline-none"
                required
              />
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all duration-200"
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

            <button
              type="submit"
              disabled={Loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold transform hover:scale-[1.02] transition-all duration-200 hover:border border-white hover:bg-transparent hover:text-white s"
            >
              {Loading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <ProviderBtns />
        </div>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 font-medium transition-colors duration-200"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
