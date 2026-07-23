"use client";

import { useState, useRef, useEffect } from "react";
import QuizLayout from "../../components/QuizLayout";

const TOTAL_QUESTIONS = 10;

interface MeasurementQuestion {
  question: string;
  answer: string;
  validAnswers: string[]; // Accepts unit variations (e.g. "10cm", "10 cm", "10")
}

function generateQuestion(): MeasurementQuestion {
  const questions: MeasurementQuestion[] = [
    {
      question: "Which is longer: 10cm or 5cm?",
      answer: "10cm",
      validAnswers: ["10cm", "10 cm", "10"],
    },
    {
      question: "Which is shorter: 3m or 8m?",
      answer: "3m",
      validAnswers: ["3m", "3 m", "3"],
    },
    {
      question: "Which is heavier: 5kg or 2kg?",
      answer: "5kg",
      validAnswers: ["5kg", "5 kg", "5"],
    },
    {
      question: "Which holds more: 5 litres or 2 litres?",
      answer: "5 litres",
      validAnswers: ["5 litres", "5litres", "5l", "5 l", "5"],
    },
    {
      question: "How many centimetres are in 1 metre?",
      answer: "100",
      validAnswers: ["100", "100cm", "100 cm", "one hundred"],
    },
    {
      question: "Which is lighter: 1kg or 4kg?",
      answer: "1kg",
      validAnswers: ["1kg", "1 kg", "1"],
    },
  ];

  return questions[Math.floor(Math.random() * questions.length)];
}

export default function MeasurementPage() {
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
      title="Measurement Practice"
      icon="📏"
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
          placeholder="e.g. 10cm or 100"
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
                "You are getting great at measuring!"
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