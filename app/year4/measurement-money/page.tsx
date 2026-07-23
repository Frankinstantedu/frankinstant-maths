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
      // Metric Unit Conversions (km to m, m to cm, kg to g, l to ml)
      const conversions = [
        { unitFrom: "km", unitTo: "m", factor: 1000 },
        { unitFrom: "kg", unitTo: "g", factor: 1000 },
        { unitFrom: "l", unitTo: "ml", factor: 1000 },
        { unitFrom: "m", unitTo: "cm", factor: 100 },
      ];
      const conv = conversions[Math.floor(Math.random() * conversions.length)];
      const val = Math.floor(Math.random() * 8) + 2; // 2 to 9
      const ans = val * conv.factor;

      questionText = `How many ${conv.unitTo} are in ${val} ${conv.unitFrom}?`;
      correct = `${ans.toLocaleString()} ${conv.unitTo}`;
      explanationText = `There are ${conv.factor} ${conv.unitTo} in 1 ${conv.unitFrom}, so ${val} × ${conv.factor} = ${ans.toLocaleString()} ${conv.unitTo}.`;
      wrongAnswers = [
        `${(ans / 10).toLocaleString()} ${conv.unitTo}`,
        `${(ans + conv.factor).toLocaleString()} ${conv.unitTo}`,
        `${(val * 100).toLocaleString()} ${conv.unitTo}`,
      ];
      break;
    }
    case 1: {
      // Perimeter of Rectilinear Shapes
      const length = Math.floor(Math.random() * 8) + 4; // 4 to 11 cm
      const width = Math.floor(Math.random() * 5) + 2; // 2 to 6 cm
      const perimeter = 2 * (length + width);

      questionText = `What is the perimeter of a rectangle with length ${length} cm and width ${width} cm?`;
      correct = `${perimeter} cm`;
      explanationText = `Perimeter is the total distance around the edge: (${length} + ${width}) × 2 = ${perimeter} cm.`;
      wrongAnswers = [
        `${length * width} cm`,
        `${perimeter + 4} cm`,
        `${length + width} cm`,
      ];
      break;
    }
    case 2: {
      // Money Word Problem (Calculating change)
      const itemPrice = (Math.floor(Math.random() * 800) + 150) / 100; // £1.50 to £9.50
      const payment = itemPrice > 5 ? 10 : 5;
      const change = (payment - itemPrice).toFixed(2);

      questionText = `You buy an item for £${itemPrice.toFixed(2)} and pay with a £${payment} note. How much change do you receive?`;
      correct = `£${change}`;
      explanationText = `Subtract the cost from the payment amount: £${payment}.00 - £${itemPrice.toFixed(2)} = £${change}.`;
      wrongAnswers = [
        `£${(parseFloat(change) + 1).toFixed(2)}`,
        `£${(parseFloat(change) - 0.5).toFixed(2)}`,
        `£${(parseFloat(change) + 0.1).toFixed(2)}`,
      ];
      break;
    }
    case 3: {
      // Perimeter of a Square
      const side = Math.floor(Math.random() * 10) + 3; // 3 to 12 cm
      const perimeter = side * 4;

      questionText = `A square has side lengths of ${side} cm. What is its perimeter?`;
      correct = `${perimeter} cm`;
      explanationText = `A square has 4 equal sides, so 4 × ${side} cm = ${perimeter} cm.`;
      wrongAnswers = [
        `${side * side} cm`,
        `${perimeter + 2} cm`,
        `${side * 2} cm`,
      ];
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add(`${Math.floor(Math.random() * 50) + 5}`);
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function MeasurementMoneyPage() {
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
      title="Year 4: Measurement & Money"
      icon="📏"
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
            className="w-full text-center bg-white hover:bg-rose-50 border-2 border-rose-200 hover:border-rose-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}