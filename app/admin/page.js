"use client";
import { useState } from "react";
import { categories } from "../../data/quizzes";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currQ, setCurrQ] = useState({ question: "", options: ["", "", "", ""], correct: 0 });
  const [created, setCreated] = useState(false);

  function handleAddQuestion(e) {
    e.preventDefault();
    setQuestions([...questions, currQ]);
    setCurrQ({ question: "", options: ["", "", "", ""], correct: 0 });
  }

  function handleSaveQuiz() {
    const newQuiz = {
      id: `${category.toLowerCase()}-${Date.now()}`,
      category,
      title,
      questions,
    };
    // This is safe! Only runs on interaction
    const adminQuizzes = JSON.parse(localStorage.getItem("adminQuizzes") || "[]");
    adminQuizzes.push(newQuiz);
    localStorage.setItem("adminQuizzes", JSON.stringify(adminQuizzes));
    setTitle(""); setCategory(""); setQuestions([]); setCreated(true);
    setTimeout(() => setCreated(false), 2000);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin - Add Quiz</h1>
      <input
        placeholder="Quiz Title"
        className="border p-2 rounded w-full mb-2"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <select
        className="border p-2 rounded w-full mb-2"
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        {categories.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
      </select>
      <h2 className="mt-4 font-semibold">Add Questions:</h2>
      <form onSubmit={handleAddQuestion} className="mb-3">
        <input
          placeholder="Question"
          className="border p-2 rounded w-full mb-1"
          value={currQ.question}
          onChange={e => setCurrQ({ ...currQ, question: e.target.value })}
          required
        />
        {currQ.options.map((opt, idx) =>
          <input
            key={idx}
            placeholder={`Option ${idx + 1}`}
            className="border p-2 rounded w-full mb-1"
            value={opt}
            onChange={e => {
              const newOpts = [...currQ.options];
              newOpts[idx] = e.target.value;
              setCurrQ({ ...currQ, options: newOpts });
            }}
            required
          />
        )}
        <div>
          Correct answer:
          <select
            value={currQ.correct}
            onChange={e => setCurrQ({ ...currQ, correct: parseInt(e.target.value) })}
          >{currQ.options.map((_, idx) => <option key={idx} value={idx}>Option {idx + 1}</option>)}
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded mt-2">Add Question</button>
      </form>
      {questions.length > 0 && <>
        <strong className="block">Questions so far:</strong>
        <ul className="mb-3">{questions.map((q, i) =>
          <li key={i}>{q.question} <span className="text-xs text-gray-500">({q.options[q.correct]})</span></li>
        )}</ul>
      </>}
      <button
        disabled={!title || !category || questions.length === 0}
        onClick={handleSaveQuiz}
        className="bg-green-600 text-white font-bold rounded px-4 py-2"
      >
        Save Quiz
      </button>
      {created && <div className="mt-3 text-green-700">Quiz added!</div>}
    </div>
  );
}