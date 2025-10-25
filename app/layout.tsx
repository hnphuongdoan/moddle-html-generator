import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import type { Metadata } from "next";
import PageLoadLogger from "./components/PageLoadLogger";

export const metadata: Metadata = {
  title: "Moodle HTML Generator",
  description: "Student: Nguyen Phuong Doan Ho - 21210670",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-zinc-900 dark:text-white">
        <Header />
        <PageLoadLogger /> {/* ✅ Client-side timing */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
