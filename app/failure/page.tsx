// app/failure/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FailureScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/escape-room");
    }, 5000); // Redirect after 5s

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background_failed.webp')" }}
    >
      <div className="bg-black/70 p-10 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-red-400 mb-4">
          💀 You failed...
        </h1>

        {/* ✅ Escaped apostrophes */}
        <p className="text-lg mb-2">
          The ship has left Earth... and you&apos;re stuck here forever 😱
        </p>

        <p className="text-sm text-gray-300 mb-6">
          Restarting the mission in 5 seconds...
        </p>

        <button
          onClick={() => router.push("/escape-room")}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-semibold"
        >
          🔁 Try Again Now
        </button>
      </div>
    </div>
  );
}
