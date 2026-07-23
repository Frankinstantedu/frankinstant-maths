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
  // Question Types:
  // 0: Pictogram Key Interpretation
  // 1: Bar Chart / Frequency Comparison
  // 2: Data Table Total / Difference
  const questionType = Math.floor(Math.random() * 3);

  let correct: string = "";
  let questionText: string = "";
  let explanationText: string = "";
  let wrongAnswers: string[] = [];

  switch (questionType) {
    case 0: {
      // Pictograms with scales (e.g., 1 symbol = 2, 4, or 5 items)
      const keyValues = [2, 4, 5, 10];
      const scale = keyValues[Math.floor(Math.random() * keyValues.length)];
      const symbolsCount = Math.floor(Math.random() * 5) + 3; // 3 to 7 full symbols
      const hasHalfSymbol = scale % 2 === 0 && Math.random() > 0.5;

      const totalItems = symbolsCount * scale + (hasHalfSymbol ? scale / 2 : 0);
      const symbolDesc = hasHalfSymbol
        ? `${symbolsCount} full stars and 1 half star`
        : `${symbolsCount} full stars`;

      questionText = `In a pictogram, ⭐️ = ${scale} books. How many books do ${symbolDesc} represent?`;
      correct = `${totalItems} books`;
      explanationText = `${symbolsCount} × ${scale} = ${symbolsCount * scale}${
        hasHalfSymbol ? ` plus half a star (${scale / 2}) = ${totalItems}` : ""
      }.`;

      wrongAnswers = [
        `${totalItems + scale} books`,
        `${Math.max(1, totalItems - scale)} books`,
        `${symbolsCount + (hasHalfSymbol ? 1 : 0)} books`,
      ];
      break;
    }

    case 1: {
      // Bar Chart - Difference between two values
      const categories = ["Cats", "Dogs", "Rabbits", "Hamsters"];
      const cat1 = categories[Math.floor(Math.random() * categories.length)];
      let cat2 = categories[Math.floor(Math.random() * categories.length)];
      while (cat2 === cat1) {
        cat2 = categories[Math.floor(Math.random() * categories.length)];
      }

      const val1 = (Math.floor(Math.random() * 8) + 4) * 2; // Even numbers 8-22
      const val2 = (Math.floor(Math.random() * 5) + 1) * 2; // Even numbers 2-10
      const diff = Math.abs(val1 - val2);

      questionText = `On a bar chart, ${val1} children chose ${cat1} and ${val2} chose ${cat2}. How many more children chose ${val1 > val2 ? cat1 : cat2} than ${val1 > val2 ? cat2 : cat1}?`;
      correct = `${diff} children`;
      explanationText = `Subtract the smaller number from the larger number: ${Math.max(val1, val2)} - ${Math.min(val1, val2)} = ${diff}.`;

      wrongAnswers = [
        `${diff + 2} children`,
        `${val1 + val2} children`,
        `${Math.max(1, diff - 2)} children`,
      ];
      break;
    }

    case 2: {
      // Data Table - Total across multiple entries
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      const day = days[Math.floor(Math.random() * days.length)];

      const morningCount = Math.floor(Math.random() * 15) + 10;
      const afternoonCount = Math.floor(Math.random() * 15) + 10;
      const total = morningCount + afternoonCount;

      questionText = `A school recorded attendance: On ${day}, ${morningCount} pupils came in the morning and ${afternoonCount} in the afternoon. What was the total attendance for ${day}?`;
      correct = `${total} pupils`;
      explanationText = `Add the morning and afternoon counts together: ${morningCount} + ${afternoonCount} = ${total}.`;

      wrongAnswers = [
        `${total + 5} pupils`,
        `${Math.abs(morningCount - afternoonCount)} pupils`,
        `${total - 3} pupils`,
      ];
      break;
    }
  }

  // Ensure 4 unique options
  const optionsSet = new Set<string>([correct]);
  for (const wrong of wrongAnswers) {
    if (optionsSet.size === 4) break;
    optionsSet.add(wrong);
  }

  let fallback = 1;
  while (optionsSet.size < 4) {
    optionsSet.add(`Option ${fallback}`);
    fallback++;
  }

  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year3StatisticsPage() {
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
      title="Year 3: Statistics & Data"
      icon="📊"
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
            className="w-full text-center bg-white hover:bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}