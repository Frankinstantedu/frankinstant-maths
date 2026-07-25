"use client";

import { useState } from "react";
import Link from "next/link";
import { useUserProfile } from "@/app/hooks/useUserProfile";

const AVATARS = ["🎓", "🦊", "🦁", "🚀", "⭐", "🤖", "🎨", "🏆"];

export default function ProfilePage() {
  const { profile, updateProfileDetails } = useUserProfile();
  
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateProfileDetails(nameInput || "Math Explorer", selectedAvatar);
    setIsEditing(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 p-4 sm:p-8 flex flex-col justify-between relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Decorative Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-3xl mx-auto w-full relative z-10">
        {/* Navigation */}
        <div className="mb-8 pt-2">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-teal-400 hover:underline mb-6 transition"
          >
            ← Back to Home Hub
          </Link>

          <div className="text-center">
            <span className="inline-block text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full mb-3 shadow-lg backdrop-blur-md">
              Frankinstant-Edu • Student Profile
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
              My Learning Dashboard 📊
            </h1>
            <p className="text-slate-300 text-sm sm:text-base">
              Track your per-year quiz progress, accuracy, and customize your profile.
            </p>
          </div>
        </div>

        {/* Profile Card & Info */}
        <div className="bg-slate-900/80 rounded-3xl border-2 border-slate-700/80 p-6 sm:p-8 shadow-xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xl">
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div className="text-6xl bg-indigo-950/80 border-2 border-indigo-500/40 p-4 rounded-2xl shadow-inner">
              {profile.avatar}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
              <p className="text-teal-400 text-sm font-semibold">Math Explorer Student 🌟</p>
            </div>
          </div>

          <button
            onClick={() => {
              setNameInput(profile.name);
              setSelectedAvatar(profile.avatar);
              setIsEditing(!isEditing);
            }}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-indigo-600/30"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Edit Form Modal/Box */}
        {isEditing && (
          <form onSubmit={handleSave} className="bg-slate-900/90 border-2 border-indigo-500/40 rounded-3xl p-6 mb-6 shadow-xl backdrop-blur-xl animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-white mb-4">Edit Your Profile</h3>
            
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Display Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full bg-slate-950/80 border-2 border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-slate-100 font-semibold text-sm outline-none transition"
                maxLength={20}
              />
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Choose Avatar</label>
              <div className="flex flex-wrap gap-2">
                {AVATARS.map((av, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setSelectedAvatar(av)}
                    className={`text-2xl p-2.5 rounded-xl border-2 transition ${
                      selectedAvatar === av ? "border-indigo-500 bg-indigo-950 shadow-lg scale-105" : "border-slate-700 bg-slate-950/50 hover:bg-slate-800"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition text-sm"
            >
              Save Changes ✨
            </button>
          </form>
        )}

        {/* Per-Year Statistics Breakdown */}
        <h3 className="text-xl font-extrabold text-white mb-4">Progress by Year Group 📚</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {Object.keys(profile.years || {}).length === 0 ? (
            <div className="col-span-full bg-slate-900/80 p-6 rounded-3xl border-2 border-slate-700/80 text-center text-slate-300 font-medium shadow-xl backdrop-blur-xl">
              No quizzes completed yet. Start practicing a module to see your per-year stats! 🚀
            </div>
          ) : (
            Object.entries(profile.years).map(([yearName, stats]) => {
              const quizzesTaken = stats.quizzesTaken ?? stats.correct ?? 0;
              const correctAnswers = stats.correctAnswers ?? stats.correct ?? 0;
              const totalPossible = quizzesTaken * 10;
              const accuracy = totalPossible > 0 ? Math.round((correctAnswers / totalPossible) * 100) : 0;
              
              return (
                <div key={yearName} className="bg-slate-900/80 p-6 rounded-3xl border-2 border-slate-700/80 shadow-xl backdrop-blur-xl">
                  <h4 className="text-lg font-bold text-indigo-400 mb-3">{yearName} Curriculum</h4>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                      <div className="text-xl font-black text-white">{quizzesTaken}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Quizzes</div>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                      <div className="text-xl font-black text-emerald-400">{accuracy}%</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Accuracy</div>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                      <div className="text-xl font-black text-teal-400">{correctAnswers}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Correct</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs font-semibold text-slate-400 py-6 border-t border-slate-800 relative z-10">
        © {new Date().getFullYear()} Frankinstant-Edu. Empowering Primary Mathematics Excellence.
      </footer>
    </main>
  );
}