"use client";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [lb, setLb] = useState([]);

  useEffect(() => {
    setLb(JSON.parse(localStorage.getItem("leaderboard") || "[]"));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      {lb.length === 0 && <div>No scores yet. Play a quiz!</div>}
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-950">
            <th className="py-2">Quiz</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {lb.map((e, idx) => (
            <tr key={idx}>
              <td className="py-2">{e.quiz}</td>
              <td>{e.score} / {e.total}</td>
              <td>{new Date(e.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}