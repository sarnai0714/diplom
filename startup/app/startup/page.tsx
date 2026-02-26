"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpRight, TrendingUp, Wallet } from "lucide-react";

const startups = [
  {
    id: 1,
    name: "UrgaaTech",
    industry: "Fintech",
    stage: "MVP",
    pitch: "ЖДБ-д зориулсан ухаалаг санхүүгийн платформ болон автоматжуулалт.",
    fundGoal: 500000,
    raised: 300000,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "EduBulag",
    industry: "Edtech",
    stage: "Growth",
    pitch: "Онлайн боловсролыг AI-тай хослуулсан, хувь хүний сурах явцыг дэмжих шийдэл.",
    fundGoal: 800000,
    raised: 450000,
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "GreenEnergy",
    industry: "Energy",
    stage: "Seed",
    pitch: "Гэр хорооллын айл өрхүүдэд зориулсан ухаалаг дулаан хадгалах систем.",
    fundGoal: 250000,
    raised: 180000,
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
  },
];

export default function InvestPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] transition-colors duration-500 font-sans selection:bg-blue-500/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        
        {/* --- 1. Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">
              <TrendingUp size={14} />
              <span>Хөрөнгө оруулалт</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight dark:text-white">
              Ирээдүйн <span className="text-blue-600">Юникорныг</span> <br /> эндээс ол.
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Таны хөрөнгө</p>
              <p className="text-xl font-black">$12,450.00</p>
            </div>
          </motion.div>
        </div>

        {/* --- 2. Filters & Search --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-4 mb-12"
        >
          <div className="relative flex-grow group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Төслийн нэр, салбараар хайх..."
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 ring-blue-500/20 outline-none transition-all dark:text-white"
            />
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0">
            <select className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold outline-none focus:border-blue-500 transition-colors cursor-pointer">
              <option>Салбар</option>
              <option>Fintech</option>
              <option>Edtech</option>
              <option>Energy</option>
            </select>
            <select className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold outline-none focus:border-blue-500 transition-colors cursor-pointer">
              <option>Үе шат</option>
              <option>Idea</option>
              <option>MVP</option>
              <option>Growth</option>
            </select>
            <button className="px-6 py-4 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white flex items-center gap-2 hover:bg-slate-800 transition-all">
              <Filter size={18} />
              <span>Шүүлтүүр</span>
            </button>
          </div>
        </motion.div>

        {/* --- 3. Startup Cards Grid --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {startups.map((s, idx) => {
            const percent = Math.round((s.raised / s.fundGoal) * 100);

            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
              >
                {/* Image Placeholder */}
                <div className="relative h-48 overflow-hidden">
                   <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-4 left-4 flex gap-2">
                     <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-tighter">
                        {s.industry}
                     </span>
                     <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-tighter">
                        {s.stage}
                     </span>
                   </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold tracking-tight dark:text-white">{s.name}</h3>
                    <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 h-10 line-clamp-2">
                    {s.pitch}
                  </p>

                  {/* Progress Section */}
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Цугларсан</p>
                        <p className="text-lg font-black text-blue-600">${s.raised.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Зорилт</p>
                        <p className="text-sm font-bold dark:text-slate-300">${s.fundGoal.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="relative w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percent}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                    <p className="text-right text-[10px] font-black text-blue-600 uppercase">{percent}% Дууссан</p>
                  </div>

                  <Link
                    href={`/startup/${s.id}`}
                    className="flex items-center justify-center w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-4 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                  >
                    Дэлгэрэнгүй үзэх
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- 4. Empty State / Load More --- */}
        <div className="mt-20 text-center">
          <p className="text-slate-500 font-medium mb-6">Илүү олон төсөл үзэх үү?</p>
          <button className="px-8 py-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 text-slate-500 font-bold hover:border-blue-500 hover:text-blue-500 transition-all">
            Цааш үзэх
          </button>
        </div>

      </div>
    </div>
  );
}