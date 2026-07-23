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
  const type = Math.floor(Math.random() * 5);
  let correct = "";
  let questionText = "";
  let explanationText = "";
  let wrongAnswers: string[] = [];

  switch (type) {
    case 0: {
      // 4-Digit Value Identification
      const num = Math.floor(Math.random() * 8999) + 1000;
      const str = num.toString();
      const pos = Math.floor(Math.random() * 4);
      const digit = str[pos];
      const placeNames = ["thousands", "hundreds", "tens", "ones"];
      const multipliers = [1000, 100, 10, 1];
      const val = parseInt(digit) * multipliers[pos];

      questionText = `What is the value of the digit '${digit}' in ${num.toLocaleString()}?`;
      correct = val.toString();
      explanationText = `The digit '${digit}' is in the ${placeNames[pos]} place, so its value is ${digit} × ${multipliers[pos]} = ${val}.`;
      wrongAnswers = [
        (val / 10).toString(),
        (val * 10).toString(),
        (val + 50).toString(),
      ];
      break;
    }
    case 1: {
      // Rounding to nearest 10, 100, or 1000
      const roundTo = [10, 100, 1000][Math.floor(Math.random() * 3)];
      const num = Math.floor(Math.random() * 8000) + 1200;
      const rounded = Math.round(num / roundTo) * roundTo;

      questionText = `Round ${num.toLocaleString()} to the nearest ${roundTo}.`;
      correct = rounded.toString();
      explanationText = `Look at the digit after the ${roundTo}s place to decide whether to round up or down. ${num.toLocaleString()} rounds to ${rounded.toString()}.`;
      wrongAnswers = [
        (rounded + roundTo).toString(),
        (rounded - roundTo).toString(),
        (rounded + roundTo / 2).toString(),
      ];
      break;
    }
    case 2: {
      // Negative Numbers in Context (Temperature)
      const startTemp = Math.floor(Math.random() * 5) + 1; // 1 to 5
      const drop = Math.floor(Math.random() * 6) + 6; // 6 to 11
      const finalTemp = startTemp - drop;

      questionText = `The temperature was ${startTemp}°C and dropped by ${drop}°C overnight. What is the new temperature?`;
      correct = `${finalTemp}°C`;
      explanationText = `Counting down from ${startTemp}°C by ${drop} degrees: ${startTemp} - ${drop} = ${finalTemp}°C.`;
      wrongAnswers = [
        `${finalTemp + 2}°C`,
        `${Math.abs(finalTemp)}°C`,
        `${finalTemp - 3}°C`,
      ];
      break;
    }
    case 3: {
      // Roman Numerals up to 100 (C)
      const numerals: { [key: string]: number } = {
        X: 10,
        XX: 20,
        XL: 40,
        L: 50,
        LX: 60,
        XC: 90,
        C: 100,
      };
      const keys = Object.keys(numerals);
      const chosenKey = keys[Math.floor(Math.random() * keys.length)];
      const chosenVal = numerals[chosenKey];

      questionText = `What is the value of the Roman numeral '${chosenKey}'?`;
      correct = chosenVal.toString();
      explanationText = `In Roman numerals, ${chosenKey} represents ${chosenVal}.`;
      wrongAnswers = [
        (chosenVal + 10).toString(),
        (chosenVal - 5).toString(),
        (chosenVal + 5).toString(),
      ];
      break;
    }
    case 4: {
      // Counting back through zero
      const start = Math.floor(Math.random() * 4) + 2; // 2 to 5
      const step = Math.floor(Math.random() * 5) + 5; // 5 to 9
      const result = start - step;

      questionText = `What number is ${step} less than ${start}?`;
      correct = result.toString();
      explanationText = `Starting at ${start} and subtracting ${step} passes zero to give ${result}.`;
      wrongAnswers = [
        (result + 1).toString(),
        Math.abs(result).toString(),
        (result - 2).toString(),
      ];
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add(`${Math.floor(Math.random() * 100)}`);
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year4PlaceValuePage() {
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
      title="Year 4: Place Value & Negatives"
      icon="🔢"
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
            className="w-full text-center bg-white hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}