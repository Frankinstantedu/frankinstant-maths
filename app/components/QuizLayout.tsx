import React from "react";

interface QuizLayoutProps {
  title: string;
  icon: string;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  question: string;
  message?: string;
  children: React.ReactNode;
}

export default function QuizLayout({
  title,
  icon,
  questionNumber,
  totalQuestions,
  score,
  question,
  children,
}: QuizLayoutProps) {
  // Calculate progress percentage
  const progressPercent = (questionNumber / totalQuestions) * 100;

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-6 border-2 border-slate-200">
        
        {/* TOP BAR: Title & Stars */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{icon}</span>
            <h1 className="text-xl font-bold text-slate-800">{title}</h1>
          </div>

          {/* ⭐ Animated Star Score Pill */}
          <div className="bg-amber-100 text-amber-900 font-extrabold px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 shadow-sm border border-amber-300">
            <span className="text-base animate-bounce">⭐</span>
            <span>{score} Stars</span>
          </div>
        </div>

        {/* 📊 PROGRESS BAR */}
        <div className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden border border-slate-200">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* QUESTION DISPLAY */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 text-center mb-6">
          <p className="text-sm font-semibold text-slate-500 mb-1">
            Question {questionNumber} of {totalQuestions}
          </p>
          <h2 className="text-3xl font-extrabold text-slate-900">
            {question}
          </h2>
        </div>

        {/* QUIZ INPUT & BUTTONS */}
        {children}

      </div>
    </main>
  );
}