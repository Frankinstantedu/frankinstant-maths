import Link from "next/link";

export default function Year2Hub() {
  const topics = [
    {
      title: "Times Tables (2, 5, 10)",
      icon: "✖️",
      desc: "Master 2x, 5x, and 10x multiplication facts!",
      href: "/year2/multiplication",
      color: "border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/40",
      btnColor: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30",
      badge: "⚡ Multiplication",
    },
    {
      title: "Fractions (1/2, 1/4, 3/4)",
      icon: "🍕",
      desc: "Find halves and quarters of shapes and numbers.",
      href: "/year2/fractions",
      color: "border-blue-500/40 hover:border-blue-400 bg-blue-950/40",
      btnColor: "bg-blue-600 hover:bg-blue-500 shadow-blue-600/30",
      badge: "🍕 Visual Math",
    },
    {
      title: "Place Value (Tens & Ones)",
      icon: "🔢",
      desc: "Partition 2-digit numbers into tens and ones.",
      href: "/year2/place-value",
      color: "border-amber-500/40 hover:border-amber-400 bg-amber-950/40",
      btnColor: "bg-amber-600 hover:bg-amber-500 shadow-amber-600/30",
      badge: "🔢 Numbers",
    },
    {
      title: "Addition & Subtraction",
      icon: "➕",
      desc: "2-digit math, adding tens, and bonds to 20 & 100.",
      href: "/year2/addition-subtraction",
      color: "border-rose-500/40 hover:border-rose-400 bg-rose-950/40",
      btnColor: "bg-rose-600 hover:bg-rose-500 shadow-rose-600/30",
      badge: "➕ Calculations",
    },
    {
      title: "Money (Pounds & Pence)",
      icon: "🪙",
      desc: "Count coins, combine amounts, and find change from 50p or £1.",
      href: "/year2/money",
      color: "border-purple-500/40 hover:border-purple-400 bg-purple-950/40",
      btnColor: "bg-purple-600 hover:bg-purple-500 shadow-purple-600/30",
      badge: "🪙 Real World",
    },
    {
      title: "Tell the Time",
      icon: "⏰",
      desc: "Read o'clock, half past, quarter past, and quarter to.",
      href: "/year2/time",
      color: "border-teal-500/40 hover:border-teal-400 bg-teal-950/40",
      btnColor: "bg-teal-600 hover:bg-teal-500 shadow-teal-600/30",
      badge: "⏰ Clock Skills",
    },
    {
      title: "2D & 3D Shapes",
      icon: "📐",
      desc: "Identify sides, vertices, faces, and properties of shapes.",
      href: "/year2/shapes",
      color: "border-indigo-500/40 hover:border-indigo-400 bg-indigo-950/40",
      btnColor: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30",
      badge: "📐 Geometry",
    },
    {
      title: "Measurement",
      icon: "📏",
      desc: "Measure and compare length, mass, volume, and temperature.",
      href: "/year2/measurement",
      color: "border-cyan-500/40 hover:border-cyan-400 bg-cyan-950/40",
      btnColor: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/30",
      badge: "📏 Units & Scale",
    },
    {
      title: "Statistics & Charts",
      icon: "📊",
      desc: "Read tally charts, pictograms, and simple block diagrams.",
      href: "/year2/statistics",
      color: "border-violet-500/40 hover:border-violet-400 bg-violet-950/40",
      btnColor: "bg-violet-600 hover:bg-violet-500 shadow-violet-600/30",
      badge: "📊 Data",
    },
    {
      title: "Position & Direction",
      icon: "🧭",
      desc: "Understand turns (quarter, half, full) and clockwise movement.",
      href: "/year2/position",
      color: "border-orange-500/40 hover:border-orange-400 bg-orange-950/40",
      btnColor: "bg-orange-600 hover:bg-orange-500 shadow-orange-600/30",
      badge: "🧭 Movement",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 p-4 sm:p-8 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Decorative Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <Link
              href="/classes"
              className="text-sm font-bold text-teal-400 hover:underline transition"
            >
              ← Back to Main Menu
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-2 tracking-tight">
              Year 2 Maths Hub 🚀
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Pick a topic to start practicing key Year 2 skills!
            </p>
          </div>
          <div className="text-5xl bg-slate-900/80 p-3 rounded-2xl border border-slate-700/80 shadow-lg backdrop-blur-md">📚</div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.href}
              className={`p-6 rounded-3xl border-2 transition-all shadow-xl backdrop-blur-xl ${topic.color} flex flex-col justify-between hover:shadow-2xl`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{topic.icon}</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-900/80 text-slate-300 border border-slate-700 shadow-md">
                    {topic.badge}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  {topic.title}
                </h2>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">{topic.desc}</p>
              </div>

              <Link
                href={topic.href}
                className={`w-full py-3 text-center text-white font-bold rounded-xl shadow-lg transition block ${topic.btnColor}`}
              >
                Start Practice ➔
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}