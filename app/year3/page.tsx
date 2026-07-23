import Link from "next/link";

export default function Year3Hub() {
  const topics = [
    {
      title: "Addition & Subtraction",
      icon: "📈",
      desc: "3-digit addition and subtraction practice.",
      href: "/year3/addition-subtraction",
      color: "border-emerald-200 hover:border-emerald-500 bg-emerald-50/50",
      btnColor: "bg-emerald-600 hover:bg-emerald-700",
      badge: "📈 Calculations",
    },
    {
      title: "Multiplication & Division",
      icon: "✖️",
      desc: "Master 3x, 4x, and 8x tables and division facts.",
      href: "/year3/multiplication-division",
      color: "border-amber-200 hover:border-amber-500 bg-amber-50/50",
      btnColor: "bg-amber-600 hover:bg-amber-700",
      badge: "⚡ Multiplication",
    },
    {
      title: "Fractions",
      icon: "🍕",
      desc: "Fractions of amounts, equivalence, and addition/subtraction.",
      href: "/year3/fractions",
      color: "border-sky-200 hover:border-sky-500 bg-sky-50/50",
      btnColor: "bg-sky-600 hover:bg-sky-700",
      badge: "🍕 Fractions",
    },
    {
      title: "Place Value",
      icon: "🔢",
      desc: "3-digit numbers, partitioning, and counting in steps.",
      href: "/year3/place-value",
      color: "border-purple-200 hover:border-purple-500 bg-purple-50/50",
      btnColor: "bg-purple-600 hover:bg-purple-700",
      badge: "🔢 Place Value",
    },
    {
      title: "Measurement & Time",
      icon: "⏰",
      desc: "Clocks, length, mass, capacity, and perimeters.",
      href: "/year3/measurement-time",
      color: "border-rose-200 hover:border-rose-500 bg-rose-50/50",
      btnColor: "bg-rose-600 hover:bg-rose-700",
      badge: "⏰ Measurement",
    },
    {
      title: "Shapes & Geometry",
      icon: "📐",
      desc: "2D/3D shape properties, angles, and line types.",
      href: "/year3/shapes-geometry",
      color: "border-teal-200 hover:border-teal-500 bg-teal-50/50",
      btnColor: "bg-teal-600 hover:bg-teal-700",
      badge: "📐 Geometry",
    },
    {
      title: "Statistics & Data",
      icon: "📊",
      desc: "Bar charts, pictograms, tally charts, and data tables.",
      href: "/year3/statistics",
      color: "border-indigo-200 hover:border-indigo-500 bg-indigo-50/50",
      btnColor: "bg-indigo-600 hover:bg-indigo-700",
      badge: "📊 Data",
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
              Year 3 Maths Hub 🚀
            </h1>
            <p className="text-slate-600">
              Pick a topic to start practicing key Year 3 skills!
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