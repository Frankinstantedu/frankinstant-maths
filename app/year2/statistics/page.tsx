"use client";

import { useState } from "react";
import QuizLayout from "@/app/components/QuizLayout";

const TOTAL_QUESTIONS = 10;

type Question = {
  question: string;
  answerOptions: string[];
  correctAnswer: string;
  explanation: string;
  visualData?: {
    type: "tally" | "pictogram";
    items: { label: string; count: number }[];
    scale?: number;
  };
};

function generateQuestion(): Question {
  const types = ["tallyCount", "pictogramValue", "differenceQuestion"];
  const type = types[Math.floor(Math.random() * types.length)];

  const categories = ["Apples", "Bananas", "Oranges", "Grapes"];
  
  if (type === "tallyCount") {
    // Generate a random tally count between 3 and 14
    const count = Math.floor(Math.random() * 12) + 3;
    const category = categories[Math.floor(Math.random() * categories.length)];

    // Convert count to standard Tally notation visually (e.g. 8 -> "卌 |||")
    const fullGroups = Math.floor(count / 5);
    const remainder = count % 5;
    const tallyStr = "卌 ".repeat(fullGroups) + "|".repeat(remainder);

    const options = Array.from(
      new Set([
        count.toString(),
        (count + 1).toString(),
        (count - 1).toString(),
        (count + 2).toString(),
      ])
    )
      .slice(0, 4)
      .sort(() => Math.random() - 0.5);

    return {
      question: `How many ${category.toLowerCase()} were counted in this tally? \n\n 📊 ${category}: ${tallyStr}`,
      answerOptions: options,
      correctAnswer: count.toString(),
      explanation: `Each bundle '卌' represents 5. So, ${fullGroups} bundle(s) of 5 plus ${remainder} single line(s) equals ${count}.`,
    };
  } else if (type === "pictogramValue") {
    // Pictogram with scale of 2
    const scale = 2;
    const items = [
      { label: "Red Team", count: (Math.floor(Math.random() * 5) + 1) * 2 }, // 2, 4, 6, 8, 10
      { label: "Blue Team", count: (Math.floor(Math.random() * 5) + 1) * 2 },
    ];

    const targetIndex = Math.floor(Math.random() * items.length);
    const target = items[targetIndex];

    const options = Array.from(
      new Set([
        target.count.toString(),
        (target.count / scale).toString(), // Distractor: forgetting key scale
        (target.count + 2).toString(),
        (target.count - 2).toString(),
      ])
    )
      .slice(0, 4)
      .sort(() => Math.random() - 0.5);

    return {
      question: `In a pictogram where ⭐ = 2 points, ${target.label} has ${"⭐".repeat(
        target.count / scale
      )}. How many points did ${target.label} score in total?`,
      answerOptions: options,
      correctAnswer: target.count.toString(),
      explanation: `Each ⭐ equals 2 points. ${target.label} has ${
        target.count / scale
      } star(s), so ${target.count / scale} × 2 = ${target.count} points.`,
    };
  } else {
    // Difference between two amounts
    const catA = Math.floor(Math.random() * 8) + 5; // 5 to 12
    const catB = Math.floor(Math.random() * 4) + 1; // 1 to 4
    const diff = catA - catB;

    const options = Array.from(
      new Set([
        diff.toString(),
        (diff + 1).toString(),
        (catA + catB).toString(), // Distractor: total sum
        Math.max(1, diff - 1).toString(),
      ])
    )
      .slice(0, 4)
      .sort(() => Math.random() - 0.5);

    return {
      question: `Class 2 voted for their favorite pets: 🐶 Dogs = ${catA}, 🐱 Cats = ${catB}. How many MORE children chose Dogs than Cats?`,
      answerOptions: options,
      correctAnswer: diff.toString(),
      explanation: `To find how many more, subtract the smaller number from the larger number: ${catA} - ${catB} = ${diff}.`,
    };
  }
}

export default function StatisticsPage() {
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
      title="Statistics & Charts"
      icon="📊"
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
            className="w-full text-center bg-white hover:bg-violet-50 border-2 border-violet-200 hover:border-violet-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all active:scale-[0.98]"
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
              isCorrect ? "border-violet-500" : "border-slate-400"
            }`}
          >
            <div className="text-6xl mb-3">{isCorrect ? "📊" : "💡"}</div>

            <h3
              className={`text-2xl font-bold mb-2 ${
                isCorrect ? "text-violet-600" : "text-slate-700"
              }`}
            >
              {isCorrect ? "Data Expert!" : "Nice Try!"}
            </h3>

            <p className="text-gray-700 text-lg mb-6">
              {isCorrect ? (
                "You read the chart correctly!"
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
              className="w-full py-3 px-6 rounded-xl font-bold text-white text-lg bg-violet-600 hover:bg-violet-700 transition-transform active:scale-95"
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
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md w-full border-4 border-violet-500">
            <div className="text-7xl mb-4">
              {score >= 8 ? "🏆" : score >= 5 ? "🌟" : "💪"}
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Data Champion!
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              You scored{" "}
              <span className="font-bold text-violet-600">{score}</span> out of{" "}
              <span className="font-bold">{TOTAL_QUESTIONS}</span>!
            </p>

            <button
              onClick={restartQuiz}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl text-lg transition-transform active:scale-95"
            >
              Play Again 🚀
            </button>
          </div>
        </div>
      )}
    </QuizLayout>
  );
}