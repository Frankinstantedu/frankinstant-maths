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
  // 5 Distinct Year 3 Curriculum Question Types
  const questionType = Math.floor(Math.random() * 5);

  let correct: string = "";
  let questionText: string = "";
  let explanationText: string = "";
  let wrongAnswers: string[] = [];

  switch (questionType) {
    case 0: {
      // 1. EQUIVALENT FRACTIONS
      const baseNum = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
      const baseDenom = baseNum + Math.floor(Math.random() * 3) + 1; // e.g. 1/2, 2/3, 1/4
      const multiplier = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4

      const eqNum = baseNum * multiplier;
      const eqDenom = baseDenom * multiplier;

      correct = `${eqNum}/${eqDenom}`;
      questionText = `Which fraction is equivalent to ${baseNum}/${baseDenom}?`;
      explanationText = `Multiply both top and bottom by ${multiplier}: ${baseNum}×${multiplier} = ${eqNum} and ${baseDenom}×${multiplier} = ${eqDenom}, making ${eqNum}/${eqDenom}.`;

      wrongAnswers = [
        `${baseNum + 1}/${baseDenom}`,
        `${baseNum}/${baseDenom + multiplier}`,
        `${eqNum + 1}/${eqDenom}`,
        `${baseNum + 2}/${baseDenom * 2}`,
      ];
      break;
    }

    case 1: {
      // 2. COMPARING FRACTIONS (Same denominator or unit fractions)
      const isUnit = Math.random() > 0.5;

      if (isUnit) {
        // Unit fractions: larger denominator = smaller piece!
        const d1 = Math.floor(Math.random() * 5) + 2; // e.g. 3
        let d2 = Math.floor(Math.random() * 5) + 2;
        while (d2 === d1) d2 = Math.floor(Math.random() * 5) + 2;

        const larger = d1 < d2 ? `1/${d1}` : `1/${d2}`;
        questionText = `Which fraction is LARGER: 1/${d1} or 1/${d2}?`;
        correct = larger;
        explanationText = `With unit fractions (1 on top), smaller denominators mean bigger pieces! So ${larger} is larger.`;

        wrongAnswers = [
          d1 < d2 ? `1/${d2}` : `1/${d1}`,
          "They are equal",
        ];
      } else {
        // Same denominator
        const denom = Math.floor(Math.random() * 6) + 4; // 4 to 9
        const n1 = Math.floor(Math.random() * (denom - 2)) + 1;
        let n2 = Math.floor(Math.random() * (denom - 2)) + 1;
        while (n2 === n1) n2 = Math.floor(Math.random() * (denom - 2)) + 1;

        const largerNum = Math.max(n1, n2);
        correct = `${largerNum}/${denom}`;
        questionText = `Which fraction is LARGER: ${n1}/${denom} or ${n2}/${denom}?`;
        explanationText = `When denominators are the same, compare the top numbers. ${largerNum} is bigger than ${Math.min(n1, n2)}, so ${correct} is larger.`;

        wrongAnswers = [
          `${Math.min(n1, n2)}/${denom}`,
          "They are equal",
        ];
      }
      break;
    }

    case 2: {
      // 3. FRACTIONS OF QUANTITIES
      const denominators = [2, 3, 4, 5, 8, 10];
      const denom = denominators[Math.floor(Math.random() * denominators.length)];
      const multiplier = Math.floor(Math.random() * 6) + 2; 
      const totalAmount = denom * multiplier;
      const num = Math.random() > 0.4 ? 1 : Math.floor(Math.random() * (denom - 1)) + 1;
      const ansVal = (totalAmount / denom) * num;

      correct = ansVal.toString();
      questionText = `What is ${num}/${denom} of ${totalAmount}?`;
      explanationText = `${totalAmount} ÷ ${denom} = ${totalAmount / denom}, then multiply by ${num} = ${ansVal}.`;

      wrongAnswers = [
        (ansVal + num).toString(),
        (ansVal + denom).toString(),
        Math.max(1, ansVal - 2).toString(),
        (ansVal + 4).toString(),
      ];
      break;
    }

    case 3: {
      // 4. ADDITION & SUBTRACTION (Same Denominator)
      const isAdd = Math.random() > 0.5;
      const denom = Math.floor(Math.random() * 6) + 4;

      if (isAdd) {
        const n1 = Math.floor(Math.random() * (denom - 2)) + 1;
        const n2 = Math.floor(Math.random() * (denom - n1 - 1)) + 1;
        const sum = n1 + n2;

        correct = `${sum}/${denom}`;
        questionText = `What is ${n1}/${denom} + ${n2}/${denom}?`;
        explanationText = `Keep the bottom number the same and add the top numbers: ${n1} + ${n2} = ${sum}/${denom}.`;

        wrongAnswers = [
          `${sum}/${denom * 2}`,
          `${Math.min(denom, sum + 1)}/${denom}`,
          `${Math.max(1, sum - 1)}/${denom}`,
        ];
      } else {
        const n1 = Math.floor(Math.random() * (denom - 2)) + 2;
        const n2 = Math.floor(Math.random() * (n1 - 1)) + 1;
        const diff = n1 - n2;

        correct = `${diff}/${denom}`;
        questionText = `What is ${n1}/${denom} - ${n2}/${denom}?`;
        explanationText = `Keep the bottom number the same and subtract the top numbers: ${n1} - ${n2} = ${diff}/${denom}.`;

        wrongAnswers = [
          `${diff}/0`,
          `${diff + 1}/${denom}`,
          `${Math.max(1, diff - 1)}/${denom}`,
        ];
      }
      break;
    }

    case 4: {
      // 5. FRACTIONS TO MAKE A WHOLE (1 whole = 8/8)
      const denom = Math.floor(Math.random() * 7) + 3; // 3 to 9
      const num = Math.floor(Math.random() * (denom - 1)) + 1;
      const missingNum = denom - num;

      correct = `${missingNum}/${denom}`;
      questionText = `What fraction added to ${num}/${denom} makes 1 whole?`;
      explanationText = `1 whole equals ${denom}/${denom}. Since you have ${num}/${denom}, you need ${missingNum}/${denom} more (${denom} - ${num} = ${missingNum}).`;

      wrongAnswers = [
        `${denom}/${num}`,
        `${missingNum + 1}/${denom}`,
        `1/${denom}`,
        `${denom - 1}/${denom}`,
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

  // Fallback builder if needed
  let fallbackCount = 1;
  while (optionsSet.size < 4) {
    optionsSet.add(`${fallbackCount}/10`);
    fallbackCount++;
  }

  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year3FractionsPage() {
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
      title="Year 3: Fractions"
      icon="🍕"
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