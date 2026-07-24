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
      // Variables on both sides: ax + b = cx + d
      const sol = Math.floor(Math.random() * 5) + 2; // x = 2 to 6
      const leftCoeff = 5;
      const rightCoeff = 3;
      const rightConst = Math.floor(Math.random() * 10) + 5;
      // leftConst = rightCoeff * sol + rightConst - leftCoeff * sol
      const leftConstCalc = rightCoeff * sol + rightConst - leftCoeff * sol;
      const actualLeftConst = Math.abs(leftConstCalc);

      questionText = `Solve for x: ${leftCoeff}x + ${actualLeftConst} = ${rightCoeff}x + ${rightConst}`;
      correct = `${sol}`;
      explanationText = `Subtract ${rightCoeff}x from both sides to get ${leftCoeff - rightCoeff}x + ${actualLeftConst} = ${rightConst}. Subtract ${actualLeftConst} to get ${leftCoeff - rightCoeff}x = ${rightConst - actualLeftConst}, which simplifies to ${leftCoeff - rightCoeff}x = ${rightCoeff * sol}, giving x = ${sol}.`;
      wrongAnswers = [
        `${sol + 2}`,
        `${sol - 1}`,
        `${sol + 3}`,
      ];
      break;
    }
    case 1: {
      // Algebraic fractions: (x + a) / b = c  =>  x + a = b * c
      const b = Math.floor(Math.random() * 4) + 2; // denominator 2 to 5
      const c = Math.floor(Math.random() * 5) + 3; // result 3 to 7
      const a = Math.floor(Math.random() * 6) + 1; // constant
      const xVal = b * c - a;

      questionText = `Solve for x: (x + ${a}) / ${b} = ${c}`;
      correct = `${xVal}`;
      explanationText = `Multiply both sides by ${b} to clear the fraction: x + ${a} = ${b * c}. Then subtract ${a} to find x = ${xVal}.`;
      wrongAnswers = [
        `${xVal + 2}`,
        `${xVal - 3}`,
        `${xVal * 2}`,
      ];
      break;
    }
    case 2: {
      // Two-step equations with larger coefficients
      const coeff = Math.floor(Math.random() * 5) + 3;
      const targetVal = Math.floor(Math.random() * 9) + 2;
      const constant = Math.floor(Math.random() * 12) + 4;
      const total = coeff * targetVal + constant;

      questionText = `Solve for y: ${coeff}y - ${constant} = ${total - 2 * constant}`;
      const rightSideVal = total - 2 * constant;
      const resolvedY = (rightSideVal + constant) / coeff;

      correct = `${resolvedY}`;
      explanationText = `Add ${constant} to both sides to isolate the term with y, then divide by ${coeff} to get y = ${resolvedY}.`;
      wrongAnswers = [
        `${resolvedY + 2}`,
        `${resolvedY - 1}`,
        `${resolvedY + 4}`,
      ];
      break;
    }
    case 3: {
      // Advanced multi-step word problem
      const secretX = Math.floor(Math.random() * 8) + 3;
      const mult = Math.floor(Math.random() * 3) + 3;
      const added = Math.floor(Math.random() * 15) + 5;
      const result = mult * secretX + added;

      questionText = `I think of a number, multiply it by ${mult}, and then add ${added}. If my answer is ${result}, what was the original number?`;
      correct = `${secretX}`;
      explanationText = `Work backwards: Subtract ${added} from ${result} to get ${result - added}, then divide by ${mult} to get the original number ${secretX}.`;
      wrongAnswers = [
        `${secretX + 2}`,
        `${secretX - 1}`,
        `${secretX + 3}`,
      ];
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add("12");
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year6AlgebraPage() {
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
      title="Year 6: Advanced Algebra & Equations"
      icon="🧮"
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