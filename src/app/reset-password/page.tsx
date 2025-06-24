"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("Reset token is missing or invalid.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("/api/auth/reset-password", {
        token,
        password,
      });

      if (res.status === 200) {
        setMessage("Password updated successfully. Redirecting...");
        setTimeout(() => router.push("/signin"), 3000);
      }
    } catch (err: any) {
      setError(err.response?.data || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-black 800 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r to-indigo-400 bg-clip-text text-transparent mb-2">
            Eureka
          </h1>
        </div>

        <div className="backdrop-blur-xl bg-black border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white text-center mb-6">
            Reset Password
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
          {message && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
              <p className="text-green-300 text-sm">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                required
              />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r to-indigo-600 text-white rounded-lg font-semibold  transform hover:scale-[1.02] transition-all duration-200 hover:border border-white hover:bg-transparent hover:text-white"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
    