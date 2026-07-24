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
      // Calculating the mean average
      const count = 4;
      const numbers = [
        Math.floor(Math.random() * 10) + 12,
        Math.floor(Math.random() * 10) + 16,
        Math.floor(Math.random() * 10) + 20,
        Math.floor(Math.random() * 10) + 24,
      ];
      const sum = numbers.reduce((a, b) => a + b, 0);
      const mean = sum / count;

      questionText = `Calculate the mean average of these four test scores: ${numbers.join(", ")}.`;
      correct = `${mean}`;

      wrongAnswers = [
        `${mean + 2}`,
        `${mean - 1.5}`,
        `${Math.round(sum / (count - 1))}`,
      ];
      explanationText = `To find the mean, add all the values together (${sum}) and divide by the total count of numbers (${count}). ${sum} ÷ ${count} = ${mean}.`;
      break;
    }
    case 1: {
      // Pie chart percentage / frequency calculation
      const totalVotes = 200;
      const percentages = [10, 15, 20, 25, 30];
      const pct = percentages[Math.floor(Math.random() * percentages.length)];
      const frequency = (totalVotes * pct) / 100;

      const topics = ["Football", "Swimming", "Athletics", "Gymnastics", "Cycling"];
      const chosenTopic = topics[Math.floor(Math.random() * topics.length)];

      questionText = `A pie chart shows the favourite sports of ${totalVotes} children. If ${chosenTopic} represents ${pct}% of the chart, how many children chose ${chosenTopic}?`;
      correct = `${frequency}`;

      wrongAnswers = [
        `${frequency + 10}`,
        `${frequency - 5}`,
        `${pct * 2}`,
      ];
      explanationText = `Calculate ${pct}% of the total ${totalVotes} children: (${totalVotes} ÷ 100) × ${pct} = ${frequency} children.`;
      break;
    }
    case 2: {
      // Line graph temperature / time difference
      const startTemp = Math.floor(Math.random() * 7) - 3; // -3 to 3
      const rise = Math.floor(Math.random() * 8) + 5; // 5 to 12 degrees rise
      const endTemp = startTemp + rise;

      questionText = `A line graph records the temperature over a morning. At 6:00 AM, the temperature was ${startTemp}°C. By midday, it had risen by ${rise}°C. What was the temperature at midday?`;
      correct = `${endTemp}°C`;

      wrongAnswers = [
        `${endTemp + 2}°C`,
        `${endTemp - 3}°C`,
        `${Math.abs(startTemp) + rise}°C`,
      ];
      explanationText = `Add the rise in temperature to the starting temperature: ${startTemp}°C + ${rise}°C = ${endTemp}°C.`;
      break;
    }
    case 3: {
      // Finding a missing value given the mean average
      const count = 5;
      const knownSum = 75;
      const targetMean = 18;
      const totalNeeded = targetMean * count;
      const missingValue = totalNeeded - knownSum;

      questionText = `A student has scored an average of ${targetMean} across ${count} matches. The sum of their first 4 scores is ${knownSum}. What was their score in the 5th match?`;
      correct = `${missingValue}`;

      wrongAnswers = [
        `${missingValue + 4}`,
        `${missingValue - 5}`,
        `${targetMean + 5}`,
      ];
      explanationText = `First, find the total sum required for all ${count} matches (${count} × ${targetMean} = ${totalNeeded}). Subtract the known sum (${knownSum}) to find the missing value: ${totalNeeded} - ${knownSum} = ${missingValue}.`;
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add("15");
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function Year6StatisticsPage() {
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
      title="Year 6: Statistics"
      icon="📊"
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
            className="w-full text-center bg-white hover:bg-violet-50 border-2 border-violet-200 hover:border-violet-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}