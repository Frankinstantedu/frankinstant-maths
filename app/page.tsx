"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  // Protect the dashboard: Redirect to /login if not authenticated
  useEffect(() => {
    const isAuth = sessionStorage.getItem("frankinstant_authenticated");
    if (!isAuth) {
      router.push("/login");
    }
  }, [router]);

  const years = [
    {
      title: "Year 1 Maths",
      age: "Age 5-6",
      icon: "🎈",
      desc: "Counting to 100, basic addition/subtraction, 2D/3D shapes, and time.",
      href: "/year1",
      color: "border-sky-200 hover:border-sky-400 bg-white shadow-xs",
      btnColor: "bg-sky-600 hover:bg-sky-700",
    },
    {
      title: "Year 2 Maths",
      age: "Age 6-7",
      icon: "🌟",
      desc: "Place value up to 100, 2x 5x 10x tables, fractions, and money.",
      href: "/year2",
      color: "border-emerald-200 hover:border-emerald-400 bg-white shadow-xs",
      btnColor: "bg-emerald-600 hover:bg-emerald-700",
    },
    {
      title: "Year 3 Maths",
      age: "Age 7-8",
      icon: "📐",
      desc: "3-digit numbers, 3x 4x 8x tables, column addition, and telling time.",
      href: "/year3",
      color: "border-amber-200 hover:border-amber-400 bg-white shadow-xs",
      btnColor: "bg-amber-600 hover:bg-amber-700",
    },
    {
      title: "Year 4 Maths",
      age: "Age 8-9",
      icon: "🚀",
      desc: "4-digit place value, 11x & 12x tables, decimals, perimeter, and 24-hr time.",
      href: "/year4",
      color: "border-purple-200 hover:border-purple-400 bg-white shadow-xs",
      btnColor: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Year 5 Maths",
      age: "Age 9-10",
      icon: "⚡",
      desc: "6-digit place value, Roman numerals, prime numbers, volume, and statistics.",
      href: "/year5",
      color: "border-rose-200 hover:border-rose-400 bg-white shadow-xs",
      btnColor: "bg-rose-600 hover:bg-rose-700",
    },
    {
      title: "Year 6 Maths",
      age: "Age 10-11",
      icon: "🎓",
      desc: "Advanced SATs preparation, algebra, ratio, proportion, and four operations.",
      href: "/year6",
      color: "border-indigo-200 hover:border-indigo-400 bg-white shadow-xs",
      btnColor: "bg-indigo-600 hover:bg-indigo-700",
    },
    {
      title: "Times Tables (1-12)",
      age: "All Ages",
      icon: "✖️",
      desc: "Interactive multiplication practice for every table from 1 to 12.",
      href: "/times-tables",
      color: "border-teal-200 hover:border-teal-400 bg-white shadow-xs",
      btnColor: "bg-teal-600 hover:bg-teal-700",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div className="max-w-4xl mx-auto w-full pt-2">
        
        {/* Top Header Navigation with Profile Link */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
            Frankinstant-Edu Portal
          </span>
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-500 text-indigo-700 font-bold rounded-xl text-sm transition shadow-2xs"
          >
            👤 My Profile & Stats
          </Link>
        </div>

        {/* Stylish Brand Header */}
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-3 shadow-2xs">
            ✨ Interactive Learning Portal
          </span>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-2">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600">Frankinstant-Edu</span>
          </h1>
          
          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl mx-auto italic">
            &ldquo;Building confidence and mastery, one equation at a time.&rdquo;
          </p>
        </div>

        {/* Year Selection & Times Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8">
          {years.map((year) => (
            <div
              key={year.href}
              className={`p-5 rounded-2xl border-2 transition-all hover:shadow-md ${year.color} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{year.icon}</span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {year.age}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  {year.title}
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mb-5 leading-relaxed">{year.desc}</p>
              </div>

              <Link
                href={year.href}
                className={`w-full py-2.5 text-center text-white text-sm font-semibold rounded-xl shadow-xs transition block ${year.btnColor}`}
              >
                Explore Topics ➔
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs font-medium text-slate-400 py-4 border-t border-slate-200">
        © {new Date().getFullYear()} Frankinstant-Edu. All rights reserved.
      </footer>
    </main>
  );
}