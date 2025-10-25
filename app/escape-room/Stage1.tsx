'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Stage1Props {
  onNext: () => void;
}

export default function Stage1({ onNext }: Stage1Props) {
  const router = useRouter();
  const [code, setCode] = useState('function hello(){\n  console.log("Hi")\n}');
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [tries, setTries] = useState(0);
  const [showTimeoutMsg, setShowTimeoutMsg] = useState(false);
  const [showPopup, setShowPopup] = useState<string | null>(null);

  const correctCode = `function hello() {\n  console.log("Hi");\n}`;

  // countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFail(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // main check
  const handleSubmit = async () => {
    if (code.trim() === correctCode.trim()) {
      setShowPopup('🎉 Victory!!!');

      // ✅ Send success data to API
      await fetch('/api/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: 'guest',
          stage: 1,
          score: 100,
          result: true,
        }),
      });

      setTimeout(() => onNext(), 1500);
    } else {
      const newTries = tries + 1;
      setTries(newTries);

      // ✅ Log failed attempt
      await fetch('/api/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: 'guest',
          stage: 1,
          attemptNo: newTries,
          success: false,
        }),
      });

      if (newTries === 1) {
        setShowPopup('🔧 Debug harder. The universe depends on it.');
        setTimeout(() => setShowPopup(null), 1500);
      } else if (newTries === 2) {
        setShowPopup('⚠️ That code had more bugs than my fridge after midnight.');
        setTimeout(() => setShowPopup(null), 2000);
      } else {
        handleFail(false);
      }
    }
  };

  // fail logic (timeout or 3 wrong)
  const handleFail = async (isTimeout: boolean) => {
    setShowTimeoutMsg(false);

    // ✅ Send failure to API
    await fetch('/api/attempt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerId: 'guest',
        stage: 1,
        attemptNo: tries + 1,
        success: false,
      }),
    });

    if (isTimeout) {
      setShowPopup('⏰ Time’s up! You lost the challenge...');
    } else {
      setShowPopup('💀 You lost the challenge... now you’re stuck on this ship forever.');
    }
    setTimeout(() => router.push('/failure'), 2000);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-start pl-63 pr-4"
      style={{ backgroundImage: 'url(/background_stage1.jpg)' }}
    >
      <div className="bg-black bg-opacity-80 text-white max-w-xl w-full p-6 rounded-xl shadow-xl text-center">
        <h1 className="text-3xl font-bold text-green-400 mb-1">🧩 Escape Room Challenge</h1>
        <p className="text-cyan-300 mb-1">Complete all the coding challenges to escape!</p>
        <p className="text-yellow-400 font-semibold mb-4">Time remaining: {timeLeft}s</p>

        <h2 className="text-xl font-semibold text-purple-300 mb-2">
          Stage 1: Format the Code
        </h2>
        <p className="mb-2 text-sm text-gray-200">
          Fix the code below so it has proper indentation:
        </p>

        <textarea
          rows={6}
          className="w-full p-4 text-sm font-mono text-green-200 bg-gray-900 rounded-md border border-gray-700 mb-2"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>

        {/* Center popup */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black/80 text-white text-2xl font-semibold px-8 py-6 rounded-xl shadow-2xl text-center animate-bounce">
              {showPopup}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
