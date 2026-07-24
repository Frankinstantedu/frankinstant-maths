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

// Helper to find Greatest Common Divisor to simplify fractions
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function simplify(num: number, den: number): string {
  const common = gcd(Math.abs(num), Math.abs(den));
  const simplifiedNum = num / common;
  const simplifiedDen = den / common;
  if (simplifiedDen === 1) return `${simplifiedNum}`;
  if (Math.abs(simplifiedNum) > simplifiedDen) {
    const whole = Math.trunc(simplifiedNum / simplifiedDen);
    const remainder = Math.abs(simplifiedNum % simplifiedDen);
    if (remainder === 0) return `${whole}`;
    return `${whole} ${remainder}/${simplifiedDen}`;
  }
  return `${simplifiedNum}/${simplifiedDen}`;
}

function generateQuestion(): Question {
  const type = Math.floor(Math.random() * 6);
  let correct = "";
  let questionText = "";
  let explanationText = "";
  let wrongAnswers: string[] = [];

  switch (type) {
    case 0: {
      // Adding unlike fractions e.g., a/b + c/d
      const den1 = Math.floor(Math.random() * 4) + 3; // 3 to 6
      const den2 = Math.floor(Math.random() * 4) + 3; // 3 to 6
      const commonDen = den1 * den2;
      const num1 = Math.floor(Math.random() * (den1 - 1)) + 1;
      const num2 = Math.floor(Math.random() * (den2 - 1)) + 1;
      
      const resultNum = num1 * den2 + num2 * den1;
      correct = simplify(resultNum, commonDen);

      questionText = `Calculate and give your answer in its simplest form: (${num1}/${den1}) + (${num2}/${den2})`;
      wrongAnswers = [
        simplify(resultNum + 2, commonDen),
        simplify(resultNum - 1, commonDen),
        `${num1 + num2}/${den1 + den2}`,
      ];
      explanationText = `Find a common denominator (${commonDen}), convert both fractions (${num1 * den2}/${commonDen} + ${num2 * den1}/${commonDen}), add the numerators to get ${resultNum}/${commonDen}, which simplifies to ${correct}.`;
      break;
    }
    case 1: {
      // Multiplying a fraction by a whole number or fraction e.g., (a/b) * whole
      const num = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const den = Math.floor(Math.random() * 3) + 5; // 5 to 7
      const whole = Math.floor(Math.random() * 5) + 4; // 4 to 8
      
      const resultNum = num * whole;
      correct = simplify(resultNum, den);

      questionText = `Calculate: (${num}/${den}) × ${whole}`;
      wrongAnswers = [
        simplify(resultNum + 3, den),
        simplify(resultNum, den + 2),
        `${num * whole}/${den * whole}`,
      ];
      explanationText = `Multiply the numerator by the whole number: (${num} × ${whole}) / ${den} = ${resultNum}/${den}, which simplifies to ${correct}.`;
      break;
    }
    case 2: {
      // Dividing a fraction by a whole number: (a/b) ÷ c
      const den = Math.floor(Math.random() * 4) + 3; // 3 to 6
      const multFactor = Math.floor(Math.random() * 3) + 2; // 2 to 4
      const num = den * multFactor; // ensures clean division
      const divisor = Math.floor(Math.random() * 3) + 2; // 2 to 4
      
      const finalNum = num;
      const finalDen = den * divisor;
      correct = simplify(finalNum, finalDen);

      questionText = `Calculate: (${num}/${den}) ÷ ${divisor}`;
      wrongAnswers = [
        simplify(num + 2, finalDen),
        simplify(num, finalDen + 3),
        `${num}/${den * divisor + 2}`,
      ];
      explanationText = `Multiply the denominator by the divisor: ${num} / (${den} × ${divisor}) = ${num}/${den * divisor}, which simplifies to ${correct}.`;
      break;
    }
    case 3: {
      // Complex decimal multiplication/division word problem
      const itemPrice = (Math.floor(Math.random() * 35) + 15) / 4; // e.g., 4.25, 6.75, etc.
      const quantity = Math.floor(Math.random() * 12) + 8;
      const total = Number((itemPrice * quantity).toFixed(2));

      questionType3:
      questionText = `A scientific kit costs £${itemPrice.toFixed(2)} per pack. If a school orders ${quantity} packs, what is the total cost?`;
      correct = `£${total.toFixed(2)}`;
      
      wrongAnswers = [
        `£${(total + 5.25).toFixed(2)}`,
        `£${(total - 3.50).toFixed(2)}`,
        `£${(total * 1.1).toFixed(2)}`,
      ];
      explanationText = `Multiply the unit price by the quantity: £${itemPrice.toFixed(2)} × ${quantity} = £${total.toFixed(2)}.`;
      break;
    }
    case 4: {
      // Percentage of an amount word problem (advanced)
      const baseAmount = (Math.floor(Math.random() * 40) + 12) * 50; // e.g. 800, 1200, 2000
      const percentages = [15, 35, 45, 65, 85];
      const pct = percentages[Math.floor(Math.random() * percentages.length)];
      const resultVal = (baseAmount * pct) / 100;

      questionText = `During a museum exhibition, ${pct}% of the ${baseAmount.toLocaleString()} visitors were children. How many children visited the exhibition?`;
      correct = `${resultVal.toLocaleString()}`;

      wrongAnswers = [
        `${(resultVal + 150).toLocaleString()}`,
        `${(resultVal - 200).toLocaleString()}`,
        `${(baseAmount - resultVal).toLocaleString()}`,
      ];
      explanationText = `Calculate ${pct}% of ${baseAmount.toLocaleString()} by finding 1% (${baseAmount / 100}) and multiplying by ${pct}, giving ${correct}.`;
      break;
    }
    case 5: {
      // Converting between fractions, decimals, and percentages
      const fractionsList = [
        { num: 3, den: 4, dec: "0.75", pct: "75%" },
        { num: 2, isDec: true, dec: "0.4", pct: "40%", text: "2/5" },
        { num: 1, den: 8, dec: "0.125", pct: "12.5%" },
        { num: 4, den: 5, dec: "0.8", pct: "80%" },
      ];
      const chosenF = fractionsList[Math.floor(Math.random() * fractionsList.length)];

      if (chosenF.den === 4) {
        questionText = `What is 3/4 written as a decimal?`;
        correct = "0.75";
        wrongAnswers = ["0.65", "0.8", "0.7"];
        explanationText = `3 divided by 4 equals 0.75.`;
      } else if (chosenF.den === 8) {
        questionText = `What is 1/8 written as a decimal?`;
        correct = "0.125";
        wrongAnswers = ["0.15", "0.25", "0.18"];
        explanationText = `1 divided by 8 equals 0.125.`;
      } else if (chosenF.den === 5) {
        questionText = `What is 4/5 written as a percentage?`;
        correct = "80%";
        wrongAnswers = ["75%", "85%", "45%"];
        explanationText = `Multiply numerator and denominator by 20 to get 80/100, which is 80%.`;
      } else {
        questionText = `What is 2/5 written as a decimal?`;
        correct = "0.4";
        wrongAnswers = ["0.25", "0.45", "0.2"];
        explanationText = `Multiply numerator and denominator by 2 to get 4/10, which is 0.4.`;
      }
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add("1/2");
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year6FractionsPage() {
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
      title="Year 6: Fractions, Decimals & Percentages"
      icon="🍕"
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