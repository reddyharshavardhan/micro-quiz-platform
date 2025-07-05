import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ name, icon, description }) {
  return (
    <Link href={`/quizzes/${name.toLowerCase()}`} className="no-underline">
      <div className="bg-white dark:bg-gray-900 shadow p-4 rounded flex flex-col items-center cursor-pointer transition hover:bg-gray-100 dark:hover:bg-gray-800">
        <Image src={icon} alt={name} width={64} height={64} />
        <div className="font-bold text-lg mt-3">{name}</div>
        <div className="text-gray-600 text-center">{description}</div>
      </div>
    </Link>
  );
}