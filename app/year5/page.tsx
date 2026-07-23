import Link from "next/link";

export default function Year5Hub() {
  const topics = [
    {
      title: "Place Value & Roman Numerals",
      desc: "Numbers up to 1,000,000, rounding to the nearest 10, 100, 1,000, 10,000 and 100,000, and Roman numerals to 1,000.",
      href: "/year5/place-value",
      icon: "🔢",
      color: "border-emerald-200 hover:border-emerald-500 bg-emerald-50/50",
      btnColor: "bg-emerald-600 hover:bg-emerald-700",
    },
    {
      title: "Addition & Subtraction",
      desc: "Multi-step addition and subtraction word problems, inverse operations, and mental calculation strategies.",
      href: "/year5/addition-subtraction",
      icon: "📈",
      color: "border-sky-200 hover:border-sky-500 bg-sky-50/50",
      btnColor: "bg-sky-600 hover:bg-sky-700",
    },
    {
      title: "Multiplication & Division",
      desc: "Multiples, factors, prime numbers up to 100, square numbers, cube numbers, and multiplying by 10, 100, and 1,000.",
      href: "/year5/multiplication-division",
      icon: "⚡",
      color: "border-amber-200 hover:border-amber-500 bg-amber-50/50",
      btnColor: "bg-amber-600 hover:bg-amber-700",
    },
    {
      title: "Fractions, Decimals & Percentages",
      desc: "Improper fractions and mixed numbers, equivalent fractions, rounding decimals, and percentage equivalents.",
      href: "/year5/fractions-decimals",
      icon: "🍕",
      color: "border-purple-200 hover:border-purple-500 bg-purple-50/50",
      btnColor: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Measurement & Volume",
      desc: "Converting metric units, calculating area of compound shapes, and estimating volume (cubes/boxes) and capacity.",
      href: "/year5/measurement",
      icon: "📏",
      color: "border-rose-200 hover:border-rose-500 bg-rose-50/50",
      btnColor: "bg-rose-600 hover:bg-rose-700",
    },
    {
      title: "Properties of Shapes",
      desc: "Identifying 3D shapes from 2D representations, estimating and measuring angles in degrees, and finding missing angles.",
      href: "/year5/properties-shape",
      icon: "📐",
      color: "border-teal-200 hover:border-teal-500 bg-teal-50/50",
      btnColor: "bg-teal-600 hover:bg-teal-700",
    },
    {
      title: "Position & Direction",
      desc: "Identifying, describing, and representing the position of shapes following translations and reflections.",
      href: "/year5/position-direction",
      icon: "🗺️",
      color: "border-indigo-200 hover:border-indigo-500 bg-indigo-50/50",
      btnColor: "bg-indigo-600 hover:bg-indigo-700",
    },
    {
      title: "Statistics",
      desc: "Solving comparison, sum, and difference problems using information presented in line graphs, timetables, and tables.",
      href: "/year5/statistics",
      icon: "📊",
      color: "border-violet-200 hover:border-violet-500 bg-violet-50/50",
      btnColor: "bg-violet-600 hover:bg-violet-700",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <div className="max-w-5xl mx-auto w-full">
        {/* Navigation & Header */}
        <div className="mb-8 pt-2">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-indigo-600 mb-6 transition"
          >
            ← Back to All Years
          </Link>
          
          <div className="text-center">
            <span className="inline-block text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3 shadow-2xs">
              Frankinstant-Edu • Year 5 Curriculum
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
              Year 5 Maths Hub 🌟
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Ages 9–10. Choose a topic below to start interactive practice and sharpen your math skills!
            </p>
          </div>
        </div>

        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {topics.map((t, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border-2 transition-all hover:shadow-md ${t.color} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{t.icon}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white text-slate-700 border border-slate-200 shadow-2xs">
                    Topic {idx + 1}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  {t.title}
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
                  {t.desc}
                </p>
              </div>

              <Link
                href={t.href}
                className={`w-full py-3 text-center text-white text-sm font-bold rounded-xl shadow-xs transition block ${t.btnColor}`}
              >
                Start Practice ➔
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs font-semibold text-slate-400 py-6 border-t border-slate-200">
        © {new Date().getFullYear()} Frankinstant-Edu. Empowering Primary Mathematics Excellence.
      </footer>
    </main>
  );
}