'use client'

import './globals.css'
import { ThemeProvider } from 'next-themes'
import Header from './components/Header'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="transition-colors duration-300 bg-white text-black dark:bg-[#0d1117] dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {mounted && (
            <>
              <Header />
              <main className="min-h-screen px-4 pt-24">{children}</main>
              <Footer />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}
