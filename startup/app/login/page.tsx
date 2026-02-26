"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();

  const redirect = params.get("redirect") || "/";
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔐 Fake auth (дараа backend)
    await new Promise((res) => setTimeout(res, 800));

    login({
      id: "user_123",
      email: form.email,
      role: "investor",
    });

    router.push(redirect);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-2 text-center">Нэвтрэх</h1>
        <p className="text-sm text-slate-500 text-center mb-6">
          Хөрөнгө оруулагчийн бүртгэл
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="И-мэйл"
            required
            onChange={handleChange}
            className="w-full border dark:border-slate-700 rounded-xl px-4 py-3 bg-transparent"
          />

          <input
            name="password"
            type="password"
            placeholder="Нууц үг"
            required
            onChange={handleChange}
            className="w-full border dark:border-slate-700 rounded-xl px-4 py-3 bg-transparent"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
          </button>
        </form>

        {/* Extra */}
        <div className="mt-6 text-center text-sm text-slate-500">
          Бүртгэл байхгүй юу?{" "}
          <Link
            href="/register"
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Бүртгүүлэх
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
