"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [clientName, setClientName] = useState("");
  const [serviceInterest, setServiceInterest] = useState("Primary Mathematics Practice");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    // Your WhatsApp number with country code (no + or spaces needed for wa.me links)
    const phoneNumber = "358449564467";

    // Format the message that will automatically appear in your WhatsApp chat
    const message = `Hi Frankinstant-Edu, my name is ${clientName}. I just filled out the registration form and I'm interested in: ${serviceInterest}. Let's get started!`;

    // Encode the message for a URL
    const encodedMessage = encodeURIComponent(message);

    // Redirect the user directly to WhatsApp
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center">
        
        <div className="w-full flex justify-between items-center mb-6">
          <Link href="/" className="text-xs font-bold text-teal-400 hover:underline">
            ← Hub
          </Link>
          <span className="text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full">
            Frankinstant-Edu
          </span>
        </div>

        <h1 className="text-2xl font-black text-white mb-1 text-center">📝 Quick Registration</h1>
        <p className="text-xs text-slate-400 text-center mb-6">Connect with us instantly on WhatsApp</p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Your Name / Parent Name</label>
            <input
              type="text"
              required
              placeholder="e.g., Sarah Johnson"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">What are you registering for?</label>
            <select
              value={serviceInterest}
              onChange={(e) => setServiceInterest(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500 transition"
            >
              <option value="Primary Mathematics Practice & Resources">Primary Mathematics Practice & Resources</option>
              <option value="60-Second Speed Drill Access">60-Second Speed Drill Access</option>
              <option value="General Tutoring Inquiry">General Tutoring Inquiry</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl shadow-lg shadow-emerald-900/20 transition text-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <span>💬 Continue to WhatsApp</span>
          </button>
        </form>

        <p className="text-[11px] text-slate-500 text-center mt-6">
          No spam emails, no waiting. Clicking this opens your WhatsApp and messages us directly.
        </p>

      </div>
    </main>
  );
}