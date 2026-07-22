"use client";

import { useState } from "react";
import QuizLayout from "../../components/QuizLayout";

const TOTAL_QUESTIONS = 10;

function generateQuestion() {
  const type = Math.floor(Math.random() * 5);

  if (type === 0) {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;

    return {
      question: `${a} + ${b} = ?`,
      answer: String(a + b),
    };
  }

  if (type === 1) {
    const a = Math.floor(Math.random() * 50) + 20;
    const b = Math.floor(Math.random() * 20);

    return {
      question: `${a} - ${b} = ?`,
      answer: String(a - b),
    };
  }

  if (type === 2) {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 5) + 1;

    return {
      question: `${a} × ${b} = ?`,
      answer: String(a * b),
    };
  }

  if (type === 3) {
    return {
      question: "How many days are there in a week?",
      answer: "7",
    };
  }

  return {
    question: "How many pence make £1?",
    answer: "100",
  };
}

export default function MixedTestPage() {
  const [question, setQuestion] = useState(generateQuestion());
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [message, setMessage] = useState("");

  function checkAnswer() {
    if (answer === question.answer) {
      setScore(score + 1);
      setMessage("Correct! 🎉");
    } else {
      setMessage(`Answer: ${question.answer}`);
    }
  }

  function nextQuestion() {
    if (questionNumber < TOTAL_QUESTIONS) {
      setQuestion(generateQuestion());
      setQuestionNumber(questionNumber + 1);
      setAnswer("");
      setMessage("");
    } else {
      setMessage(`Test complete! Score: ${score}/${TOTAL_QUESTIONS}`);
    }
  }

  return (
    <QuizLayout
      title="Year 1 Mixed Test"
      icon="📝"
      questionNumber={questionNumber}
      totalQuestions={TOTAL_QUESTIONS}
      score={score}
      question={question.question}
      message={message}
    >

      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border-2 border-gray-300 rounded-lg p-3 text-xl w-full"
        placeholder="Enter answer"
      />

      <button
        onClick={checkAnswer}
        className="bg-green-600 text-white px-6 py-3 rounded-lg mt-4 w-full"
      >
        Check Answer
      </button>

      <button
        onClick={nextQuestion}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4 w-full"
      >
        Next Question
      </button>

    </QuizLayout>
  );
}