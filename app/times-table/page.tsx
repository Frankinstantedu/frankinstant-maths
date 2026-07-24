"use client";

import React, { useState, useEffect } from 'react';

interface MathQuestion {
  num1: number;
  num2: number;
  answer: number;
}

export default function TimesTablePage() {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(10);

  const startQuiz = (tableNum: number, mode: string) => {
    setSelectedTable(tableNum);
    setLevel(mode);
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameOver(false);
    setUserAnswer("");
    setFeedback(null);

    const generated: MathQuestion[] = Array.from({ length: 12 }, (_, i) => ({
      num1: tableNum,
      num2: i + 1,
      answer: tableNum * (i + 1),
    }));
    
    setQuestions(generated.sort(() => Math.random() - 0.5));
    if (mode === 'timed') {
      setTimeLeft(10);
    }
  };

  useEffect(() => {
    if (level !== 'timed' || gameOver || selectedTable === null || feedback !== null) return;

    if (timeLeft <= 0) {
      setFeedback({ correct: false, message: "⏰ Time's up! Marked as incorrect." });
      setTimeout(() => {
        nextQuestion();
      }, 1500);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, level, gameOver, selectedTable, feedback]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (feedback !== null || userAnswer.trim() === "") return;

    const currentQ = questions[currentQuestionIndex];
    const isCorrect = parseInt(userAnswer.trim(), 10) === currentQ.answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback({ correct: true, message: "🎉 Correct! Great job!" });
    } else {
      setFeedback({ correct: false, message: `❌ Incorrect. The correct answer was ${currentQ.answer}` });
    }

    setTimeout(() => {
      nextQuestion();
    }, 1600);
  };

  const nextQuestion = () => {
    setFeedback(null);
    setUserAnswer("");
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      if (level === 'timed') setTimeLeft(10);
    } else {
      setGameOver(true);
    }
  };

  const resetSelection = () => {
    setSelectedTable(null);
    setLevel(null);
    setGameOver(false);
    setFeedback(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative">
      <div className="max-w-4xl mx-auto w-full pt-2">
        
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between mb-6 relative">
          <a href="/" className="text-xs font-bold tracking-widest text-indigo-600 hover:text-indigo-700 uppercase bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full shadow-2xs transition">
            ← Back to Home
          </a>
        </div>

        {/* Title Header */}
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold tracking-widest text-teal-600 uppercase bg-teal-50 border border-teal-100 px-3 py-1 rounded-full mb-3 shadow-2xs">
            ✖️ Interactive Practice Arena
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-2">
            Times Tables <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">(2 to 12)</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Master your multiplication facts with practice or beat the clock in timed mode!
          </p>
        </div>

        {/* MAIN CONTENT AREA */}
        {selectedTable === null ? (
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">Choose a Times Table to Practice:</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 11 }, (_, i) => i + 2).map((num) => (
                <div key={num} className="bg-white border-2 border-teal-100 hover:border-teal-400 rounded-2xl p-5 text-center shadow-xs transition hover:shadow-md flex flex-col justify-between">
                  <div className="mb-4">
                    <span className="text-3xl">✖️</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">{num} Times Table</h3>
                    <p className="text-xs text-slate-500 font-medium">1 × {num} to 12 × {num}</p>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => startQuiz(num, 'practice')}
                      className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                    >
                      Practice Mode 📖
                    </button>
                    <button
                      onClick={() => startQuiz(num, 'timed')}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                    >
                      Timed Mode ⏱️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : gameOver ? (
          <div className="max-w-md mx-auto bg-white border-2 border-teal-200 rounded-3xl p-8 text-center shadow-lg">
            <span className="text-5xl mb-3 inline-block">🏆</span>
            <h2 className="text-2xl font-black text-slate-900 mb-2">{selectedTable} Times Table Completed!</h2>
            <p className="text-slate-600 text-sm mb-6 font-medium">
              You scored <span className="font-bold text-teal-600 text-lg">{score}</span> out of {questions.length}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => startQuiz(selectedTable, level || 'practice')}
                className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-sm text-sm transition cursor-pointer"
              >
                Play Again 🔄
              </button>
              <button
                onClick={resetSelection}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition cursor-pointer"
              >
                Choose Another 🔙
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white border-2 border-teal-200 rounded-3xl p-6 sm:p-8 shadow-md">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <button
                onClick={resetSelection}
                className="text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                ← Exit to Tables
              </button>
              <div className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                {level === 'timed' ? '⏱️ Timed Mode' : '📖 Practice Mode'}
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase">Question {currentQuestionIndex + 1} of {questions.length}</span>
              {level === 'timed' && (
                <span className={`text-sm font-black px-3 py-1 rounded-full ${timeLeft <= 3 ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-amber-50 text-amber-600'}`}>
                  ⏱️ {timeLeft}s
                </span>
              )}
            </div>

            <div className="text-center bg-slate-50 border border-slate-200 rounded-2xl py-8 mb-6">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-wider">
                {questions[currentQuestionIndex]?.num1} × {questions[currentQuestionIndex]?.num2} = ?
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer..."
                disabled={feedback !== null}
                autoFocus
                className="w-full px-4 py-4 text-center text-2xl font-bold bg-white border-2 border-slate-200 focus:border-teal-500 focus:outline-none rounded-2xl shadow-inner text-slate-900 placeholder:text-slate-300 placeholder:text-lg"
              />

              <button
                type="submit"
                disabled={feedback !== null || userAnswer.trim() === ""}
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-sm text-base transition cursor-pointer"
              >
                Submit Answer ➔
              </button>
            </form>

            {feedback && (
              <div className={`mt-4 p-4 rounded-2xl text-center text-sm font-bold ${feedback.correct ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                {feedback.message}
              </div>
            )}
          </div>
        )}

      </div>

      <footer className="text-center text-xs font-medium text-slate-400 py-4 border-t border-slate-200 mt-8">
        © {new Date().getFullYear()} Frankinstant-Edu. All rights reserved.
      </footer>
    </main>
  );
}