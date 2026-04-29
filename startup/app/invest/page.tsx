"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Target,
  ExternalLink,
  Mail,
  Briefcase,
  ArrowUpRight,
  TrendingUp,
  X,
  Send,
  Calendar,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Өгөгдөл ---
interface Investor {
  id: number;
  company_name: string;
  registration_number: string;
  website: string;
  representative_name: string;
  contact_email: string;
}

// --- Холбоо барих Модал Компонент ---
const ContactModal = ({ isOpen, onClose, investor }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop - Ар талын бүдгэрүүлэгч */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
        >
          {/* Header */}
          <div className="relative p-8 pb-0">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={20} className="text-slate-500" />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${investor.color} flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/10`}
              >
                {investor.initials}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {investor.name}
                </h3>
                <p className="text-sm text-slate-500">
                  Хөрөнгө оруулалтын хүсэлт
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Таны стартап нэр
              </label>
              <input
                type="text"
                placeholder="Жишээ: Tech-Ulaanbaatar"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Танилцуулга зурвас
              </label>
              <textarea
                rows={4}
                placeholder="Төслийнхөө товч утга, зорилгыг энд бичнэ үү..."
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all dark:text-white resize-none"
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl flex gap-3">
              <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed font-medium">
                Таны хүсэлтийг хүлээн авсны дараа {investor.name} багийн зүгээс
                таны бүртгэлтэй имэйл хаягаар хариу өгөх болно.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  alert("Амжилттай илгээгдлээ!");
                  onClose();
                }}
                className="flex-[4] py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 shadow-xl shadow-slate-200 dark:shadow-none"
              >
                <Send size={18} /> Хүсэлт илгээх
              </button>
              <button className="flex-1 flex items-center justify-center w-14 h-14 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-90">
                <Calendar
                  size={20}
                  className="text-slate-600 dark:text-slate-400"
                />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// --- Үндсэн Хэсэг ---
export default function InvestorsSection() {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [loading, setLoading] = useState(true);
  // --- API-аас дата татах хэсэг ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // localStorage-оос токеноо авах (Жишээ нь 'access_token' нэрээр хадгалсан бол)
        const token = localStorage.getItem("access");

        const response = await fetch("http://127.0.0.1:8000/api/investors/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          console.error("Нэвтрэх эрх хүчингүй байна.");
          // Энд хэрэглэгчийг Login хуудас руу шилжүүлэх логик нэмж болно
          return;
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setInvestors(data);
        } else if (data.results && Array.isArray(data.results)) {
          setInvestors(data.results);
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative bg-slate-50 dark:bg-[#020617] py-24 px-6 overflow-hidden min-h-screen">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -z-10" />

      {/* uusgalttai ungu */}
      {/* <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-[140px]" /> */}

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
                <button
                  onClick={() => setSelectedInvestor(investor)}
                  className="flex-[3] py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
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

      {/* Modal - Сонгогдсон хөрөнгө оруулагч байвал харуулна */}
      <ContactModal
        isOpen={!!selectedInvestor}
        onClose={() => setSelectedInvestor(null)}
        investor={selectedInvestor || {}}
      />
    </section>
  );
}
