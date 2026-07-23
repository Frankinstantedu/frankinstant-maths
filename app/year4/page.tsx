import Link from "next/link";

export default function Year4Hub() {
  const topics = [
    {
      title: "Place Value & Negatives",
      icon: "🔢",
      desc: "4-digit numbers, rounding, negative temperatures, and Roman numerals.",
      href: "/year4/place-value",
      color: "border-purple-200 hover:border-purple-500 bg-purple-50/50",
      btnColor: "bg-purple-600 hover:bg-purple-700",
      badge: "🔢 Place Value",
    },
    {
      title: "Addition & Subtraction",
      icon: "📈",
      desc: "4-digit column addition & subtraction and multi-step word problems.",
      href: "/year4/addition-subtraction",
      color: "border-emerald-200 hover:border-emerald-500 bg-emerald-50/50",
      btnColor: "bg-emerald-600 hover:bg-emerald-700",
      badge: "📈 Calculations",
    },
    {
      title: "Multiplication & Division",
      icon: "✖️",
      desc: "11x & 12x tables, factor pairs, multiplying 3-digits by 1-digit.",
      href: "/year4/multiplication",
      color: "border-amber-200 hover:border-amber-500 bg-amber-50/50",
      btnColor: "bg-amber-600 hover:bg-amber-700",
      badge: "⚡ Multiplication",
    },
    {
      title: "Fractions & Decimals",
      icon: "🍕",
      desc: "Equivalent fractions, hundredths, tenths, and dividing by 10/100.",
      href: "/year4/fractions-decimals",
      color: "border-sky-200 hover:border-sky-500 bg-sky-50/50",
      btnColor: "bg-sky-600 hover:bg-sky-700",
      badge: "🍕 Fractions",
    },
    {
      title: "Measurement & Money",
      icon: "📏",
      desc: "Unit conversions (km, m, g, kg), rectilinear perimeters, and money.",
      href: "/year4/measurement-money",
      color: "border-rose-200 hover:border-rose-500 bg-rose-50/50",
      btnColor: "bg-rose-600 hover:bg-rose-700",
      badge: "📏 Measurement",
    },
    {
      title: "Time (12 & 24 Hour)",
      icon: "⏱️",
      desc: "Converting 12-hour to 24-hour clock, durations, and seconds.",
      href: "/year4/time",
      color: "border-orange-200 hover:border-orange-500 bg-orange-50/50",
      btnColor: "bg-orange-600 hover:bg-orange-700",
      badge: "⏱️ Time",
    },
    {
      title: "Geometry & Symmetry",
      icon: "📐",
      desc: "Triangles, quadrilaterals, acute/obtuse angles, and coordinates.",
      href: "/year4/geometry",
      color: "border-teal-200 hover:border-teal-500 bg-teal-50/50",
      btnColor: "bg-teal-600 hover:bg-teal-700",
      badge: "📐 Geometry",
    },
    {
      title: "Statistics & Area",
      icon: "📊",
      desc: "Line graphs, comparison charts, and calculating area by counting squares.",
      href: "/year4/statistics-area",
      color: "border-indigo-200 hover:border-indigo-500 bg-indigo-50/50",
      btnColor: "bg-indigo-600 hover:bg-indigo-700",
      badge: "📊 Data & Area",
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
              Year 4 Maths Hub 🚀
            </h1>
            <p className="text-slate-600">
              Master advanced 4-digit calculations, decimals, 24-hour time, and geometry!
            </p>
          </div>
          <div className="text-5xl">🎓</div>
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