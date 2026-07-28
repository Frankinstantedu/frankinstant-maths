"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import QuizLayout from "@/app/components/QuizLayout";

export default function TablePracticePage() {
  const params = useParams();
  const tableNum = Number(params.table) || 1;

  // Generate 10 randomized multiplication questions for this specific table
  const questions = useMemo(() => {
    const multipliers = Array.from({ length: 12 }, (_, i) => i + 1)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    return multipliers.map((multiplier) => {
      const correctAnswer = tableNum * multiplier;
      return {
        question: `What is ${tableNum} × ${multiplier}?`,
        answer: correctAnswer,
        explanation: `${tableNum} multiplied by ${multiplier} equals ${correctAnswer}.`,
      };
    });
  }, [tableNum]);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  const currentQ = questions[currentQuestionIdx];

  const handleNumberInput = (numStr: string) => {
    if (showFeedbackModal || showEndModal) return;
    setUserAnswer((prev) => {
      if (prev.length >= 4) return prev; // Limit max digits
      return prev + numStr;
    });
  };

  const handleClear = () => {
    if (showFeedbackModal || showEndModal) return;
    setUserAnswer("");
  };

  const handleBackspace = () => {
    if (showFeedbackModal || showEndModal) return;
    setUserAnswer((prev) => prev.slice(0, -1));
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer || showFeedbackModal || showEndModal) return;

    const parsed = Number(userAnswer);
    const correct = parsed === currentQ.answer;

    setIsCorrect(correct);
    if (correct) {
      setScore((prev) => prev + 1);
    }
    setShowFeedbackModal(true);
  };

  function handleNextQuestion() {
    setShowFeedbackModal(false);
    setUserAnswer("");

    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setShowEndModal(true);
    }
  }

  function handleRestartQuiz() {
    setCurrentQuestionIdx(0);
    setScore(0);
    setUserAnswer("");
    setShowEndModal(false);
  }

  return (
    <QuizLayout
      title={`${tableNum}x Times Table Practice`}
      icon="✖️"
      questionNumber={currentQuestionIdx + 1}
      totalQuestions={questions.length}
      score={score}
      question={currentQ.question}
      showFeedbackModal={showFeedbackModal}
      isCorrect={isCorrect}
      correctAnswer={String(currentQ.answer)}
      explanation={currentQ.explanation}
      onNextQuestion={handleNextQuestion}
      showEndModal={showEndModal}
      onRestartQuiz={handleRestartQuiz}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Answer Display Box */}
        <div className="w-full max-w-xs bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 px-6 text-center shadow-xs">
          <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider mb-1">Your Answer</span>
          <span className="text-3xl font-black text-indigo-600 tracking-wide min-h-[40px] inline-block">
            {userAnswer || "_"}
          </span>
        </div>

        {/* Permanent On-Screen Number Pad (Matching Speed Drill Style) */}
        <div className="w-full max-w-xs bg-white border border-slate-200 rounded-3xl p-4 shadow-xl">
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleNumberInput(num.toString())}
                disabled={showFeedbackModal || showEndModal}
                className="py-3 bg-slate-100 hover:bg-indigo-50 active:scale-95 disabled:opacity-40 text-slate-800 text-lg font-bold rounded-xl transition border border-slate-200 shadow-2xs cursor-pointer"
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={handleClear}
              disabled={showFeedbackModal || showEndModal}
              className="py-3 bg-rose-50 hover:bg-rose-100 disabled:opacity-40 text-rose-700 text-xs font-bold rounded-xl transition border border-rose-200 cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => handleNumberInput("0")}
              disabled={showFeedbackModal || showEndModal}
              className="py-3 bg-slate-100 hover:bg-indigo-50 active:scale-95 disabled:opacity-40 text-slate-800 text-lg font-bold rounded-xl transition border border-slate-200 shadow-2xs cursor-pointer"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              disabled={showFeedbackModal || showEndModal}
              className="py-3 bg-amber-50 hover:bg-amber-100 disabled:opacity-40 text-amber-700 text-xs font-bold rounded-xl transition border border-amber-200 cursor-pointer"
            >
              ⌫ Del
            </button>
          </div>

          {/* Submit Check Button */}
          <button
            type="button"
            onClick={handleSubmitAnswer}
            disabled={showFeedbackModal || showEndModal || !userAnswer}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-40 text-white font-bold rounded-xl transition shadow-md shadow-indigo-200 cursor-pointer text-sm"
          >
            Check Answer ↵
          </button>
        </div>
      </div>
    </QuizLayout>
  );
}