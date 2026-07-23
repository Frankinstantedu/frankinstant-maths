"use client";

type ResultPopupProps = {
  show: boolean;
  correct: boolean;
  message: string;
};

export default function ResultPopup({
  show,
  correct,
  message,
}: ResultPopupProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div
        className={`rounded-3xl p-10 shadow-2xl text-center max-w-lg w-11/12 animate-pulse ${
          correct
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >

        <div className="text-8xl mb-4">
          {correct ? "🎉" : "😢"}
        </div>

        <h1 className="text-5xl font-extrabold">
          {correct ? "CORRECT!" : "NOT QUITE!"}
        </h1>

        <p className="text-2xl mt-6">
          {message}
        </p>

        {correct && (
          <div className="text-5xl mt-8 animate-bounce">
            ⭐ ⭐ ⭐
          </div>
        )}

      </div>

    </div>
  );
}