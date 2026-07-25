'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What age groups do you tutor?",
      a: "We specialize in primary school students (grades 1 through 6), focusing heavily on core foundational math, homework support, and study habits."
    },
    {
      q: "Are tutoring sessions in-person or online?",
      a: "We offer both flexible options depending on your preference and location around Joensuu, Finland."
    },
    {
      q: "How do I book a session for my child?",
      a: "You can easily click the 'Chat on WhatsApp' or 'Call Now' buttons below to discuss your child's needs and schedule a time slot directly with us."
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 p-4 sm:p-6 pb-20 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Decorative Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-2">
          {/* Logo Brand Header */}
          <div className="flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 px-4 py-2 rounded-2xl shadow-lg">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center text-white font-black text-sm shadow-md">
              🎓
            </div>
            <span className="font-black text-white tracking-tight text-sm sm:text-base">
              Frankinstant<span className="text-teal-400">Edu</span>
            </span>
          </div>

          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md border-2 border-slate-700 hover:border-indigo-500 text-slate-200 font-bold rounded-xl text-sm transition shadow-lg cursor-pointer"
            >
              <span>👤</span>
              <span>Student</span>
              <span>☰</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl">
                <a href="/profile" className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-600/30 hover:text-white transition">Profile</a>
                <a href="/times-table" className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-600/30 hover:text-white transition">Times Tables</a>
                <a href="/whiteboard" className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-600/30 hover:text-white transition">Whiteboard ✏️</a>
                <button className="block w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-rose-950/40 transition cursor-pointer">Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-full h-64 mb-8 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 relative bg-slate-800">
            <img 
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200" 
              alt="Books and Apple" 
              className="w-full h-full object-cover opacity-80 hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">Frankinstant-Edu</span>
          </h1>
          <p className="text-slate-300 text-base max-w-lg mx-auto font-medium">
            Professional primary school tutoring and interactive learning tools based in Joensuu, Finland.
          </p>
        </div>

        {/* Action Section */}
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-10 border border-slate-700/80 shadow-2xl text-center mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
          <h2 className="text-3xl font-black text-white mb-6">Ready to learn today?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/classes" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-base rounded-2xl transition shadow-lg shadow-indigo-600/30">
              Select Class →
            </a>
            <a href="/times-table" className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-black text-base rounded-2xl transition shadow-lg shadow-teal-600/30">
              Practice Times Tables ✖️
            </a>
            <Link href="/whiteboard" className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-black text-base rounded-2xl transition shadow-lg shadow-sky-600/30 flex items-center gap-2">
              <span>Interactive Whiteboard</span> <span>✏️</span>
            </Link>
          </div>
        </div>

        {/* Meet Your Tutor Section */}
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-slate-700/80 shadow-2xl mb-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="w-32 h-32 mx-auto md:mx-0 rounded-2xl bg-gradient-to-tr from-indigo-600/30 to-teal-500/30 border border-indigo-500/40 flex items-center justify-center text-5xl shadow-xl mb-4">
                👨‍🏫
              </div>
              <h3 className="text-xl font-black text-white">Frank</h3>
              <p className="text-xs font-bold text-teal-400 uppercase tracking-wider mt-1">Lead Educator & Founder</p>
            </div>
            <div className="md:col-span-2 space-y-4 text-slate-300 text-sm sm:text-base font-medium">
              <h4 className="text-lg font-bold text-white">Dedicated to Building Academic Confidence</h4>
              <p>
                Hello! I am Frank, the founder and lead tutor behind Frankinstant-Edu. Based right here in Joensuu, Finland, I combine a strong professional background in management and operations with a deep passion for primary school mathematics and foundational education.
              </p>
              <p>
                My approach focuses on making learning structured, engaging, and stress-free. Whether your child needs help mastering their multiplication facts, working through challenging word problems, or building steady daily study habits, I am here to help them succeed.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-950/80 text-indigo-300 font-bold text-xs rounded-xl border border-indigo-800/60">Primary Math Expert</span>
                <span className="px-3 py-1 bg-indigo-950/80 text-indigo-300 font-bold text-xs rounded-xl border border-indigo-800/60">1-on-1 Coaching</span>
                <span className="px-3 py-1 bg-teal-950/80 text-teal-300 font-bold text-xs rounded-xl border border-teal-800/60">Joensuu, Finland</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tutoring Services Snapshot */}
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/80 shadow-2xl mb-12">
          <h3 className="text-xl font-bold text-white mb-6 text-center">What We Offer</h3>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700/60 hover:border-indigo-500/50 transition">
              <span className="text-3xl mb-2 block">🧮</span>
              <h4 className="font-bold text-white mb-1">Primary Math</h4>
              <p className="text-xs text-slate-400">Arithmetic, word problems, and curriculum mastery.</p>
            </div>
            <div className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700/60 hover:border-indigo-500/50 transition">
              <span className="text-3xl mb-2 block">📚</span>
              <h4 className="font-bold text-white mb-1">Homework Support</h4>
              <p className="text-xs text-slate-400">Guided daily help to build academic confidence.</p>
            </div>
            <div className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700/60 hover:border-indigo-500/50 transition">
              <span className="text-3xl mb-2 block">🎯</span>
              <h4 className="font-bold text-white mb-1">1-on-1 Coaching</h4>
              <p className="text-xs text-slate-400">Personalized attention tailored to your child's pace.</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900/80 to-teal-950/60 border border-indigo-500/30 rounded-3xl p-8 mb-12 shadow-2xl backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white mb-6 text-center">What Parents Say</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-6 rounded-2xl shadow-lg border border-slate-700/80 flex flex-col justify-between">
              <p className="text-slate-300 text-sm italic mb-4">
                "My daughter's math grades and confidence improved tremendously after just a few weeks of personalized tutoring. Highly recommended!"
              </p>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">— Parent in Joensuu</span>
            </div>
            <div className="bg-slate-900/80 p-6 rounded-2xl shadow-lg border border-slate-700/80 flex flex-col justify-between">
              <p className="text-slate-300 text-sm italic mb-4">
                "The interactive practice tools combined with expert guidance made learning fun for my son. Excellent service."
              </p>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">— Primary School Parent</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/80 shadow-2xl mb-12">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-700/80 rounded-2xl p-4 transition bg-slate-800/40">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left font-bold text-slate-200 text-sm cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-teal-400 font-black text-lg">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <p className="text-slate-300 text-xs sm:text-sm mt-3 pt-3 border-t border-slate-700/80 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info & Contact Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white rounded-3xl p-8 shadow-2xl border border-indigo-700/60 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4">Our Mission</h3>
              <p className="text-indigo-200 text-sm leading-relaxed mb-6">
                To provide accessible, high-quality educational resources that empower every child to reach their full potential.
              </p>
            </div>
            <div className="pt-4 border-t border-indigo-800/80">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block mb-1">Based in Joensuu</span>
              <p className="text-xs text-indigo-200">Private & group tutoring tailored for primary school success.</p>
            </div>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/80 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Contact & Bookings</h3>
              <div className="text-slate-300 text-sm space-y-3 font-medium mb-6">
                <p>📞 Phone: +358 449564467</p>
                <p>✉️ Email: frankinstantedu@gmail.com</p>
                <p>📍 Address: Joensuu, Finland</p>
              </div>
            </div>

            {/* Instant Action Buttons for Parents */}
            <div className="space-y-2">
              <a 
                href="https://wa.me/358449564467?text=Hello,%20I%20am%20interested%20in%20tutoring%20services%20for%20my%20child." 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-center rounded-xl text-sm transition shadow-lg shadow-emerald-600/30"
              >
                💬 Chat on WhatsApp
              </a>
              <a 
                href="tel:+358449564467" 
                className="block w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-center rounded-xl text-sm transition border border-slate-700"
              >
                📞 Call Now
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}