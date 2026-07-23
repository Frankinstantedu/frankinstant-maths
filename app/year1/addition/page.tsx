"use client";

import { useState } from "react";
import QuizLayout from "../../components/QuizLayout";

const TOTAL_QUESTIONS = 10;

function generateQuestion() {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;

  return {
    question: `${a} + ${b} = ?`,
    answer: a + b,
  };
}

export default function AdditionPage() {
  const [question, setQuestion] = useState(generateQuestion());
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [message, setMessage] = useState("");
  const [answered, setAnswered] = useState(false);

  function checkAnswer() {
    if (answered) return;

    if (Number(answer) === question.answer) {
      setScore((prev) => prev + 1);
      setMessage("✅ Correct!");
    } else {
      setMessage(`❌ Incorrect. The answer is ${question.answer}`);
    }

    setAnswered(true);
  }

  function nextQuestion() {
    if (!answered) return;

    if (questionNumber < TOTAL_QUESTIONS) {
      setQuestion(generateQuestion());
      setQuestionNumber((prev) => prev + 1);
      setAnswer("");
      setMessage("");
      setAnswered(false);
    } else {
      setMessage(`🎉 Round Complete! Score: ${score}/${TOTAL_QUESTIONS}`);

      setTimeout(() => {
        setQuestion(generateQuestion());
        setQuestionNumber(1);
        setScore(0);
        setAnswer("");
        setMessage("");
        setAnswered(false);
      }, 2000);
    }
  }

  return (
    <QuizLayout
      title="Addition Practice"
      icon="➕"
      questionNumber={questionNumber}
      totalQuestions={TOTAL_QUESTIONS}
      score={score}
      question={question.question}
      message={message}
    >
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border-2 border-gray-300 rounded-lg p-3 text-xl w-full"
        placeholder="Enter answer"
        disabled={answered}
      />

      <button
        onClick={checkAnswer}
        disabled={answered}
        className="bg-green-600 text-white px-6 py-3 rounded-lg mt-4 w-full disabled:opacity-50"
      >
        Check Answer
      </button>

      <button
        onClick={nextQuestion}
        disabled={!answered}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4 w-full disabled:opacity-50"
      >
        Next Question
      </button>
    </QuizLayout>
  );
}