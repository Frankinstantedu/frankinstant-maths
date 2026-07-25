import Link from "next/link";

export default function Year5Hub() {
  const topics = [
    {
      title: "Place Value & Roman Numerals",
      desc: "Numbers up to 1,000,000, rounding to the nearest 10, 100, 1,000, 10,000 and 100,000, and Roman numerals to 1,000.",
      href: "/year5/place-value",
      icon: "🔢",
      color: "border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/40",
      btnColor: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30",
    },
    {
      title: "Addition & Subtraction",
      desc: "Multi-step addition and subtraction word problems, inverse operations, and mental calculation strategies.",
      href: "/year5/addition-subtraction",
      icon: "📈",
      color: "border-sky-500/40 hover:border-sky-400 bg-sky-950/40",
      btnColor: "bg-sky-600 hover:bg-sky-500 shadow-sky-600/30",
    },
    {
      title: "Multiplication & Division",
      desc: "Multiples, factors, prime numbers up to 100, square numbers, cube numbers, and multiplying by 10, 100, and 1,000.",
      href: "/year5/multiplication-division",
      icon: "⚡",
      color: "border-amber-500/40 hover:border-amber-400 bg-amber-950/40",
      btnColor: "bg-amber-600 hover:bg-amber-500 shadow-amber-600/30",
    },
    {
      title: "Fractions, Decimals & Percentages",
      desc: "Improper fractions and mixed numbers, equivalent fractions, rounding decimals, and percentage equivalents.",
      href: "/year5/fractions-decimals",
      icon: "🍕",
      color: "border-purple-500/40 hover:border-purple-400 bg-purple-950/40",
      btnColor: "bg-purple-600 hover:bg-purple-500 shadow-purple-600/30",
    },
    {
      title: "Measurement & Volume",
      desc: "Converting metric units, calculating area of compound shapes, and estimating volume (cubes/boxes) and capacity.",
      href: "/year5/measurement",
      icon: "📏",
      color: "border-rose-500/40 hover:border-rose-400 bg-rose-950/40",
      btnColor: "bg-rose-600 hover:bg-rose-500 shadow-rose-600/30",
    },
    {
      title: "Properties of Shapes",
      desc: "Identifying 3D shapes from 2D representations, estimating and measuring angles in degrees, and finding missing angles.",
      href: "/year5/properties-shape",
      icon: "📐",
      color: "border-teal-500/40 hover:border-teal-400 bg-teal-950/40",
      btnColor: "bg-teal-600 hover:bg-teal-500 shadow-teal-600/30",
    },
    {
      title: "Position & Direction",
      desc: "Identifying, describing, and representing the position of shapes following translations and reflections.",
      href: "/year5/position-direction",
      icon: "🗺️",
      color: "border-indigo-500/40 hover:border-indigo-400 bg-indigo-950/40",
      btnColor: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30",
    },
    {
      title: "Statistics",
      desc: "Solving comparison, sum, and difference problems using information presented in line graphs, timetables, and tables.",
      href: "/year5/statistics",
      icon: "📊",
      color: "border-violet-500/40 hover:border-violet-400 bg-violet-950/40",
      btnColor: "bg-violet-600 hover:bg-violet-500 shadow-violet-600/30",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 p-4 sm:p-8 flex flex-col justify-between relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Decorative Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Navigation & Header */}
        <div className="mb-8 pt-2">
          <Link
            href="/classes"
            className="inline-flex items-center text-sm font-semibold text-teal-400 hover:underline mb-6 transition"
          >
            ← Back to All Years
          </Link>
          
          <div className="text-center">
            <span className="inline-block text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full mb-3 shadow-lg backdrop-blur-md">
              Frankinstant-Edu • Year 5 Curriculum
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
              Year 5 Maths Hub 🌟
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
              Ages 9–10. Choose a topic below to start interactive practice and sharpen your math skills!
            </p>
          </div>
        </div>

        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {topics.map((t, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border-2 transition-all shadow-xl backdrop-blur-xl ${t.color} flex flex-col justify-between hover:shadow-2xl`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{t.icon}</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-900/80 text-slate-300 border border-slate-700 shadow-md">
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
      <footer className="text-center text-xs font-semibold text-slate-400 py-6 border-t border-slate-800 relative z-10">
        © {new Date().getFullYear()} Frankinstant-Edu. Empowering Primary Mathematics Excellence.
      </footer>
    </main>
  );
}