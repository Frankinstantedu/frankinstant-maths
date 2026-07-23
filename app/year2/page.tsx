import Link from "next/link";

export default function Year2Hub() {
  const topics = [
    {
      title: "Times Tables (2, 5, 10)",
      icon: "✖️",
      desc: "Master 2x, 5x, and 10x multiplication facts!",
      href: "/year2/multiplication",
      color: "border-emerald-200 hover:border-emerald-500 bg-emerald-50/50",
      btnColor: "bg-emerald-600 hover:bg-emerald-700",
      badge: "⚡ Multiplication",
    },
    {
      title: "Fractions (1/2, 1/4, 3/4)",
      icon: "🍕",
      desc: "Find halves and quarters of shapes and numbers.",
      href: "/year2/fractions",
      color: "border-blue-200 hover:border-blue-500 bg-blue-50/50",
      btnColor: "bg-blue-600 hover:bg-blue-700",
      badge: "🍕 Visual Math",
    },
    {
      title: "Place Value (Tens & Ones)",
      icon: "🔢",
      desc: "Partition 2-digit numbers into tens and ones.",
      href: "/year2/place-value",
      color: "border-amber-200 hover:border-amber-500 bg-amber-50/50",
      btnColor: "bg-amber-600 hover:bg-amber-700",
      badge: "🔢 Numbers",
    },
    {
      title: "Addition & Subtraction",
      icon: "➕",
      desc: "2-digit math, adding tens, and bonds to 20 & 100.",
      href: "/year2/addition-subtraction",
      color: "border-rose-200 hover:border-rose-500 bg-rose-50/50",
      btnColor: "bg-rose-600 hover:bg-rose-700",
      badge: "➕ Calculations",
    },
    {
      title: "Money (Pounds & Pence)",
      icon: "🪙",
      desc: "Count coins, combine amounts, and find change from 50p or £1.",
      href: "/year2/money",
      color: "border-purple-200 hover:border-purple-500 bg-purple-50/50",
      btnColor: "bg-purple-600 hover:bg-purple-700",
      badge: "🪙 Real World",
    },
    {
      title: "Tell the Time",
      icon: "⏰",
      desc: "Read o'clock, half past, quarter past, and quarter to.",
      href: "/year2/time",
      color: "border-teal-200 hover:border-teal-500 bg-teal-50/50",
      btnColor: "bg-teal-600 hover:bg-teal-700",
      badge: "⏰ Clock Skills",
    },
    {
      title: "2D & 3D Shapes",
      icon: "📐",
      desc: "Identify sides, vertices, faces, and properties of shapes.",
      href: "/year2/shapes",
      color: "border-indigo-200 hover:border-indigo-500 bg-indigo-50/50",
      btnColor: "bg-indigo-600 hover:bg-indigo-700",
      badge: "📐 Geometry",
    },
    {
      title: "Measurement",
      icon: "📏",
      desc: "Measure and compare length, mass, volume, and temperature.",
      href: "/year2/measurement",
      color: "border-cyan-200 hover:border-cyan-500 bg-cyan-50/50",
      btnColor: "bg-cyan-600 hover:bg-cyan-700",
      badge: "📏 Units & Scale",
    },
    {
      title: "Statistics & Charts",
      icon: "📊",
      desc: "Read tally charts, pictograms, and simple block diagrams.",
      href: "/year2/statistics",
      color: "border-violet-200 hover:border-violet-500 bg-violet-50/50",
      btnColor: "bg-violet-600 hover:bg-violet-700",
      badge: "📊 Data",
    },
    {
      title: "Position & Direction",
      icon: "🧭",
      desc: "Understand turns (quarter, half, full) and clockwise movement.",
      href: "/year2/position",
      color: "border-orange-200 hover:border-orange-500 bg-orange-50/50",
      btnColor: "bg-orange-600 hover:bg-orange-700",
      badge: "🧭 Movement",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/"
              className="text-sm font-bold text-slate-500 hover:text-slate-800 transition"
            >
              ← Back to Main Menu
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
              Year 2 Maths Hub 🚀
            </h1>
            <p className="text-slate-600">
              Pick a topic to start practicing key Year 2 skills!
            </p>
          </div>
          <div className="text-5xl">📚</div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.href}
              className={`p-6 rounded-3xl border-2 transition-all shadow-sm hover:shadow-md ${topic.color} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{topic.icon}</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200">
                    {topic.badge}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  {topic.title}
                </h2>
                <p className="text-slate-600 text-sm mb-6">{topic.desc}</p>
              </div>

              <Link
                href={topic.href}
                className={`w-full py-3 text-center text-white font-bold rounded-xl shadow-sm transition block ${topic.btnColor}`}
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