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

  function checkAnswer() {
    if (answer.toLowerCase() === question.answer.toLowerCase()) {
      setScore(score + 1);
      setMessage("Correct! 🎉");
    } else {
      setMessage(`Try again. The answer is ${question.answer}`);
    }
  }

  function nextQuestion() {
    if (questionNumber < TOTAL_QUESTIONS) {
      setQuestion(generateQuestion());
      setQuestionNumber(questionNumber + 1);
      setAnswer("");
      setMessage("");
    } else {
      setMessage(`Finished! Your score is ${score}/${TOTAL_QUESTIONS}`);
    }
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