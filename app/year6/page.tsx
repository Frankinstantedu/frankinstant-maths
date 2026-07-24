import Link from "next/link";

export default function Year6Hub() {
  const topics = [
    {
      title: "Place Value & Advanced Numbers",
      desc: "Numbers up to 10,000,000, negative numbers in context, rounding any number, and multi-step word problems.",
      href: "/year6/place-value",
      icon: "🔢",
      color: "border-emerald-200 hover:border-emerald-500 bg-emerald-50/50",
      btnColor: "bg-emerald-600 hover:bg-emerald-700",
    },
    {
      title: "Four Operations & Arithmetic",
      desc: "Long division with multi-digit numbers, order of operations (BIDMAS/BODMAS), common factors, and prime numbers.",
      href: "/year6/operations",
      icon: "⚡",
      color: "border-sky-200 hover:border-sky-500 bg-sky-50/50",
      btnColor: "bg-sky-600 hover:bg-sky-700",
    },
    {
      title: "Fractions, Decimals & Percentages",
      desc: "Adding and subtracting unlike fractions, multiplying proper fractions by whole numbers, dividing fractions, and calculating percentages.",
      href: "/year6/fractions",
      icon: "🍕",
      color: "border-purple-200 hover:border-purple-500 bg-purple-50/50",
      btnColor: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Algebra",
      desc: "Expressing missing number problems algebraically, using simple formulae, finding pairs of unknowns, and linear number sequences.",
      href: "/year6/algebra",
      icon: "🧮",
      color: "border-amber-200 hover:border-amber-500 bg-amber-50/50",
      btnColor: "bg-amber-600 hover:bg-amber-700",
    },
    {
      title: "Ratio, Proportion & Scaling",
      desc: "Solving relative size problems using multiplication/division facts, unequal sharing, and scale factors.",
      href: "/year6/ratio-proportion",
      icon: "⚖️",
      color: "border-rose-200 hover:border-rose-500 bg-rose-50/50",
      btnColor: "bg-rose-600 hover:bg-rose-700",
    },
    {
      title: "Measurement & Geometry",
      desc: "Calculating area of parallelograms and triangles, volume of cuboids, drawing shapes accurately, and calculating missing angles.",
      href: "/year6/geometry",
      icon: "📐",
      color: "border-teal-200 hover:border-teal-500 bg-teal-50/50",
      btnColor: "bg-teal-600 hover:bg-teal-700",
    },
    {
      title: "Position & Direction",
      desc: "Describing positions on the full coordinate grid (all four quadrants) and translating/reflecting shapes.",
      href: "/year6/position-direction",
      icon: "🧭",
      color: "border-indigo-200 hover:border-indigo-500 bg-indigo-50/50",
      btnColor: "bg-indigo-600 hover:bg-indigo-700",
    },
    {
      title: "Statistics",
      desc: "Constructing and interpreting pie charts, line graphs, and calculating the mean average as a statistical measure.",
      href: "/year6/statistics",
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
            <span className="inline-block text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3 shadow-2xs">
              Frankinstant-Edu • Year 6 Curriculum
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
              Year 6 Maths Hub 🎓
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Ages 10–11. Advanced SATs-level preparation across core upper-primary concepts.
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