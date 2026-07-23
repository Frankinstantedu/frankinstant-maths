"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface QuizLayoutProps {
  title: string;
  icon: string;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  question: string;
  message?: string;
  children: ReactNode;
  
  // New props for centralized modals
  showFeedbackModal?: boolean;
  isCorrect?: boolean;
  correctAnswer?: string;
  explanation?: string;
  onNextQuestion?: () => void;
  
  showEndModal?: boolean;
  onRestartQuiz?: () => void;
}

export default function QuizLayout({
  title,
  icon,
  questionNumber,
  totalQuestions,
  score,
  question,
  children,
  showFeedbackModal,
  isCorrect,
  correctAnswer,
  explanation,
  onNextQuestion,
  showEndModal,
  onRestartQuiz,
}: QuizLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-8 flex flex-col items-center">
      <div className="max-w-xl w-full">
        {/* Top Navigation & Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/year2"
            className="text-sm font-bold text-slate-500 hover:text-slate-800 transition"
          >
            ← Back to Year 2 Hub
          </Link>
          <span className="text-xs font-bold px-3 py-1 bg-white rounded-full border border-slate-200 text-slate-700 shadow-sm">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>

        {/* Quiz Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{icon}</span>
            <h1 className="text-xl font-extrabold text-slate-900">{title}</h1>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-3 rounded-full mb-6 overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-6 mb-6">
            <p className="text-lg sm:text-xl font-semibold text-slate-800 whitespace-pre-line leading-relaxed">
              {question}
            </p>
          </div>

          {/* Options / Interactive Area (Children) */}
          {children}
        </div>
      </div>

      {/* --- CENTRALIZED FEEDBACK POP-UP (WITH ANIMATIONS) --- */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div
            className={`bg-white rounded-2xl p-6 text-center shadow-2xl max-w-sm w-full border-4 ${
              isCorrect
                ? "border-emerald-500 animate-pop-in"
                : "border-amber-500 animate-shake"
            }`}
          >
            <div className="text-6xl mb-3">{isCorrect ? "🎉" : "💡"}</div>

            <h3
              className={`text-2xl font-bold mb-2 ${
                isCorrect ? "text-emerald-600" : "text-amber-700"
              }`}
            >
              {isCorrect ? "Spot On!" : "Nice Try!"}
            </h3>

            <p className="text-gray-700 text-lg mb-6">
              {isCorrect ? (
                "Great work!"
              ) : (
                <>
                  Correct Answer:{" "}
                  <span className="font-bold text-slate-900 block mt-1 text-xl">
                    {correctAnswer}
                  </span>
                  <span className="text-sm text-slate-500 mt-2 block">
                    {explanation}
                  </span>
                </>
              )}
            </p>

            <button
              onClick={onNextQuestion}
              className="w-full py-3 px-6 rounded-xl font-bold text-white text-lg bg-emerald-600 hover:bg-emerald-700 transition-transform active:scale-95 cursor-pointer"
            >
              {questionNumber === totalQuestions
                ? "See Final Score 🏆"
                : "Next Question ➔"}
            </button>
          </div>
        </div>
      )}

      {/* --- CENTRALIZED END OF QUIZ POP-UP (WITH ANIMATIONS) --- */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md w-full border-4 border-emerald-500 animate-pop-in">
            <div className="text-7xl mb-4 animate-bounce">
              {score >= 8 ? "🏆" : score >= 5 ? "🌟" : "💪"}
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Quiz Completed!
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              You scored{" "}
              <span className="font-bold text-emerald-600">{score}</span> out of{" "}
              <span className="font-bold">{totalQuestions}</span>!
            </p>

            <button
              onClick={onRestartQuiz}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-lg transition-transform active:scale-95 cursor-pointer"
            >
              Play Again 🚀
            </button>
          </div>
        </div>
      )}
    </main>
  );
}