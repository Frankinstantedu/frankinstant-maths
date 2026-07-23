"use client";

import { useState } from "react";
import QuizLayout from "../../components/QuizLayout";

const TOTAL_QUESTIONS = 10;

function generateQuestion() {
  const number = Math.floor(Math.random() * 90) + 10;
  const tens = Math.floor(number / 10);
  const ones = number % 10;

  return {
    question: `How many tens and ones are in ${number}? (Answer: tens,ones)`,
    answer: `${tens},${ones}`,
  };
}

export default function PlaceValuePage() {
  const [question, setQuestion] = useState(generateQuestion());
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [message, setMessage] = useState("");
  const [answered, setAnswered] = useState(false);

  function checkAnswer() {
    if (answered) return;

    if (answer.replace(/\s/g, "") === question.answer) {
      setScore((prev) => prev + 1);
      setMessage("✅ Correct!");
    } else {
      setMessage(`❌ Incorrect. The answer is ${question.answer}`);
    }

    setAnswered(true);
  }

  function nextQuestion() {
    if (!answered) return;

    if (questionNumber >= TOTAL_QUESTIONS) {
      setQuestion(generateQuestion());
      setQuestionNumber(1);
      setScore(0);
      setAnswer("");
      setMessage("🎉 Great job! Starting a new round...");
      setAnswered(false);
      return;
    }

    setQuestion(generateQuestion());
    setQuestionNumber((prev) => prev + 1);
    setAnswer("");
    setMessage("");
    setAnswered(false);
  }

  return (
    <QuizLayout
      title="Place Value Practice"
      icon="🔟"
      questionNumber={questionNumber}
      totalQuestions={TOTAL_QUESTIONS}
      score={score}
      question={question.question}
      message={message}
    >
      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={answered}
        className="border-2 border-gray-300 rounded-lg p-3 text-xl w-full"
        placeholder="Example: 4,5"
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