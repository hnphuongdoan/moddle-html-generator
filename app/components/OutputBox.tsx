"use client";

import { useState } from "react";

export default function OutputBox({ html }: { html: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="mt-8">
      <h2 className="font-semibold text-lg mb-2">Output</h2>
      <textarea
        readOnly
        className="w-full h-64 p-2 border text-xs bg-white dark:bg-gray-800 dark:text-white"
        value={html}
      />
      <button
        onClick={handleCopy}
        className="mt-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        {copied ? "Copied!" : "Copy to Clipboard"}
      </button>
    </div>
  );
}