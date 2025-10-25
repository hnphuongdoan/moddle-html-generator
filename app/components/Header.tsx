"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Note: This component was initially developed with assistance from ChatGPT to implement the Header layout, theme toggle, and hamburger menu. Manual adjustments and styling were made to meet assignment and accessibility requirements

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  // Apply theme to <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header className="w-full border-b border-gray-300 dark:border-gray-600">
      {/* Top Header Row */}
      <div className="flex justify-between items-center px-4 py-2 bg-white dark:bg-[#0d1117] text-black dark:text-white">
        <div className="font-semibold text-sm">
          Student Number: <span className="font-bold">21210670</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/about" className="text-sm hover:underline">
            About
          </Link>

          {/* Theme toggle */}
          <div className="flex items-center gap-2">
  <span className="text-sm">{isDark ? "Light Mode" : "Dark Mode"}</span>
  <button
    onClick={() => setIsDark(!isDark)}
    className="relative w-10 h-6 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors duration-300"
  >
    <div
      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
        isDark ? "translate-x-4" : "translate-x-0"
      }`}
    />
  </button>
</div>  
        </div>
      </div>

      {/* Sub Navigation Bar */}
     <div className={`w-full border-t border-b py-2 px-4 ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
  <nav className="flex gap-6 justify-center text-sm font-medium">
    <Link href="/" className="hover:underline">Home</Link>
    <Link href="/tabs" className="hover:underline">Tabs</Link>
    <Link href="/pre-lab-questions" className="hover:underline">Pre-lab Questions</Link>
    <Link href="/escape-room" className="hover:underline">Escape Room</Link>
    <Link href="/coding-races" className="hover:underline">Coding Races</Link>
  </nav>
</div>
    </header>
  );
}
