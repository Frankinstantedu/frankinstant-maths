'use client';
import React, { useState } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-2">
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Frankinstant-Edu Portal</span>
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 hover:border-indigo-500 text-slate-700 font-bold rounded-xl text-sm transition shadow-sm"
            >
              <span>👤</span>
              <span>Student</span>
              <span>☰</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
                <a href="/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50">Profile</a>
                <button className="block w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50">Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-full h-64 mb-8 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative bg-slate-200">
            <img 
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200" 
              alt="Books and Apple" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Welcome to Frankinstant-Edu</h1>
        </div>

        {/* Action Section */}
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-xl text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-6">Ready to learn today?</h2>
          <a href="/classes" className="inline-block px-10 py-4 bg-indigo-600 text-white font-black text-lg rounded-2xl hover:bg-indigo-700 transition shadow-lg">
            Select Class →
          </a>
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-indigo-900 text-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Our Mission</h3>
            <p className="text-indigo-200 text-sm leading-relaxed">
              To provide accessible, high-quality educational resources that empower every child to reach their full potential.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Us</h3>
            <div className="text-slate-600 text-sm space-y-3 font-medium">
              <p>📞 Phone: +358 449564467</p>
              <p>✉️ Email: frankinstantedu@gmail.com</p>
              <p>📍 Address: Joensuu, Finland</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}