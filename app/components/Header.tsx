"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: "/", label: "Homepage" },
    { href: "/tabs", label: "Tabs" },
    { href: "/pre-lab-questions", label: "Pre-lab Questions" },
    { href: "/escape-room", label: "Escape Room" },
    { href: "/coding-races", label: "Coding Races" },
    { href: "/about", label: "About" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <header className="bg-white dark:bg-black shadow-md">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-lg font-semibold text-black dark:text-white">
          Student Number: 21210670
        </div>

        <div className="flex items-center gap-4">
          {/* Toggle switch with label */}
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className="ml-2 text-sm text-black dark:text-white">
              {theme === "dark" ? "Dark Mode" : "Light Mode"}
            </span>
          </div>

          {/* Hamburger Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black dark:text-white focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Nav bar below student number */}
      <nav
        className={`transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-screen" : "max-h-0"
        } bg-gray-100 dark:bg-gray-900`}
      >
        <ul className="flex flex-col md:flex-row md:justify-center md:items-center p-4 gap-2 text-sm font-medium">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block px-3 py-2 rounded ${
                  pathname === href
                    ? "bg-blue-500 text-white"
                    : "text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
