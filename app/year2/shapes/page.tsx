"use client";

import { useState, useRef, useEffect } from "react";
import QuizLayout from "@/app/components/QuizLayout";

const TOTAL_QUESTIONS = 10;

type ShapeQuestion = {
  question: string;
  answerOptions: string[];
  correctAnswer: string;
  explanation: string;
};

const SHAPE_DATA = [
  // 2D Shapes
  { name: "Triangle", type: "2D", sides: 3, vertices: 3 },
  { name: "Square", type: "2D", sides: 4, vertices: 4 },
  { name: "Rectangle", type: "2D", sides: 4, vertices: 4 },
  { name: "Pentagon", type: "2D", sides: 5, vertices: 5 },
  { name: "Hexagon", type: "2D", sides: 6, vertices: 6 },
  { name: "Octagon", type: "2D", sides: 8, vertices: 8 },
  // 3D Shapes
  { name: "Cube", type: "3D", faces: 6, edges: 12, vertices: 8 },
  { name: "Cuboid", type: "3D", faces: 6, edges: 12, vertices: 8 },
  { name: "Sphere", type: "3D", faces: 1, edges: 0, vertices: 0 },
  { name: "Cylinder", type: "3D", faces: 3, edges: 2, vertices: 0 },
  { name: "Square-based Pyramid", type: "3D", faces: 5, edges: 8, vertices: 5 },
];

function generateQuestion(): ShapeQuestion {
  const questionTypes = ["sides2D", "vertices2D", "faces3D", "identifyType"];
  const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];

  if (type === "sides2D") {
    const shapes2D = SHAPE_DATA.filter((s) => s.type === "2D");
    const shape = shapes2D[Math.floor(Math.random() * shapes2D.length)];
    const correct = shape.sides!.toString();
    const options = Array.from(new Set([correct, "3", "4", "5", "6", "8"]))
      .slice(0, 4)
      .sort(() => Math.random() - 0.5);

    return {
      question: `How many straight sides does a ${shape.name} have?`,
      answerOptions: options,
      correctAnswer: correct,
      explanation: `A ${shape.name} is a 2D shape with ${shape.sides} sides.`,
    };
  } else if (type === "vertices2D") {
    const shapes2D = SHAPE_DATA.filter((s) => s.type === "2D");
    const shape = shapes2D[Math.floor(Math.random() * shapes2D.length)];
    const correct = shape.vertices!.toString();
    const options = Array.from(new Set([correct, "3", "4", "5", "6", "8"]))
      .slice(0, 4)
      .sort(() => Math.random() - 0.5);

    return {
      question: `How many vertices (corners) does a ${shape.name} have?`,
      answerOptions: options,
      correctAnswer: correct,
      explanation: `A ${shape.name} has ${shape.vertices} vertices where sides meet.`,
    };
  } else if (type === "faces3D") {
    const shapes3D = SHAPE_DATA.filter((s) => s.type === "3D");
    const shape = shapes3D[Math.floor(Math.random() * shapes3D.length)];
    const correct = shape.faces!.toString();
    const options = Array.from(new Set([correct, "1", "3", "5", "6", "12"]))
      .slice(0, 4)
      .sort(() => Math.random() - 0.5);

    return {
      question: `How many faces does a ${shape.name} have?`,
      answerOptions: options,
      correctAnswer: correct,
      explanation: `A ${shape.name} has ${shape.faces} faces in total.`,
    };
  } else {
    // 2D vs 3D identification
    const shape = SHAPE_DATA[Math.floor(Math.random() * SHAPE_DATA.length)];
    const options = ["2D (Flat)", "3D (Solid)"];
    const correct = shape.type === "2D" ? "2D (Flat)" : "3D (Solid)";

    return {
      question: `Is a ${shape.name} a 2D shape or a 3D shape?`,
      answerOptions: options,
      correctAnswer: correct,
      explanation: `${shape.name} is a ${shape.type} shape. 2D shapes are flat, while 3D shapes are solid objects.`,
    };
  }
}

export default function ShapesPage() {
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
      title="2D & 3D Shapes"
      icon="📐"
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
            className="w-full text-center bg-white hover:bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all active:scale-[0.98]"
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
              isCorrect ? "border-indigo-500" : "border-slate-400"
            }`}
          >
            <div className="text-6xl mb-3">{isCorrect ? "📐" : "💡"}</div>

            <h3
              className={`text-2xl font-bold mb-2 ${
                isCorrect ? "text-indigo-600" : "text-slate-700"
              }`}
            >
              {isCorrect ? "Shape Genius!" : "Nice Try!"}
            </h3>

            <p className="text-gray-700 text-lg mb-6">
              {isCorrect ? (
                "You know your shape properties!"
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
              className="w-full py-3 px-6 rounded-xl font-bold text-white text-lg bg-indigo-600 hover:bg-indigo-700 transition-transform active:scale-95"
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
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md w-full border-4 border-indigo-500">
            <div className="text-7xl mb-4">
              {score >= 8 ? "🏆" : score >= 5 ? "🌟" : "💪"}
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Shape Detective Complete!
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              You scored{" "}
              <span className="font-bold text-indigo-600">{score}</span> out of{" "}
              <span className="font-bold">{TOTAL_QUESTIONS}</span>!
            </p>

            <button
              onClick={restartQuiz}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-lg transition-transform active:scale-95"
            >
              Play Again 🚀
            </button>
          </div>
        </div>
      )}
    </QuizLayout>
  );
}