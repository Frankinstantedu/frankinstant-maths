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

const DIRECTIONS = ["North ⬆️", "East ➡️", "South ⬇️", "West ⬅️"];

function generateQuestion(): Question {
  const types = ["turnDirection", "compassTurn", "leftRight"];
  const type = types[Math.floor(Math.random() * types.length)];

  if (type === "turnDirection") {
    const turns = [
      { name: "quarter turn clockwise", shift: 1, exp: "A quarter turn clockwise shifts one position to the right (90 degrees)." },
      { name: "half turn", shift: 2, exp: "A half turn turns you all the way around to face the opposite direction (180 degrees)." },
      { name: "three-quarter turn clockwise", shift: 3, exp: "A three-quarter turn clockwise goes 3 steps around clockwise (270 degrees)." },
      { name: "quarter turn anti-clockwise", shift: 3, exp: "An anti-clockwise turn goes against the clock hands (left)." },
    ];
    const turn = turns[Math.floor(Math.random() * turns.length)];
    const startIndex = Math.floor(Math.random() * DIRECTIONS.length);
    const startDir = DIRECTIONS[startIndex];
    const targetIndex = (startIndex + turn.shift) % DIRECTIONS.length;
    const targetDir = DIRECTIONS[targetIndex];

    const options = DIRECTIONS.slice().sort(() => Math.random() - 0.5);

    return {
      question: `You are facing ${startDir}. If you make a ${turn.name}, which way are you facing now?`,
      answerOptions: options,
      correctAnswer: targetDir,
      explanation: turn.exp,
    };
  } else if (type === "compassTurn") {
    const clockwise = Math.random() > 0.5;
    const isHalf = Math.random() > 0.5;

    const turnName = isHalf
      ? "half turn"
      : clockwise
      ? "quarter turn clockwise"
      : "quarter turn anti-clockwise";

    return {
      question: `Clock hands move around a clock face to the right. What is this direction called?`,
      answerOptions: ["Clockwise", "Anti-clockwise", "Straight", "Backward"].sort(
        () => Math.random() - 0.5
      ),
      correctAnswer: "Clockwise",
      explanation: "Moving in the same direction as the hands of a clock is called clockwise.",
    };
  } else {
    // Left / Right spatial reasoning
    const scenarios = [
      { q: "Which hand forms an 'L' shape when you hold it up in front of you with your palm facing away?", a: "Left hand", options: ["Left hand", "Right hand"], exp: "Your left hand makes an 'L' shape with your thumb and index finger!" },
      { q: "If you are walking forward and take a 90-degree turn to the left, which way did you turn?", a: "Quarter turn anti-clockwise", options: ["Quarter turn clockwise", "Quarter turn anti-clockwise", "Half turn", "Full turn"], exp: "Turning left is the same movement as a quarter turn anti-clockwise." },
      { q: "How many right-angle turns make a full complete turn?", a: "4", options: ["2", "3", "4", "6"], exp: "There are 4 right-angle (quarter) turns in a full circle." },
    ];
    const s = scenarios[Math.floor(Math.random() * scenarios.length)];
    const options = Array.from(new Set(s.options)).sort(() => Math.random() - 0.5);

    return {
      question: s.q,
      answerOptions: options,
      correctAnswer: s.a,
      explanation: s.exp,
    };
  }
}

export default function PositionPage() {
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
      title="Position & Direction"
      icon="🧭"
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
            className="w-full text-center bg-white hover:bg-orange-50 border-2 border-orange-200 hover:border-orange-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all active:scale-[0.98]"
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
              isCorrect ? "border-orange-500" : "border-slate-400"
            }`}
          >
            <div className="text-6xl mb-3">{isCorrect ? "🧭" : "💡"}</div>

            <h3
              className={`text-2xl font-bold mb-2 ${
                isCorrect ? "text-orange-600" : "text-slate-700"
              }`}
            >
              {isCorrect ? "Great Navigation!" : "Nice Try!"}
            </h3>

            <p className="text-gray-700 text-lg mb-6">
              {isCorrect ? (
                "You know your turns and directions!"
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
              className="w-full py-3 px-6 rounded-xl font-bold text-white text-lg bg-orange-600 hover:bg-orange-700 transition-transform active:scale-95"
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
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md w-full border-4 border-orange-500">
            <div className="text-7xl mb-4">
              {score >= 8 ? "🏆" : score >= 5 ? "🌟" : "💪"}
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Year 2 Complete! 🎉
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              You scored{" "}
              <span className="font-bold text-orange-600">{score}</span> out of{" "}
              <span className="font-bold">{TOTAL_QUESTIONS}</span>!
            </p>

            <button
              onClick={restartQuiz}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl text-lg transition-transform active:scale-95"
            >
              Play Again 🚀
            </button>
          </div>
        </div>
      )}
    </QuizLayout>
  );
}