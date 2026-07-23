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

// Helper for prime check
function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function generateQuestion(): Question {
  const type = Math.floor(Math.random() * 4);
  let correct = "";
  let questionText = "";
  let explanationText = "";
  let wrongAnswers: string[] = [];

  switch (type) {
    case 0: {
      // Prime Numbers identification
      const primes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
      const nonPrimes = [12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 38, 39, 40];
      
      const isAskingForPrime = Math.random() < 0.5;
      if (isAskingForPrime) {
        const prime = primes[Math.floor(Math.random() * primes.length)];
        questionText = `Which of the following numbers is a prime number?`;
        correct = prime.toString();
        explanationText = `${prime} is a prime number because it only has two factors: 1 and itself.`;
        wrongAnswers = [
          (prime + 2 <= 99 ? prime + 2 : prime - 4).toString(),
          (prime + 4 <= 99 ? prime + 4 : prime - 2).toString(),
          (prime + 6 <= 99 ? prime + 6 : prime - 6).toString(),
        ];
      } else {
        const comp = nonPrimes[Math.floor(Math.random() * nonPrimes.length)];
        questionText = `Which of the following numbers is NOT a prime number (it is a composite number)?`;
        correct = comp.toString();
        explanationText = `${comp} is not a prime number because it has more than two factors.`;
        // Pick actual primes for wrong answers
        wrongAnswers = [
          primes[0].toString(),
          primes[1].toString(),
          primes[2].toString(),
        ];
      }
      break;
    }
    case 1: {
      // Square and Cube numbers
      const isCube = Math.random() < 0.5;
      if (isCube) {
        const base = Math.floor(Math.random() * 4) + 2; // 2, 3, 4, 5
        const ans = base * base * base;
        questionText = `What is the cube of ${base} (${base}³)?`;
        correct = ans.toString();
        explanationText = `The cube of ${base} is calculated by multiplying ${base} by itself three times (${base} × ${base} × ${base} = ${ans}).`;
        wrongAnswers = [
          (base * base).toString(),
          (ans + base).toString(),
          (ans - base > 0 ? ans - base : ans + 5).toString(),
        ];
      } else {
        const base = Math.floor(Math.random() * 8) + 4; // 4 to 11
        const ans = base * base;
        questionText = `What is the square of ${base} (${base}²)?`;
        correct = ans.toString();
        explanationText = `The square of ${base} is ${base} multiplied by itself (${base} × ${base} = ${ans}).`;
        wrongAnswers = [
          (base * 2).toString(),
          (ans + base).toString(),
          (ans - base).toString(),
        ];
      }
      break;
    }
    case 2: {
      // Multiplying/Dividing by 10, 100, 1,000
      const baseNum = Math.floor(Math.random() * 350) + 12;
      const multipliers = [10, 100, 1000];
      const mult = multipliers[Math.floor(Math.random() * multipliers.length)];
      const ans = baseNum * mult;

      questionText = `Calculate: ${baseNum} × ${mult.toLocaleString()}`;
      correct = ans.toLocaleString();
      explanationText = `When multiplying by ${mult.toLocaleString()}, shift the digits ${mult === 10 ? 'one' : mult === 100 ? 'two' : 'three'} places to the left, resulting in ${ans.toLocaleString()}.`;
      wrongAnswers = [
        (ans / 10).toLocaleString(),
        (ans + mult).toLocaleString(),
        (ans * 10).toLocaleString(),
      ];
      break;
    }
    case 3: {
      // Finding factors of a number
      const numbersWithFactors = [
        { num: 24, factor: "8" },
        { num: 36, factor: "9" },
        { num: 45, factor: "5" },
        { num: 56, factor: "7" },
        { num: 72, factor: "8" },
      ];
      const selected = numbersWithFactors[Math.floor(Math.random() * numbersWithFactors.length)];

      questionText = `Which of the following is a factor of ${selected.num}?`;
      correct = selected.factor;
      explanationText = `${selected.factor} is a factor of ${selected.num} because ${selected.num} can be divided evenly by ${selected.factor}.`;
      wrongAnswers = [
        (parseInt(selected.factor) + 1).toString(),
        (parseInt(selected.factor) + 3).toString(),
        (parseInt(selected.factor) + 4).toString(),
      ];
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add(`${Math.floor(Math.random() * 100) + 1}`);
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year5MultiplicationDivisionPage() {
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
      title="Year 5: Multiplication & Division"
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
            className="w-full text-center bg-white hover:bg-amber-50 border-2 border-amber-200 hover:border-amber-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}