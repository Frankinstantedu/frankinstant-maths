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
      // Equivalent Fractions
      const numerators = [1, 2, 3, 3, 4];
      const denominators = [2, 3, 4, 5, 5];
      const idx = Math.floor(Math.random() * numerators.length);
      const num = numerators[idx];
      const den = denominators[idx];
      const multiplier = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4

      const eqNum = num * multiplier;
      const eqDen = den * multiplier;

      questionText = `Which fraction is equivalent to ${num}/${den}?`;
      correct = `${eqNum}/${eqDen}`;
      explanationText = `Multiply both the numerator (${num}) and denominator (${den}) by ${multiplier}: ${num} × ${multiplier} = ${eqNum}, and ${den} × ${multiplier} = ${eqDen}.`;
      wrongAnswers = [
        `${eqNum}/${eqDen + 1}`,
        `${eqNum + 1}/${eqDen}`,
        `${eqNum}/${eqDen - 1}`,
      ];
      break;
    }
    case 1: {
      // Fraction to Decimal Conversion (Tenths & Hundredths)
      const isHundredths = Math.random() < 0.5;
      if (isHundredths) {
        const num = Math.floor(Math.random() * 90) + 10; // 10 to 99
        const dec = (num / 100).toFixed(2);
        questionText = `Convert ${num}/100 to a decimal.`;
        correct = dec;
        explanationText = `${num}/100 means ${num} hundredths, which is written as ${dec}.`;
        wrongAnswers = [
          (num / 10).toFixed(1),
          ((num + 5) / 100).toFixed(2),
          (num / 1000).toFixed(3),
        ];
      } else {
        const num = Math.floor(Math.random() * 9) + 1; // 1 to 9
        const dec = (num / 10).toFixed(1);
        questionText = `Convert ${num}/10 to a decimal.`;
        correct = dec;
        explanationText = `${num}/10 means ${num} tenths, which is written as ${dec}.`;
        wrongAnswers = [
          (num / 100).toFixed(2),
          ((num + 1) / 10).toFixed(1),
          (num / 1).toFixed(0),
        ];
      }
      break;
    }
    case 2: {
      // Dividing 1 or 2-digit numbers by 10 or 100
      const isBy100 = Math.random() < 0.5;
      const val = Math.floor(Math.random() * 89) + 10; // 10 to 98

      if (isBy100) {
        const ans = (val / 100).toFixed(2);
        questionText = `Calculate: ${val} ÷ 100`;
        correct = ans;
        explanationText = `Dividing by 100 moves all digits 2 places to the right: ${val} ÷ 100 = ${ans}.`;
        wrongAnswers = [
          (val / 10).toFixed(1),
          (val / 1000).toFixed(3),
          ((val + 10) / 100).toFixed(2),
        ];
      } else {
        const ans = (val / 10).toFixed(1);
        questionText = `Calculate: ${val} ÷ 10`;
        correct = ans;
        explanationText = `Dividing by 10 moves all digits 1 place to the right: ${val} ÷ 10 = ${ans}.`;
        wrongAnswers = [
          (val / 100).toFixed(2),
          ((val + 1) / 10).toFixed(1),
          val.toString(),
        ];
      }
      break;
    }
    case 3: {
      // Adding Fractions with Same Denominator
      const den = Math.floor(Math.random() * 6) + 5; // 5 to 10
      const num1 = Math.floor(Math.random() * 3) + 1; // 1 to 3
      const num2 = Math.floor(Math.random() * 3) + 1; // 1 to 3
      const sum = num1 + num2;

      questionText = `Calculate: ${num1}/${den} + ${num2}/${den}`;
      correct = `${sum}/${den}`;
      explanationText = `When denominators are the same, add the numerators and keep the denominator: ${num1} + ${num2} = ${sum}, so ${sum}/${den}.`;
      wrongAnswers = [
        `${sum}/${den * 2}`,
        `${sum + 1}/${den}`,
        `${num1 * num2}/${den}`,
      ];
      break;
    }
    case 4: {
      // Common Fraction/Decimal Equivalents (1/2, 1/4, 3/4)
      const commonFractions = [
        { frac: "1/2", dec: "0.5" },
        { frac: "1/4", dec: "0.25" },
        { frac: "3/4", dec: "0.75" },
      ];
      const item = commonFractions[Math.floor(Math.random() * commonFractions.length)];

      questionText = `What is ${item.frac} as a decimal?`;
      correct = item.dec;
      explanationText = `${item.frac} is equal to ${item.dec}.`;
      wrongAnswers = [
        (parseFloat(item.dec) + 0.1).toFixed(2),
        (parseFloat(item.dec) - 0.05).toFixed(2),
        "0.14",
      ];
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add((Math.random()).toFixed(2));
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function FractionsDecimalsPage() {
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
      title="Year 4: Fractions & Decimals"
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
            className="w-full text-center bg-white hover:bg-sky-50 border-2 border-sky-200 hover:border-sky-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}