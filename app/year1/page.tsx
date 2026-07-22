export default function Year1Page() {
  const topics = [
    {
      name: "Addition",
      icon: "➕",
      description: "Practise adding numbers",
      link: "/year1/addition",
    },
    {
      name: "Subtraction",
      icon: "➖",
      description: "Learn to subtract numbers",
      link: "/year1/subtraction",
    },
    {
      name: "Multiplication",
      icon: "✖️",
      description: "Practise times tables",
      link: "/year1/multiplication",
    },
    {
      name: "Number Bonds",
      icon: "🔢",
      description: "Build number confidence",
      link: "/year1/number-bonds",
    },
    {
      name: "Place Value",
      icon: "🔟",
      description: "Understand numbers",
      link: "/year1/place-value",
    },
    {
      name: "Fractions",
      icon: "🍕",
      description: "Learn parts of numbers",
      link: "/year1/fractions",
    },
    {
      name: "Measurement",
      icon: "📏",
      description: "Length, mass and capacity",
      link: "/year1/measurement",
    },
    {
      name: "Time",
      icon: "🕒",
      description: "Learn clocks and time",
      link: "/year1/time",
    },
    {
      name: "Money",
      icon: "💷",
      description: "Practise using money",
      link: "/year1/money",
    },
    {
      name: "Mixed Test",
      icon: "📝",
      description: "Test all Year 1 Maths skills",
      link: "/year1/mixed-test",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-center text-blue-700">
          FrankInstant Edu
        </h1>

        <h2 className="text-3xl font-semibold text-center mt-4">
          Year 1 Maths Practice 🚀
        </h2>

        <p className="text-center text-gray-600 text-lg mt-3">
          Choose a topic and start practising.
        </p>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          {topics.map((topic) => (
            <a
              key={topic.name}
              href={topic.link}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition"
            >

              <div className="text-5xl text-center">
                {topic.icon}
              </div>

              <h3 className="text-2xl font-bold text-center mt-4">
                {topic.name}
              </h3>

              <p className="text-center text-gray-600 mt-2">
                {topic.description}
              </p>

              <div className="text-center">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-5">
                  Start Practice
                </button>
              </div>

            </a>
          ))}

        </div>


        <footer className="text-center mt-12 text-gray-500">
          © 2026 FrankInstant Edu | Online Maths Practice
        </footer>

      </div>

    </main>
  );
}