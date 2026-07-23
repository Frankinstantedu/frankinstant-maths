"use client";

import { useState } from "react";
import QuizLayout from "../../components/QuizLayout";

const TOTAL_QUESTIONS = 10;

function generateQuestion() {
  const questions = [
    {
      question: "Which is longer: 10cm or 5cm?",
      answer: "10cm",
    },
    {
      question: "Which is shorter: 3m or 8m?",
      answer: "3m",
    },
    {
      question: "Which is heavier: 5kg or 2kg?",
      answer: "5kg",
    },
    {
      question: "Which holds more: 5 litres or 2 litres?",
      answer: "5 litres",
    },
    {
      question: "How many centimetres are in 1 metre?",
      answer: "100",
    },
  ];

  return questions[Math.floor(Math.random() * questions.length)];
}

export default function MeasurementPage() {
  const [question, setQuestion] = useState(generateQuestion());
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [message, setMessage] = useState("");
  const [answered, setAnswered] = useState(false);

  function checkAnswer() {
    if (answered) return;

    if (
      answer.trim().toLowerCase() ===
      question.answer.toLowerCase()
    ) {
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
      title="Measurement Practice"
      icon="📏"
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
        placeholder="Enter answer"
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