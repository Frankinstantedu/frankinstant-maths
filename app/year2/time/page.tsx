"use client";

import { useState, useRef, useEffect } from "react";
import QuizLayout from "@/app/components/QuizLayout";

const TOTAL_QUESTIONS = 10;

type TimeQuestion = {
  question: string;
  answerOptions: string[];
  correctAnswer: string;
  explanation: string;
};

const HOUR_NAMES = [
  "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"
];

function generateQuestion(): TimeQuestion {
  const questionTypes = ["clockToWords", "handsToWords", "quarterTo"];
  const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];

  // Pick a random hour from 1 to 12
  const hour = Math.floor(Math.random() * 12) + 1;
  const hourStr = hour.toString();
  const nextHourStr = (hour % 12 + 1).toString();

  if (type === "clockToWords") {
    // Basic positions: o'clock, half past, quarter past
    const positions = [
      {
        minute: 0,
        bigHand: 12,
        phrase: `${hourStr} o'clock`,
        desc: `big hand on 12 and small hand on ${hourStr}`
      },
      {
        minute: 15,
        bigHand: 3,
        phrase: `quarter past ${hourStr}`,
        desc: `big hand on 3 and small hand just past ${hourStr}`
      },
      {
        minute: 30,
        bigHand: 6,
        phrase: `half past ${hourStr}`,
        desc: `big hand on 6 and small hand halfway between ${hourStr} and ${nextHourStr}`
      }
    ];

    const pos = positions[Math.floor(Math.random() * positions.length)];
    const options = Array.from(new Set([
      pos.phrase,
      `quarter past ${hourStr}`,
      `half past ${hourStr}`,
      `${hourStr} o'clock`,
      `quarter to ${nextHourStr}`
    ])).slice(0, 4);

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    return {
      question: `What time is shown when the ${pos.desc}?`,
      answerOptions: options,
      correctAnswer: pos.phrase,
      explanation: `When the big hand (minute hand) is on ${pos.bigHand}, it represents ${pos.phrase}.`,
    };
  } else if (type === "handsToWords") {
    // Specific question focus: Quarter past vs Quarter to
    const isQuarterPast = Math.random() > 0.5;
    const bigHand = isQuarterPast ? 3 : 9;
    const targetTime = isQuarterPast
      ? `quarter past ${hourStr}`
      : `quarter to ${nextHourStr}`;

    const options = [
      `quarter past ${hourStr}`,
      `quarter to ${hourStr}`,
      `quarter to ${nextHourStr}`,
      `half past ${hourStr}`
    ];

    // Deduplicate and shuffle
    const uniqueOptions = Array.from(new Set(options)).slice(0, 4);
    uniqueOptions.sort(() => Math.random() - 0.5);

    return {
      question: `The big hand is pointing directly to ${bigHand} and the small hand is near ${isQuarterPast ? hourStr : nextHourStr}. What time is it?`,
      answerOptions: uniqueOptions,
      correctAnswer: targetTime,
      explanation: `Big hand on ${bigHand} means ${isQuarterPast ? "quarter past the hour" : "quarter to the next hour"}.`,
    };
  } else {
    // Explicit position checking
    return {
      question: `Where does the BIG hand point when the time is half past ${hourStr}?`,
      answerOptions: ["12", "3", "6", "9"],
      correctAnswer: "6",
      explanation: "The big hand points directly to 6 for half past every hour.",
    };
  }
}

export default function TimePage() {
  const [question, setQuestion] = useState(generateQuestion());
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  function handleSubmit(option: string) {
    setSelectedOption(option);
    const correct = option === question.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setShowFeedbackModal(true);
  }

  function handleNextQuestion() {
    setShowFeedbackModal(false);
    setSelectedOption("");

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
    setSelectedOption("");
    setShowEndModal(false);
  }

  return (
    <QuizLayout
      title="Tell the Time"
      icon="⏰"
      questionNumber={questionNumber}
      totalQuestions={TOTAL_QUESTIONS}
      score={score}
      question={question.question}
      message=""
    >
      {/* Option Selection Buttons */}
      <div className="grid grid-cols-1 gap-3 my-4">
        {question.answerOptions.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSubmit(option)}
            disabled={showFeedbackModal || showEndModal}
            className="w-full text-left bg-white hover:bg-teal-50 border-2 border-teal-200 hover:border-teal-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all active:scale-[0.98]"
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
              isCorrect ? "border-teal-500" : "border-slate-400"
            }`}
          >
            <div className="text-6xl mb-3">{isCorrect ? "⏰" : "💡"}</div>

            <h3
              className={`text-2xl font-bold mb-2 ${
                isCorrect ? "text-teal-600" : "text-slate-700"
              }`}
            >
              {isCorrect ? "Tick-Tock Perfect!" : "Nice Try!"}
            </h3>

            <p className="text-gray-700 text-lg mb-6">
              {isCorrect ? (
                "You know your clock positions!"
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
              className="w-full py-3 px-6 rounded-xl font-bold text-white text-lg bg-teal-600 hover:bg-teal-700 transition-transform active:scale-95"
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
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md w-full border-4 border-teal-500">
            <div className="text-7xl mb-4">
              {score >= 8 ? "🏆" : score >= 5 ? "🌟" : "💪"}
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Time Master!
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              You scored{" "}
              <span className="font-bold text-teal-600">{score}</span> out of{" "}
              <span className="font-bold">{TOTAL_QUESTIONS}</span>!
            </p>

            <button
              onClick={restartQuiz}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl text-lg transition-transform active:scale-95"
            >
              Play Again 🚀
            </button>
          </div>
        </div>
      )}
    </QuizLayout>
  );
}