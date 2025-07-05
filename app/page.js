import { categories } from "../data/quizzes";
import CategoryCard from "./components/CategoryCard";

export default function HomePage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Quiz Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(cat =>
          <CategoryCard key={cat.name} {...cat} />
        )}
      </div>
    </>
  );
}