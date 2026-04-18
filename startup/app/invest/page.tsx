"use client";

import {
  Building2,
  Target,
  ExternalLink,
  Mail,
  Briefcase,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const investors = [
  {
    id: 1,
    name: "Mongolia Ventures",
    type: "Venture Capital",
    focus: "Fintech, AI & SaaS",
    portfolio: "12+",
    range: "$50k - $500k",
    initials: "MV",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    name: "Steppe Angels",
    type: "Angel Group",
    focus: "Early-stage & EduTech",
    portfolio: "25+",
    range: "$10k - $100k",
    initials: "SA",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "Altai Capital",
    type: "Private Equity",
    focus: "Growth & Infra",
    portfolio: "8",
    range: "$1M+",
    initials: "AC",
    color: "from-emerald-500 to-teal-400",
  },
];

export default function InvestorsSection() {
  return (
    <section className="relative bg-slate-50 dark:bg-[#020617] py-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4"
            >
              <TrendingUp size={14} /> Хөрөнгө оруулагч
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              Итгэмжлэгдсэн{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                хөрөнгө оруулагчид
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Монголын стартап экосистемийг дэмжигч шилдэг венчур капитал болон
              анжел хөрөнгө оруулагчидтай шууд холбогд.
            </p>
          </div>
          <button className="group flex items-center gap-2 text-slate-900 dark:text-white font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-all">
            Бүх хөрөнгө оруулагчид
            <div className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              <ArrowUpRight size={18} />
            </div>
          </button>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {investors.map((investor, index) => (
            <motion.div
              key={investor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 transition-all duration-500 shadow-xl shadow-slate-200/50 dark:shadow-none"
            >
              {/* Profile Header */}
              <div className="flex items-center justify-between mb-8">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${investor.color} rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-500/20`}
                >
                  {investor.initials}
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                    Төрөл
                  </span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold">
                    {investor.type}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                  {investor.name}
                </h3>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-semibold">
                  <Target size={14} className="text-blue-500" />
                  {investor.focus}
                </div>

                {/* Micro-stats */}
                <div className="grid grid-cols-2 gap-6 mt-8 p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-black mb-1 tracking-tighter">
                      Багц
                    </p>
                    <p className="text-base font-bold text-slate-900 dark:text-white italic">
                      {investor.portfolio}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-black mb-1 tracking-tighter">
                      Хэмжээ
                    </p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">
                      {investor.range}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-[3] py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                  <Mail size={18} /> Холбоо барих
                </button>
                <button className="flex-1 h-14 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:scale-[1.02]">
                  <Briefcase
                    size={20}
                    className="text-slate-600 dark:text-slate-400"
                  />
                </button>
              </div>

              {/* Top accent line */}
              <div
                className={`absolute top-0 left-12 right-12 h-1 bg-gradient-to-r ${investor.color} rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 p-10 rounded-[3rem] bg-slate-900 dark:bg-white dark:text-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="text-center md:text-left relative z-10">
            <h3 className="text-3xl font-black mb-2 tracking-tight">
              Та хөрөнгө оруулагч уу?
            </h3>
            <p className="text-slate-400 dark:text-slate-600 text-lg">
              Шилдэг стартапуудтай танилцахын тулд манай сүлжээнд нэгдээрэй.
            </p>
          </div>

          <button className="px-10 py-5 bg-blue-600 text-white dark:bg-slate-900 dark:text-white rounded-2xl font-black hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/25 whitespace-nowrap relative z-10 scale-110 md:scale-100">
            Хамтрагч болох
          </button>
        </motion.div>
      </div>
    </section>
  );
}
