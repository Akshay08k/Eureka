"use client";

import { useState } from "react";
import axios from "axios";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/forgot-password", { email });
      if (res.status === 200) {
        setMessage("Password reset link sent to your email. Check your inbox.");
        setLoading(false);
        setError("");
      }
    } catch (err: any) {
      setError(err.response?.data || "Something went wrong.");
      setMessage("");
    }
  };
  console.log(loading);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-black flex items-center justify-center px-4 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent mb-2">
            Eureka
          </h1>
        </div>

        <div className="backdrop-blur-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
            Forgot Password
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/30 rounded-lg">
              <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}
          {message && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-500/20 border border-green-300 dark:border-green-500/30 rounded-lg">
              <p className="text-green-600 dark:text-green-300 text-sm">
                {message}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all duration-200"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold transform hover:scale-[1.02] transition-all duration-200 hover:border border-white ${loading ? "opacity-50 cursor-not-allowed" : ""}` }
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
