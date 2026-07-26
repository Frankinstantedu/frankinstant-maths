'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Helper shuffle function for randomizing options
const shuffle = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function SatExamPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const auth = sessionStorage.getItem('frankinstant_authenticated');
    if (!auth) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }

    // Comprehensive generator covering all 18 primary SAT categories systematically across 50 questions
    const generatedQuestions = [];
    
    const categoryList = [
      { name: 'Number & Place Value', sub: 'Rounding & Negative Numbers' },
      { name: 'Addition', sub: 'Column & Multi-step Addition' },
      { name: 'Subtraction', sub: 'Difference & Mental Subtraction' },
      { name: 'Multiplication', sub: 'Factors & Long Multiplication' },
      { name: 'Division', sub: 'Remainders & Short Division' },
      { name: 'Four Operations', sub: 'BODMAS & Order of Operations' },
      { name: 'Fractions', sub: 'Equivalent & Improper Fractions' },
      { name: 'Decimals', sub: 'Rounding & Operations' },
      { name: 'Percentages', sub: 'Percentage of Amounts' },
      { name: 'Ratio and Proportion', sub: 'Sharing in a Ratio' },
      { name: 'Algebra', sub: 'One and Two-step Equations' },
      { name: 'Measurement', sub: 'Perimeter, Area & Time' },
      { name: 'Geometry', sub: 'Angles & Properties' },
      { name: 'Statistics', sub: 'Mean & Data Interpretation' },
      { name: 'Reasoning', sub: 'True or False / Find the Mistake' },
      { name: 'Problem Solving', sub: 'Real-life Word Problems' },
      { name: 'SATs Arithmetic', sub: 'Rapid Calculation' },
      { name: 'SATs Reasoning', sub: 'Multi-step Justification' }
    ];

    for (let i = 1; i <= 50; i++) {
      const catMeta = categoryList[(i - 1) % categoryList.length];
      let qObj;

      switch (catMeta.name) {
        case 'Number & Place Value': {
          const num = Math.floor(Math.random() * 8000) + 1000;
          const rounded = Math.round(num / 100) * 100;
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `What is ${num} rounded to the nearest 100?`,
            options: shuffle([String(rounded), String(rounded + 100), String(rounded - 100), String(rounded + 50)]),
            correctAnswer: String(rounded),
            explanation: `Look at the tens digit. Since it rounds up/down appropriately, ${num} rounded to the nearest 100 is ${rounded}.`
          };
          break;
        }
        case 'Addition': {
          const a = Math.floor(Math.random() * 450) + 150;
          const b = Math.floor(Math.random() * 350) + 100;
          const ans = a + b;
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `Calculate: ${a} + ${b} = ?`,
            options: shuffle([String(ans), String(ans + 10), String(ans - 15), String(ans + 25)]),
            correctAnswer: String(ans),
            explanation: `Align columns or add mentally: ${a} + ${b} = ${ans}.`
          };
          break;
        }
        case 'Subtraction': {
          const a = Math.floor(Math.random() * 600) + 300;
          const b = Math.floor(Math.random() * 200) + 50;
          const ans = a - b;
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `Calculate the difference: ${a} - ${b} = ?`,
            options: shuffle([String(ans), String(ans + 12), String(ans - 10), String(ans + 20)]),
            correctAnswer: String(ans),
            explanation: `Subtract ${b} from ${a} to get ${ans}.`
          };
          break;
        }
        case 'Multiplication': {
          const a = Math.floor(Math.random() * 12) + 3;
          const b = Math.floor(Math.random() * 12) + 3;
          const ans = a * b;
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `What is the product of ${a} and ${b}?`,
            options: shuffle([String(ans), String(ans + a), String(ans - b), String(ans + 14)]),
            correctAnswer: String(ans),
            explanation: `Multiplying ${a} by ${b} yields ${ans}.`
          };
          break;
        }
        case 'Division': {
          const b = Math.floor(Math.random() * 9) + 3;
          const ans = Math.floor(Math.random() * 12) + 2;
          const a = b * ans;
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `Calculate: ${a} ÷ ${b} = ?`,
            options: shuffle([String(ans), String(ans + 2), String(ans > 1 ? ans - 1 : ans + 3), String(ans + 4)]),
            correctAnswer: String(ans),
            explanation: `Dividing ${a} by ${b} results in ${ans}.`
          };
          break;
        }
        case 'Four Operations': {
          // BODMAS example: a + b * c
          const a = Math.floor(Math.random() * 10) + 5;
          const b = Math.floor(Math.random() * 5) + 2;
          const c = Math.floor(Math.random() * 5) + 2;
          const ans = a + b * c;
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `Using order of operations (BODMAS), calculate: ${a} + ${b} × ${c} = ?`,
            options: shuffle([String(ans), String((a + b) * c), String(ans + 5), String(ans - 3)]),
            correctAnswer: String(ans),
            explanation: `Perform multiplication first (${b} × ${c} = ${b * c}), then add ${a} to get ${ans}.`
          };
          break;
        }
        case 'Fractions': {
          const total = [20, 40, 60, 80, 100][Math.floor(Math.random() * 5)];
          const num = Math.floor(Math.random() * 3) + 1;
          const den = num + 1; // e.g. 1/2 or 2/3 or 3/4
          const ans = Math.round((total * num) / den);
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `What is ${num}/${den} of ${total}?`,
            options: shuffle([String(ans), String(ans + 5), String(ans > 5 ? ans - 5 : ans + 10), String(total)]),
            correctAnswer: String(ans),
            explanation: `Divide ${total} by the denominator (${den}) and multiply by the numerator (${num}) to get ${ans}.`
          };
          break;
        }
        case 'Decimals': {
          const val1 = (Math.random() * 5 + 1).toFixed(1);
          const val2 = (Math.random() * 4 + 0.5).toFixed(1);
          const ans = (parseFloat(val1) + parseFloat(val2)).toFixed(1);
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `Calculate: ${val1} + ${val2} = ?`,
            options: shuffle([String(ans), (parseFloat(ans) + 0.2).toFixed(1), (parseFloat(ans) - 0.3).toFixed(1), (parseFloat(ans) + 1.0).toFixed(1)]),
            correctAnswer: String(ans),
            explanation: `Align decimal points and add: ${val1} + ${val2} = ${ans}.`
          };
          break;
        }
        case 'Percentages': {
          const total = [50, 100, 200, 300, 400][Math.floor(Math.random() * 5)];
          const pct = [10, 20, 25, 50][Math.floor(Math.random() * 4)];
          const ans = (total * pct) / 100;
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `What is ${pct}% of ${total}?`,
            options: shuffle([String(ans), String(ans + 10), String(ans > 10 ? ans - 10 : ans + 20), String(ans * 2)]),
            correctAnswer: String(ans),
            explanation: `Calculate ${pct}% by multiplying ${total} by ${pct}/100, resulting in ${ans}.`
          };
          break;
        }
        case 'Ratio and Proportion': {
          const partA = 2;
          const partB = 3;
          const totalParts = partA + partB;
          const multiplier = Math.floor(Math.random() * 5) + 3;
          const totalAmt = totalParts * multiplier;
          const ans = partA * multiplier;
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `Share ${totalAmt} in the ratio 2:3. What is the value of the first share?`,
            options: shuffle([String(ans), String(partB * multiplier), String(totalAmt / 2), String(ans + 4)]),
            correctAnswer: String(ans),
            explanation: `Total parts = 5. One part = ${totalAmt} ÷ 5 = ${multiplier}. First share (2 parts) = 2 × ${multiplier} = ${ans}.`
          };
          break;
        }
        case 'Algebra': {
          const x = Math.floor(Math.random() * 8) + 2;
          const m = Math.floor(Math.random() * 3) + 2;
          const c = Math.floor(Math.random() * 10) + 3;
          const res = m * x + c;
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `Solve for x: ${m}x + ${c} = ${res}`,
            options: shuffle([String(x), String(x + 2), String(x > 1 ? x - 1 : x + 3), String(x + 4)]),
            correctAnswer: String(x),
            explanation: `Subtract ${c} from ${res} to get ${m}x = ${res - c}, then divide by ${m} to find x = ${x}.`
          };
          break;
        }
        case 'Measurement': {
          const l = Math.floor(Math.random() * 10) + 4;
          const w = Math.floor(Math.random() * 6) + 2;
          const perimeter = 2 * (l + w);
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `A rectangle has length ${l} cm and width ${w} cm. What is its perimeter?`,
            options: shuffle([String(perimeter), String(l * w), String(perimeter + 4), String(perimeter - 2)]),
            correctAnswer: String(perimeter),
            explanation: `Perimeter = 2 × (length + width) = 2 × (${l} + ${w}) = ${perimeter} cm.`
          };
          break;
        }
        case 'Geometry': {
          const angle1 = Math.floor(Math.random() * 60) + 40;
          const angle2 = Math.floor(Math.random() * 60) + 40;
          const thirdAngle = 180 - (angle1 + angle2);
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `Two angles in a triangle are ${angle1}° and ${angle2}°. What is the third angle?`,
            options: shuffle([String(thirdAngle), String(thirdAngle + 10), String(thirdAngle - 10), String(90)]),
            correctAnswer: String(thirdAngle),
            explanation: `Angles in a triangle sum to 180°. 180 - (${angle1} + ${angle2}) = ${thirdAngle}°.`
          };
          break;
        }
        case 'Statistics': {
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `Find the mean of the following set of numbers: 4, 8, 6, 10, 12.`,
            options: shuffle(['8', '10', '9', '7']),
            correctAnswer: '8',
            explanation: `Sum of numbers = 4+8+6+10+12 = 40. Divide by count (5): 40 ÷ 5 = 8.`
          };
          break;
        }
        case 'Reasoning': {
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `True or False: All prime numbers greater than 2 are odd numbers.`,
            options: shuffle(['True', 'False']),
            correctAnswer: 'True',
            explanation: `True. Any even number greater than 2 can be divided by 2, making it composite rather than prime.`
          };
          break;
        }
        case 'Problem Solving': {
          const cost = Math.floor(Math.random() * 5) + 2;
          const qty = Math.floor(Math.random() * 4) + 3;
          const total = cost * qty;
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `A book costs £${cost}. Sarah buys ${qty} books. How much does she spend in total?`,
            options: shuffle([String(total), String(total + cost), String(total - cost), String(total + 5)]),
            correctAnswer: String(total),
            explanation: `Multiply cost by quantity: £${cost} × ${qty} = £${total}.`
          };
          break;
        }
        case 'SATs Arithmetic': {
          const a = Math.floor(Math.random() * 50) + 50;
          const b = Math.floor(Math.random() * 40) + 10;
          const ans = a - b;
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `Rapid Calculation: ${a} - ${b} = ?`,
            options: shuffle([String(ans), String(ans + 5), String(ans - 5), String(ans + 10)]),
            correctAnswer: String(ans),
            explanation: `Quick calculation: ${a} - ${b} = ${ans}.`
          };
          break;
        }
        case 'SATs Reasoning': {
          const startVal = Math.floor(Math.random() * 100) + 50;
          const step = 15;
          const thirdTerm = startVal + step * 2;
          qObj = {
            id: i,
            category: `${catMeta.name} (${catMeta.sub})`,
            question: `A sequence starts at ${startVal} and increases by ${step} each time. What is the 3rd term?`,
            options: shuffle([String(thirdTerm), String(thirdTerm + step), String(thirdTerm - step), String(startVal + step)]),
            correctAnswer: String(thirdTerm),
            explanation: `1st term: ${startVal}, 2nd term: ${startVal + step}, 3rd term: ${startVal + step * 2} = ${thirdTerm}.`
          };
          break;
        }
        default: {
          qObj = {
            id: i,
            category: 'General SAT',
            question: `Calculate: ${i} × 2 = ?`,
            options: shuffle([String(i * 2), String(i * 2 + 2), String(i * 2 - 2), String(i + 10)]),
            correctAnswer: String(i * 2),
            explanation: `Multiply ${i} by 2 to get ${i * 2}.`
          };
        }
      }

      generatedQuestions.push(qObj);
    }

    setQuestions(generatedQuestions);
    setLoading(false);
  }, [router]);

  if (!isAuthenticated || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50">
        <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-slate-100">
          <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-slate-700 tracking-wide">Loading exam environment...</span>
        </div>
      </div>
    );
  }

  const handleOptionSelect = (questionId: number, option: string) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option
    });
  };

  const handleSubmitExam = () => {
    let calculatedScore = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setIsSubmitted(true);
  };

  const currentQ = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-blue-50/30 py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Header Card */}
        <div className="mb-8 bg-white/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-white/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Full Primary Curriculum Master Exam</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">Comprehensive SATs Mathematics Assessment</h1>
          <p className="text-sm text-slate-500 mt-1.5">Spanning Number, Arithmetic, Fractions, Algebra, Measurement, Geometry, Statistics, and Reasoning.</p>
        </div>

        {!isSubmitted ? (
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-white/80 relative">
            {/* Progress Bar & Counter */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-md hidden sm:inline-block">
                  {currentQ?.category}
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {progressPercent}% Complete
              </span>
            </div>

            {/* Visual Progress Line */}
            <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-6 leading-relaxed">
              {currentQ?.question}
            </h2>

            {/* Options Grid */}
            <div className="space-y-3.5 mb-8">
              {currentQ?.options.map((option: string, idx: number) => {
                const isSelected = selectedAnswers[currentQ.id] === option;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(currentQ.id, option)}
                    className={`w-full text-left p-4 sm:p-4.5 rounded-xl border-2 transition-all duration-200 font-medium text-sm sm:text-base flex items-center justify-between group ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 shadow-md shadow-indigo-100' 
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 text-slate-700 bg-white'
                    }`}
                  >
                    <span>{option}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 group-hover:border-slate-400'
                    }`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-100">
              <button
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
                disabled={currentQuestionIndex === 0}
                className="px-5 py-2.5 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-all shadow-sm"
              >
                Previous
              </button>

              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))}
                  className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleSubmitExam}
                  className="px-7 py-2.5 text-sm font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all"
                >
                  Submit Exam
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-white/80 space-y-6">
            {/* Scorecard Banner */}
            <div className="text-center py-8 bg-gradient-to-br from-indigo-50/80 to-blue-50/80 rounded-2xl border border-indigo-100/60 shadow-inner">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-white px-3 py-1 rounded-full shadow-sm">Results Summary</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-3 mb-1">Assessment Complete</h2>
              <p className="text-4xl sm:text-5xl font-black text-indigo-600 tracking-tight my-2">{score} <span className="text-2xl text-slate-400 font-normal">/ {questions.length}</span></p>
              <p className="text-sm font-medium text-slate-600 max-w-sm mx-auto mt-2">
                {score >= 40 ? '🌟 Outstanding mastery across all primary curriculum strands!' : score >= 30 ? '👍 Good solid effort, keep sharpening your skills!' : '💡 Review the step-by-step explanations below to improve.'}
              </p>
            </div>

            <h3 className="text-lg font-bold text-slate-900 pt-4 flex items-center justify-between">
              <span>Detailed Question Review</span>
              <span className="text-xs font-normal text-slate-400">Curriculum breakdowns</span>
            </h3>
            
            {/* Review List */}
            <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={q.id} className={`p-4.5 rounded-xl border transition-all ${
                    isCorrect ? 'border-emerald-200 bg-emerald-50/30' : 'border-rose-200 bg-rose-50/30'
                  }`}>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-100 mr-2">{q.category}</span>
                        <p className="font-semibold text-slate-900 text-sm sm:text-base inline-block mt-1">
                          {idx + 1}. {q.question}
                        </p>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <div className="text-xs space-y-1 mb-3 text-slate-600 bg-white/70 p-3 rounded-lg border border-slate-100/80">
                      <p>Your choice: <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>{userAns || 'No answer provided'}</span></p>
                      {!isCorrect && <p>Correct answer: <span className="font-bold text-emerald-700">{q.correctAnswer}</span></p>}
                    </div>

                    <p className="text-xs text-slate-500 italic bg-white/80 p-2.5 rounded-lg border border-slate-100">
                      <strong className="not-italic font-semibold text-slate-700">Explanation: </strong> {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full py-3.5 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Retake Assessment
            </button>
          </div>
        )}
      </div>
    </main>
  );
}