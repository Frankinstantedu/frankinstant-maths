"use client";

import Link from "next/link";

export default function TimesTablesHub() {
  const tables = Array.from({ length: 12 }, (_, i) => i + 1);

  const colors = [
    "border-sky-200 hover:border-sky-500 bg-sky-50/50 text-sky-700",
    "border-emerald-200 hover:border-emerald-500 bg-emerald-50/50 text-emerald-700",
    "border-amber-200 hover:border-amber-500 bg-amber-50/50 text-amber-700",
    "border-purple-200 hover:border-purple-500 bg-purple-50/50 text-purple-700",
    "border-rose-200 hover:border-rose-500 bg-rose-50/50 text-rose-700",
    "border-indigo-200 hover:border-indigo-500 bg-indigo-50/50 text-indigo-700",
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div className="max-w-5xl mx-auto w-full">
        {/* Navigation & Header */}
        <div className="mb-8 pt-2">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-indigo-600 transition"
            >
              ← Back to All Years
            </Link>

            <Link
              href="/profile"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-500 text-indigo-700 font-bold rounded-xl text-sm transition shadow-2xs"
            >
              👤 My Profile & Stats
            </Link>
          </div>

          <div className="text-center">
            <span className="inline-block text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full mb-3 shadow-2xs">
              Frankinstant-Edu • Multiplication Practice
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
              Times Tables Hub ✖️
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Choose a times table from 1 to 12 and master your multiplication skills!
            </p>
          </div>
        </div>

        {/* Tables Grid 1-12 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
          {tables.map((num) => {
            const colorClass = colors[(num - 1) % colors.length];
            return (
              <Link
                key={num}
                href={`/times-tables/${num}`}
                className={`p-6 rounded-2xl border-2 transition-all hover:shadow-md hover:scale-105 flex flex-col items-center justify-center text-center bg-white ${colorClass}`}
              >
                <span className="text-3xl mb-2">🔢</span>
                <h2 className="text-2xl font-black text-slate-900 mb-1">
                  {num}x Table
                </h2>
                <p className="text-xs font-semibold text-slate-500">Practice 1 to 12</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs font-semibold text-slate-400 py-6 border-t border-slate-200">
        © {new Date().getFullYear()} Frankinstant-Edu. Empowering Primary Mathematics Excellence.
      </footer>
    </main>
  );
}