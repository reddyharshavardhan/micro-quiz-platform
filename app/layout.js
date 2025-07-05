import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";
import "./styles/globals.css";

export const metadata = {
  title: "Micro-Quiz Platform",
  description: "Take fun, educational micro-quizzes on any topic.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen">
        <header className="flex justify-between items-center p-4 bg-white dark:bg-black mb-6">
          <Link href="/" className="font-bold text-2xl">Micro-Quiz</Link>
          <nav className="flex gap-4 items-center">
            <Link href="/leaderboard" className="flex items-center gap-1 hover:underline">
              <Image src="/images/Leaderboard.png" alt="Leaderboard" width={22} height={22} style={{ borderRadius: '3px' }} />
              Leaderboard
            </Link>
            <Link href="/admin" className="flex items-center gap-1 hover:underline">
              <Image src="/images/Admin.png" alt="Admin" width={22} height={22} style={{ borderRadius: '50%' }} />
              Admin
            </Link>
            <ThemeToggle />
          </nav>
        </header>
        <main className="container mx-auto max-w-3xl px-3 min-h-[80vh]">
          {children}
        </main>
        <footer className="p-4 text-center text-xs text-gray-500">
          © 2025 Micro-Quiz Platform Designed By Nagireddy.Harshavardhan Reddy. All rights reserved.
        </footer>
      </body>
    </html>
  );
}