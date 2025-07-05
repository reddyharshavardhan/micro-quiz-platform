"use client";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { quizzes as STATIC_QUIZZES } from "../../../data/quizzes";

export default function QuizzesByCategoryPage({ params }) {
  const paramsMaybePromise = params;
  const resolvedParams =
    typeof paramsMaybePromise.then === "function"
      ? use(paramsMaybePromise)
      : paramsMaybePromise;
  const category = resolvedParams.category;

  const [allQuizzes, setAllQuizzes] = useState([]);

  useEffect(() => {
    const adminQuizzes = JSON.parse(localStorage.getItem("adminQuizzes") || "[]");
    const staticList = STATIC_QUIZZES.filter(
      q => q.category.toLowerCase() === category.toLowerCase()
    );
    const adminList = adminQuizzes.filter(
      q => q.category && q.category.toLowerCase() === category.toLowerCase()
    );
    setAllQuizzes([...staticList, ...adminList]);
  }, [category]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 capitalize">
        {category} Quizzes
      </h1>
      <ul className="space-y-3">
        {allQuizzes.length === 0 && (
          <li className="text-gray-500">No quizzes in this category yet.</li>
        )}
        {allQuizzes.map(q => (
          <li key={q.id}>
            <Link
              href={`/quiz/${q.id}`}
              className="block p-4 bg-white dark:bg-gray-900 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold"
            >
              {q.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}