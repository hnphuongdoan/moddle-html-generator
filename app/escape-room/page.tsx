'use client';

import { useState } from 'react';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage3 from './Stage3';

export default function EscapeRoomPage() {
  const [stage, setStage] = useState<'intro' | 'stage1' | 'stage2' | 'stage3'>('intro');

  const renderStage = () => {
    switch (stage) {
      case 'stage1':
        return <Stage1 onNext={() => setStage('stage2')} />;
      case 'stage2':
        return <Stage2 onNext={() => setStage('stage3')} />;
      case 'stage3':
        return <Stage3 onNext={() => alert("🎉 You've completed all stages!")} />;
      case 'intro':
      default:
        return (
          <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
            style={{ backgroundImage: 'url(/background_intro.jpg)' }}
          >
            <div className="bg-black/80 p-8 rounded-xl text-center max-w-xl shadow-xl">
              <h1 className="text-3xl font-bold text-white mb-4">
                🔒 Welcome to the Escape Room Challenge
              </h1>
              <p className="text-white mb-6">
                You are now entering a high-security control room. To escape, you must complete all coding challenges and stages.
              </p>
              <button
                onClick={() => setStage('stage1')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition"
              >
                Start the Challenge
              </button>
            </div>
          </div>
        );
    }
  };

  return <>{renderStage()}</>;
}
