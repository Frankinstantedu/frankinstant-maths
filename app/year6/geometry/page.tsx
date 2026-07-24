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
  const type = Math.floor(Math.random() * 6);
  let correct = "";
  let questionText = "";
  let explanationText = "";
  let wrongAnswers: string[] = [];

  switch (type) {
    case 0: {
      // Area of a triangle (Area = 0.5 * base * height)
      const base = Math.floor(Math.random() * 8) + 6; // 6 to 13 cm
      const height = Math.floor(Math.random() * 6) + 4; // 4 to 9 cm
      const cleanBase = base % 2 === 0 ? base : base + 1;
      const area = (cleanBase * height) / 2;

      questionText = `Calculate the area of a triangle with a base of ${cleanBase} cm and a perpendicular height of ${height} cm.`;
      correct = `${area} cm²`;

      wrongAnswers = [
        `${cleanBase * height} cm²`,
        `${area + 6} cm²`,
        `${area - 4} cm²`,
      ];
      explanationText = `The area of a triangle is calculated as (base × height) ÷ 2. (${cleanBase} × ${height}) ÷ 2 = ${area} cm².`;
      break;
    }
    case 1: {
      // Volume of a cuboid (Length × Width × Height)
      const length = Math.floor(Math.random() * 5) + 4; // 4 to 8 cm
      const width = Math.floor(Math.random() * 4) + 3; // 3 to 6 cm
      const height = Math.floor(Math.random() * 4) + 2; // 2 to 5 cm
      const volume = length * width * height;

      questionText = `Calculate the volume of a cuboid with length ${length} cm, width ${width} cm, and height ${height} cm.`;
      correct = `${volume} cm³`;

      wrongAnswers = [
        `${volume + 24} cm³`,
        `${(length + width + height) * 2} cm³`,
        `${volume - 12} cm³`,
      ];
      explanationText = `The volume of a cuboid is Length × Width × Height. ${length} × ${width} × ${height} = ${volume} cm³.`;
      break;
    }
    case 2: {
      // Circumference of a circle (C = π × d, using π = 3.14)
      const diameters = [4, 6, 8, 10, 12, 14, 20];
      const d = diameters[Math.floor(Math.random() * diameters.length)];
      const pi = 3.14;
      const circumference = Number((pi * d).toFixed(2));

      questionText = `Calculate the circumference of a circle with a diameter of ${d} cm. (Use π ≈ 3.14)`;
      correct = `${circumference} cm`;

      wrongAnswers = [
        `${Number((pi * (d / 2)).toFixed(2))} cm`,
        `${Number((circumference + 3.14).toFixed(2))} cm`,
        `${Number((d * d * pi).toFixed(2))} cm`,
      ];
      explanationText = `The circumference of a circle is calculated as π × diameter. 3.14 × ${d} = ${circumference} cm.`;
      break;
    }
    case 3: {
      // Area of a circle (Area = π × r², using π = 3.14)
      const radii = [3, 4, 5, 6, 10];
      const r = radii[Math.floor(Math.random() * radii.length)];
      const pi = 3.14;
      const circleArea = Number((pi * r * r).toFixed(2));

      questionText = `Calculate the area of a circle with a radius of ${r} cm. (Use π ≈ 3.14)`;
      correct = `${circleArea} cm²`;

      wrongAnswers = [
        `${Number((pi * (r * 2)).toFixed(2))} cm²`,
        `${Number((circleArea + 12.5).toFixed(2))} cm²`,
        `${Number((pi * r).toFixed(2))} cm²`,
      ];
      explanationText = `The area of a circle is calculated as π × radius². First square the radius (${r} × ${r} = ${r * r}), then multiply by π (3.14 × ${r * r} = ${circleArea} cm²).`;
      break;
    }
    case 4: {
      // Missing angles in a triangle (sum to 180°)
      const angleA = Math.floor(Math.random() * 40) + 45;
      const angleB = Math.floor(Math.random() * 35) + 30;
      const angleC = 180 - (angleA + angleB);

      questionText = `In a triangle, two of the interior angles measure ${angleA}° and ${angleB}°. What is the measure of the third angle?`;
      correct = `${angleC}°`;

      wrongAnswers = [
        `${angleC + 15}°`,
        `${angleC - 10}°`,
        `${360 - (angleA + angleB)}°`,
      ];
      explanationText = `The angles in a triangle always add up to 180°. First add the two known angles (${angleA}° + ${angleB}° = ${angleA + angleB}°), then subtract from 180° to get ${angleC}°.`;
      break;
    }
    case 5: {
      // Angles on a straight line (sum to 180°)
      const knownAngle = Math.floor(Math.random() * 70) + 55;
      const missingAngle = 180 - knownAngle;

      questionText = `An angle is placed on a straight line. If one side measures ${knownAngle}°, what is the measure of the adjacent missing angle on the line?`;
      correct = `${missingAngle}°`;

      wrongAnswers = [
        `${missingAngle + 20}°`,
        `${360 - knownAngle}°`,
        `${missingAngle - 15}°`,
      ];
      explanationText = `Angles on a straight line always add up to 180°. Subtract the known angle from 180°: 180° - ${knownAngle}° = ${missingAngle}°.`;
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add("45°");
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year6GeometryPage() {
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
      title="Year 6: Measurement & Geometry"
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