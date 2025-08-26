'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 px-6 py-20 sm:px-10">
      <h1 className="text-4xl font-bold text-center">🎓 Moodle HTML Generator</h1>
      <p className="text-center text-lg max-w-xl">
        Welcome! This app helps you generate HTML5 + JS + CSS content snippets for Moodle LMS quickly.
        Start by visiting the About page or use the menu in the header.
      </p>

      <div className="flex gap-4">
        <Link
          href="/about"
          className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base font-medium transition-all"
        >
          Learn About the App →
        </Link>
      </div>
    </main>
  );
}