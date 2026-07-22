"use client";

import { useState } from "react";
import QuizLayout from "../../components/QuizLayout";

const TOTAL_QUESTIONS = 10;

function generateQuestion() {
  const first = Math.floor(Math.random() * 10) + 1;
  const second = 10 - first;

  return {
    question: `${first} + ? = 10`,
    answer: second,
  };
}

export default function NumberBondsPage() {
  const [question, setQuestion] = useState(generateQuestion());
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [message, setMessage] = useState("");

  function checkAnswer() {
    if (Number(answer) === question.answer) {
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
      title="Number Bonds Practice"
      icon="🔢"
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