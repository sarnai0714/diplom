"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown, LogOut, Sun, Moon, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  // Dark mode тохиргоо
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="flex justify-between items-center px-8 py-5 bg-white dark:bg-slate-950 border-b dark:border-slate-800 sticky top-0 z-50">
      {/* Лого */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 tracking-tight"
        >
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Rocket size={18} className="text-white" />
            </div>
            <span>
              UNICORN<span className="text-blue-600">.</span>
            </span>
          </div>
        </Link>
      </div>

      {/* Гол навигац */}
      <nav className="hidden md:flex space-x-8 font-medium text-slate-600 dark:text-slate-400">
        <Link href="/" className="hover:text-blue-600 transition">
          Нүүр
        </Link>

        <Link href="/startup" className="hover:text-blue-600 transition">
          Төслүүд
        </Link>

        <Link href="/invest" className="hover:text-blue-600 transition">
          Хөрөнгө оруулагч
        </Link>

        <Link href="/about" className="hover:text-blue-600 transition">
          Бидний тухай
        </Link>
      </nav>

      {/* Хэрэглэгч болон Dark Mode */}
      <div className="flex items-center gap-4">
        {/* Dark Mode товч */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:ring-2 ring-blue-400 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {user ? (
          <div className="relative">
            {/* Хэрэглэгчийн меню */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {user.email.split("@")[0]}
              <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Favourite
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Нэвтрэх
            </Link>

            <Link
              href="/register"
              className="px-6 py-2 border border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-slate-800 transition"
            >
              Бүртгүүлэх
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
