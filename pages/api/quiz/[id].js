import { quizzes } from '../../../data/quizzes';

export default function handler(req, res) {
  const { id } = req.query;
  const quiz = quizzes.find(q => q.id === id);
  if (quiz) res.status(200).json(quiz);
  else res.status(404).json({ error: 'Quiz not found' });
}