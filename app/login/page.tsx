"use client";

import { useState } from "react";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { CustomInput } from "@/components/ui/custom-input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password });
    } catch (err) {
      // Error is handled by useAuth hook
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-50 to-orange-50 items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg">
            <UtensilsCrossed className="w-12 h-12 text-white" />
          </div>
          <div className="text-center max-w-xs">
            <p className="text-slate-600 text-sm font-medium">美味しい世界へようこそ</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12">
            {/* Circular background with centered icon */}
            <div className="flex justify-center mb-8">
              <div className="w-28 h-28 rounded-full bg-slate-100 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-md">
                  <UtensilsCrossed className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            {/* Welcome text */}
            <h1 className="text-xl font-semibold text-foreground mb-1">
              ベトめしガイドへ
            </h1>
            <h2 className="text-xl font-semibold text-foreground">
              おかえりなさい
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-foreground">
                メール
              </Label>
              <CustomInput
                id="username"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                パスワード
              </Label>
              <CustomInput
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ transition: 'none' }}
            >
              {isLoading ? 'ログイン中...' : 'ログイン'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              アカウントをお持ちでない方 /{" "}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium underline">
                サインアップ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
