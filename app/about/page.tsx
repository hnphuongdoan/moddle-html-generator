'use client';

export default function AboutPage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>About This Website</h1>
      <p><strong>Name:</strong> Lê Minh</p>
      <p><strong>Student Number:</strong> YOUR_STUDENT_NUMBER_HERE</p>

      <h2 style={{ marginTop: '2rem' }}>Walkthrough Video</h2>
      <p>This is a quick demonstration of how to use this HTML code generator website.</p>

      <div style={{ marginTop: '1rem' }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Walkthrough Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </main>
  );
}
