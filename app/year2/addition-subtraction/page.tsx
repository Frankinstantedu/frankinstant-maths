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
  const isAddition = Math.random() > 0.5;

  if (isAddition) {
    const num1 = Math.floor(Math.random() * 50) + 10;
    const num2 = Math.floor(Math.random() * (99 - num1));
    const correct = num1 + num2;

    const options = Array.from(
      new Set([
        correct.toString(),
        (correct + 2).toString(),
        (correct - 3).toString(),
        (correct + 5).toString(),
      ])
    )
      .slice(0, 4)
      .sort(() => Math.random() - 0.5);

    return {
      question: `What is ${num1} + ${num2}?`,
      answerOptions: options,
      correctAnswer: correct.toString(),
      explanation: `${num1} + ${num2} = ${correct}.`,
    };
  } else {
    const num1 = Math.floor(Math.random() * 50) + 20;
    const num2 = Math.floor(Math.random() * num1);
    const correct = num1 - num2;

    const options = Array.from(
      new Set([
        correct.toString(),
        (correct + 3).toString(),
        Math.max(0, correct - 2).toString(),
        (correct + 4).toString(),
      ])
    )
      .slice(0, 4)
      .sort(() => Math.random() - 0.5);

    return {
      question: `What is ${num1} - ${num2}?`,
      answerOptions: options,
      correctAnswer: correct.toString(),
      explanation: `${num1} - ${num2} = ${correct}.`,
    };
  }
}

export default function AdditionSubtractionPage() {
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
      title="Addition & Subtraction"
      icon="➕"
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