'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Stage2Props {
  onNext: () => void;
}

const challenges = [
  {
    code: 'let x=5; if(x>2){console.log("hi")}',
    answer: 'let x = 5;\nif (x > 2) {\n  console.log("hi");\n}'
  },
  {
    code: 'const a=10;if(a===10){alert("Done")}',
    answer: 'const a = 10;\nif (a === 10) {\n  alert("Done");\n}'
  },
  {
    code: 'var num=3;while(num<5){num++;}',
    answer: 'var num = 3;\nwhile (num < 5) {\n  num++;\n}'
  }
];

export default function Stage2({ onNext }: Stage2Props) {
  const router = useRouter();
  const randomIndex = Math.floor(Math.random() * challenges.length);
  const [challenge] = useState(challenges[randomIndex]);

  const [code, setCode] = useState(challenge.code);
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [tries, setTries] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hintUsed, setHintUsed] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFail(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = () => {
    if (code.replace(/\s+/g, '') === challenge.answer.replace(/\s+/g, '')) {
      setMessage('correct');
    } else {
      handleFail(false);
    }
  };

  const handleFail = (isTimeout: boolean) => {
    const newTries = tries + 1;
    setTries(newTries);
    setTimeLeft(60); // 🔁 Reset the timer after fail attempt

    if (newTries === 1) {
       setFeedback(isTimeout ? '⏱️ Timeout! Try again.' : '☠️ Who taught you JavaScript... a potato?');
    } else if (newTries === 2) {
       setFeedback(isTimeout ? '⏰ Again too slow! Keep going!' : '🧠 Hint: Brains help.');
    } else {
      router.push('/failure');
    }
  }; 

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: 'url(/background_stage2.png)' }}
    >
      <div className="relative bg-blue-900/70 text-white max-w-xl w-full p-6 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-2">
          Escape Room Challenge
        </h1>
        <p className="text-center text-cyan-300 mb-2">
          Time remaining: {timeLeft}s
        </p>

        <h2 className="text-xl font-semibold text-purple-400 mb-2">
          Stage 2: Debug the Logic
        </h2>
        <p className="mb-2">
          Fix the logic and formatting in this code so it looks clean and works properly:
        </p>

        {!hintUsed && (
          <button
            className="absolute top-4 right-4 text-yellow-300 text-sm bg-yellow-800 px-3 py-1 rounded shadow hover:bg-yellow-700 transition"
            onClick={() => setHintUsed(true)}
          >
            💡 Hint
          </button>
        )}

        {hintUsed && (
          <p className="text-yellow-300 text-sm font-medium mb-2">
            Hint: Pay attention to spacing, semicolons, and block syntax.
          </p>
        )}

        <textarea
          rows={6}
          className="w-full p-4 text-sm font-mono text-green-200 bg-gray-900 rounded-md border border-gray-700 mb-2"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>

        {feedback && (
          <p className="text-red-400 text-sm font-semibold mb-3">{feedback}</p>
        )}

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>

        {message === 'correct' && (
          <div className="mt-4 p-4 bg-gray-800 border border-green-500 rounded-lg text-center">
            <p className="text-green-300 font-semibold mb-2">✅ Great job! Logic fixed!</p>
            <button
              onClick={onNext}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              🚪 Proceed through the Door to Stage 3
            </button>
          </div>
        )}
      </div>
    </div>
  );
}