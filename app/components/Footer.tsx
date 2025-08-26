'use client';

import React from 'react';

const Footer = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-AU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <footer
      style={{
        padding: '1rem',
        marginTop: '2rem',
        textAlign: 'center',
        fontSize: '0.9rem',
        borderTop: '1px solid #ccc',
      }}
    >
      <p>
        &copy; {formattedDate} – Nguyen Phuong Doan Ho (21210670)
      </p>
    </footer>
  );
};

export default Footer;