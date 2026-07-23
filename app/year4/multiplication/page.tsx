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
      // 11x and 12x Multiplication Tables
      const tables = [11, 12];
      const table = tables[Math.floor(Math.random() * tables.length)];
      const multiplier = Math.floor(Math.random() * 12) + 1;
      const ans = table * multiplier;

      questionText = `What is ${multiplier} × ${table}?`;
      correct = ans.toString();
      explanationText = `${multiplier} groups of ${table} equals ${ans}.`;
      wrongAnswers = [
        (ans + table).toString(),
        (ans - table).toString(),
        (ans + 2).toString(),
      ];
      break;
    }
    case 1: {
      // 3-Digit by 1-Digit Multiplication
      const num1 = Math.floor(Math.random() * 200) + 100; // 100-299
      const num2 = Math.floor(Math.random() * 6) + 3; // 3-8
      const ans = num1 * num2;

      questionText = `Calculate: ${num1} × ${num2}`;
      correct = ans.toString();
      explanationText = `Multiplying each place value: (${Math.floor(num1 / 100) * 100} × ${num2}) + (${Math.floor((num1 % 100) / 10) * 10} × ${num2}) + (${num1 % 10} × ${num2}) = ${ans}.`;
      wrongAnswers = [
        (ans + 10).toString(),
        (ans - 20).toString(),
        (ans + 100).toString(),
      ];
      break;
    }
    case 2: {
      // Division with Remainders
      const divisor = Math.floor(Math.random() * 6) + 4; // 4 to 9
      const quotient = Math.floor(Math.random() * 15) + 5; // 5 to 19
      const remainder = Math.floor(Math.random() * (divisor - 1)) + 1; // 1 to divisor-1
      const dividend = quotient * divisor + remainder;

      questionText = `What is ${dividend} ÷ ${divisor}?`;
      correct = `${quotient} r ${remainder}`;
      explanationText = `${divisor} goes into ${dividend} exactly ${quotient} times with a remainder of ${remainder} (${quotient} × ${divisor} = ${quotient * divisor}, then ${dividend} - ${quotient * divisor} = ${remainder}).`;
      wrongAnswers = [
        `${quotient} r ${remainder + 1}`,
        `${quotient + 1} r ${remainder}`,
        `${quotient - 1} r ${remainder}`,
      ];
      break;
    }
    case 3: {
      // Factor Pairs
      const targetNumbers = [12, 16, 20, 24, 30, 36, 40, 48];
      const target = targetNumbers[Math.floor(Math.random() * targetNumbers.length)];
      
      // Find all valid factor pairs
      const factorPairs: [number, number][] = [];
      for (let i = 1; i <= Math.sqrt(target); i++) {
        if (target % i === 0) factorPairs.push([i, target / i]);
      }
      
      const chosenPair = factorPairs[Math.floor(Math.random() * factorPairs.length)];
      const factor1 = chosenPair[0];
      const factor2 = chosenPair[1];

      questionText = `Which pair of numbers are both factors of ${target}?`;
      correct = `${factor1} and ${factor2}`;
      explanationText = `Since ${factor1} × ${factor2} = ${target}, both ${factor1} and ${factor2} are factors of ${target}.`;
      wrongAnswers = [
        `${factor1} and ${factor2 + 2}`,
        `${factor1 + 1} and ${factor2}`,
        `${factor1} and ${factor2 - 1}`,
      ];
      break;
    }
    case 4: {
      // Multiplying three single-digit numbers
      const a = Math.floor(Math.random() * 5) + 2; // 2 to 6
      const b = Math.floor(Math.random() * 5) + 2; // 2 to 6
      const c = Math.floor(Math.random() * 5) + 2; // 2 to 6
      const ans = a * b * c;

      questionText = `Calculate: ${a} × ${b} × ${c}`;
      correct = ans.toString();
      explanationText = `Multiply the first two numbers first: ${a} × ${b} = ${a * b}. Then multiply by the third: ${a * b} × ${c} = ${ans}.`;
      wrongAnswers = [
        (ans + 4).toString(),
        (ans - 6).toString(),
        (a + b + c).toString(),
      ];
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add(`${Math.floor(Math.random() * 100) + 10}`);
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function MultiplicationDivisionPage() {
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
      title="Year 4: Multiplication & Division"
      icon="✖️"
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
            className="w-full text-center bg-white hover:bg-amber-50 border-2 border-amber-200 hover:border-amber-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}