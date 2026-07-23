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
  const isMultiplication = Math.random() > 0.5;

  // Year 3 Focus: 2x, 3x, 4x, 5x, 8x, 10x tables
  const targetTables = [2, 3, 4, 5, 8, 10];
  const table = targetTables[Math.floor(Math.random() * targetTables.length)];
  const multiplier = Math.floor(Math.random() * 12) + 1;

  let correct: number;
  let questionText = "";
  let explanationText = "";

  if (isMultiplication) {
    correct = table * multiplier;
    questionText = `What is ${table} × ${multiplier}?`;
    explanationText = `${table} × ${multiplier} = ${correct}.`;
  } else {
    correct = multiplier;
    const total = table * multiplier;
    questionText = `What is ${total} ÷ ${table}?`;
    explanationText = `${total} ÷ ${table} = ${correct}.`;
  }

  // Guaranteed 4 unique multiple-choice options
  const optionsSet = new Set<string>([correct.toString()]);
  const offsets = [table, -table, 1, -1, 2, -2, 5, -5];

  for (const offset of offsets) {
    if (optionsSet.size === 4) break;
    const optionVal = correct + offset;
    if (optionVal > 0) {
      optionsSet.add(optionVal.toString());
    }
  }

  while (optionsSet.size < 4) {
    const randomOffset =
      (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
    const optionVal = correct + randomOffset;
    if (optionVal > 0) {
      optionsSet.add(optionVal.toString());
    }
  }

  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct.toString(),
    explanation: explanationText,
  };
}

export default function Year3MultiplicationDivisionPage() {
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
      title="Year 3: Multiplication & Division"
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