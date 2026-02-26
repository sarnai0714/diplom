"use client";

import { Building2, Target, ExternalLink, Mail, Briefcase } from "lucide-react";

const investors = [
  {
    id: 1,
    name: "Mongolia Ventures",
    type: "Venture Capital",
    focus: "Fintech, AI & SaaS",
    portfolio: "12+",
    range: "$50k - $500k",
    initials: "MV",
  },
  {
    id: 2,
    name: "Steppe Angels",
    type: "Angel Investor Group",
    focus: "Early-stage & EduTech",
    portfolio: "25+",
    range: "$10k - $100k",
    initials: "SA",
  },
  {
    id: 3,
    name: "Altai Capital",
    type: "Private Equity",
    focus: "Growth & Infrastructure",
    portfolio: "8",
    range: "$1M+",
    initials: "AC",
  },
];

export default function InvestorsSection() {
  return (
    <section className="bg-slate-50/50 dark:bg-slate-950/50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Итгэмжлэгдсэн хөрөнгө оруулагчид
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Монголын стартап экосистемийг дэмжигч шилдэг венчур капитал болон
              анжел хөрөнгө оруулагчидтай холбогд.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition">
            Бүх хөрөнгө оруулагчид <ExternalLink size={16} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {investors.map((investor) => (
            <div
              key={investor.id}
              className="group relative bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              {/* Profile Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-xl group-hover:scale-110 transition-transform">
                  {investor.initials}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md">
                  {investor.type.split(" ")[0]}
                </span>
              </div>

              {/* Info */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  {investor.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium mb-4">
                  <Target size={14} />
                  <span>{investor.focus}</span>
                </div>

                {/* Micro-stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">
                      Багц
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {investor.portfolio} компани
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">
                      Хэмжээ
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {investor.range}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-colors flex items-center justify-center gap-2">
                  <Mail size={16} /> Холбоо барих
                </button>
                <button className="w-12 h-12 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <Briefcase
                    size={18}
                    className="text-slate-600 dark:text-slate-400"
                  />
                </button>
              </div>

              {/* Decoration line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-blue-500 group-hover:w-1/2 transition-all duration-500 rounded-t-full" />
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-1">Та хөрөнгө оруулагч уу?</h3>
            <p className="text-blue-100">
              Шилдэг стартапуудтай танилцахын тулд манай сүлжээнд нэгдээрэй.
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors whitespace-nowrap">
            Хамтрагч болох
          </button>
        </div>
      </div>
    </section>
  );
}
