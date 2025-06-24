"use client";

import { signIn, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SignInPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [providers, setProviders] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

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
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-black 800 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r  to-indigo-400 bg-clip-text text-transparent mb-2">
            Eureka
          </h1>
          <p className="text-gray-400 text-lg">Welcome back</p>
        </div>

        {/* Main card */}
        <div className="backdrop-blur-xl bg-black border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white text-center mb-6">
            Sign in to your account
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
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
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
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
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                required
              />
            </div>

            {/* Forgot password link */}
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r  to-indigo-600 text-white rounded-lg font-semibold  transform hover:scale-[1.02] transition-all duration-200 hover:outline outline-white hover:bg-transparent hover:text-white hover:bg-gradient-to-r  hover:from-indigo-600 hover:to-black"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          {providers &&
            Object.values(providers).filter(
              (provider: any) => provider.id !== "credentials"
            ).length > 0 && (
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-white/20"></div>
                <span className="px-4 text-gray-400 text-sm">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-white/20"></div>
              </div>
            )}

          {/* OAuth Providers */}
          <div className="space-y-3">
            {providers &&
              Object.values(providers)
                .filter((provider: any) => provider.id !== "credentials")
                .map((provider: any) => (
                  <button
                    key={provider.name}
                    onClick={() =>
                      signIn(provider.id, { callbackUrl: "/dashboard" })
                    }
                    className="w-full py-3 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/15 transform hover:scale-[1.02] transition-all duration-200 backdrop-blur-sm flex items-center justify-center space-x-2"
                  >
                    {provider.name === "Google" && <FaGoogle size={20} />}
                    {provider.name === "GitHub" && <FaGithub size={20} />}
                    <span>Continue with {provider.name}</span>
                  </button>
                ))}
          </div>
        </div>

        {/* Sign up link */}
        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
