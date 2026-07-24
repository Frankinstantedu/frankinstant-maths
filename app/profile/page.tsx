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
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <div className="max-w-3xl mx-auto w-full">
        {/* Navigation */}
        <div className="mb-8 pt-2">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-indigo-600 mb-6 transition"
          >
            ← Back to Home Hub
          </Link>

          <div className="text-center">
            <span className="inline-block text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3 shadow-2xs">
              Frankinstant-Edu • Student Profile
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-2">
              My Learning Dashboard 📊
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Track your per-year quiz progress, accuracy, and customize your profile.
            </p>
          </div>
        </div>

        {/* Profile Card & Info */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div className="text-6xl bg-indigo-50 border-2 border-indigo-200 p-4 rounded-2xl shadow-inner">
              {profile.avatar}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{profile.name}</h2>
              <p className="text-slate-500 text-sm font-medium">Math Explorer Student</p>
            </div>
          </div>

          <button
            onClick={() => {
              setNameInput(profile.name);
              setSelectedAvatar(profile.avatar);
              setIsEditing(!isEditing);
            }}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition shadow-xs"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Edit Form Modal/Box */}
        {isEditing && (
          <form onSubmit={handleSave} className="bg-indigo-50/70 border-2 border-indigo-200 rounded-2xl p-6 mb-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Edit Your Profile</h3>
            
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Display Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full bg-white border-2 border-slate-300 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-slate-800 font-semibold text-sm outline-none transition"
                maxLength={20}
              />
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Choose Avatar</label>
              <div className="flex flex-wrap gap-2">
                {AVATARS.map((av, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setSelectedAvatar(av)}
                    className={`text-2xl p-2.5 rounded-xl border-2 transition ${
                      selectedAvatar === av ? "border-indigo-600 bg-white shadow-xs scale-105" : "border-slate-200 bg-white/50 hover:bg-white"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition text-sm"
            >
              Save Changes ✨
            </button>
          </form>
        )}

        {/* Per-Year Statistics Breakdown */}
        <h3 className="text-xl font-extrabold text-slate-900 mb-4">Progress by Year Group 📚</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {Object.keys(profile.years || {}).length === 0 ? (
            <div className="col-span-full bg-white p-6 rounded-2xl border-2 border-slate-200 text-center text-slate-500 font-medium shadow-sm">
              No quizzes completed yet. Start practicing a module to see your per-year stats!
            </div>
          ) : (
            Object.entries(profile.years).map(([yearName, stats]) => {
              const totalPossible = stats.quizzesTaken * 10;
              const accuracy = totalPossible > 0 ? Math.round((stats.correctAnswers / totalPossible) * 100) : 0;
              
              return (
                <div key={yearName} className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm">
                  <h4 className="text-lg font-bold text-indigo-600 mb-3">{yearName} Curriculum</h4>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-xl font-black text-slate-800">{stats.quizzesTaken}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Quizzes</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-xl font-black text-emerald-600">{accuracy}%</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Accuracy</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-xl font-black text-slate-800">{stats.correctAnswers}</div>
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
      <footer className="text-center text-xs font-semibold text-slate-400 py-6 border-t border-slate-200">
        © {new Date().getFullYear()} Frankinstant-Edu. Empowering Primary Mathematics Excellence.
      </footer>
    </main>
  );
}