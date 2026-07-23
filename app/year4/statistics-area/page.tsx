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
      // Area by counting squares
      const width = Math.floor(Math.random() * 5) + 3; // 3 to 7
      const height = Math.floor(Math.random() * 4) + 2; // 2 to 5
      const area = width * height;

      questionText = `A shape is drawn on a grid. It is ${width} squares wide and ${height} squares tall. What is its total area in square units?`;
      correct = `${area} square units`;
      explanationText = `Counting all the grid squares inside the shape: ${width} × ${height} = ${area} square units.`;
      wrongAnswers = [
        `${(width + height) * 2} square units`,
        `${area + 2} square units`,
        `${area - 3} square units`,
      ];
      break;
    }
    case 1: {
      // Line Graph Interpretation (Temperature over time)
      const times = ["9 am", "10 am", "11 am", "12 pm", "1 pm"];
      const temps = [12, 14, 18, 21, 19];
      const selectedIdx = Math.floor(Math.random() * (times.length - 1)) + 1;
      const diff = temps[selectedIdx] - temps[selectedIdx - 1];

      questionText = `According to a line graph, the temperature was ${temps[selectedIdx - 1]}°C at ${times[selectedIdx - 1]} and ${temps[selectedIdx]}°C at ${times[selectedIdx]}. By how many degrees did the temperature change?`;
      correct = diff > 0 ? `Increased by ${diff}°C` : `Decreased by ${Math.abs(diff)}°C`;
      explanationText = `Subtract the starting temperature from the ending temperature: ${temps[selectedIdx]}°C - ${temps[selectedIdx - 1]}°C = ${diff}°C difference.`;
      wrongAnswers = [
        `Increased by ${diff + 2}°C`,
        `Decreased by ${diff}°C`,
        `Increased by ${temps[selectedIdx]}°C`,
      ];
      break;
    }
    case 2: {
      // Bar Chart Comparison (Difference between two bars)
      const classA = Math.floor(Math.random() * 10) + 18; // 18 to 27
      const classB = Math.floor(Math.random() * 8) + 12; // 12 to 19
      const diff = Math.abs(classA - classB);

      questionText = `A bar chart shows Class 4A read ${classA} books and Class 4B read ${classB} books. How many more books did Class 4A read than Class 4B?`;
      correct = `${diff} books`;
      explanationText = `Subtract Class 4B's total from Class 4A's total: ${classA} - ${classB} = ${diff} books.`;
      wrongAnswers = [
        `${diff + 2} books`,
        `${classA + classB} books`,
        `${diff + 5} books`,
      ];
      break;
    }
    case 3: {
      // Comparing Areas of two rectilinear shapes
      const areaA = Math.floor(Math.random() * 10) + 12;
      const areaB = Math.floor(Math.random() * 8) + 20;
      const diff = areaB - areaA;

      questionText = `Shape A has an area of ${areaA} cm² and Shape B has an area of ${areaB} cm². How much larger is Shape B than Shape A?`;
      correct = `${diff} cm²`;
      explanationText = `Subtract the smaller area from the larger area: ${areaB} cm² - ${areaA} cm² = ${diff} cm².`;
      wrongAnswers = [
        `${diff + 3} cm²`,
        `${areaA + areaB} cm²`,
        `${diff + 1} cm²`,
      ];
      break;
    }
  }

  const optionsSet = new Set<string>([correct, ...wrongAnswers]);
  while (optionsSet.size < 4) optionsSet.add(`${Math.floor(Math.random() * 30) + 2}`);
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    question: questionText,
    answerOptions: options,
    correctAnswer: correct,
    explanation: explanationText,
  };
}

export default function StatisticsAreaPage() {
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
      title="Year 4: Statistics & Area"
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