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
  const type = Math.floor(Math.random() * 3);
  let correct = "";
  let questionText = "";
  let explanationText = "";
  let wrongAnswers: string[] = [];

  switch (type) {
    case 0: {
      // Translation on a coordinate grid
      const startX = Math.floor(Math.random() * 6) - 3;
      const startY = Math.floor(Math.random() * 6) - 3;
      const moveX = Math.floor(Math.random() * 5) + 1;
      const moveY = Math.floor(Math.random() * 5) + 1;
      
      const endX = startX + moveX;
      const endY = startY + moveY;

      questionText = `A point at (${startX}, ${startY}) is translated ${moveX} units right and ${moveY} units up. What are its new coordinates?`;
      correct = `(${endX}, ${endY})`;
      explanationText = `Add the movement to each coordinate: X becomes ${startX} + ${moveX} = ${endX}; Y becomes ${startY} + ${moveY} = ${endY}.`;
      wrongAnswers = [
        `(${endX - 2}, ${endY})`,
        `(${endX}, ${endY - 2})`,
        `(${startX}, ${startY})`,
      ];
      break;
    }
    case 1: {
      // Reflections across the X or Y axis
      const origX = Math.floor(Math.random() * 8) - 4;
      const origY = Math.floor(Math.random() * 8) - 4;
      const reflectX = -origX;
      const reflectY = -origY;

      questionText = `A point at (${origX}, ${origY}) is reflected across the Y-axis. What are its new coordinates?`;
      correct = `(${reflectX}, ${origY})`;
      explanationText = `When reflecting across the Y-axis, the X-coordinate changes sign while the Y-coordinate stays the same.`;
      wrongAnswers = [
        `(${origX}, ${reflectY})`,
        `(${reflectX}, ${reflectY})`,
        `(${origY}, ${origX})`,
      ];
      break;
    }
    case 2: {
      // Compass directions and turns (degrees / right angles)
      const directions = ["North", "East", "South", "West"];
      const startDir = directions[Math.floor(Math.random() * directions.length)];
      const turns = [
        { turn: "90° clockwise", offset: 1 },
        { turn: "180°", offset: 2 },
        { turn: "90° anti-clockwise", offset: 3 },
      ];
      const chosenTurn = turns[Math.floor(Math.random() * turns.length)];
      const startIndex = directions.indexOf(startDir);
      const endIndex = (startIndex + chosenTurn.offset) % 4;
      const endDir = directions[endIndex];

      questionText = `Facing ${startDir}, you make a ${chosenTurn.turn} turn. Which direction are you facing now?`;
      correct = endDir;
      explanationText = `Turning ${chosenTurn.turn} from ${startDir} brings you to face ${endDir}.`;
      wrongAnswers = directions.filter(d => d !== endDir).slice(0, 3);
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

export default function Year5PositionDirectionPage() {
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
      title="Year 5: Position & Direction"
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
            className="w-full text-center bg-white hover:bg-cyan-50 border-2 border-cyan-200 hover:border-cyan-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}