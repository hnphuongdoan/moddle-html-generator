'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VictoryScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/escape-room'); 
    }, 10000); 

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white text-center px-4"
      style={{
        backgroundImage: 'url("/background_Victory.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-black bg-opacity-70 p-10 rounded-xl shadow-2xl max-w-2xl w-full">
        <h1 className="text-5xl font-bold text-green-400 mb-4">🎉 Yayyyyy!</h1>
        <p className="text-xl text-white mb-4">
          Congrats! You've won. You may now escape — the ship is heading back to Earth 😂
        </p>
        <p className="text-yellow-300">Redirecting to main screen in 10 seconds...</p>

        <button
          onClick={() => router.push('/escape-room')}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          🔁 Play Again
        </button>
      </div>
    </div>
  );
}
