"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { quizzes as STATIC_QUIZZES } from "../../../data/quizzes";
import Timer from "../../components/Timer";
import ProgressBar from "../../components/ProgressBar";

export default function QuizPage() {
  const params = useParams();
  const id = typeof params.id === "string"
    ? params.id
    : Array.isArray(params.id)
      ? params.id[0]
      : "";

  const [quiz, setQuiz] = useState(undefined); // null = not found, undefined = loading
  const [curr, setCurr] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();

  // Find quiz in localStorage (admin-created) OR static list
  useEffect(() => {
    if (!id) return;
    // Get admin-created
    let match = null;
    if (typeof window !== "undefined") {
      const adminQuizzes = JSON.parse(localStorage.getItem("adminQuizzes") || "[]");
      match = adminQuizzes.find(q => q.id === id);
    }
    if (!match) {
      match = STATIC_QUIZZES.find(q => q.id === id);
    }
    setQuiz(match || null); // null means not found
  }, [id]);

  // Save history/leaderboard on finish (optional, your logic here)
  useEffect(() => {
    if (finished && quiz) {
      const lb = JSON.parse(localStorage.getItem("leaderboard") || "[]");
      lb.push({
        quiz: quiz.title,
        score,
        total: quiz.questions.length,
        date: new Date().toISOString(),
      });
      lb.sort((a, b) => b.score - a.score); // Highest first
      localStorage.setItem("leaderboard", JSON.stringify(lb.slice(0, 10)));
    }
  }, [finished, score, quiz]);

  if (quiz === undefined) return <div>Loading quiz...</div>;
  if (quiz === null) return <div>Quiz not found.</div>;

  // Quiz logic
  const question = quiz.questions[curr];
  const progress = curr + 1;
  const total = quiz.questions.length;

  function handleOptionSelect(index) {
    if (selected !== null) return;
    setSelected(index);
    setShowFeedback(true);
    setAnswers(a => [...a, index]);
    if (index === question.correct) setScore(s => s + 1);
  }

  function nextQuestion() {
    setSelected(null);
    setShowFeedback(false);
    if (curr + 1 < quiz.questions.length) setCurr(c => c + 1);
    else setFinished(true);
  }

  function handleTimerExpire() {
    setFinished(true);
  }

  function handleReview() {
    router.push(`/quiz/${quiz.id}/review?answers=${JSON.stringify(answers)}`);
  }

  // Finished state
  if (finished) {
    return (
      <div className="space-y-3">
        <h2 className="text-xl font-bold">Quiz Finished!</h2>
        <div className="text-lg">
          Your score:{" "}
          <span className="font-mono">
            {score} / {quiz.questions.length}
          </span>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-700 text-white rounded"
          onClick={handleReview}
        >
          Review Answers
        </button>
      </div>
    );
  }

  // Quiz question render
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold text-lg">{quiz.title}</div>
        <Timer duration={60} onExpire={handleTimerExpire} />
      </div>
      <ProgressBar value={progress} max={total} />
      <div className="mb-4">{question.question}</div>
      <div className="space-y-2">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionSelect(idx)}
            className={
              "block w-full text-left px-4 py-2 rounded border " +
              (showFeedback
                ? idx === question.correct
                  ? "bg-green-200 border-green-600"
                  : idx === selected
                  ? "bg-red-200 border-red-600"
                  : "bg-gray-100 border-gray-200"
                : "border-gray-300 bg-white dark:bg-gray-900")
            }
            disabled={showFeedback}
          >
            {opt}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className="mt-4">
          {selected === question.correct ? (
            <span className="text-green-700 font-bold">✅ Correct!</span>
          ) : (
            <span className="text-red-700 font-bold">❌ Incorrect.</span>
          )}
          <button
            className="ml-6 px-3 py-1 border rounded bg-blue-600 text-white"
            onClick={nextQuestion}
          >
            Next {progress < total ? "Question" : "Finish"}
          </button>
        </div>
      )}
    </div>
  );
}