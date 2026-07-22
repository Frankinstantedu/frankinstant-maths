export function generateAdditionQuestion() {
  const firstNumber = Math.floor(Math.random() * 20) + 1;
  const secondNumber = Math.floor(Math.random() * 20) + 1;

  return {
    question: `${firstNumber} + ${secondNumber} = ?`,
    answer: firstNumber + secondNumber,
  };
}