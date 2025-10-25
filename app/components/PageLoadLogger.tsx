"use client";

import { useEffect } from "react";

export default function PageLoadLogger() {
  useEffect(() => {
    const t = performance.now();
    console.log("🌸 Page load time:", t.toFixed(2), "ms");
  }, []);

  return null; // nothing visible
}
