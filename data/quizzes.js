
export const categories = [
  { name: "History", icon: "/images/history.png", description: "From ancient empires to modern leaders." },
  { name: "Science", icon: "/images/science.png", description: "Biology, chemistry, and the wonders of nature." },
  { name: "Math", icon: "/images/math.png", description: "Numbers, logic, and problem-solving." },
  { name: "Programming", icon: "/images/programming.png", description: "Coding, algorithms, and computer basics." },
];

export const quizzes = [
  {
    id: "history-rome",
    category: "History",
    title: "Ancient Rome",
    questions: [
      {
        question: "Who was the first Roman Emperor?",
        options: ["Julius Caesar", "Augustus", "Nero", "Caligula"],
        correct: 1,
      },
      {
        question: "What structure is Rome famous for?",
        options: ["Pyramids", "Colosseum", "Taj Mahal", "Eiffel Tower"],
        correct: 1,
      },
    ],
  },
  {
    id: "science-1",
    category: "Science",
    title: "Basic Science",
    questions: [
      {
        question: "What is the chemical symbol for water?",
        options: ["O2", "H2O", "CO2", "H2SO4"],
        correct: 1,
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        correct: 0,
      },
    ],
  },
  {
    id: "math-1",
    category: "Math",
    title: "Simple Math",
    questions: [
      {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "2"],
        correct: 1,
      },
      {
        question: "What is the square root of 9?",
        options: ["3", "6", "4", "2"],
        correct: 0,
      },
    ],
  },
  {
    id: "prog-1",
    category: "Programming",
    title: "HTML Basics",
    questions: [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Trainer Marking Language",
          "Hyper Text Markup Language",
          "Hyper Text Markup Leveler",
          "Hyper Tag Markup Language"
        ],
        correct: 1,
      },
      {
        question: "What tag is used for the largest heading?",
        options: ["<h6>", "<head>", "<h1>", "<heading>"],
        correct: 2,
      },
    ],
  }
];