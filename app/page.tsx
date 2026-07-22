export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-center text-blue-700">
          FrankInstant Edu
        </h1>

        <h2 className="text-3xl font-semibold text-center mt-4">
          Welcome to FrankInstant Edu 🚀
        </h2>

        <p className="text-center text-gray-600 text-lg mt-3">
          Choose your year group to begin practising Maths.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <a
            href="/year1"
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition text-center"
          >
            <div className="text-5xl">📘</div>
            <h3 className="text-2xl font-bold mt-4">Year 1</h3>
            <p className="text-gray-600 mt-2">
              Addition, subtraction, number bonds and more.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-5">
              Start Learning
            </button>
          </a>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center opacity-60">
            <div className="text-5xl">📗</div>
            <h3 className="text-2xl font-bold mt-4">Year 2</h3>
            <p className="text-gray-600 mt-2">Coming Soon</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center opacity-60">
            <div className="text-5xl">📙</div>
            <h3 className="text-2xl font-bold mt-4">Year 3</h3>
            <p className="text-gray-600 mt-2">Coming Soon</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center opacity-60">
            <div className="text-5xl">📕</div>
            <h3 className="text-2xl font-bold mt-4">Year 4</h3>
            <p className="text-gray-600 mt-2">Coming Soon</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center opacity-60">
            <div className="text-5xl">📒</div>
            <h3 className="text-2xl font-bold mt-4">Year 5</h3>
            <p className="text-gray-600 mt-2">Coming Soon</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center opacity-60">
            <div className="text-5xl">📓</div>
            <h3 className="text-2xl font-bold mt-4">Year 6</h3>
            <p className="text-gray-600 mt-2">Coming Soon</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center opacity-60">
            <div className="text-5xl">📔</div>
            <h3 className="text-2xl font-bold mt-4">Year 7</h3>
            <p className="text-gray-600 mt-2">Coming Soon</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center opacity-60">
            <div className="text-5xl">📚</div>
            <h3 className="text-2xl font-bold mt-4">Year 8</h3>
            <p className="text-gray-600 mt-2">Coming Soon</p>
          </div>

        </div>

        <footer className="text-center mt-12 text-gray-500">
          © 2026 FrankInstant Edu | Online Maths Practice
        </footer>

      </div>

    </main>
  );
}