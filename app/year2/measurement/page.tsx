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
  const types = ["unitSelection", "comparison", "temperature", "readingScale"];
  const type = types[Math.floor(Math.random() * types.length)];

  if (type === "unitSelection") {
    const scenarios = [
      { item: "the length of a pencil", correct: "cm", options: ["cm", "m", "kg", "l"], exp: "Pencils are small, so we measure their length in centimetres (cm)." },
      { item: "the height of a school building", correct: "m", options: ["cm", "m", "g", "ml"], exp: "Tall objects like buildings are measured in metres (m)." },
      { item: "the mass of an apple", correct: "g", options: ["g", "kg", "m", "l"], exp: "Light objects are weighed in grams (g)." },
      { item: "the weight of a adult human", correct: "kg", options: ["g", "kg", "cm", "ml"], exp: "Heavier objects and people are weighed in kilograms (kg)." },
      { item: "a spoon full of medicine", correct: "ml", options: ["ml", "l", "kg", "cm"], exp: "Small amounts of liquid are measured in millilitres (ml)." },
      { item: "the water in a swimming pool", correct: "l", options: ["ml", "l", "g", "cm"], exp: "Large amounts of liquid are measured in litres (l)." },
    ];
    const s = scenarios[Math.floor(Math.random() * scenarios.length)];
    s.options.sort(() => Math.random() - 0.5);

    return {
      question: `Which unit should you use to measure ${s.item}?`,
      answerOptions: s.options,
      correctAnswer: s.correct,
      explanation: s.exp,
    };
  } else if (type === "comparison") {
    const isMore = Math.random() > 0.5;
    const val1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
    const diff = Math.floor(Math.random() * 5) + 1;
    const val2 = isMore ? val1 + diff : Math.max(1, val1 - diff);
    
    const units = ["cm", "m", "kg", "g", "l", "ml"];
    const unit = units[Math.floor(Math.random() * units.length)];

    const options = [">", "<", "="];
    const correct = val1 > val2 ? ">" : val1 < val2 ? "<" : "=";

    return {
      question: `Which symbol makes this statement true? \n ${val1}${unit} ___ ${val2}${unit}`,
      answerOptions: options,
      correctAnswer: correct,
      explanation: `${val1}${unit} is ${val1 > val2 ? "greater than" : "less than"} ${val2}${unit}.`,
    };
  } else if (type === "temperature") {
    const temps = [
      { text: "a sunny summer day", range: "25°C", options: ["0°C", "10°C", "25°C", "100°C"], exp: "25°C is warm and pleasant for a summer day!" },
      { text: "freezing ice", range: "0°C", options: ["0°C", "20°C", "40°C", "100°C"], exp: "Water freezes into ice at 0°C." },
      { text: "boiling water", range: "100°C", options: ["10°C", "37°C", "50°C", "100°C"], exp: "Water boils at 100°C." },
    ];
    const t = temps[Math.floor(Math.random() * temps.length)];
    t.options.sort(() => Math.random() - 0.5);

    return {
      question: `What is a realistic temperature for ${t.text}?`,
      answerOptions: t.options,
      correctAnswer: t.range,
      explanation: t.exp,
    };
  } else {
    // Reading scale differences
    const start = Math.floor(Math.random() * 5) * 10; // 0, 10, 20, 30...
    const jump = 10;
    const target = start + jump;

    return {
      question: `A container has ${start}ml of liquid. You pour in another ${jump}ml. How much liquid is in the container now?`,
      answerOptions: [
        `${target}ml`,
        `${target + 5}ml`,
        `${target - 5}ml`,
        `${target + 10}ml`,
      ].sort(() => Math.random() - 0.5),
      correctAnswer: `${target}ml`,
      explanation: `${start}ml + ${jump}ml = ${target}ml.`,
    };
  }
}

export default function MeasurementPage() {
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
      title="Measurement & Units"
      icon="📏"
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
            className="w-full text-center bg-white hover:bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all active:scale-[0.98]"
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
              isCorrect ? "border-emerald-500" : "border-slate-400"
            }`}
          >
            <div className="text-6xl mb-3">{isCorrect ? "📏" : "💡"}</div>

            <h3
              className={`text-2xl font-bold mb-2 ${
                isCorrect ? "text-emerald-600" : "text-slate-700"
              }`}
            >
              {isCorrect ? "Spot On!" : "Nice Try!"}
            </h3>

            <p className="text-gray-700 text-lg mb-6">
              {isCorrect ? (
                "Great measurement skills!"
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
              className="w-full py-3 px-6 rounded-xl font-bold text-white text-lg bg-emerald-600 hover:bg-emerald-700 transition-transform active:scale-95"
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
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md w-full border-4 border-emerald-500">
            <div className="text-7xl mb-4">
              {score >= 8 ? "🏆" : score >= 5 ? "🌟" : "💪"}
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Measurement Master!
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              You scored{" "}
              <span className="font-bold text-emerald-600">{score}</span> out of{" "}
              <span className="font-bold">{TOTAL_QUESTIONS}</span>!
            </p>

            <button
              onClick={restartQuiz}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-lg transition-transform active:scale-95"
            >
              Play Again 🚀
            </button>
          </div>
        </div>
      )}
    </QuizLayout>
  );
}