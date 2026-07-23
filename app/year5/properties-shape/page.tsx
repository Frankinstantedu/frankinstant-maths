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
  const type = Math.floor(Math.random() * 3);
  let correct = "";
  let questionText = "";
  let explanationText = "";
  let wrongAnswers: string[] = [];

  switch (type) {
    case 0: {
      // Angles around a point or on a straight line
      const isLine = Math.random() < 0.5;
      if (isLine) {
        const knownAngle = Math.floor(Math.random() * 110) + 30; // 30 to 140
        const missing = 180 - knownAngle;
        questionText = `Angles on a straight line add up to 180°. If one angle is ${knownAngle}°, what is the missing adjacent angle?`;
        correct = `${missing}°`;
        explanationText = `Subtract the known angle from 180°: 180° - ${knownAngle}° = ${missing}°.`;
        wrongAnswers = [`${360 - knownAngle}°`, `${missing + 10}°`, `${Math.abs(missing - 15)}°`];
      } else {
        const knownAngle = Math.floor(Math.random() * 200) + 80; // 80 to 280
        const missing = 360 - knownAngle;
        questionText = `Angles around a point add up to 360°. If the sum of the other angles is ${knownAngle}°, what is the final missing angle?`;
        correct = `${missing}°`;
        explanationText = `Subtract from 360°: 360° - ${knownAngle}° = ${missing}°.`;
        wrongAnswers = [`${180 - knownAngle > 0 ? 180 - knownAngle : 90}°`, `${missing + 20}°`, `${missing - 10}°`];
      }
      break;
    }
    case 1: {
      // Identifying regular polygons and properties
      const polygons = [
        { name: "Pentagon", sides: "5" },
        { name: "Hexagon", sides: "6" },
        { name: "Heptagon", sides: "7" },
        { name: "Octagon", sides: "8" },
        { name: "Decagon", sides: "10" },
      ];
      const chosen = polygons[Math.floor(Math.random() * polygons.length)];
      
      questionText = `How many straight sides and interior angles does a regular ${chosen.name.toLowerCase()} have?`;
      correct = chosen.sides;
      explanationText = `A ${chosen.name.toLowerCase()} is a polygon with exactly ${chosen.sides} sides.`;
      wrongAnswers = ["4", "6", "8", "12"].filter(s => s !== chosen.sides).slice(0, 3);
      break;
    }
    case 2: {
      // Identifying 3D shapes from properties (faces, edges, vertices)
      const shapes3D = [
        { shape: "Cube", faces: 6, edges: 12, vertices: 8 },
        { shape: "Square-based pyramid", faces: 5, edges: 8, vertices: 5 },
        { shape: "Tetrahedron (Triangular pyramid)", faces: 4, edges: 6, vertices: 4 },
      ];
      const chosen3D = shapes3D[Math.floor(Math.random() * shapes3D.length)];

      questionText = `How many vertices (corners) does a ${chosen3D.shape.toLowerCase()} have?`;
      correct = chosen3D.vertices.toString();
      explanationText = `A ${chosen3D.shape.toLowerCase()} has ${chosen3D.vertices} vertices, ${chosen3D.faces} faces, and ${chosen3D.edges} edges.`;
      wrongAnswers = [
        (chosen3D.vertices + 2).toString(),
        (chosen3D.vertices - 1).toString(),
        (chosen3D.vertices + 4).toString(),
      ];
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add("90°");
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year5PropertiesShapePage() {
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
      title="Year 5: Properties of Shape"
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