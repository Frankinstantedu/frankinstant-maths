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
      // Reading a line graph / temperature change
      const startTemp = Math.floor(Math.random() * 6) + 2; // 2 to 7
      const peakTemp = startTemp + Math.floor(Math.random() * 8) + 4; // higher
      
      questionText = `A line graph tracking daily temperature shows a reading of ${startTemp}°C at 9:00 AM and a peak of ${peakTemp}°C at 2:00 PM. How many degrees did the temperature rise?`;
      const diff = peakTemp - startTemp;
      correct = `${diff}°C`;
      explanationText = `Subtract the morning temperature from the peak temperature: ${peakTemp}°C - ${startTemp}°C = ${diff}°C rise.`;
      wrongAnswers = [
        `${diff + 2}°C`,
        `${diff > 1 ? diff - 1 : diff + 3}°C`,
        `${peakTemp}°C`,
      ];
      break;
    }
    case 1: {
      // Train / Bus Timetable problem
      const depHour = Math.floor(Math.random() * 4) + 8; // 8 AM to 11 AM
      const depMinute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
      const journeyMinutes = [35, 45, 55, 65, 80][Math.floor(Math.random() * 5)];
      
      const totalDepMins = depHour * 60 + depMinute;
      const totalArrMins = totalDepMins + journeyMinutes;
      const arrHour = Math.floor(totalArrMins / 60);
      const arrMinute = totalArrMins % 60;
      const formattedArr = `${arrHour}:${arrMinute === 0 ? '00' : arrMinute}`;
      const formattedDep = `${depHour}:${depMinute === 0 ? '00' : depMinute}`;

      questionText = `A train departs the station at ${formattedDep} and the journey takes ${journeyMinutes} minutes. What time does it arrive?`;
      correct = formattedArr;
      explanationText = `Adding ${journeyMinutes} minutes to ${formattedDep} results in arrival at ${formattedArr}.`;
      wrongAnswers = [
        `${arrHour + 1}:${arrMinute === 0 ? '00' : arrMinute}`,
        `${arrHour}:${(arrMinute + 10) % 60 === 0 ? '00' : (arrMinute + 10) % 60}`,
        `${arrHour - 1}:${arrMinute === 0 ? '00' : arrMinute}`,
      ];
      break;
    }
    case 2: {
      // Two-way table / Data tally interpretation
      const football = Math.floor(Math.random() * 20) + 10;
      const rugby = Math.floor(Math.random() * 15) + 5;
      const tennis = Math.floor(Math.random() * 12) + 8;
      const total = football + rugby + tennis;

      questionText = `A survey of sports preferences shows ${football} students like football, ${rugby} like rugby, and ${tennis} like tennis. How many students were surveyed in total?`;
      correct = total.toString();
      explanationText = `Add all the groups together: ${football} + ${rugby} + ${tennis} = ${total} students.`;
      wrongAnswers = [
        (total + 5).toString(),
        (total - 4).toString(),
        (football + rugby).toString(),
      ];
      break;
    }
    case 3: {
      // Finding the Mean (Average) of small set of numbers
      const n1 = Math.floor(Math.random() * 10) + 4;
      const n2 = n1 + (Math.floor(Math.random() * 4) * 2);
      const n3 = n2 + (Math.floor(Math.random() * 4) * 2);
      const sum = n1 + n2 + n3;
      // Make sure sum is divisible by 3 for clean average
      const adjustedSum = Math.round(sum / 3) * 3;
      const mean = adjustedSum / 3;
      const diffAdjust = adjustedSum - sum;
      const finalN3 = n3 + diffAdjust;

      questionText = `Find the mean (average) of these three test scores: ${n1}, ${n2}, and ${finalN3}.`;
      correct = mean.toString();
      explanationText = `First find the total sum (${n1} + ${n2} + ${finalN3} = ${adjustedSum}), then divide by the quantity of numbers (3): ${adjustedSum} ÷ 3 = ${mean}.`;
      wrongAnswers = [
        (mean + 2).toString(),
        (mean - 1 > 0 ? mean - 1 : mean + 3).toString(),
        (n2).toString(),
      ];
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

export default function Year5StatisticsPage() {
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
      title="Year 5: Statistics & Graphs"
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
            className="w-full text-center bg-white hover:bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-500 text-slate-800 font-bold p-4 rounded-xl text-lg shadow-sm transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </QuizLayout>
  );
}