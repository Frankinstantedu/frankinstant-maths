import React from "react";

type QuizLayoutProps = {
  title: string;
  icon: string;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  question: string;
  children: React.ReactNode;
  message: string;
};

export default function QuizLayout({
  title,
  icon,
  questionNumber,
  totalQuestions,
  score,
  question,
  children,
  message,
}: QuizLayoutProps) {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-2xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

          <h1 className="text-4xl font-bold text-blue-700">
            FrankInstant Edu
          </h1>

          <h2 className="text-3xl font-semibold mt-4">
            {icon} {title}
          </h2>

          <p className="text-lg mt-4">
            Question {questionNumber} of {totalQuestions}
          </p>

          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>


          <div className="text-5xl font-bold mt-10">
            {question}
          </div>


          <div className="mt-8">
            {children}
          </div>


          <p className="text-xl mt-5">
            {message}
          </p>


          <p className="text-lg mt-6">
            ⭐ Score: {score}
          </p>

        </div>

      </div>

    </main>
  );
}