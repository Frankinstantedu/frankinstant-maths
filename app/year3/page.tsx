import Link from "next/link";

export default function Year3Hub() {
  const topics = [
    {
      title: "Addition & Subtraction",
      icon: "📈",
      desc: "3-digit addition and subtraction practice.",
      href: "/year3/addition-subtraction",
      color: "border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/40",
      btnColor: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30",
      badge: "📈 Calculations",
    },
    {
      title: "Multiplication & Division",
      icon: "✖️",
      desc: "Master 3x, 4x, and 8x tables and division facts.",
      href: "/year3/multiplication-division",
      color: "border-amber-500/40 hover:border-amber-400 bg-amber-950/40",
      btnColor: "bg-amber-600 hover:bg-amber-500 shadow-amber-600/30",
      badge: "⚡ Multiplication",
    },
    {
      title: "Fractions",
      icon: "🍕",
      desc: "Fractions of amounts, equivalence, and addition/subtraction.",
      href: "/year3/fractions",
      color: "border-sky-500/40 hover:border-sky-400 bg-sky-950/40",
      btnColor: "bg-sky-600 hover:bg-sky-500 shadow-sky-600/30",
      badge: "🍕 Fractions",
    },
    {
      title: "Place Value",
      icon: "🔢",
      desc: "3-digit numbers, partitioning, and counting in steps.",
      href: "/year3/place-value",
      color: "border-purple-500/40 hover:border-purple-400 bg-purple-950/40",
      btnColor: "bg-purple-600 hover:bg-purple-500 shadow-purple-600/30",
      badge: "🔢 Place Value",
    },
    {
      title: "Measurement & Time",
      icon: "⏰",
      desc: "Clocks, length, mass, capacity, and perimeters.",
      href: "/year3/measurement-time",
      color: "border-rose-500/40 hover:border-rose-400 bg-rose-950/40",
      btnColor: "bg-rose-600 hover:bg-rose-500 shadow-rose-600/30",
      badge: "⏰ Measurement",
    },
    {
      title: "Shapes & Geometry",
      icon: "📐",
      desc: "2D/3D shape properties, angles, and line types.",
      href: "/year3/shapes-geometry",
      color: "border-teal-500/40 hover:border-teal-400 bg-teal-950/40",
      btnColor: "bg-teal-600 hover:bg-teal-500 shadow-teal-600/30",
      badge: "📐 Geometry",
    },
    {
      title: "Statistics & Data",
      icon: "📊",
      desc: "Bar charts, pictograms, tally charts, and data tables.",
      href: "/year3/statistics",
      color: "border-indigo-500/40 hover:border-indigo-400 bg-indigo-950/40",
      btnColor: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30",
      badge: "📊 Data",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 p-4 sm:p-8 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Decorative Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
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
              Year 3 Maths Hub 🚀
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Pick a topic to start practicing key Year 3 skills!
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