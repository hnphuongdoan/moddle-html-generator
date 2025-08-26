'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <main className="p-8 font-sans text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">About This Website</h1>

      <p className="mb-2">
        <strong>Name:</strong> Nguyen Phuong Doan Ho
      </p>
      <p className="mb-6">
        <strong>Student Number:</strong> 21210670
      </p>

      <h2 className="text-xl font-semibold mb-2 mt-8">Walkthrough Video</h2>
      <p className="mb-4">This is a quick demonstration of how to use the HTML code generator.</p>

      <div className="w-full max-w-xl aspect-video mb-12">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Walkthrough Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded shadow-lg"
        ></iframe>
      </div>
    </main>
  );
}