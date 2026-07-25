import Link from "next/link";

export default function Year1Page() {
  const topics = [
    {
      title: "Addition",
      desc: "Practise adding numbers with fun objects and simple equations.",
      href: "/year1/addition",
      icon: "➕",
      color: "border-sky-500/40 hover:border-sky-400 bg-sky-950/40",
      btnColor: "bg-sky-600 hover:bg-sky-500 shadow-sky-600/30",
    },
    {
      title: "Subtraction",
      desc: "Learn to subtract numbers and understand take-away concepts.",
      href: "/year1/subtraction",
      icon: "➖",
      color: "border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/40",
      btnColor: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30",
    },
    {
      title: "Multiplication",
      desc: "Practise early times tables and counting in groups.",
      href: "/year1/multiplication",
      icon: "✖️",
      color: "border-purple-500/40 hover:border-purple-400 bg-purple-950/40",
      btnColor: "bg-purple-600 hover:bg-purple-500 shadow-purple-600/30",
    },
    {
      title: "Number Bonds",
      desc: "Build number confidence with bonds to 10 and 20.",
      href: "/year1/number-bonds",
      icon: "🔢",
      color: "border-amber-500/40 hover:border-amber-400 bg-amber-950/40",
      btnColor: "bg-amber-600 hover:bg-amber-500 shadow-amber-600/30",
    },
    {
      title: "Place Value",
      desc: "Understand tens and ones up to 100.",
      href: "/year1/place-value",
      icon: "🔟",
      color: "border-rose-500/40 hover:border-rose-400 bg-rose-950/40",
      btnColor: "bg-rose-600 hover:bg-rose-500 shadow-rose-600/30",
    },
    {
      title: "Fractions",
      desc: "Learn simple parts of shapes and numbers like halves and quarters.",
      href: "/year1/fractions",
      icon: "🍕",
      color: "border-teal-500/40 hover:border-teal-400 bg-teal-950/40",
      btnColor: "bg-teal-600 hover:bg-teal-500 shadow-teal-600/30",
    },
    {
      title: "Measurement",
      desc: "Explore length, mass, and capacity using standard units.",
      href: "/year1/measurement",
      icon: "📏",
      color: "border-indigo-500/40 hover:border-indigo-400 bg-indigo-950/40",
      btnColor: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30",
    },
    {
      title: "Time",
      desc: "Learn to read clocks, days of the week, and months of the year.",
      href: "/year1/time",
      icon: "🕒",
      color: "border-violet-500/40 hover:border-violet-400 bg-violet-950/40",
      btnColor: "bg-violet-600 hover:bg-violet-500 shadow-violet-600/30",
    },
    {
      title: "Money",
      desc: "Recognise coins and practise using money in simple contexts.",
      href: "/year1/money",
      icon: "💷",
      color: "border-blue-500/40 hover:border-blue-400 bg-blue-950/40",
      btnColor: "bg-blue-600 hover:bg-blue-500 shadow-blue-600/30",
    },
    {
      title: "Mixed Test",
      desc: "Test all Year 1 foundational maths skills in a single challenge.",
      href: "/year1/mixed-test",
      icon: "📝",
      color: "border-pink-500/40 hover:border-pink-400 bg-pink-950/40",
      btnColor: "bg-pink-600 hover:bg-pink-500 shadow-pink-600/30",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 p-4 sm:p-8 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* Decorative Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Navigation & Header */}
        <div className="mb-8 pt-2">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-semibold text-teal-400 hover:underline transition"
            >
              ← Back to All Years
            </Link>

            <Link
              href="/profile"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-950/80 border-2 border-indigo-700/80 hover:border-indigo-500 text-indigo-300 font-bold rounded-xl text-sm transition shadow-lg backdrop-blur-md"
            >
              👤 My Profile & Stats
            </Link>
          </div>

          <div className="text-center">
            <span className="inline-block text-xs font-bold tracking-widest text-teal-300 uppercase bg-teal-950/80 border border-teal-800/80 px-3 py-1 rounded-full mb-3 shadow-lg backdrop-blur-md">
              Frankinstant-Edu • Year 1 Curriculum
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
              Year 1 Maths Hub 🎈
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Ages 5–6. Fun foundational practice across early primary concepts.
            </p>
          </div>
        </div>

        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {topics.map((t, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border-2 transition-all hover:shadow-2xl backdrop-blur-xl ${t.color} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{t.icon}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-900/80 text-slate-300 border border-slate-700 shadow-md">
                    Topic {idx + 1}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  {t.title}
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
                  {t.desc}
                </p>
              </div>

              <Link
                href={t.href}
                className={`w-full py-3 text-center text-white text-sm font-bold rounded-xl shadow-lg transition block ${t.btnColor}`}
              >
                Start Practice ➔
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs font-semibold text-slate-400 py-6 border-t border-slate-800/80 relative z-10">
        © {new Date().getFullYear()} Frankinstant-Edu. Empowering Primary Mathematics Excellence.
      </footer>
    </main>
  );
}