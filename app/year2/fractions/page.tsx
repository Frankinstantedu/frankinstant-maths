"use client";

import { useState, useRef, useEffect } from "react";
import QuizLayout from "@/app/components/QuizLayout";

const TOTAL_QUESTIONS = 10;

type FractionType = "1/2" | "1/4" | "3/4";

function generateQuestion() {
  const fractions: FractionType[] = ["1/2", "1/4", "3/4"];
  const fraction = fractions[Math.floor(Math.random() * fractions.length)];

  let wholeNumber = 0;
  let answer = 0;

  if (fraction === "1/2") {
    const multiplier = Math.floor(Math.random() * 10) + 1;
    wholeNumber = multiplier * 2;
    answer = wholeNumber / 2;
  } else if (fraction === "1/4") {
    const multiplier = Math.floor(Math.random() * 5) + 1;
    wholeNumber = multiplier * 4;
    answer = wholeNumber / 4;
  } else {
    const multiplier = Math.floor(Math.random() * 5) + 1;
    wholeNumber = multiplier * 4;
    answer = (wholeNumber / 4) * 3;
  }

  return {
    fraction,
    wholeNumber,
    question: `What is ${fraction} of ${wholeNumber}?`,
    answer,
  };
}

function getFeedbackText(isCorrect: boolean) {
  const correctPraise = [
    "Spot on! 🌟",
    "Fraction Master! 🍕",
    "You're on fire! 🔥",
    "Super job! 🎉",
    "Brilliant math skills! 💪",
  ];

  if (isCorrect) {
    return correctPraise[Math.floor(Math.random() * correctPraise.length)];
  }
  return "Almost! You've got this for the next one! 💪";
}

export default function FractionsPage() {
  const [question, setQuestion] = useState(generateQuestion());
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!showFeedbackModal && !showEndModal) {
      inputRef.current?.focus();
    }
  }, [showFeedbackModal, showEndModal]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (answer.trim() === "") return;

    const correct = Number(answer) === question.answer;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setShowFeedbackModal(true);
  }

  function handleNextQuestion() {
    setShowFeedbackModal(false);
    setAnswer("");

    if (questionNumber >= TOTAL_QUESTIONS) {
      setShowEndModal(true);
    } else {
      setQuestion(generateQuestion());
      setQuestionNumber((prev) => prev + 1);
    }
  }

  function restartQuiz() {
    setQuestion(generateQuestion());
    setQuestionNumber(1);
    setScore(0);
    setAnswer("");
    setShowEndModal(false);
  }

  return (
    <QuizLayout
      title="Fractions Practice (1/2, 1/4, 3/4)"
      icon="🍕"
      questionNumber={questionNumber}
      totalQuestions={TOTAL_QUESTIONS}
      score={score}
      question={question.question}
      message=""
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          ref={inputRef}
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-3 text-2xl text-center w-full focus:outline-none focus:border-blue-500"
          placeholder="Type your answer"
          disabled={showFeedbackModal || showEndModal}
        />

        <button
          type="submit"
          disabled={answer.trim() === ""}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg w-full disabled:opacity-50 transition-colors text-lg"
        >
          Check Answer
        </button>
      </form>

      {/* QUESTION FEEDBACK POP-UP */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div
            className={`bg-white rounded-2xl p-6 text-center shadow-2xl max-w-sm w-full transform transition-all border-4 ${
              isCorrect ? "border-blue-500" : "border-amber-400"
            }`}
          >
            <div className="text-6xl mb-3">
              {isCorrect ? "🎉" : "💡"}
            </div>
            
            <h3
              className={`text-2xl font-bold mb-2 ${
                isCorrect ? "text-blue-600" : "text-amber-600"
              }`}
            >
              {getFeedbackText(isCorrect)}
            </h3>

            <p className="text-gray-700 text-lg mb-6">
              {isCorrect ? (
                "You got it right!"
              ) : (
                <>
                  Not quite. <br />
                  <span className="font-bold text-gray-900">
                    {question.fraction} of {question.wholeNumber} = {question.answer}
                  </span>
                </>
              )}
            </p>

            <button
              onClick={handleNextQuestion}
              className={`w-full py-3 px-6 rounded-xl font-bold text-white text-lg transition-transform active:scale-95 ${
                isCorrect
                  ? "bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-200"
                  : "bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-200"
              }`}
            >
              {questionNumber === TOTAL_QUESTIONS ? "See Final Score 🏆" : "Next Question ➔"}
            </button>
          </div>
        </div>
      )}

      {/* END OF QUIZ POP-UP */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md w-full border-4 border-blue-500">
            <div className="text-7xl mb-4">
              {score >= 8 ? "🏆" : score >= 5 ? "🌟" : "💪"}
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Practice Complete!
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              You scored <span className="font-bold text-blue-600">{score}</span> out of{" "}
              <span className="font-bold">{TOTAL_QUESTIONS}</span>!
            </p>

            <div className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-100">
              <p className="text-blue-800 font-medium">
                Awesome work! Ready to try again?
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={restartQuiz}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl text-lg shadow-lg shadow-blue-200 transition-transform active:scale-95"
              >
                Play Again 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </QuizLayout>
  );
}