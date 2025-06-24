"use client";
import { getProviders, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function ProviderBtns() {
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  return (
    <>
      {providers &&
        Object.values(providers).filter(
          (provider: any) => provider.id !== "credentials"
        ).length > 0 && (
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-4 text-gray-400 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>
        )}
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
                {provider.name === "Google" && <FaGoogle className="w-6 h-6" />}
                {provider.name === "GitHub" && <FaGithub className="w-6 h-6" />}
                <span>Continue with {provider.name}</span>
              </button>
            ))}
      </div>
      ;
    </>
  );
}
