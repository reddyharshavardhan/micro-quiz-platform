"use client";
import { use, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { quizzes as STATIC_QUIZZES } from "../../../../data/quizzes";

export default function ReviewPage() {
  const paramsMaybePromise = useParams();
  const params =
    typeof paramsMaybePromise.then === "function"
      ? use(paramsMaybePromise)
      : paramsMaybePromise;
  const id = params.id;

  const searchParams = useSearchParams();
  const answers = JSON.parse(searchParams.get("answers") || "[]");

  const [quiz, setQuiz] = useState(undefined); 

  useEffect(() => {
    if (id) {
      let found = null;
      // Try admin quizzes first
      if (typeof window !== "undefined") {
        const adminQuizzes = JSON.parse(localStorage.getItem("adminQuizzes") || "[]");
        found = adminQuizzes.find(q => q.id === id);
      }
      // Then static
      if (!found) {
        found = STATIC_QUIZZES.find(q => q.id === id);
      }
      setQuiz(found || null);
    }
  }, [id]);

  // Loading state!
  if (quiz === undefined) return <div>Loading...</div>;
  if (quiz === null) return <div>Quiz not found.</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Review: {quiz.title}</h2>
      {quiz.questions.map((q, qi) => (
        <div key={qi} className="mb-4 p-3 rounded bg-gray-50 dark:bg-gray-800">
          <div className="font-semibold">{q.question}</div>
          {q.options.map((opt, oi) => (
            <div
              key={oi}
              className={
                "pl-4 py-1 " +
                (oi === q.correct
                  ? "text-green-700 font-bold"
                  : oi === answers[qi]
                  ? "text-red-700"
                  : "text-gray-600")
              }
            >
              {oi === answers[qi]
                ? `Your answer: ${opt}`
                : oi === q.correct
                ? `Correct: ${opt}`
                : opt}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}