'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VictoryPage() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gradient-to-br from-purple-700 via-indigo-800 to-black text-white text-center relative">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        🎉 Congrats! You&apos;ve won.
      </h1>

      <p className="text-lg sm:text-xl mb-6 max-w-xl">
        You may now escape — the ship is heading back to Earth 😂
      </p>

      <button
        onClick={() => router.push('/')}
        className="mt-6 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition"
      >
        Return Home
      </button>

      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none animate-pulse-slow">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500/10 via-purple-500/20 to-transparent blur-xl" />
        </div>
      )}
    </main>
  );
}
