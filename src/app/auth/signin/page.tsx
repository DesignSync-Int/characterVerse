'use client'

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from 'next/link'
import { Github, Mail, Zap } from "lucide-react";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      console.error("OAuth sign in error:", error);
      setIsLoading(false);
    }
  };

  const handleCredentialsSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("credentials", {
        email: "demo@test.com",
        password: "demo",
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Credentials sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Comic book background effects */}
      <div className="absolute inset-0 halftone-bg opacity-20"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-red-500 rounded-full opacity-10 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-400 transform rotate-45 opacity-10"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center comic-card">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white comic-title mb-2">
              Join CharacterVerse!
            </h1>
            <p className="text-purple-200">
              Rate, review, and discover your favorite characters
            </p>
          </div>

          {/* Sign In Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 comic-card shadow-2xl">
            <div className="space-y-4">
              {/* Demo Credentials Button */}
              <button
                onClick={handleCredentialsSignIn}
                disabled={isLoading}
                className="w-full comic-button bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all disabled:opacity-50"
              >
                {isLoading ? "Signing In..." : "Quick Demo Sign In"} ⚡
              </button>

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-4 text-sm text-gray-500">
                  Or continue with
                </span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* OAuth Buttons */}
              <button
                onClick={() => handleOAuthSignIn("google")}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50"
              >
                <Mail className="h-5 w-5 text-red-500" />
                Continue with Google
              </button>

              <button
                onClick={() => handleOAuthSignIn("github")}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-all disabled:opacity-50"
              >
                <Github className="h-5 w-5" />
                Continue with GitHub
              </button>
            </div>

            {/* Demo Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">
                🚀 Demo Mode
              </h4>
              <p className="text-xs text-blue-700 mb-2">
                Click &ldquo;Quick Demo Sign In&rdquo; to instantly access the
                platform.
              </p>
              <div className="text-xs text-blue-600">
                No registration required for testing!
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-purple-200 hover:text-white transition-colors text-sm"
            >
              ← Back to CharacterVerse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
