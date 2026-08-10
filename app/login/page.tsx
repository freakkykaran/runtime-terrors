"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-24 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-neutral-900/30 rounded-full blur-[150px]"></div>

      <div className="max-w-md w-full bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
            🔒
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-neutral-500 text-sm mt-2">Access your quantum dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 ml-1">Email Address</label>
            <input 
              type="email" placeholder="karan@aurax.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white transition-all placeholder:text-neutral-700"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 ml-1">Password</label>
            <input 
              type="password" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white transition-all placeholder:text-neutral-700"
              required
            />
          </div>

          <button type="submit" className="w-full py-4 rounded-2xl bg-white text-black font-bold hover:bg-neutral-200 transition-all shadow-xl active:scale-95">
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-neutral-500 mt-8">
          New to the Ecosystem?{" "}
          <Link href="/signup" className="text-white font-semibold hover:underline">Join Now</Link>
        </p>
      </div>
    </main>
  );
}