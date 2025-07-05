# Micro-Quiz Platform

A modern, fast, and fully-featured quiz platform built with [Next.js](https://nextjs.org/). Take topic-focused micro-quizzes, compete for top scores, and easily manage custom quizzes—all in a responsive, beautiful UI.

---

## 🚀 Live Demo

👉 **Try it live:** [https://micro-quiz-platform-ytoa.vercel.app/]

---

## ✨ Features

- **Quiz Categories:** History, Science, Math, Programming—each with its own icon and description.
- **Dynamic Routing:**  
  - `/` — Home page with all categories (Static Generation / SSG)
  - `/quizzes/[category]` — List quizzes by category
  - `/quiz/[id]` — Interactive quiz page for each quiz
  - `/quiz/[id]/review` — Review answers after a quiz
  - `/admin` — Admin page for creating custom quizzes (browser-only, uses `localStorage`)
  - `/leaderboard` — See the top scores
- **API Routes:** Next.js API endpoints serve all quiz and category data.
- **Image Optimization:** All images use `next/image` for performance.
- **Dark Mode:** Toggleable, persistent theme.
- **Fully Responsive:** Mobile-first, styled with Tailwind CSS.
- **Local Custom Quizzes:** Create your own quizzes and store them in your browser.
- **Leaderboard:** Keeps top 10 scores (stored locally, demo-style).
- **SEO Ready:** Every page sets best-practice SEO meta tags.

---

## 🏗️ Project Structure
/app
  /components   # Reusable UI (cards, timer, toggles, progress, etc)
  /quiz/[id]    # Quiz experience pages
  /quizzes/[category] # Quizzes by category
  /admin        # Admin quiz creator
  /leaderboard  # Leaderboard
  layout.js     # Global HTML/Head and nav layout
  page.js       # Home page, SSG!
/data/quizzes.js # All categories and sample quizzes (imported for SSG)
...
/public/images  # Category and navbar icons
/pages/api      # Next.js API Routes (categories, quizzes, quiz details)


---

## 🧑‍💻 Technical Overview & Next.js Concepts

### Static Generation (SSG)
- **Home page (`/`)**:
  - Statically generated at build time (no fetch from API route).
  - Categories data is imported directly for reliability & fast builds.

### Dynamic Routing & Data Fetching
- **Category pages (`/quizzes/[category]`):**
  - Dynamic, lists quizzes using URL params.
  - Merges static quizzes + user-contributed quizzes from browser.

- **Individual quizzes (`/quiz/[id]`):**
  - Dynamic, uses browser state for quiz progress.
  - Supports both static and user-created quizzes.

### API Routes
- `/api/categories` — Returns all quiz categories.
- `/api/quizzes/[category]` — Lists quizzes by category.
- `/api/quiz/[id]` — Returns full quiz details.

### Image Optimization
- All images rendered with the `next/image` component for best performance.

### Styling
- Built with Tailwind CSS for rapid development and easy customization.

---

## 📝 Design Decisions

- **Home page SSG** imports category data directly (never fetches its own API during build).
- **APIs are served for runtime usage** (client-side or SSR).
- **Admin quiz creation** happens only in the browser, using `localStorage`—safe for demo and Vercel hosting.
- **Stateful quiz flow** is managed on the client for fast, interactive experience.
- **Easily extendable** to use real backends or databases—data models are simple and clear.
- **SEO:** 
  - Uses titles and meta descriptions for each main route.

---

## 🛠️ Testing

- Major quiz and UI components tested manually (taking quizzes, admin, leaderboard).
- Error states (quiz not found, empty leaderboard, etc.) are handled.
- (Easy to add automated tests with Jest/React Testing Library in the future.)

---

## ⚡ Challenges & Resolutions

- **Vercel SSG Build Error:**  
  - _Problem_: Initial build failed due to `fetch('/api/categories')` at build time.
  - _Solution_: Switched to direct data import for SSG, per Next.js best practices.
- **Hydration Warnings:**  
  - Ensured browser-only state/features are marked with `"use client";` and handled state properly.
- **Dynamic `localStorage` data:**  
  - Admin quizzes and leaderboard use client-only logic.

---

## 💡 Helpful Notes

- To reset custom quizzes or scores, clear browser `localStorage`.
- This is a demo app; APIs and data sources can be replaced by real services as needed!
- [Next.js Documentation](https://nextjs.org/docs) is an excellent resource.

---

