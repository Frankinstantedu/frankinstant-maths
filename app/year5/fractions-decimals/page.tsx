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
      const denominator = [2, 3, 4, 5, 8][Math.floor(Math.random() * 5)];
      const whole = Math.floor(Math.random() * 3) + 2; 
      const remainder = Math.floor(Math.random() * (denominator - 1)) + 1;
      const numerator = whole * denominator + remainder;

      questionText = `Convert the improper fraction ${numerator}/${denominator} into a mixed number.`;
      correct = `${whole} ${remainder}/${denominator}`;
      explanationText = `${numerator} ÷ ${denominator} = ${whole} with a remainder of ${remainder}, giving the mixed number ${whole} ${remainder}/${denominator}.`;
      wrongAnswers = [
        `${whole + 1} ${remainder}/${denominator}`,
        `${whole} ${remainder + 1 > denominator - 1 ? 1 : remainder + 1}/${denominator}`,
        `${whole - 1} ${remainder}/${denominator}`,
      ];
      break;
    }
    case 1: {
      const baseNums = [
        { num: 3, den: 4, mult: 3, resNum: 9, resDen: 12 },
        { num: 2, den: 5, mult: 4, resNum: 8, resDen: 20 },
        { num: 1, den: 2, mult: 7, resNum: 7, resDen: 14 },
        { num: 3, den: 5, mult: 3, resNum: 9, resDen: 15 },
      ];
      const selected = baseNums[Math.floor(Math.random() * baseNums.length)];

      questionText = `Find the missing numerator to make the fractions equivalent: ${selected.num}/${selected.den} = ?/${selected.resDen}`;
      correct = `${selected.resNum}`;
      explanationText = `Multiply both the numerator and denominator by ${selected.resDen / selected.den}: (${selected.num} × ${selected.resDen / selected.den}) / (${selected.den} × ${selected.resDen / selected.den}) = ${selected.resNum}/${selected.resDen}.`;
      wrongAnswers = [
        `${selected.resNum + 2}`,
        `${selected.resNum - 1}`,
        `${selected.resNum + 4}`,
      ];
      break;
    }
    case 2: {
      const decimals = [3.45, 7.82, 12.36, 9.61, 15.49];
      const targetVal = decimals[Math.floor(Math.random() * decimals.length)];

      questionText = `Round ${targetVal} to the nearest whole number.`;
      const rounded = Math.round(targetVal).toString();
      correct = rounded;
      explanationText = `Looking at the tenth digit, ${targetVal} rounded to the nearest whole number is ${rounded}.`;
      wrongAnswers = [
        (Math.round(targetVal) + 1).toString(),
        (Math.round(targetVal) - 1).toString(),
        (targetVal + 0.1).toFixed(1),
      ];
      break;
    }
    case 3: {
      const pairs = [
        { frac: "3/4", pct: "75%" },
        { frac: "2/5", pct: "40%" },
        { frac: "1/4", pct: "25%" },
        { frac: "9/10", pct: "90%" },
        { frac: "3/5", pct: "60%" },
      ];
      const chosen = pairs[Math.floor(Math.random() * pairs.length)];

      questionText = `What is ${chosen.frac} expressed as a percentage?`;
      correct = chosen.pct;
      explanationText = `Converting ${chosen.frac} to a percentage gives ${chosen.pct}.`;
      wrongAnswers = [
        `${parseInt(chosen.pct) + 10}%`,
        `${parseInt(chosen.pct) - 15}%`,
        `${100 - parseInt(chosen.pct)}%`,
      ];
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add(`50%`);
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year5FractionsDecimalsPage() {
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
      title="Year 5: Fractions, Decimals & Percentages"
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