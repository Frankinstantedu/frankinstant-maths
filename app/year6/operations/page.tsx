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
      // Long division style word problem (e.g. sharing total items into equal groups)
      const divisor = Math.floor(Math.random() * 12) + 12; // e.g. 12 to 23
      const quotient = Math.floor(Math.random() * 30) + 15; // e.g. 15 to 44
      const dividend = divisor * quotient;

      questionText = `A school distributes ${dividend} exercise books equally among ${divisor} classrooms. How many books does each classroom receive?`;
      correct = `${quotient}`;
      wrongAnswers = [
        `${quotient + 3}`,
        `${quotient - 2}`,
        `${quotient + 5}`,
      ];
      explanationText = `Divide the total number of books by the number of classrooms: ${dividend} ÷ ${divisor} = ${quotient}.`;
      break;
    }
    case 1: {
      // Order of operations (BIDMAS/BODMAS) e.g., a + b * c - d
      const a = Math.floor(Math.random() * 10) + 5;
      const b = Math.floor(Math.random() * 6) + 2;
      const c = Math.floor(Math.random() * 6) + 2;
      const d = Math.floor(Math.random() * 10) + 2;
      const ans = a + (b * c) - d;

      questionText = `Calculate using the correct order of operations (BIDMAS): ${a} + ${b} × ${c} - ${d}`;
      correct = `${ans}`;
      wrongAnswers = [
        `${ans + 4}`,
        `${ans - 3}`,
        `${((a + b) * c) - d}`,
      ];
      explanationText = `Perform multiplication first (${b} × ${c} = ${b * c}), then addition and subtraction from left to right: ${a} + ${b * c} - ${d} = ${ans}.`;
      break;
    }
    case 2: {
      // Common factors / Prime numbers identification
      const primes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
      const composites = [12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 38, 39, 40, 42, 44, 45, 46, 48, 49, 50];
      
      const correctPrime = primes[Math.floor(Math.random() * primes.length)];
      const wrong1 = composites[Math.floor(Math.random() * composites.length)];
      const wrong2 = composites[Math.floor(Math.random() * composites.length)];
      const wrong3 = composites[Math.floor(Math.random() * composites.length)];

      questionText = `Which of the following numbers is a prime number?`;
      correct = `${correctPrime}`;
      wrongAnswers = [`${wrong1}`, `${wrong2}`, `${wrong3}`];
      // Ensure unique options
      const optSet = new Set<string>([correct, ...wrongAnswers]);
      while(optSet.size < 4) optSet.add("7");
      wrongAnswers = Array.from(optSet).filter(item => item !== correct);

      explanationText = `${correctPrime} is a prime number because its only divisors are 1 and itself.`;
      break;
    }
    case 3: {
      // Multi-step arithmetic word problem (combining multiplication and addition)
      const packSize = Math.floor(Math.random() * 8) + 6; // e.g., 6 to 13
      const packsBought = Math.floor(Math.random() * 15) + 12; // e.g., 12 to 26
      const extraItems = Math.floor(Math.random() * 20) + 5;
      const totalItems = (packSize * packsBought) + extraItems;

      questionText = `A bakery packs cookies in boxes of ${packSize}. They sell ${packsBought} full boxes and have ${extraItems} loose cookies left over. What is the total number of cookies they had?`;
      correct = `${totalItems}`;
      wrongAnswers = [
        `${totalItems + packSize}`,
        `${totalItems - 10}`,
        `${packSize * packsBought}`,
      ];
      explanationText = `First multiply the number of boxes by the cookies per box (${packSize} × ${packsBought} = ${packSize * packsBought}), then add the loose cookies (${extraItems}) to get ${totalItems}.`;
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add("24");
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year6OperationsPage() {
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
      title="Year 6: Four Operations & Arithmetic"
      icon="⚡"
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