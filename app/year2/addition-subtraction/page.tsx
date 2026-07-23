"use client";

import { useState } from "react";
import QuizLayout from "@/app/components/QuizLayout";

const TOTAL_QUESTIONS = 10;

type Question = {
  question: string;
  answerOptions: string[];
  correctAnswer: string;
  explanation: string;
};

function generateQuestion(): Question {
  const types = ["coinValue", "combinedCoins", "changeFromAmount"];
  const type = types[Math.floor(Math.random() * types.length)];

  if (type === "coinValue") {
    const coins = [
      { name: "1p coin", val: 1 },
      { name: "2p coin", val: 2 },
      { name: "5p coin", val: 5 },
      { name: "10p coin", val: 10 },
      { name: "20p coin", val: 20 },
      { name: "50p coin", val: 50 },
      { name: "£1 coin", val: 100 },
    ];
    const coin = coins[Math.floor(Math.random() * coins.length)];
    const isPound = coin.val >= 100;
    const correctStr = isPound ? `£${coin.val / 100}` : `${coin.val}p`;

    const options = Array.from(
      new Set([
        correctStr,
        isPound ? "£2" : `${coin.val + 5}p`,
        isPound ? "50p" : `${Math.max(1, coin.val - 2)}p`,
        isPound ? "£5" : `${coin.val + 10}p`,
      ])
    )
      .slice(0, 4)
      .sort(() => Math.random() - 0.5);

    return {
      question: `What is the value of a standard UK ${coin.name}?`,
      answerOptions: options,
      correctAnswer: correctStr,
      explanation: `A ${coin.name} is worth ${correctStr}.`,
    };
  } else if (type === "combinedCoins") {
    const coinVals = [2, 5, 10, 20];
    const c1 = coinVals[Math.floor(Math.random() * coinVals.length)];
    const c2 = coinVals[Math.floor(Math.random() * coinVals.length)];
    const total = c1 + c2;
    const correctStr = `${total}p`;

    const options = Array.from(
      new Set([
        correctStr,
        `${total + 5}p`,
        `${Math.max(2, total - 5)}p`,
        `${total + 10}p`,
      ])
    )
      .slice(0, 4)
      .sort(() => Math.random() - 0.5);

    return {
      question: `You have a ${c1}p coin and a ${c2}p coin. What is the total amount of money?`,
      answerOptions: options,
      correctAnswer: correctStr,
      explanation: `${c1}p + ${c2}p = ${total}p.`,
    };
  } else {
    // Change from 50p or £1 (100p)
    const totalCost = Math.floor(Math.random() * 8) * 5 + 10; // 10p, 15p, 20p... 45p
    const paid = 50;
    const change = paid - totalCost;
    const correctStr = `${change}p`;

    const options = Array.from(
      new Set([
        correctStr,
        `${change + 5}p`,
        `${Math.max(5, change - 5)}p`,
        `${totalCost}p`,
      ])
    )
      .slice(0, 4)
      .sort(() => Math.random() - 0.5);

    return {
      question: `You buy a toy for ${totalCost}p and pay with a 50p coin. How much change do you get back?`,
      answerOptions: options,
      correctAnswer: correctStr,
      explanation: `To find the change, subtract the cost from what you paid: 50p - ${totalCost}p = ${change}p.`,
    };
  }
}

export default function MoneyPage() {
  const [question, setQuestion] = useState(generateQuestion());
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  function handleSubmit(option: string) {
    const correct = option === question.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setShowFeedbackModal(true);
  }

  function handleNextQuestion() {
    setShowFeedbackModal(false);

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
    setShowEndModal(false);
  }

  return (
    <QuizLayout
      title="Money & Coins"
      icon="🪙"
      questionNumber={questionNumber}
      totalQuestions={TOTAL_QUESTIONS}
      score={score}
      question={question.question}
      message=""
    >
      {/* Option Selection Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {question.answerOptions.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSubmit(option)}
            disabled={showFeedbackModal || showEndModal}
            className="w-full text-center bg-white hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>

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
              {isCorrect ? "Money Smart!" : "Nice Try!"}
            </h3>

            <p className="text-gray-700 text-lg mb-6">
              {isCorrect ? (
                "You counted the money correctly!"
              ) : (
                <>
                  Correct Answer:{" "}
                  <span className="font-bold text-slate-900 block mt-1 text-xl">
                    {question.correctAnswer}
                  </span>
                  <span className="text-sm text-slate-500 mt-2 block">
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
              Financial Whiz!
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