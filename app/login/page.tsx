"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  // Set your desired portal password here
  const CORRECT_PASSWORD = "frankinstant2026";

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      // Save login state in browser session storage
      sessionStorage.setItem("frankinstant_authenticated", "true");
      router.push("/");
    } else {
      setError(true);
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border-2 border-slate-800">
        <div className="text-center mb-6">
          <span className="inline-block text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-3 shadow-2xs">
            🔒 Secure Access
          </span>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Frankinstant-Edu</h1>
          <p className="text-slate-500 text-sm">Enter your access password to open the portal.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 focus:outline-none text-slate-900 font-semibold text-lg transition"
            />
          </div>

          {error && (
            <p className="text-xs font-bold text-rose-600 text-center">
              Incorrect password. Please try again.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-2xl shadow-lg transition transform active:scale-95 cursor-pointer"
          >
            Login to Portal ➔
          </button>
        </form>
      </div>
    </main>
  );
}