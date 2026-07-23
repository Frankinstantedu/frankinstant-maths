import Link from "next/link";

const FUTURE_YEARS = [
  { year: "Year 3", icon: "📙", color: "border-amber-200" },
  { year: "Year 4", icon: "📕", color: "border-rose-200" },
  { year: "Year 5", icon: "📒", color: "border-yellow-200" },
  { year: "Year 6", icon: "📓", color: "border-purple-200" },
  { year: "Year 7", icon: "📔", color: "border-cyan-200" },
  { year: "Year 8", icon: "📚", color: "border-slate-200" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50/50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* --- HERO HEADER --- */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 font-semibold px-4 py-1.5 rounded-full text-sm shadow-sm">
            🚀 Interactive Maths Learning
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
            FrankInstant <span className="text-blue-600">Edu</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Choose your year group to start practicing interactive math exercises!
          </p>
        </header>

        {/* --- YEAR GROUP CARDS GRID --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* YEAR 1 (ACTIVE CARD) */}
          <Link
            href="/year1"
            className="group relative bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border-2 border-blue-400 flex flex-col justify-between"
          >
            <span className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-300">
              Active ✨
            </span>

            <div className="space-y-4 text-center mt-2">
              <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                📘
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Year 1</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Addition, subtraction, time, money, and measurement practice.
              </p>
            </div>

            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md group-hover:shadow-blue-200 transition-all text-sm">
              Start Learning ➔
            </button>
          </Link>

          {/* YEAR 2 (ACTIVE CARD) */}
          <Link
            href="/year2"
            className="group relative bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border-2 border-emerald-400 flex flex-col justify-between"
          >
            <span className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-300">
              Active ✨
            </span>

            <div className="space-y-4 text-center mt-2">
              <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                📗
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Year 2</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Times tables (2, 5, 10), fractions, place value, and subtraction.
              </p>
            </div>

            <button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md group-hover:shadow-emerald-200 transition-all text-sm">
              Start Learning ➔
            </button>
          </Link>

          {/* YEARS 3 - 8 (COMING SOON CARDS) */}
          {FUTURE_YEARS.map((item) => (
            <div
              key={item.year}
              className={`relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm border ${item.color} flex flex-col justify-between opacity-70 hover:opacity-95 transition-opacity`}
            >
              <span className="absolute top-4 right-4 bg-slate-100 text-slate-500 text-xs font-medium px-2.5 py-1 rounded-full">
                Soon
              </span>

              <div className="space-y-3 text-center mt-2">
                <div className="text-6xl grayscale group-hover:grayscale-0 transition">
                  {item.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-700">{item.year}</h2>
                <p className="text-slate-500 text-sm">Coming Soon</p>
              </div>

              <div className="mt-6 w-full bg-slate-100 text-slate-400 font-semibold py-2.5 px-4 rounded-xl text-center text-sm cursor-not-allowed">
                Locked 🔒
              </div>
            </div>
          ))}

        </section>

        {/* --- FOOTER --- */}
        <footer className="text-center pt-8 border-t border-slate-200 text-slate-500 text-sm">
          © {new Date().getFullYear()} FrankInstant Edu | Online Primary Maths Practice
        </footer>

      </div>
    </main>
  );
}