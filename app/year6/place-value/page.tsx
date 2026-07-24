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
      // Finding the value of a specific digit in numbers up to 10,000,000
      const millions = Math.floor(Math.random() * 8) + 1;
      const hundredThousands = Math.floor(Math.random() * 9);
      const tenThousands = Math.floor(Math.random() * 9);
      const thousands = Math.floor(Math.random() * 9);
      const hundreds = Math.floor(Math.random() * 9);
      const tens = Math.floor(Math.random() * 9);
      const units = Math.floor(Math.random() * 9);

      const fullNum = millions * 1000000 + hundredThousands * 100000 + tenThousands * 10000 + thousands * 1000 + hundreds * 100 + tens * 10 + units;
      const formattedNum = fullNum.toLocaleString();

      // Pick a random position to ask about
      const positions = [
        { name: "hundred-thousands", val: hundredThousands * 100000 },
        { name: "ten-thousands", val: tenThousands * 10000 },
        { name: "millions", val: millions * 1000000 },
      ];
      const chosen = positions[Math.floor(Math.random() * positions.length)];

      questionText = `In the number ${formattedNum}, what is the value of the digit in the ${chosen.name} place?`;
      correct = chosen.val.toLocaleString();
      
      const wrong1 = (chosen.val * 10).toLocaleString();
      const wrong2 = Math.floor(chosen.val / 10 > 0 ? chosen.val / 10 : chosen.val * 100).toLocaleString();
      const wrong3 = (chosen.val + 50000).toLocaleString();
      wrongAnswers = [wrong1, wrong2, wrong3];
      explanationText = `The digit in the ${chosen.name} place represents ${correct}.`;
      break;
    }
    case 1: {
      // Negative numbers in context (temperature drops)
      const startTemp = Math.floor(Math.random() * 6) + 1; // 1 to 6 degrees
      const drop = Math.floor(Math.random() * 8) + 4; // 4 to 11 degrees drop
      const finalTemp = startTemp - drop;

      questionText = `The temperature in Helsinki is ${startTemp}°C. Over night, the temperature drops by ${drop}°C. What is the new temperature?`;
      correct = `${finalTemp}°C`;

      wrongAnswers = [
        `${finalTemp + 2}°C`,
        `${Math.abs(finalTemp)}°C`,
        `${finalTemp - 3}°C`,
      ];
      explanationText = `Start at ${startTemp}°C. Subtracting ${drop}°C crosses zero: ${startTemp} - ${startTemp} = 0, and remaining ${drop - startTemp} down below zero gives ${finalTemp}°C.`;
      break;
    }
    case 2: {
      // Rounding large numbers to nearest 10,000 or 100,000
      const base = Math.floor(Math.random() * 40) + 12; // e.g., 12 to 51
      const tail = Math.floor(Math.random() * 8000) + 1200;
      const num = base * 100000 + tail;
      const rounded = Math.round(num / 100000) * 100000;

      questionText = `Round the number ${num.toLocaleString()} to the nearest 100,000.`;
      correct = rounded.toLocaleString();

      wrongAnswers = [
        (rounded + 100000).toLocaleString(),
        (rounded - 100000).toLocaleString(),
        (Math.round(num / 10000) * 10000).toLocaleString(),
      ];
      explanationText = `Look at the ten-thousands digit to decide whether to round up or down to the nearest 100,000, giving ${correct}.`;
      break;
    }
    case 3: {
      // Multi-step addition/subtraction word problem with large figures
      const initialStock = Math.floor(Math.random() * 200000) + 400000;
      const sold = Math.floor(Math.random() * 150000) + 100000;
      const restocked = Math.floor(Math.random() * 120000) + 80000;
      const finalAns = initialStock - sold + restocked;

      questionText = `A warehouse starts with ${initialStock.toLocaleString()} items. They sell ${sold.toLocaleString()} items, and then receive a new shipment of ${restocked.toLocaleString()} items. How many items are in the warehouse now?`;
      correct = finalAns.toLocaleString();

      wrongAnswers = [
        (finalAns + 25000).toLocaleString(),
        (finalAns - 50000).toLocaleString(),
        (initialStock + restocked).toLocaleString(),
      ];
      explanationText = `First subtract the items sold (${initialStock.toLocaleString()} - ${sold.toLocaleString()} = ${(initialStock - sold).toLocaleString()}), then add the restock shipment to get ${correct}.`;
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add("100,000");
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year6PlaceValuePage() {
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
      title="Year 6: Place Value & Advanced Numbers"
      icon="🔢"
      questionNumber={questionNumber}
      totalQuestions={TOTAL_QUESTIONS}
      score= {score}
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