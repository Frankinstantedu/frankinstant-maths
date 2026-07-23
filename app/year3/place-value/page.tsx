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
  // 0: Value of a digit in a 3-digit number
  // 1: Partitioning (e.g., 458 = 400 + 50 + 8)
  // 2: 10 or 100 more / less
  // 3: Complete the sequence (steps of 4, 8, 50, or 100)
  const questionType = Math.floor(Math.random() * 4);

  let correct: string = "";
  let questionText: string = "";
  let explanationText: string = "";
  let wrongAnswers: string[] = [];

  switch (questionType) {
    case 0: {
      // Value of a digit
      const hundreds = Math.floor(Math.random() * 8) + 1; // 1-8
      const tens = Math.floor(Math.random() * 9); // 0-9
      const ones = Math.floor(Math.random() * 9) + 1; // 1-9
      const num = hundreds * 100 + tens * 10 + ones;

      const positions = ["hundreds", "tens", "ones"];
      const chosenPos = positions[Math.floor(Math.random() * positions.length)];

      if (chosenPos === "hundreds") {
        correct = (hundreds * 100).toString();
        questionText = `What is the value of the digit ${hundreds} in ${num}?`;
        explanationText = `The digit ${hundreds} is in the hundreds position, so its value is ${hundreds * 100}.`;
        wrongAnswers = [hundreds.toString(), (hundreds * 10).toString(), (hundreds * 1000).toString()];
      } else if (chosenPos === "tens") {
        correct = (tens * 10).toString();
        questionText = `What is the value of the digit ${tens} in ${num}?`;
        explanationText = `The digit ${tens} is in the tens position, so its value is ${tens * 10}.`;
        wrongAnswers = [tens.toString(), (tens * 100).toString(), ((tens + 1) * 10).toString()];
      } else {
        correct = ones.toString();
        questionText = `What is the value of the digit ${ones} in ${num}?`;
        explanationText = `The digit ${ones} is in the ones position, so its value is ${ones}.`;
        wrongAnswers = [(ones * 10).toString(), (ones * 100).toString(), (ones + 10).toString()];
      }
      break;
    }

    case 1: {
      // Partitioning 3-digit numbers
      const h = Math.floor(Math.random() * 8) + 1;
      const t = Math.floor(Math.random() * 8) + 1;
      const o = Math.floor(Math.random() * 8) + 1;
      const num = h * 100 + t * 10 + o;

      correct = `${h * 100} + ${t * 10} + ${o}`;
      questionText = `Which calculation correctly partitions ${num}?`;
      explanationText = `${num} is made of ${h} hundreds (${h * 100}), ${t} tens (${t * 10}), and ${o} ones (${o}).`;

      wrongAnswers = [
        `${h * 100} + ${t} + ${o}`,
        `${h * 10} + ${t * 10} + ${o}`,
        `${h * 100} + ${t * 100} + ${o}`,
      ];
      break;
    }

    case 2: {
      // 10 or 100 More / Less
      const baseNum = Math.floor(Math.random() * 700) + 150;
      const isHundred = Math.random() > 0.5;
      const isMore = Math.random() > 0.5;

      const delta = isHundred ? 100 : 10;
      const action = isMore ? "more" : "less";
      const ansVal = isMore ? baseNum + delta : baseNum - delta;

      correct = ansVal.toString();
      questionText = `What is ${delta} ${action} than ${baseNum}?`;
      explanationText = isMore
        ? `${baseNum} + ${delta} = ${ansVal}.`
        : `${baseNum} - ${delta} = ${ansVal}.`;

      wrongAnswers = [
        (isMore ? baseNum - delta : baseNum + delta).toString(),
        (isMore ? baseNum + delta * 2 : baseNum - delta * 2).toString(),
        (ansVal + 5).toString(),
      ];
      break;
    }

    case 3: {
      // Sequences (steps of 4, 8, 50, or 100)
      const stepSizes = [4, 8, 50, 100];
      const step = stepSizes[Math.floor(Math.random() * stepSizes.length)];
      const start = Math.floor(Math.random() * 5) + 1;
      
      const n1 = start * step;
      const n2 = (start + 1) * step;
      const n3 = (start + 2) * step;
      const n4 = (start + 3) * step;

      correct = n4.toString();
      questionText = `What comes next in the sequence: ${n1}, ${n2}, ${n3}, ___ ?`;
      explanationText = `The pattern goes up in steps of ${step}. ${n3} + ${step} = ${n4}.`;

      wrongAnswers = [
        (n4 + step).toString(),
        (n4 - step / 2).toString(),
        (n4 + 10).toString(),
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

  let fallback = 10;
  while (optionsSet.size < 4) {
    optionsSet.add((parseInt(correct, 10) + fallback).toString());
    fallback += 10;
  }

  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year3PlaceValuePage() {
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
      title="Year 3: Place Value"
      icon="🔢"
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
            className="w-full text-center bg-white hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}