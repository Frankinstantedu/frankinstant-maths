"use client";

import { useState, useRef, useEffect } from "react";
import QuizLayout from "../../components/QuizLayout";

const TOTAL_QUESTIONS = 10;

interface MixedQuestion {
  question: string;
  answer: string;
  validAnswers: string[]; // Supports multiple valid input formats
}

function generateQuestion(): MixedQuestion {
  const type = Math.floor(Math.random() * 5);

  if (type === 0) {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const ans = String(a + b);

    return {
      question: `${a} + ${b} = ?`,
      answer: ans,
      validAnswers: [ans],
    };
  }

  if (type === 1) {
    const a = Math.floor(Math.random() * 50) + 20;
    const b = Math.floor(Math.random() * 20);
    const ans = String(a - b);

    return {
      question: `${a} - ${b} = ?`,
      answer: ans,
      validAnswers: [ans],
    };
  }

  if (type === 2) {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const ans = String(a * b);

    return {
      question: `${a} × ${b} = ?`,
      answer: ans,
      validAnswers: [ans],
    };
  }

  if (type === 3) {
    return {
      question: "How many days are there in a week?",
      answer: "7",
      validAnswers: ["7", "seven"],
    };
  }

  return {
    question: "How many pence make £1?",
    answer: "100",
    validAnswers: ["100", "100p", "100 pence"],
  };
}

export default function MixedTestPage() {
  const [question, setQuestion] = useState(generateQuestion());
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);

  // Modal States
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when modals close
  useEffect(() => {
    if (!showFeedbackModal && !showEndModal) {
      inputRef.current?.focus();
    }
  }, [showFeedbackModal, showEndModal]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (answer.trim() === "") return;

    const cleanedInput = answer.trim().toLowerCase();
    const correct = question.validAnswers.some(
      (valid) => valid.toLowerCase() === cleanedInput
    );

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
      title="Year 1 Mixed Test"
      icon="📝"
      questionNumber={questionNumber}
      totalQuestions={TOTAL_QUESTIONS}
      score={score}
      question={question.question}
      message=""
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          ref={inputRef}
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-3 text-2xl text-center w-full focus:outline-none focus:border-blue-500"
          placeholder="Enter answer"
          disabled={showFeedbackModal || showEndModal}
        />

        <button
          type="submit"
          disabled={answer.trim() === ""}
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg w-full disabled:opacity-50 transition-colors text-lg"
        >
          Check Answer
        </button>
      </form>

      {/* --- QUESTION FEEDBACK POP-UP --- */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div
            className={`bg-white rounded-2xl p-6 text-center shadow-2xl max-w-sm w-full transform transition-all border-4 ${
              isCorrect ? "border-green-500" : "border-amber-400"
            }`}
          >
            <div className="text-6xl mb-3">
              {isCorrect ? "🎉" : "💡"}
            </div>
            <h3
              className={`text-2xl font-bold mb-2 ${
                isCorrect ? "text-green-600" : "text-amber-600"
              }`}
            >
              {isCorrect ? "Awesome Job!" : "Nice Try!"}
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              {isCorrect ? (
                "Spot on! Keep up the great work!"
              ) : (
                <>
                  Not quite. <br />
                  <span className="font-bold text-gray-900">
                    The correct answer is {question.answer}
                  </span>
                </>
              )}
            </p>
            <button
              onClick={handleNextQuestion}
              className={`w-full py-3 px-6 rounded-xl font-bold text-white text-lg transition-transform active:scale-95 ${
                isCorrect
                  ? "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-200"
                  : "bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-200"
              }`}
            >
              {questionNumber === TOTAL_QUESTIONS ? "See Final Score 🏆" : "Next Question ➔"}
            </button>
          </div>
        </div>
      )}

      {/* --- END OF QUIZ POP-UP --- */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md w-full border-4 border-indigo-500">
            <div className="text-7xl mb-4">
              {score >= 8 ? "🏆" : score >= 5 ? "🌟" : "💪"}
            </div>
            <h2 className="text-3xl font-extrabold text-indigo-950 mb-2">
              Mixed Test Complete!
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              You scored <span className="font-bold text-indigo-600">{score}</span> out of{" "}
              <span className="font-bold">{TOTAL_QUESTIONS}</span>!
            </p>

            <div className="bg-indigo-50 rounded-2xl p-4 mb-6">
              <p className="text-indigo-800 font-medium">
                Ready to try another mixed set?
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={restartQuiz}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-lg shadow-lg shadow-green-200 transition-transform active:scale-95"
              >
                Start New Test 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </QuizLayout>
  );
}