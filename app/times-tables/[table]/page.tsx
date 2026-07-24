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
      
      const wrongOptions = new Set<number>();
      while (wrongOptions.size < 3) {
        const offset = Math.floor(Math.random() * 5) + 1;
        const wrong = Math.random() > 0.5 ? correctAnswer + offset : Math.max(0, correctAnswer - offset);
        if (wrong !== correctAnswer) wrongOptions.add(wrong);
      }

      const options = [correctAnswer, ...Array.from(wrongOptions)].sort(() => Math.random() - 0.5);

      return {
        question: `What is ${tableNum} × ${multiplier}?`,
        options,
        answer: correctAnswer,
        explanation: `${tableNum} multiplied by ${multiplier} equals ${correctAnswer}.`,
      };
    });
  }, [tableNum]);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  const currentQ = questions[currentQuestionIdx];

  function handleOptionClick(option: number) {
    if (selectedOption !== null) return;
    setSelectedOption(option);

    const correct = option === currentQ.answer;
    setIsCorrect(correct);
    if (correct) {
      setScore((prev) => prev + 1);
    }
    setShowFeedbackModal(true);
  }

  function handleNextQuestion() {
    setShowFeedbackModal(false);
    setSelectedOption(null);

    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setShowEndModal(true);
    }
  }

  function handleRestartQuiz() {
    setCurrentQuestionIdx(0);
    setScore(0);
    setSelectedOption(null);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentQ.options.map((option, idx) => {
          let btnStyle = "bg-slate-50 border-slate-200 hover:border-indigo-500 text-slate-800";
          
          if (selectedOption !== null) {
            if (option === currentQ.answer) {
              btnStyle = "bg-emerald-500 border-emerald-600 text-white font-bold";
            } else if (option === selectedOption) {
              btnStyle = "bg-rose-500 border-rose-600 text-white font-bold";
            } else {
              btnStyle = "bg-slate-100 border-slate-200 text-slate-400 opacity-50";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              disabled={selectedOption !== null}
              className={`p-4 rounded-2xl border-2 text-lg font-bold transition shadow-xs cursor-pointer ${btnStyle}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </QuizLayout>
  );
}