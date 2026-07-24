'use client';

const years = [
  { title: "Year 1", age: "5-6", icon: "🎈", color: "border-sky-200 hover:border-sky-400", btn: "bg-sky-600" },
  { title: "Year 2", age: "6-7", icon: "🌟", color: "border-emerald-200 hover:border-emerald-400", btn: "bg-emerald-600" },
  { title: "Year 3", age: "7-8", icon: "📐", color: "border-amber-200 hover:border-amber-400", btn: "bg-amber-600" },
  { title: "Year 4", age: "8-9", icon: "🚀", color: "border-purple-200 hover:border-purple-400", btn: "bg-purple-600" },
  { title: "Year 5", age: "9-10", icon: "⚡", color: "border-rose-200 hover:border-rose-400", btn: "bg-rose-600" },
  { title: "Year 6", age: "10-11", icon: "🎓", color: "border-indigo-200 hover:border-indigo-400", btn: "bg-indigo-600" },
];

export default function ClassesPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <a href="/" className="text-indigo-600 font-bold mb-8 block hover:underline">← Back to Dashboard</a>
        <h1 className="text-4xl font-black text-slate-900 mb-8">Select Your Level</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {years.map((year) => (
            <div key={year.title} className={`p-6 bg-white rounded-3xl border-2 transition hover:shadow-lg ${year.color}`}>
              <div className="text-4xl mb-4">{year.icon}</div>
              <h2 className="text-2xl font-black text-slate-900">{year.title}</h2>
              <p className="text-slate-500 font-bold mb-6">Ages {year.age}</p>
              <a href={`/${year.title.toLowerCase().replace(' ', '')}`} className={`block text-center text-white py-3 rounded-xl font-bold ${year.btn}`}>
                Start Learning
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}