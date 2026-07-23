"use client";

import { useState, useRef, useEffect } from "react";
import QuizLayout from "../../components/QuizLayout";

const TOTAL_QUESTIONS = 10;

interface FractionQuestion {
  question: string;
  answer: string;
  validAnswers: string[]; // Allows flexible matching for young learners
}

function generateQuestion(): FractionQuestion {
  const questions: FractionQuestion[] = [
    {
      question: "Which fraction is half?",
      answer: "1/2",
      validAnswers: ["1/2", "half", "a half", "one half"],
    },
    {
      question: "Which fraction means one quarter?",
      answer: "1/4",
      validAnswers: ["1/4", "quarter", "a quarter", "one quarter"],
    },
    {
      question: "How many quarters make a whole?",
      answer: "4",
      validAnswers: ["4", "four"],
    },
    {
      question: "How many halves make a whole?",
      answer: "2",
      validAnswers: ["2", "two"],
    },
    {
      question: "Which is bigger: 1/2 or 1/4?",
      answer: "1/2",
      validAnswers: ["1/2", "half", "one half"],
    },
    {
      question: "Which fraction means three quarters?",
      answer: "3/4",
      validAnswers: ["3/4", "three quarters", "3 quarters"],
    },
  ];

  return questions[Math.floor(Math.random() * questions.length)];
}

export default function FractionsPage() {
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
      title="Fractions Practice"
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
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-3 text-2xl text-center w-full focus:outline-none focus:border-blue-500"
          placeholder="e.g. 1/2 or 4"
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
                "You understand your fractions!"
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
              Practice Complete!
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              You scored <span className="font-bold text-indigo-600">{score}</span> out of{" "}
              <span className="font-bold">{TOTAL_QUESTIONS}</span>!
            </p>

            <div className="bg-indigo-50 rounded-2xl p-4 mb-6">
              <p className="text-indigo-800 font-medium">
                Do you want to continue practicing?
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={restartQuiz}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-lg shadow-lg shadow-green-200 transition-transform active:scale-95"
              >
                Yes! 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </QuizLayout>
  );
}