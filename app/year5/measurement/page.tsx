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
      // Converting units (grams to kilograms or cm to m)
      const isKg = Math.random() < 0.5;
      if (isKg) {
        const grams = (Math.floor(Math.random() * 45) + 15) * 100; // e.g., 2500g
        const kg = grams / 1000;
        questionText = `Convert ${grams} grams into kilograms.`;
        correct = `${kg} kg`;
        explanationText = `To convert grams to kilograms, divide by 1,000. ${grams} ÷ 1000 = ${kg} kg.`;
        wrongAnswers = [
          `${kg * 10} kg`,
          `${kg / 10} kg`,
          `${kg + 1} kg`,
        ];
      } else {
        const meters = Math.floor(Math.random() * 7) + 2; // 2m to 8m
        const cm = meters * 100;
        questionText = `Convert ${meters} meters into centimeters.`;
        correct = `${cm} cm`;
        explanationText = `To convert meters to centimeters, multiply by 100. ${meters} × 100 = ${cm} cm.`;
        wrongAnswers = [
          `${cm / 10} cm`,
          `${cm * 10} cm`,
          `${cm + 50} cm`,
        ];
      }
      break;
    }
    case 1: {
      // Perimeter of a rectangle
      const length = Math.floor(Math.random() * 12) + 6; // 6 to 17
      const width = Math.floor(Math.random() * 8) + 4; // 4 to 11
      const perimeter = 2 * (length + width);

      questionText = `Calculate the perimeter of a rectangle with a length of ${length} cm and a width of ${width} cm.`;
      correct = `${perimeter} cm`;
      explanationText = `The formula for perimeter is 2 × (length + width). So, 2 × (${length} + ${width}) = 2 × ${length + width} = ${perimeter} cm.`;
      wrongAnswers = [
        `${length * width} cm`,
        `${perimeter + 4} cm`,
        `${perimeter - 6} cm`,
      ];
      break;
    }
    case 2: {
      // Area of a rectangle
      const length = Math.floor(Math.random() * 9) + 5; // 5 to 13
      const width = Math.floor(Math.random() * 6) + 3; // 3 to 8
      const area = length * width;

      questionText = `Calculate the area of a rectangle measuring ${length} cm by ${width} cm.`;
      correct = `${area} cm²`;
      explanationText = `Area is calculated by multiplying length by width: ${length} × ${width} = ${area} cm².`;
      wrongAnswers = [
        `${2 * (length + width)} cm²`,
        `${area + 6} cm²`,
        `${area - 4} cm²`,
      ];
      break;
    }
    case 3: {
      // Volume estimation (counting unit cubes)
      const l = Math.floor(Math.random() * 4) + 2; // 2 to 5
      const w = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const h = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const volume = l * w * h;

      questionText = `A cuboid has a length of ${l} cm, width of ${w} cm, and height of ${h} cm. What is its volume?`;
      correct = `${volume} cm³`;
      explanationText = `Volume is calculated by multiplying length × width × height: ${l} × ${w} × ${h} = ${volume} cm³.`;
      wrongAnswers = [
        `${volume + 8} cm³`,
        `${l * w + h} cm³`,
        `${volume - 4 > 0 ? volume - 4 : volume + 6} cm³`,
      ];
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add(`24 cm`);
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year5MeasurementPage() {
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
      title="Year 5: Measurement & Volume"
      icon="📏"
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
            className="w-full text-center bg-white hover:bg-rose-50 border-2 border-rose-200 hover:border-rose-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}