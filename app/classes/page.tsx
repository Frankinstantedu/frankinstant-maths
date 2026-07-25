'use client';

const years = [
  { title: "Year 1", age: "5-6", icon: "🎈", border: "border-sky-500/40 hover:border-sky-400", glow: "hover:shadow-sky-500/10", btn: "bg-sky-600 hover:bg-sky-500 shadow-sky-600/30" },
  { title: "Year 2", age: "6-7", icon: "🌟", border: "border-emerald-500/40 hover:border-emerald-400", glow: "hover:shadow-emerald-500/10", btn: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30" },
  { title: "Year 3", age: "7-8", icon: "📐", border: "border-amber-500/40 hover:border-amber-400", glow: "hover:shadow-amber-500/10", btn: "bg-amber-600 hover:bg-amber-500 shadow-amber-600/30" },
  { title: "Year 4", age: "8-9", icon: "🚀", border: "border-purple-500/40 hover:border-purple-400", glow: "hover:shadow-purple-500/10", btn: "bg-purple-600 hover:bg-purple-500 shadow-purple-600/30" },
  { title: "Year 5", age: "9-10", icon: "⚡", border: "border-rose-500/40 hover:border-rose-400", glow: "hover:shadow-rose-500/10", btn: "bg-rose-600 hover:bg-rose-500 shadow-rose-600/30" },
  { title: "Year 6", age: "10-11", icon: "🎓", border: "border-indigo-500/40 hover:border-indigo-400", glow: "hover:shadow-indigo-500/10", btn: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30" },
];

export default function ClassesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 p-4 sm:p-6 pb-20 relative overflow-hidden selection:bg-indigo-500 selection:text-white flex flex-col items-center">
      
      {/* Decorative Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl w-full relative z-10">
        
        {/* Back Link */}
        <a href="/" className="text-teal-400 font-bold mb-8 inline-block hover:underline transition">
          ← Back to Dashboard
        </a>

        {/* Page Title */}
        <h1 className="text-4xl font-black text-white mb-8 tracking-tight">
          Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">Level</span>
        </h1>
        
        {/* Years Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {years.map((year) => (
            <div 
              key={year.title} 
              className={`p-6 bg-slate-900/70 backdrop-blur-xl rounded-3xl border-2 transition-all duration-300 hover:shadow-2xl ${year.border} ${year.glow} group`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{year.icon}</div>
              <h2 className="text-2xl font-black text-white">{year.title}</h2>
              <p className="text-slate-400 font-bold mb-6">Ages {year.age}</p>
              <a 
                href={`/${year.title.toLowerCase().replace(' ', '')}`} 
                className={`block text-center text-white py-3 rounded-xl font-bold transition shadow-lg ${year.btn}`}
              >
                Start Learning
              </a>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}