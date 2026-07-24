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

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function generateQuestion(): Question {
  const type = Math.floor(Math.random() * 4);
  let correct = "";
  let questionText = "";
  let explanationText = "";
  let wrongAnswers: string[] = [];

  switch (type) {
    case 0: {
      const baseA = Math.floor(Math.random() * 4) + 2;
      const baseB = baseA + (Math.floor(Math.random() * 3) + 1);
      const multiplier = Math.floor(Math.random() * 4) + 3;
      
      const numA = baseA * multiplier;
      const numB = baseB * multiplier;
      correct = `${baseA}:${baseB}`;

      questionText = `Simplify the ratio ${numA} : ${numB} to its simplest form.`;
      wrongAnswers = [
        `${baseA + 1}:${baseB}`,
        `${baseA}:${baseB + 1}`,
        `${numA / 2}:${numB / 2}`,
      ];
      explanationText = `Find the greatest common divisor of ${numA} and ${numB}, which is ${multiplier}. Divide both sides by ${multiplier} to get ${correct}.`;
      break;
    }
    case 1: {
      const partA = Math.floor(Math.random() * 3) + 2;
      const partB = Math.floor(Math.random() * 4) + 3;
      const totalParts = partA + partB;
      const unitValue = Math.floor(Math.random() * 8) + 5;
      const totalAmount = totalParts * unitValue;
      
      const shareA = partA * unitValue;
      correct = `£${shareA}`;

      questionText = `Share £${totalAmount} between Ben and Mia in the ratio ${partA} : ${partB}. How much money does Ben receive (the first part)?`;
      wrongAnswers = [
        `£${partB * unitValue}`,
        `£${shareA + unitValue}`,
        `£${Math.round(totalAmount / 2)}`,
      ];
      explanationText = `Add the parts together (${partA} + ${partB} = ${totalParts} parts). Find the value of one part (£${totalAmount} ÷ ${totalParts} = £${unitValue}). Multiply Ben's parts (${partA}) by £${unitValue} to get £${shareA}.`;
      break;
    }
    case 2: {
      const baseFlour = Math.floor(Math.random() * 150) + 200;
      const baseCookies = 12;
      const targetCookies = 36;
      const multiplier = targetCookies / baseCookies;
      const targetFlour = baseFlour * multiplier;

      questionText = `A recipe for ${baseCookies} cookies uses ${baseFlour}g of flour. How many grams of flour are needed to make ${targetCookies} cookies?`;
      correct = `${targetFlour}g`;

      wrongAnswers = [
        `${targetFlour + 50}g`,
        `${targetFlour - 40}g`,
        `${baseFlour * 2}g`,
      ];
      explanationText = `Find the scale factor (${targetCookies} ÷ ${baseCookies} = ${multiplier}). Multiply the flour amount by ${multiplier}: ${baseFlour}g × ${multiplier} = ${targetFlour}g.`;
      break;
    }
    case 3: {
      const costPerUnits = Math.floor(Math.random() * 3) + 2;
      const initialQty = Math.floor(Math.random() * 4) + 3;
      const initialCost = initialQty * costPerUnits;
      const newQty = initialQty + (Math.floor(Math.random() * 4) + 2);
      const newCost = newQty * costPerUnits;

      questionText = `If ${initialQty} notebooks cost £${initialCost}, how much do ${newQty} notebooks cost at the same rate?`;
      correct = `£${newCost}`;

      wrongAnswers = [
        `£${newCost + costPerUnits}`,
        `£${newCost - costPerUnits * 2}`,
        `£${initialCost + newQty}`,
      ];
      explanationText = `First find the cost of 1 notebook (£${initialCost} ÷ ${initialQty} = £${costPerUnits}). Then multiply by ${newQty} to get £${newCost}.`;
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add("24");
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year6RatioPage() {
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
      title="Year 6: Ratio & Proportion"
      icon="⚖️"
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
            className="w-full text-center bg-white hover:bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}