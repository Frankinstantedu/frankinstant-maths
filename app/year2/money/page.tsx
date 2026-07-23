"use client";

import { useState, useRef, useEffect } from "react";
import QuizLayout from "@/app/components/QuizLayout";

const TOTAL_QUESTIONS = 10;

type QuestionType = "change50p" | "change1Pound" | "combineCoins" | "penceToPounds";

function generateQuestion() {
  const types: QuestionType[] = ["change50p", "change1Pound", "combineCoins", "penceToPounds"];
  const type = types[Math.floor(Math.random() * types.length)];

  if (type === "change50p") {
    // Items costing 5p to 45p (multiples of 5)
    const cost = (Math.floor(Math.random() * 9) + 1) * 5;
    const change = 50 - cost;
    return {
      question: `You buy an item for ${cost}p and pay with a 50p coin. How much change do you get?`,
      answer: change,
      unit: "p",
      explanation: `50p - ${cost}p = ${change}p change.`,
    };
  } else if (type === "change1Pound") {
    // Items costing 10p to 90p (multiples of 10 or 5)
    const cost = (Math.floor(Math.random() * 18) + 1) * 5;
    const change = 100 - cost;
    return {
      question: `You buy a snack for ${cost}p and pay with a £1 coin (100p). How much change in pence do you get?`,
      answer: change,
      unit: "p",
      explanation: `100p (£1) - ${cost}p = ${change}p change.`,
    };
  } else if (type === "combineCoins") {
    const coin1Options = [10, 20, 50];
    const coin2Options = [5, 10, 20];
    const coin1 = coin1Options[Math.floor(Math.random() * coin1Options.length)];
    const coin2 = coin2Options[Math.floor(Math.random() * coin2Options.length)];
    const total = coin1 + coin2;
    return {
      question: `How much money is a ${coin1}p coin and a ${coin2}p coin together?`,
      answer: total,
      unit: "p",
      explanation: `${coin1}p + ${coin2}p = ${total}p.`,
    };
  } else {
    // penceToPounds (e.g., 150p = £1 and 50p -> ask for total pence of £1 and Xp)
    const extraPence = (Math.floor(Math.random() * 9) + 1) * 10;
    const totalPence = 100 + extraPence;
    return {
      question: `How many pence is £1 and ${extraPence}p in total?`,
      answer: totalPence,
      unit: "p",
      explanation: `£1 = 100p. So 100p + ${extraPence}p = ${totalPence}p.`,
    };
  }
}

export default function MoneyPage() {
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
      title="Money (Pounds & Pence)"
      icon="🪙"
      questionNumber={questionNumber}
      totalQuestions={TOTAL_QUESTIONS}
      score={score}
      question={question.question}
      message=""
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 text-2xl text-center w-full focus:outline-none focus:border-purple-500 pr-12"
            placeholder="Type answer in pence"
            disabled={showFeedbackModal || showEndModal}
          />
          <span className="absolute right-4 text-2xl font-bold text-gray-400 pointer-events-none">
            {question.unit}
          </span>
        </div>

        <button
          type="submit"
          disabled={answer.trim() === ""}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-lg w-full disabled:opacity-50 transition-colors text-lg"
        >
          Check Answer
        </button>
      </form>

      {/* FEEDBACK POP-UP */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div
            className={`bg-white rounded-2xl p-6 text-center shadow-2xl max-w-sm w-full border-4 ${
              isCorrect ? "border-purple-500" : "border-slate-400"
            }`}
          >
            <div className="text-6xl mb-3">{isCorrect ? "🪙" : "💡"}</div>

            <h3
              className={`text-2xl font-bold mb-2 ${
                isCorrect ? "text-purple-600" : "text-slate-700"
              }`}
            >
              {isCorrect ? "Smart Saver!" : "Nice Try!"}
            </h3>

            <p className="text-gray-700 text-lg mb-6">
              {isCorrect ? (
                "You calculated the correct amount!"
              ) : (
                <>
                  Correct Answer:{" "}
                  <span className="font-bold text-slate-900">
                    {question.answer}{question.unit}
                  </span>
                  <br />
                  <span className="text-sm text-slate-500 mt-1 block">
                    {question.explanation}
                  </span>
                </>
              )}
            </p>

            <button
              onClick={handleNextQuestion}
              className="w-full py-3 px-6 rounded-xl font-bold text-white text-lg bg-purple-600 hover:bg-purple-700 transition-transform active:scale-95"
            >
              {questionNumber === TOTAL_QUESTIONS
                ? "See Final Score 🏆"
                : "Next Question ➔"}
            </button>
          </div>
        </div>
      )}

      {/* END OF QUIZ POP-UP */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md w-full border-4 border-purple-500">
            <div className="text-7xl mb-4">
              {score >= 8 ? "🏆" : score >= 5 ? "🌟" : "💪"}
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Practice Complete!
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              You scored{" "}
              <span className="font-bold text-purple-600">{score}</span> out of{" "}
              <span className="font-bold">{TOTAL_QUESTIONS}</span>!
            </p>

            <button
              onClick={restartQuiz}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl text-lg transition-transform active:scale-95"
            >
              Play Again 🚀
            </button>
          </div>
        </div>
      )}
    </QuizLayout>
  );
}