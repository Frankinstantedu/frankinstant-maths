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
  let correct: number;
  let questionText = "";
  let explanationText = "";

  if (isAddition) {
    // Year 3 Standard: 3-digit addition (e.g. 245 + 138)
    const num1 = Math.floor(Math.random() * 400) + 100;
    const num2 = Math.floor(Math.random() * 400) + 50;
    correct = num1 + num2;
    questionText = `What is ${num1} + ${num2}?`;
    explanationText = `${num1} + ${num2} = ${correct}.`;
  } else {
    // Year 3 Standard: 3-digit subtraction (e.g. 532 - 145)
    const num1 = Math.floor(Math.random() * 500) + 200;
    const num2 = Math.floor(Math.random() * 150) + 20;
    correct = num1 - num2;
    questionText = `What is ${num1} - ${num2}?`;
    explanationText = `${num1} - ${num2} = ${correct}.`;
  }

  // Generate 4 unique multiple-choice options
  const optionsSet = new Set<string>([correct.toString()]);
  const offsets = [10, -5, 25, -10, 15, -15, 20];

  for (const offset of offsets) {
    if (optionsSet.size === 4) break;
    const optionVal = correct + offset;
    if (optionVal > 0) {
      optionsSet.add(optionVal.toString());
    }
  }

  while (optionsSet.size < 4) {
    const randomOffset = (Math.floor(Math.random() * 20) + 1) * (Math.random() > 0.5 ? 1 : -1);
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

export default function Year3AdditionSubtractionPage() {
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
      title="Year 3: Addition & Subtraction"
      icon="📈"
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