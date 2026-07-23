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
  // 0: Time conversions / telling time (minutes in an hour, am/pm, digital)
  // 1: Length conversions (m to cm, cm to mm)
  // 2: Mass & Capacity conversions (kg to g, l to ml)
  // 3: Perimeter of 2D shapes
  const questionType = Math.floor(Math.random() * 4);

  let correct: string = "";
  let questionText: string = "";
  let explanationText: string = "";
  let wrongAnswers: string[] = [];

  switch (questionType) {
    case 0: {
      // Time: Minutes in hours or elapsed time
      const isElapsed = Math.random() > 0.5;

      if (isElapsed) {
        const startHour = Math.floor(Math.random() * 8) + 1; // 1-8
        const durationMins = (Math.floor(Math.random() * 4) + 1) * 15; // 15, 30, 45, 60
        const startMin = 0;

        const endTotalMins = startHour * 60 + startMin + durationMins;
        const endHour = Math.floor(endTotalMins / 60);
        const endMin = endTotalMins % 60;
        const endMinStr = endMin === 0 ? "00" : endMin.toString();

        correct = `${endHour}:${endMinStr}`;
        questionText = `A lesson starts at ${startHour}:00 and lasts ${durationMins} minutes. What time does it end?`;
        explanationText = `${startHour}:00 + ${durationMins} minutes = ${endHour}:${endMinStr}.`;

        wrongAnswers = [
          `${startHour + 1}:${endMinStr}`,
          `${endHour}:${(endMin + 15) % 60 === 0 ? "00" : (endMin + 15) % 60}`,
          `${Math.max(1, endHour - 1)}:${endMinStr}`,
        ];
      } else {
        const hours = Math.floor(Math.random() * 3) + 1;
        const mins = hours * 60;

        correct = `${mins} minutes`;
        questionText = `How many minutes are in ${hours} hour${hours > 1 ? "s" : ""}?`;
        explanationText = `There are 60 minutes in 1 hour. ${hours} × 60 = ${mins} minutes.`;

        wrongAnswers = [
          `${hours * 100} minutes`,
          `${mins + 30} minutes`,
          `${mins - 20} minutes`,
        ];
      }
      break;
    }

    case 1: {
      // Length: m to cm or cm to mm
      const isMetersToCm = Math.random() > 0.5;

      if (isMetersToCm) {
        const meters = Math.floor(Math.random() * 8) + 1;
        const cm = meters * 100;

        correct = `${cm} cm`;
        questionText = `How many centimeters are in ${meters} meter${meters > 1 ? "s" : ""}?`;
        explanationText = `1 meter = 100 cm. So, ${meters} m = ${meters} × 100 = ${cm} cm.`;

        wrongAnswers = [
          `${meters * 10} cm`,
          `${meters * 1000} cm`,
          `${cm + 50} cm`,
        ];
      } else {
        const cm = Math.floor(Math.random() * 9) + 2;
        const mm = cm * 10;

        correct = `${mm} mm`;
        questionText = `How many millimeters are in ${cm} cm?`;
        explanationText = `1 cm = 10 mm. So, ${cm} cm = ${cm} × 10 = ${mm} mm.`;

        wrongAnswers = [
          `${cm * 100} mm`,
          `${cm} mm`,
          `${mm + 5} mm`,
        ];
      }
      break;
    }

    case 2: {
      // Mass & Capacity: kg to g or l to ml
      const isMass = Math.random() > 0.5;

      if (isMass) {
        const kg = Math.floor(Math.random() * 5) + 1;
        const g = kg * 1000;

        correct = `${g} g`;
        questionText = `How many grams are equal to ${kg} kilogram${kg > 1 ? "s" : ""}?`;
        explanationText = `1 kg = 1000 g. So, ${kg} kg = ${kg} × 1000 = ${g} g.`;

        wrongAnswers = [
          `${kg * 100} g`,
          `${kg * 10} g`,
          `${g + 500} g`,
        ];
      } else {
        const liters = Math.floor(Math.random() * 4) + 1;
        const ml = liters * 1000;

        correct = `${ml} ml`;
        questionText = `How many milliliters are in ${liters} liter${liters > 1 ? "s" : ""}?`;
        explanationText = `1 liter = 1000 ml. So, ${liters} l = ${liters} × 1000 = ${ml} ml.`;

        wrongAnswers = [
          `${liters * 100} ml`,
          `${liters * 10} ml`,
          `${ml - 200} ml`,
        ];
      }
      break;
    }

    case 3: {
      // Perimeter of Rectangles or Squares
      const isSquare = Math.random() > 0.5;

      if (isSquare) {
        const side = Math.floor(Math.random() * 8) + 2; // 2 to 9 cm
        const perimeter = side * 4;

        correct = `${perimeter} cm`;
        questionText = `What is the perimeter of a square with sides of length ${side} cm?`;
        explanationText = `A square has 4 equal sides. Perimeter = ${side} + ${side} + ${side} + ${side} = ${perimeter} cm.`;

        wrongAnswers = [
          `${side * side} cm`, // Area mistake
          `${side * 2} cm`,
          `${perimeter + 4} cm`,
        ];
      } else {
        const length = Math.floor(Math.random() * 6) + 4; // 4 to 9 cm
        const width = Math.floor(Math.random() * 3) + 1; // 1 to 3 cm
        const perimeter = 2 * (length + width);

        correct = `${perimeter} cm`;
        questionText = `What is the perimeter of a rectangle with a length of ${length} cm and a width of ${width} cm?`;
        explanationText = `Perimeter = (2 × length) + (2 × width) = (${2 * length}) + (${2 * width}) = ${perimeter} cm.`;

        wrongAnswers = [
          `${length * width} cm`, // Area mistake
          `${length + width} cm`,
          `${perimeter + 2} cm`,
        ];
      }
      break;
    }
  }

  // Ensure 4 unique answer choices
  const optionsSet = new Set<string>([correct]);
  for (const wrong of wrongAnswers) {
    if (optionsSet.size === 4) break;
    optionsSet.add(wrong);
  }

  let fallback = 1;
  while (optionsSet.size < 4) {
    optionsSet.add(`${fallback}00 units`);
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

export default function Year3MeasurementTimePage() {
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
      title="Year 3: Measurement & Time"
      icon="⏰"
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