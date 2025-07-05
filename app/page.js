import CategoryCard from "./components/CategoryCard";

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/categories`, { cache: "force-cache" });
  return res.json();
}

export default async function HomePage() {
  const categories = await getCategories();
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