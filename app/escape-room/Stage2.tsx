'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Stage3Props {
  onNext: () => void; // for future extensibility
}

interface Question {
  question: string;
  options: string[];
  correct: string;
  hint: string;
}

const questionPool: Question[] = [
  {
    question: 'Which of these is a JavaScript framework?',
    options: ['Laravel', 'Django', 'React', 'Flask'],
    correct: 'React',
    hint: 'Think Facebook 😉',
  },
  {
    question: 'What keyword declares a variable in JavaScript?',
    options: ['def', 'function', 'const', 'echo'],
    correct: 'const',
    hint: "Used when you don't want re-assignment",
  },
  {
    question: 'Which symbol is used for comments in JavaScript?',
    options: ['//', '<!--', '#', '/*'],
    correct: '//',
    hint: 'Double slashes win the race.',
  },
  {
    question: 'What does NaN mean?',
    options: ['Not a Name', 'No Assigned Number', 'Not a Number', 'Next Available Node'],
    correct: 'Not a Number',
    hint: "It's what JS says when math breaks 😅",
  },
  {
    question: 'Which of these is NOT a JavaScript data type?',
    options: ['Boolean', 'Undefined', 'Float', 'Symbol'],
    correct: 'Float',
    hint: 'JavaScript treats all numbers the same way.',
  },
  {
    question: 'What method is used to parse JSON in JavaScript?',
    options: ['JSON.read()', 'JSON.parse()', 'JSON.load()', 'JSON.convert()'],
    correct: 'JSON.parse()',
    hint: 'Used to convert strings into JavaScript objects.',
  },
];

const failQuotes = [
  '🛸 ERROR 404: Your logic has left the spaceship.',
  '⚠️ That wasn’t it... maybe next time don’t guess like a space monkey. 🐒',
  '💀 You lost the challenge... now you’re stuck on this ship forever.',
];

export default function Stage3({ onNext }: Stage3Props) {
  const router = useRouter();

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [selected, setSelected] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  /** Shuffle and pick 2 random questions */
  useEffect(() => {
    const shuffled = [...questionPool].sort(() => 0.5 - Math.random()).slice(0, 2);
    setShuffledQuestions(shuffled);
  }, []);

  /** Handle timeouts and failed attempts */
  const handleFail = useCallback(
    async (isTimeout: boolean) => {
      const nextAttempt = attempts + 1;
      setAttempts(nextAttempt);
      setSelected('');
      setHintUsed(false);
      setShowHint(false);
      setMessage(isTimeout ? 'timeout' : 'incorrect');
      setTimeLeft(60);

      // 🔸 Record failed attempt via API
      await fetch('/api/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: 'guest',
          stage: 3,
          attemptNo: nextAttempt,
          success: false,
        }),
      });

      if (nextAttempt >= 3) {
        setGameOver(true);
        setTimeout(() => router.push('/failure'), 2000);
      }
    },
    [attempts, router]
  );

  /** Timer countdown */
  useEffect(() => {
    if (gameOver) return;
    if (timeLeft <= 0) {
      handleFail(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameOver, handleFail]);

  /** Handle submit */
  const handleSubmit = async () => {
    if (gameOver || message === 'correct') return;
    const currentQ = shuffledQuestions[currentQIndex];

    if (selected === currentQ.correct) {
      // 🔸 Send successful result to API
      await fetch('/api/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: 'guest',
          stage: 3,
          score: 100,
          result: true,
        }),
      });

      if (currentQIndex === 1) {
        setMessage('correct');
        setTimeout(() => router.push('/victory'), 2000);
      } else {
        setCurrentQIndex(1);
        setSelected('');
        setHintUsed(false);
        setShowHint(false);
        setTimeLeft(60);
      }
    } else {
      handleFail(false);
    }
  };

  const currentQ = shuffledQuestions[currentQIndex];

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: 'url(/background_Stage3.jpg)' }}
    >
      <div className="relative bg-black/60 border-2 border-cyan-400 text-white max-w-xl w-full p-6 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-cyan-300 text-center mb-4">
          Stage 3: Final Puzzle
        </h1>

        <p className="text-center text-yellow-200 absolute top-4 right-4">
          ⏱️ {timeLeft}s
        </p>

        <h2 className="text-lg text-white text-center mb-2">
          {currentQ?.question}
        </h2>

        {!hintUsed && (
          <button
            className="text-yellow-300 text-sm bg-yellow-800 px-3 py-1 rounded shadow hover:bg-yellow-700 mb-4"
            onClick={async () => {
              setShowHint(true);
              setHintUsed(true);

              // 🔸 Log hint usage to API
              await fetch('/api/hint?stage=3');
            }}
          >
            💡 Hint
          </button>
        )}

        {showHint && (
          <p className="text-yellow-300 mb-2 text-sm">Hint: {currentQ?.hint}</p>
        )}

        {currentQ?.options.map((opt) => (
          <button
            key={opt}
            className={`w-full my-1 py-2 font-bold rounded text-white text-lg transition-all duration-200 ${
              selected === opt
                ? opt === currentQ.correct
                  ? 'bg-green-600'
                  : 'bg-red-600'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={() => setSelected(opt)}
            disabled={gameOver || message === 'correct'}
          >
            {opt}
          </button>
        ))}

        {message === 'incorrect' && (
          <p className="text-red-400 text-sm font-semibold mt-2">
            {failQuotes[attempts - 1] || 'Incorrect, try again.'}
          </p>
        )}

        {message === 'timeout' && (
          <p className="text-red-400 text-sm font-semibold mt-2">
            ⏱️ Timeout! Try again.
          </p>
        )}

        {!gameOver && (
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Submit
          </button>
        )}

        {gameOver && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl text-red-500 font-bold mb-2">💀 Game Over</h2>
            <p className="text-yellow-300">
              {failQuotes[attempts - 1] || failQuotes[2]}
            </p>
            <button
              className="mt-4 bg-white text-red-700 px-4 py-2 rounded font-bold hover:bg-red-300"
              onClick={() => window.location.reload()}
            >
              🔁 Retry Stage 3
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
