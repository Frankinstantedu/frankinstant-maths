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
  const type = Math.floor(Math.random() * 4);
  let correct = "";
  let questionText = "";
  let explanationText = "";
  let wrongAnswers: string[] = [];

  switch (type) {
    case 0: {
      // Four-quadrant translation (moving a point by vector [dx, dy])
      const startX = Math.floor(Math.random() * 11) - 5; // -5 to 5
      const startY = Math.floor(Math.random() * 11) - 5; // -5 to 5
      const dx = Math.floor(Math.random() * 9) - 4; // -4 to 4
      const dy = Math.floor(Math.random() * 9) - 4; // -4 to 4

      const finalX = startX + dx;
      const finalY = startY + dy;

      correct = `(${finalX}, ${finalY})`;
      questionText = `A point at (${startX}, ${startY}) is translated by the vector [${dx}, ${dy}]. What are the coordinates of the new point?`;
      
      wrongAnswers = [
        `(${finalX + 1}, ${finalY - 1})`,
        `(${startX - dx}, ${startY - dy})`,
        `(${finalX - 2}, ${finalY + 2})`,
      ];
      explanationText = `Add the vector components to the original coordinates: x-coordinate (${startX} + ${dx} = ${finalX}) and y-coordinate (${startY} + ${dy} = ${finalY}), resulting in (${finalX}, ${finalY}).`;
      break;
    }
    case 1: {
      // Reflection across the x-axis
      const x = Math.floor(Math.random() * 11) - 5; // -5 to 5
      const y = (Math.floor(Math.random() * 8) + 1) * (Math.random() > 0.5 ? 1 : -1); // non-zero y

      const reflectedY = -y;
      correct = `(${x}, ${reflectedY})`;

      questionText = `A point at (${x}, ${y}) is reflected across the x-axis. What are its new coordinates?`;
      wrongAnswers = [
        `(${-x}, ${y})`,
        `(${x}, ${y})`,
        `(${-x}, ${reflectedY})`,
      ];
      explanationText = `When reflecting a point across the x-axis, the x-coordinate remains the same while the y-coordinate changes to its opposite sign: (${x}, ${reflectedY}).`;
      break;
    }
    case 2: {
      // Reflection across the y-axis
      const x = (Math.floor(Math.random() * 8) + 1) * (Math.random() > 0.5 ? 1 : -1); // non-zero x
      const y = Math.floor(Math.random() * 11) - 5; // -5 to 5

      const reflectedX = -x;
      correct = `(${reflectedX}, ${y})`;

      questionText = `A point at (${x}, ${y}) is reflected across the y-axis. What are its new coordinates?`;
      wrongAnswers = [
        `(${x}, ${-y})`,
        `(${reflectedX}, ${-y})`,
        `(${x}, ${y})`,
      ];
      explanationText = `When reflecting a point across the y-axis, the y-coordinate remains the same while the x-coordinate changes to its opposite sign: (${reflectedX}, ${y}).`;
      break;
    }
    case 3: {
      // Finding a missing vertex of a rectangle or square on a grid
      const x1 = -3, y1 = 4;
      const x2 = 3, y2 = 4;
      const x3 = 3, y3 = -2;
      // Missing point (x4, y4) should align with x1 and y3 -> (-3, -2)
      const targetX = x1;
      const targetY = y3;

      correct = `(${targetX}, ${targetY})`;
      questionText = `Three vertices of a rectangle are located at (-3, 4), (3, 4), and (3, -2) on a coordinate grid. What are the coordinates of the fourth vertex?`;
      
      wrongAnswers = [
        `(-3, -4)`,
        `(3, 2)`,
        `(-3, 2)`,
      ];
      explanationText = `In a rectangle, opposite sides are equal in length and parallel to the axes. Aligning with the x-coordinate of (-3, 4) and the y-coordinate of (3, -2) gives the fourth vertex at (${targetX}, ${targetY}).`;
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add("(0, 0)");
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year6PositionDirectionPage() {
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
      title="Year 6: Position & Direction"
      icon="🧭"
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
            className="w-full text-center bg-white hover:bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}