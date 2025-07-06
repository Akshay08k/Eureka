import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
      <div className="relative">
        <div className="w-24 h-24 relative">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin"></div>

          <div className="absolute inset-2 rounded-full bg-indigo-800 animate-pulse"></div>
          <div className="absolute inset-4 rounded-full bg-indigo-800 animate-ping"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
          </div>
        </div>

        <div className="absolute -top-8 -left-8">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping opacity-60"></div>
        </div>
        <div className="absolute -top-4 -right-6">
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-70 delay-75"></div>
        </div>
        <div className="absolute -bottom-6 -left-4">
          <div className="w-1 h-1 bg-indigo-300 rounded-full animate-ping delay-150 opacity-50"></div>
        </div>
        <div className="absolute -bottom-4 -right-8">
          <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-300 opacity-60"></div>
        </div>

        <div className="absolute -inset-6 rounded-full border border-indigo-200 animate-spin-slow opacity-30"></div>

        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-indigo-600 font-bold text-lg animate-pulse">
            Loading
          </div>
          <div className="flex justify-center mt-2 space-x-1">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
