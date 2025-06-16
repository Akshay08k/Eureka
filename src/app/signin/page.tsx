"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SigninPage() {
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black px-4">
      <h1 className="text-3xl font-bold mb-6">Sign in to Project EUREKA</h1>

      {providers ? (
        Object.values(providers).map((provider: any) => {
          if (provider.name === "Credentials") return null;
          return (
            <button
              key={provider.id}
              onClick={() => signIn(provider.id, { callbackUrl: "/dashboard" })}
              className="mb-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Sign in with {provider.name}
            </button>
          );
        })
      ) : (
        <p>Loading providers...</p>
      )}

      <p className="mt-6 text-sm text-gray-500">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-600 underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
