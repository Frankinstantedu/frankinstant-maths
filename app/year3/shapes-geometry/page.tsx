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
  // Question Types:
  // 0: 3D Shape properties (faces, edges, vertices)
  // 1: Angles (right angles, acute, obtuse, turns)
  // 2: Line types (horizontal, vertical, parallel, perpendicular)
  // 3: 2D Shape properties (sides, vertices, symmetry)
  const questionType = Math.floor(Math.random() * 4);

  let correct: string = "";
  let questionText: string = "";
  let explanationText: string = "";
  let wrongAnswers: string[] = [];

  switch (questionType) {
    case 0: {
      // 3D Shape Properties
      const shapes3D = [
        { name: "Cube", faces: 6, edges: 12, vertices: 8 },
        { name: "Square-based Pyramid", faces: 5, edges: 8, vertices: 5 },
        { name: "Triangular Prism", faces: 5, edges: 9, vertices: 6 },
        { name: "Cylinder", faces: 3, edges: 2, vertices: 0 },
      ];
      const shape = shapes3D[Math.floor(Math.random() * shapes3D.length)];
      const propertyType = Math.floor(Math.random() * 3); // 0: faces, 1: edges, 2: vertices

      if (propertyType === 0) {
        correct = shape.faces.toString();
        questionText = `How many faces does a ${shape.name} have?`;
        explanationText = `A ${shape.name} has ${shape.faces} faces.`;
        wrongAnswers = [(shape.faces + 2).toString(), Math.max(1, shape.faces - 1).toString(), (shape.faces + 4).toString()];
      } else if (propertyType === 1) {
        correct = shape.edges.toString();
        questionText = `How many edges does a ${shape.name} have?`;
        explanationText = `A ${shape.name} has ${shape.edges} edges.`;
        wrongAnswers = [(shape.edges + 2).toString(), Math.max(1, shape.edges - 3).toString(), (shape.edges + 4).toString()];
      } else {
        correct = shape.vertices.toString();
        questionText = `How many vertices (corners) does a ${shape.name} have?`;
        explanationText = `A ${shape.name} has ${shape.vertices} vertices.`;
        wrongAnswers = [(shape.vertices + 2).toString(), Math.max(0, shape.vertices - 2).toString(), (shape.vertices + 3).toString()];
      }
      break;
    }

    case 1: {
      // Angles & Turns
      const subType = Math.random() > 0.5;

      if (subType) {
        questionText = "An angle that is smaller than a right angle (90°) is called:";
        correct = "Acute angle";
        explanationText = "Acute angles are less than 90°. Obtuse angles are greater than 90° but less than 180°.";
        wrongAnswers = ["Obtuse angle", "Right angle", "Reflex angle"];
      } else {
        const rightAngles = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4
        const degrees = rightAngles * 90;

        correct = `${degrees}°`;
        questionText = `How many degrees are in ${rightAngles} right angles?`;
        explanationText = `1 right angle = 90°. So ${rightAngles} × 90° = ${degrees}°.`;
        wrongAnswers = [`${degrees - 90}°`, `${degrees + 40}°`, `${degrees + 90}°`];
      }
      break;
    }

    case 2: {
      // Lines: Parallel vs Perpendicular
      const isParallel = Math.random() > 0.5;

      if (isParallel) {
        questionText = "Two lines that run side-by-side and never meet, staying the exact same distance apart, are:";
        correct = "Parallel lines";
        explanationText = "Parallel lines never cross each other, like railway tracks.";
        wrongAnswers = ["Perpendicular lines", "Vertical lines", "Curved lines"];
      } else {
        questionText = "Two lines that meet or cross at a right angle (90°) are:";
        correct = "Perpendicular lines";
        explanationText = "Perpendicular lines meet to form a 90° right angle, like the corner of a square.";
        wrongAnswers = ["Parallel lines", "Horizontal lines", "Symmetrical lines"];
      }
      break;
    }

    case 3: {
      // 2D Shapes (Polygons)
      const shapes2D = [
        { name: "Pentagon", sides: 5 },
        { name: "Hexagon", sides: 6 },
        { name: "Octagon", sides: 8 },
        { name: "Triangle", sides: 3 },
      ];
      const shape = shapes2D[Math.floor(Math.random() * shapes2D.length)];

      correct = `${shape.sides} sides`;
      questionText = `How many sides does a regular ${shape.name} have?`;
      explanationText = `A ${shape.name} is a 2D shape with ${shape.sides} sides.`;
      wrongAnswers = [
        `${shape.sides + 1} sides`,
        `${Math.max(2, shape.sides - 2)} sides`,
        `${shape.sides + 3} sides`,
      ];
      break;
    }
  }

  // Ensure 4 unique options
  const optionsSet = new Set<string>([correct]);
  for (const wrong of wrongAnswers) {
    if (optionsSet.size === 4) break;
    optionsSet.add(wrong);
  }

  let fallback = 1;
  while (optionsSet.size < 4) {
    optionsSet.add(`Option ${fallback}`);
    fallback++;
  }

  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year3ShapesGeometryPage() {
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
      title="Year 3: Shapes & Geometry"
      icon="📐"
      questionNumber={questionNumber}
      totalQuestions={TOTAL_QUESTIONS}
      score={score}
      question={question.question}
      showFeedbackModal={showFeedbackModal}
      isCorrect={isCorrect}
      correctAnswer={question.correctAnswer}
      explanation={question.explanation}
      onNextQuestion={handleNextQuestion}
      showEndModal={showEndModal}
      onRestartQuiz={restartQuiz}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {question.answerOptions.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSubmit(option)}
            disabled={showFeedbackModal || showEndModal}
            className="w-full text-center bg-white hover:bg-teal-50 border-2 border-teal-200 hover:border-teal-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}