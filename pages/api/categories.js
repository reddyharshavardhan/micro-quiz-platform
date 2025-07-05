import { categories } from '../../data/quizzes';

export default function handler(req, res) {
res.status(200).json(categories);
}