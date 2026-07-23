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
  const type = Math.floor(Math.random() * 4);
  let correct = "";
  let questionText = "";
  let explanationText = "";
  let wrongAnswers: string[] = [];

  switch (type) {
    case 0: {
      // Identifying Angle Types based on degrees
      const angles = [
        { deg: Math.floor(Math.random() * 80) + 10, type: "Acute angle" },
        { deg: 90, type: "Right angle" },
        { deg: Math.floor(Math.random() * 80) + 95, type: "Obtuse angle" },
      ];
      const selected = angles[Math.floor(Math.random() * angles.length)];

      questionText = `An angle measures ${selected.deg}°. What type of angle is it?`;
      correct = selected.type;
      if (selected.deg < 90) {
        explanationText = `Angles less than 90° are acute angles.`;
      } else if (selected.deg === 90) {
        explanationText = `Angles measuring exactly 90° are right angles.`;
      } else {
        explanationText = `Angles between 90° and 180° are obtuse angles.`;
      }
      
      const allTypes = ["Acute angle", "Right angle", "Obtuse angle", "Reflex angle"];
      wrongAnswers = allTypes.filter((t) => t !== selected.type);
      break;
    }
    case 1: {
      // Triangle Classification
      const triangles = [
        {
          name: "Equilateral triangle",
          desc: "a triangle with all 3 sides and all 3 angles equal",
        },
        {
          name: "Isosceles triangle",
          desc: "a triangle with 2 equal sides and 2 equal angles",
        },
        {
          name: "Scalene triangle",
          desc: "a triangle with all 3 sides and angles different",
        },
      ];
      const selected = triangles[Math.floor(Math.random() * triangles.length)];

      questionText = `What is the name of ${selected.desc}?`;
      correct = selected.name;
      explanationText = `An ${selected.name.toLowerCase()} is defined as ${selected.desc}.`;
      wrongAnswers = triangles
        .map((t) => t.name)
        .filter((n) => n !== selected.name)
        .concat(["Right-angled triangle"]);
      break;
    }
    case 2: {
      // Quadrilateral Properties
      const quads = [
        {
          name: "Parallelogram",
          prop: "a 4-sided shape with 2 pairs of parallel sides and opposite equal angles",
        },
        {
          name: "Trapezium",
          prop: "a 4-sided shape with exactly 1 pair of parallel sides",
        },
        {
          name: "Rhombus",
          prop: "a 4-sided shape with 4 equal sides and opposite sides parallel",
        },
      ];
      const selected = quads[Math.floor(Math.random() * quads.length)];

      questionText = `Which shape is ${selected.prop}?`;
      correct = selected.name;
      explanationText = `A ${selected.name} is ${selected.prop}.`;
      wrongAnswers = quads
        .map((q) => q.name)
        .filter((n) => n !== selected.name)
        .concat(["Rectangle"]);
      break;
    }
    case 3: {
      // Lines of Symmetry
      const shapes = [
        { name: "Square", lines: 4 },
        { name: "Rectangle (non-square)", lines: 2 },
        { name: "Equilateral Triangle", lines: 3 },
        { name: "Regular Hexagon", lines: 6 },
      ];
      const selected = shapes[Math.floor(Math.random() * shapes.length)];

      questionText = `How many lines of symmetry does a regular ${selected.name} have?`;
      correct = selected.lines.toString();
      explanationText = `A regular ${selected.name} has ${selected.lines} lines of symmetry.`;
      wrongAnswers = [
        (selected.lines + 1).toString(),
        (selected.lines - 1 < 0 ? 0 : selected.lines - 1).toString(),
        (selected.lines * 2).toString(),
      ];
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add(`${Math.floor(Math.random() * 5)}`);
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function GeometryPage() {
  const [question, setQuestion] = useState(generateQuestion());
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  function handleSubmit(option: string) {
    const correct = option === question.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore((prev) => prev + 1);
    setShowFeedbackModal(true);
  }

  function handleNextQuestion() {
    setShowFeedbackModal(false);
    if (questionNumber >= TOTAL_QUESTIONS) setShowEndModal(true);
    else {
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
      title="Year 4: Geometry & Symmetry"
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