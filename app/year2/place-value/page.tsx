"use client";

import { useState, useRef, useEffect } from "react";
import QuizLayout from "@/app/components/QuizLayout";

const TOTAL_QUESTIONS = 10;

type QuestionType = "tens" | "ones" | "partition" | "compare";

function generateQuestion() {
  const types: QuestionType[] = ["tens", "ones", "partition", "compare"];
  const type = types[Math.floor(Math.random() * types.length)];
  const num = Math.floor(Math.random() * 89) + 10; // 10 to 98

  const tens = Math.floor(num / 10);
  const ones = num % 10;

  if (type === "tens") {
    return {
      question: `How many TENS are in ${num}?`,
      answer: tens,
      explanation: `${num} = ${tens} tens and ${ones} ones.`,
    };
  } else if (type === "ones") {
    return {
      question: `How many ONES are in ${num}?`,
      answer: ones,
      explanation: `${num} = ${tens} tens and ${ones} ones.`,
    };
  } else if (type === "partition") {
    return {
      question: `${tens}0 + ${ones} = ?`,
      answer: num,
      explanation: `${tens} tens (${tens * 10}) + ${ones} ones = ${num}.`,
    };
  } else {
    // Compare
    const otherNum = Math.floor(Math.random() * 89) + 10;
    const diff = num - otherNum;
    return {
      question: `What is ${tens}0 + ${ones}?`,
      answer: num,
      explanation: `${tens}0 + ${ones} = ${num}.`,
    };
  }
}

export default function PlaceValuePage() {
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
      title="Place Value (Tens & Ones)"
      icon="🔢"
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
          className="border-2 border-gray-300 rounded-lg p-3 text-2xl text-center w-full focus:outline-none focus:border-amber-500"
          placeholder="Type your answer"
          disabled={showFeedbackModal || showEndModal}
        />

        <button
          type="submit"
          disabled={answer.trim() === ""}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-lg w-full disabled:opacity-50 transition-colors text-lg"
        >
          Check Answer
        </button>
      </form>

      {/* FEEDBACK POP-UP */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div
            className={`bg-white rounded-2xl p-6 text-center shadow-2xl max-w-sm w-full border-4 ${
              isCorrect ? "border-amber-500" : "border-slate-400"
            }`}
          >
            <div className="text-6xl mb-3">{isCorrect ? "🌟" : "💡"}</div>
            
            <h3 className={`text-2xl font-bold mb-2 ${isCorrect ? "text-amber-600" : "text-slate-700"}`}>
              {isCorrect ? "Brilliant Job!" : "Almost!"}
            </h3>

            <p className="text-gray-700 text-lg mb-6">
              {isCorrect ? (
                "You understand place value well!"
              ) : (
                <>
                  Correct Answer: <span className="font-bold text-slate-900">{question.answer}</span>
                  <br />
                  <span className="text-sm text-slate-500 mt-1 block">{question.explanation}</span>
                </>
              )}
            </p>

            <button
              onClick={handleNextQuestion}
              className="w-full py-3 px-6 rounded-xl font-bold text-white text-lg bg-amber-500 hover:bg-amber-600 transition-transform active:scale-95"
            >
              {questionNumber === TOTAL_QUESTIONS ? "See Final Score 🏆" : "Next Question ➔"}
            </button>
          </div>
        </div>
      )}

      {/* END OF QUIZ POP-UP */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md w-full border-4 border-amber-500">
            <div className="text-7xl mb-4">{score >= 8 ? "🏆" : score >= 5 ? "🌟" : "💪"}</div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Practice Complete!</h2>
            <p className="text-lg text-gray-600 mb-4">
              You scored <span className="font-bold text-amber-600">{score}</span> out of <span className="font-bold">{TOTAL_QUESTIONS}</span>!
            </p>

            <button
              onClick={restartQuiz}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl text-lg transition-transform active:scale-95"
            >
              Play Again 🚀
            </button>
          </div>
        </div>
      )}
    </QuizLayout>
  );
}