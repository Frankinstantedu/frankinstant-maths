"use client";

import { useState } from "react";
import QuizLayout from "../../components/QuizLayout";

const TOTAL_QUESTIONS = 10;

function generateQuestion() {
  const questions = [
    {
      question: "Which fraction is half?",
      answer: "1/2",
    },
    {
      question: "Which fraction means one quarter?",
      answer: "1/4",
    },
    {
      question: "How many quarters make a whole?",
      answer: "4",
    },
    {
      question: "How many halves make a whole?",
      answer: "2",
    },
    {
      question: "Which is bigger: 1/2 or 1/4?",
      answer: "1/2",
    },
  ];

  return questions[Math.floor(Math.random() * questions.length)];
}

export default function FractionsPage() {
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
      title="Fractions Practice"
      icon="🍕"
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