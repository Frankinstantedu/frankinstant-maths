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
      // 4-Digit Addition (Column Method style)
      const num1 = Math.floor(Math.random() * 4000) + 1200;
      const num2 = Math.floor(Math.random() * 4000) + 1200;
      const ans = num1 + num2;

      questionText = `Calculate: ${num1.toLocaleString()} + ${num2.toLocaleString()}`;
      correct = ans.toLocaleString();
      explanationText = `Adding column by column from right to left: ${num1} + ${num2} = ${ans}.`;
      wrongAnswers = [
        (ans + 100).toLocaleString(),
        (ans - 10).toLocaleString(),
        (ans + 1000).toLocaleString(),
      ];
      break;
    }
    case 1: {
      // 4-Digit Subtraction with regrouping
      const num1 = Math.floor(Math.random() * 5000) + 4000;
      const num2 = Math.floor(Math.random() * 3000) + 1000;
      const ans = num1 - num2;

      questionText = `Calculate: ${num1.toLocaleString()} - ${num2.toLocaleString()}`;
      correct = ans.toLocaleString();
      explanationText = `Subtracting column by column with regrouping where needed: ${num1} - ${num2} = ${ans}.`;
      wrongAnswers = [
        (ans + 100).toLocaleString(),
        (ans - 100).toLocaleString(),
        (ans + 10).toLocaleString(),
      ];
      break;
    }
    case 2: {
      // Two-step Word Problem (Addition then Subtraction)
      const startAmount = Math.floor(Math.random() * 2000) + 3000;
      const earned = Math.floor(Math.random() * 800) + 500;
      const spent = Math.floor(Math.random() * 900) + 400;
      const ans = startAmount + earned - spent;

      questionText = `A school had £${startAmount.toLocaleString()}. They raised £${earned} at a fair, then spent £${spent} on new books. How much money do they have now?`;
      correct = `£${ans.toLocaleString()}`;
      explanationText = `First add the raised money (£${startAmount} + £${earned} = £${startAmount + earned}), then subtract the spent money (£${startAmount + earned} - £${spent} = £${ans}).`;
      wrongAnswers = [
        `£${(ans + 100).toLocaleString()}`,
        `£${(ans - 200).toLocaleString()}`,
        `£${(startAmount + earned).toLocaleString()}`,
      ];
      break;
    }
    case 3: {
      // Missing Number Equation
      const total = Math.floor(Math.random() * 4000) + 5000;
      const known = Math.floor(Math.random() * 3000) + 1500;
      const missing = total - known;

      questionText = `Find the missing number: ___ + ${known.toLocaleString()} = ${total.toLocaleString()}`;
      correct = missing.toLocaleString();
      explanationText = `To find the missing part, subtract the known number from the total: ${total} - ${known} = ${missing}.`;
      wrongAnswers = [
        (missing + 100).toLocaleString(),
        (missing - 50).toLocaleString(),
        (total + known).toLocaleString(),
      ];
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add(`${Math.floor(Math.random() * 5000)}`);
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
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
      title="Year 4: Addition & Subtraction"
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