"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const startups = [
  {
    id: 1,
    name: "UrgaaTech",
    industry: "Fintech",
    stage: "MVP",
    pitch: "ЖДБ-д зориулсан ухаалаг санхүүгийн платформ.",
    fundGoal: 500000,
    raised: 300000,
  },
  {
    id: 2,
    name: "EduBulag",
    industry: "Edtech",
    stage: "Growth",
    pitch: "Онлайн боловсролыг AI-тай хослуулсан шийдэл.",
    fundGoal: 800000,
    raised: 450000,
  },
];

export default function InvestPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3">
            💼 Хөрөнгө оруулалтын боломжууд
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Ирээдүйтэй стартапуудтай танилц
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <select className="px-4 py-2 rounded-xl border dark:bg-slate-900">
            <option>Салбар</option>
            <option>Fintech</option>
            <option>Edtech</option>
          </select>

          <select className="px-4 py-2 rounded-xl border dark:bg-slate-900">
            <option>Stage</option>
            <option>Idea</option>
            <option>MVP</option>
            <option>Growth</option>
          </select>

          <select className="px-4 py-2 rounded-xl border dark:bg-slate-900">
            <option>Fund size</option>
            <option>&lt; $100k</option>
            <option>$100k - $500k</option>
            <option>$500k+</option>
          </select>
        </div>

        {/* Startup cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {startups.map((s) => {
            const percent = Math.round((s.raised / s.fundGoal) * 100);

            return (
              <motion.div
                key={s.id}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold mb-1">{s.name}</h3>
                <div className="text-sm text-slate-500 mb-3">
                  {s.industry} • {s.stage}
                </div>

                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {s.pitch}
                </p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{percent}%</span>
                    <span>
                      ${s.raised.toLocaleString()} / $
                      {s.fundGoal.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <Link
                  href={`/startup/${s.id}`}
                  className="block text-center bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700"
                >
                  Дэлгэрэнгүй
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
