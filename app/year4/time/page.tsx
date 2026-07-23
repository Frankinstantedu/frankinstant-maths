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
      // 12-hour to 24-hour conversion (PM)
      const hour12 = Math.floor(Math.random() * 11) + 1; // 1 to 11
      const min = [15, 30, 45, 0][Math.floor(Math.random() * 4)];
      const minStr = min === 0 ? "00" : min.toString();
      const hour24 = hour12 + 12;

      questionText = `Convert ${hour12}:${minStr} pm to 24-hour clock time.`;
      correct = `${hour24}:${minStr}`;
      explanationText = `For pm times, add 12 to the hour: ${hour12} + 12 = ${hour24}, giving ${hour24}:${minStr}.`;
      wrongAnswers = [
        `${hour12}:${minStr}`,
        `${hour24 + 1}:${minStr}`,
        `${hour24 - 1}:${minStr}`,
      ];
      break;
    }
    case 1: {
      // 24-hour to 12-hour conversion
      const hour24 = Math.floor(Math.random() * 10) + 13; // 13 to 22
      const min = [15, 30, 45, 0][Math.floor(Math.random() * 4)];
      const minStr = min === 0 ? "00" : min.toString();
      const hour12 = hour24 - 12;

      questionText = `Convert ${hour24}:${minStr} to a 12-hour clock time.`;
      correct = `${hour12}:${minStr} pm`;
      explanationText = `Subtract 12 from the hour (${hour24} - 12 = ${hour12}) and add "pm": ${hour12}:${minStr} pm.`;
      wrongAnswers = [
        `${hour12}:${minStr} am`,
        `${hour12 + 1}:${minStr} pm`,
        `${hour24}:${minStr} pm`,
      ];
      break;
    }
    case 2: {
      // Time duration word problem
      const startHour = Math.floor(Math.random() * 4) + 1; // 1 to 4 pm
      const startMin = 15;
      const durationMin = [30, 45, 60, 75][Math.floor(Math.random() * 4)];
      
      const endTotalMin = startHour * 60 + startMin + durationMin;
      const endHour = Math.floor(endTotalMin / 60);
      const endMin = endTotalMin % 60;
      const endMinStr = endMin === 0 ? "00" : endMin.toString();

      questionText = `A film starts at ${startHour}:${startMin} pm and lasts ${durationMin} minutes. What time does it finish?`;
      correct = `${endHour}:${endMinStr} pm`;
      explanationText = `Adding ${durationMin} minutes to ${startHour}:${startMin} pm brings the time to ${endHour}:${endMinStr} pm.`;
      wrongAnswers = [
        `${endHour + 1}:${endMinStr} pm`,
        `${endHour}:${(endMin + 15) % 60} pm`,
        `${startHour + 1}:${startMin} pm`,
      ];
      break;
    }
    case 3: {
      // Converting minutes to seconds or hours to minutes
      const isHoursToMin = Math.random() < 0.5;
      if (isHoursToMin) {
        const hours = Math.floor(Math.random() * 4) + 2; // 2 to 5 hours
        const ans = hours * 60;

        questionText = `How many minutes are in ${hours} hours?`;
        correct = `${ans} minutes`;
        explanationText = `There are 60 minutes in 1 hour, so ${hours} × 60 = ${ans} minutes.`;
        wrongAnswers = [
          `${hours * 100} minutes`,
          `${ans + 30} minutes`,
          `${ans - 20} minutes`,
        ];
      } else {
        const minutes = Math.floor(Math.random() * 4) + 2; // 2 to 5 minutes
        const ans = minutes * 60;

        questionText = `How many seconds are in ${minutes} minutes?`;
        correct = `${ans} seconds`;
        explanationText = `There are 60 seconds in 1 minute, so ${minutes} × 60 = ${ans} seconds.`;
        wrongAnswers = [
          `${minutes * 100} seconds`,
          `${ans + 30} seconds`,
          `${ans - 30} seconds`,
        ];
      }
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add(`${Math.floor(Math.random() * 12) + 1}:00 pm`);
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function TimePage() {
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
      title="Year 4: Time (12 & 24 Hour)"
      icon="⏱️"
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
            className="w-full text-center bg-white hover:bg-orange-50 border-2 border-orange-200 hover:border-orange-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}