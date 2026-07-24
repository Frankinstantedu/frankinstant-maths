"use client";

import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface QuizLayoutProps {
  title: string;
  icon: string;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  question: string;
  message?: string;
  children: ReactNode;
  
  // Modals
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
  
  const pathname = usePathname();

  // Automatically detect target category from URL (e.g. /times-tables/7 -> "Times Table (7x)" or /year6 -> "Year 6")
  useEffect(() => {
    if (showEndModal) {
      try {
        let targetCategory = "General";
        
        if (pathname.includes("/times-tables/")) {
          const tableNum = pathname.split("/").pop();
          targetCategory = `Times Table (${tableNum}x)`;
        } else {
          const match = pathname.match(/\/year(\d+)/i);
          if (match && match[1]) {
            targetCategory = `Year ${match[1]}`;
          }
        }

        const saved = localStorage.getItem("frankinstant_profile");
        const profile = saved ? JSON.parse(saved) : { 
          streakDays: 1, 
          name: "Math Explorer", 
          avatar: "🎓",
          years: {} 
        };
        
        if (!profile.years) {
          profile.years = {};
        }
        
        if (!profile.years[targetCategory]) {
          profile.years[targetCategory] = { quizzesTaken: 0, correctAnswers: 0 };
        }

        profile.years[targetCategory].quizzesTaken += 1;
        profile.years[targetCategory].correctAnswers += score;

        localStorage.setItem("frankinstant_profile", JSON.stringify(profile));
      } catch (e) {
        console.error("Failed to update profile stats", e);
      }
    }
  }, [showEndModal, score, pathname]);

  // Determine badge message based on percentage
  const percentage = (score / totalQuestions) * 100;
  let badgeTitle = "Good Effort! 👍";
  let badgeDesc = "Keep practising to boost your score!";
  if (percentage === 100) {
    badgeTitle = "Math Wizard! 🧙‍♂️✨";
    badgeDesc = "Flawless performance! Outstanding work!";
  } else if (percentage >= 80) {
    badgeTitle = "Super Star! 🌟";
    badgeDesc = "Fantastic job! You nailed almost all of them.";
  } else if (percentage >= 50) {
    badgeTitle = "Great Effort! 🚀";
    badgeDesc = "Good going! You're making solid progress.";
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-8 flex flex-col items-center">
      <div className="max-w-xl w-full">
        {/* Top Navigation & Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="text-sm font-bold text-slate-500 hover:text-slate-800 transition"
          >
            ← Back to Hub
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

      {/* --- CENTRALIZED FEEDBACK POP-UP --- */}
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

      {/* --- CENTRALIZED END OF QUIZ POP-UP --- */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md w-full border-4 border-emerald-500 animate-pop-in">
            <div className="text-6xl mb-3 animate-bounce">
              {score >= 8 ? "🏆" : score >= 5 ? "🌟" : "💪"}
            </div>
            
            <h2 className="text-2xl font-black text-slate-900 mb-1">
              {badgeTitle}
            </h2>
            <p className="text-xs font-semibold text-slate-500 mb-4">
              {badgeDesc}
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6">
              <p className="text-sm text-slate-600">Final Score</p>
              <p className="text-3xl font-black text-emerald-600">
                {score} <span className="text-slate-400 text-xl font-bold">/ {totalQuestions}</span>
              </p>
            </div>

            <button
              onClick={onRestartQuiz}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-lg transition-transform active:scale-95 cursor-pointer shadow-md"
            >
              Play Again 🚀
            </button>
          </div>
        </div>
      )}
    </main>
  );
}