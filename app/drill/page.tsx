"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SpeedDrillGame() {
  const [level, setLevel] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  const [currentProblem, setCurrentProblem] = useState<{ text: string; answer: number } | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem(`speed_drill_highscore_${level}`);
    if (saved) setHighScore(parseInt(saved, 10));
  }, [level]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(`speed_drill_highscore_${level}`, score.toString());
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, highScore, level]);

  const generateNewProblem = (selectedLevel: "Easy" | "Medium" | "Hard") => {
    let num1 = 0, num2 = 0, text = "", answer = 0;
    const ops = selectedLevel === "Easy" ? ["+", "-"] : selectedLevel === "Medium" ? ["+", "-", "×"] : ["+", "-", "×", "÷"];
    const op = ops[Math.floor(Math.random() * ops.length)];

    if (op === "+") {
      const max = selectedLevel === "Easy" ? 20 : selectedLevel === "Medium" ? 50 : 100;
      num1 = Math.floor(Math.random() * max) + 1;
      num2 = Math.floor(Math.random() * max) + 1;
      text = `${num1} + ${num2}`;
      answer = num1 + num2;
    } else if (op === "-") {
      const max = selectedLevel === "Easy" ? 20 : selectedLevel === "Medium" ? 50 : 100;
      num1 = Math.floor(Math.random() * max) + 5;
      num2 = Math.floor(Math.random() * num1) + 1;
      text = `${num1} - ${num2}`;
      answer = num1 - num2;
    } else if (op === "×") {
      const range = selectedLevel === "Medium" ? 10 : 12;
      num1 = Math.floor(Math.random() * range) + 2;
      num2 = Math.floor(Math.random() * 10) + 1;
      text = `${num1} × ${num2}`;
      answer = num1 * num2;
    } else {
      num2 = Math.floor(Math.random() * 10) + 2;
      const multiplier = Math.floor(Math.random() * 10) + 1;
      num1 = num2 * multiplier;
      text = `${num1} ÷ ${num2}`;
      answer = multiplier;
    }

    setCurrentProblem({ text, answer });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    setUserAnswer("");
    setFeedback("");
    generateNewProblem(level);
  };

  const endGame = () => {
    setIsPlaying(false);
    setTimeLeft(0);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem(`speed_drill_highscore_${level}`, score.toString());
    }
  };

  const handleNumberInput = (numStr: string) => {
    if (!currentProblem || !isPlaying) return;
    const nextAnswer = userAnswer + numStr;
    setUserAnswer(nextAnswer);

    if (parseInt(nextAnswer, 10) === currentProblem.answer) {
      setScore((prev) => prev + 1);
      setFeedback("Correct! 🔥");
      setUserAnswer("");
      generateNewProblem(level);
    }
  };

  const handleBackspace = () => {
    setUserAnswer((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setUserAnswer("");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center">
        
        <div className="w-full flex justify-between items-center mb-4">
          <Link href="/" className="text-xs font-bold text-teal-400 hover:underline">
            ← Hub
          </Link>
          <span className="text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full">
            Frankinstant-Edu
          </span>
        </div>

        <h1 className="text-2xl font-black text-white mb-1 text-center">⚡ 60-Second Speed Drill</h1>
        <p className="text-xs text-slate-400 text-center mb-6">Master Addition, Subtraction, Multiplication & Division</p>

        {!isPlaying && timeLeft === 60 && (
          <div className="w-full flex flex-col items-center">
            <label className="text-xs font-bold text-slate-300 mb-2">Select Difficulty Level:</label>
            <div className="flex gap-2 mb-6 w-full">
              {(["Easy", "Medium", "Hard"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                    level === lvl ? "bg-indigo-600 text-white shadow-lg" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <div className="w-full flex justify-between items-center bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 mb-6 text-xs text-slate-300">
              <span>🏆 High Score ({level}):</span>
              <span className="font-bold text-teal-400">{highScore} pts</span>
            </div>

            <button
              onClick={startGame}
              className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-2xl shadow-lg transition text-sm"
            >
              Start Game 🚀
            </button>
          </div>
        )}

        {isPlaying && currentProblem && (
          <div className="w-full flex flex-col items-center">
            <div className="flex justify-between items-center w-full mb-4 text-sm font-bold">
              <span className="text-amber-400">⏱️ Time: {timeLeft}s</span>
              <span className="text-emerald-400">🎯 Score: {score}</span>
              <button
                onClick={endGame}
                className="px-3 py-1 bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs rounded-lg border border-rose-900 transition"
              >
                End Game
              </button>
            </div>

            <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-6 flex items-center justify-center mb-4 shadow-inner">
              <span className="text-4xl font-black tracking-wider text-white">{currentProblem.text} = </span>
              <span className="text-4xl font-black tracking-wider text-teal-400 ml-3 min-w-[50px] text-left">
                {userAnswer || "_"}
              </span>
            </div>

            {/* On-Screen Number Pad */}
            <div className="grid grid-cols-3 gap-2 w-full mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberInput(num.toString())}
                  className="py-4 bg-slate-800 hover:bg-slate-700 active:bg-indigo-600 text-white text-xl font-black rounded-2xl shadow transition"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={handleClear}
                className="py-4 bg-rose-950/40 hover:bg-rose-900/50 text-rose-400 text-sm font-bold rounded-2xl transition border border-rose-900/50"
              >
                Clear
              </button>
              <button
                onClick={() => handleNumberInput("0")}
                className="py-4 bg-slate-800 hover:bg-slate-700 active:bg-indigo-600 text-white text-xl font-black rounded-2xl shadow transition"
              >
                0
              </button>
              <button
                onClick={handleBackspace}
                className="py-4 bg-amber-950/40 hover:bg-amber-900/50 text-amber-400 text-sm font-bold rounded-2xl transition border border-amber-900/50"
              >
                ⌫ Del
              </button>
            </div>

            {feedback && <p className="text-xs font-bold text-slate-300">{feedback}</p>}
          </div>
        )}

        {!isPlaying && timeLeft === 0 && (
          <div className="w-full flex flex-col items-center text-center">
            <div className="text-3xl mb-1">🎉 Game Over!</div>
            <p className="text-xs text-teal-400 font-semibold mb-4">Frankinstant-Edu Math Challenge</p>
            
            <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 mb-6">
              <p className="text-xs text-slate-400 mb-1">Your Final Score</p>
              <p className="text-3xl font-black text-emerald-400">{score} points</p>
            </div>
            
            <button
              onClick={startGame}
              className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-2xl shadow-lg transition text-sm"
            >
              Play Again 🔄
            </button>
          </div>
        )}

      </div>
    </main>
  );
}