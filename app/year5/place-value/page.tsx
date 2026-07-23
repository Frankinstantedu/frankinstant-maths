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

// Helper to convert numbers to Roman Numerals
function toRoman(num: number): string {
  const lookup: { [key: string]: number } = {
    M: 1000, CM: 900, D: 500, CD: 400,
    C: 100, XC: 90, L: 50, XL: 40,
    X: 10, IX: 9, V: 5, IV: 4, I: 1
  };
  let roman = "";
  for (const i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

function generateQuestion(): Question {
  const type = Math.floor(Math.random() * 4);
  let correct = "";
  let questionText = "";
  let explanationText = "";
  let wrongAnswers: string[] = [];

  switch (type) {
    case 0: {
      // Rounding large numbers (to nearest 10,000 or 100,000)
      const baseNum = Math.floor(Math.random() * 800000) + 150000;
      const roundTo = Math.random() < 0.5 ? 10000 : 100000;
      const rounded = Math.round(baseNum / roundTo) * roundTo;

      questionText = `What is ${baseNum.toLocaleString()} rounded to the nearest ${roundTo.toLocaleString()}?`;
      correct = rounded.toLocaleString();
      explanationText = `Looking at the digit to determine rounding, ${baseNum.toLocaleString()} rounded to the nearest ${roundTo.toLocaleString()} is ${rounded.toLocaleString()}.`;
      wrongAnswers = [
        (rounded + roundTo).toLocaleString(),
        (rounded - roundTo > 0 ? rounded - roundTo : rounded + roundTo * 2).toLocaleString(),
        (Math.round(baseNum / (roundTo / 10)) * (roundTo / 10)).toLocaleString(),
      ];
      break;
    }
    case 1: {
      // Roman Numerals conversion
      const romanNums = [44, 89, 412, 595, 742, 920, 1000];
      const target = romanNums[Math.floor(Math.random() * romanNums.length)];
      const romanStr = toRoman(target);

      questionText = `What is the number ${target} written in Roman numerals?`;
      correct = romanStr;
      explanationText = `${target} breaks down into Roman numeral notation as ${romanStr}.`;
      
      // Generate plausible wrong roman variations
      wrongAnswers = [
        toRoman(target + 10),
        toRoman(target - 10 > 0 ? target - 10 : target + 50),
        toRoman(target + 100 > 1000 ? 500 : target + 100),
      ];
      break;
    }
    case 2: {
      // Negative numbers count backwards / difference
      const start = Math.floor(Math.random() * 8) - 4; // -4 to 3
      const subtractVal = Math.floor(Math.random() * 8) + 3; // 3 to 10
      const ans = start - subtractVal;

      questionText = `The temperature is ${start}°C and it drops by ${subtractVal}°C. What is the new temperature?`;
      correct = `${ans}°C`;
      explanationText = `Starting at ${start} and counting down by ${subtractVal} passes zero to reach ${ans}°C.`;
      wrongAnswers = [
        `${Math.abs(ans)}°C`,
        `${ans + 2}°C`,
        `${ans - 4}°C`,
      ];
      break;
    }
    case 3: {
      // Finding the value of a specific digit in a 6-digit number
      const thousands = Math.floor(Math.random() * 9) + 1;
      const tenThousands = Math.floor(Math.random() * 9) + 1;
      const hundredThousands = Math.floor(Math.random() * 8) + 1;
      const rest = Math.floor(Math.random() * 900) + 100;
      const fullNum = hundredThousands * 100000 + tenThousands * 10000 + thousands * 1000 + rest;
      
      questionText = `In the number ${fullNum.toLocaleString()}, what is the value of the digit ${tenThousands}?`;
      const val = tenThousands * 10000;
      correct = val.toLocaleString();
      explanationText = `The digit ${tenThousands} is in the ten-thousands column, so its value is ${val.toLocaleString()}.`;
      wrongAnswers = [
        (tenThousands * 1000).toLocaleString(),
        (tenThousands * 100000).toLocaleString(),
        tenThousands.toLocaleString(),
      ];
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add(`${Math.floor(Math.random() * 500000) + 10000}`);
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year5PlaceValuePage() {
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
      title="Year 5: Place Value & Roman Numerals"
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
            className="w-full text-center bg-white hover:bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}