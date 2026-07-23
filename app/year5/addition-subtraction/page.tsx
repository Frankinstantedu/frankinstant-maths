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
      // Large number addition word problem
      const num1 = Math.floor(Math.random() * 400000) + 150000;
      const num2 = Math.floor(Math.random() * 300000) + 100000;
      const ans = num1 + num2;

      questionText = `A museum had ${num1.toLocaleString()} visitors last year and ${num2.toLocaleString()} visitors this year. What is the total number of visitors over both years?`;
      correct = ans.toLocaleString();
      explanationText = `Add the two visitor counts together: ${num1.toLocaleString()} + ${num2.toLocaleString()} = ${ans.toLocaleString()}.`;
      wrongAnswers = [
        (ans + 10000).toLocaleString(),
        (ans - 25000).toLocaleString(),
        (num1 + num2 + 50000).toLocaleString(),
      ];
      break;
    }
    case 1: {
      // Large number subtraction word problem
      const startStock = Math.floor(Math.random() * 500000) + 300000;
      const soldStock = Math.floor(Math.random() * 150000) + 50000;
      const ans = startStock - soldStock;

      questionText = `An online warehouse started with ${startStock.toLocaleString()} items in stock and sold ${soldStock.toLocaleString()} items during a massive sale. How many items remain?`;
      correct = ans.toLocaleString();
      explanationText = `Subtract the sold items from the starting stock: ${startStock.toLocaleString()} - ${soldStock.toLocaleString()} = ${ans.toLocaleString()}.`;
      wrongAnswers = [
        (ans + 20000).toLocaleString(),
        (ans - 15000).toLocaleString(),
        (startStock + soldStock).toLocaleString(),
      ];
      break;
    }
    case 2: {
      // Multi-step addition and subtraction
      const initial = Math.floor(Math.random() * 50000) + 20000;
      const added = Math.floor(Math.random() * 30000) + 10000;
      const subtracted = Math.floor(Math.random() * 15000) + 5000;
      const ans = initial + added - subtracted;

      questionText = `A bank account starts with £${initial.toLocaleString()}. A deposit of £${added.toLocaleString()} is made, followed by a withdrawal of £${subtracted.toLocaleString()}. What is the final balance?`;
      correct = `£${ans.toLocaleString()}`;
      explanationText = `First add the deposit (£${initial} + £${added} = £${initial + added}), then subtract the withdrawal (£${initial + added} - £${subtracted} = £${ans}).`;
      wrongAnswers = [
        `£${(ans + 10000).toLocaleString()}`,
        `£${(ans - 5000).toLocaleString()}`,
        `£${(initial + added + subtracted).toLocaleString()}`,
      ];
      break;
    }
    case 3: {
      // Missing number / Inverse operations
      const total = Math.floor(Math.random() * 800000) + 200000;
      const knownPart = Math.floor(Math.random() * 300000) + 100000;
      const missing = total - knownPart;

      questionText = `Find the missing number: ? + ${knownPart.toLocaleString()} = ${total.toLocaleString()}`;
      correct = missing.toLocaleString();
      explanationText = `Use the inverse operation by subtracting the known part from the total: ${total.toLocaleString()} - ${knownPart.toLocaleString()} = ${missing.toLocaleString()}.`;
      wrongAnswers = [
        (total + knownPart).toLocaleString(),
        (missing + 12000).toLocaleString(),
        (missing - 15000 > 0 ? missing - 15000 : missing + 20000).toLocaleString(),
      ];
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add(`${Math.floor(Math.random() * 500000) + 50000}`);
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year5AdditionSubtractionPage() {
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
      title="Year 5: Addition & Subtraction"
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
            className="w-full text-center bg-white hover:bg-sky-50 border-2 border-sky-200 hover:border-sky-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}