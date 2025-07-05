import { quizzes } from '../../../data/quizzes';

export default function handler(req, res) {
  const { category } = req.query;
  res.status(200).json(
    quizzes.filter(q => q.category.toLowerCase() === category.toLowerCase())
  );
}