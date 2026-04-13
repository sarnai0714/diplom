"use client";

import { useParams } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  FileText,
  Users,
  PieChart,
  Download,
  Mail,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import SaveButton from "@/component/SaveButton";
import { image } from "framer-motion/client";

const startups = [
  {
    id: "1",
    name: "UrgaaTech",
    industry: "Fintech",
    stage: "MVP",
    pitch: "ЖДБ-д зориулсан ухаалаг санхүүгийн платформ болон автоматжуулалт.",
    fundGoal: 500000,
    raised: 300000,
    team: [
      { name: "Бат", role: "CEO", img: "https://i.pravatar.cc/150?u=bat" },
      { name: "Сараа", role: "CTO", img: "https://i.pravatar.cc/150?u=saraa" },
    ],
    pitchDeck: "PitchDeck.pdf",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description:
      "UrgaaTech нь жижиг дунд бизнес эрхлэгчдийн санхүүгийн удирдлагыг хөнгөвчлөх зорилготой. Бид хиймэл оюун ухаанд суурилсан тайлан шинжилгээний системийг санал болгож байна.",
  },
  // ... бусад дата
];

export default function StartupDetailPage() {
  const { id } = useParams();
  const startup = startups.find((s) => s.id === id);

  if (!startup) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#020617]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-2xl font-bold text-slate-400 mb-6">
            Стартап олдсонгүй
          </p>
          <Link
            href="/invest"
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all"
          >
            Жагсаалт руу буцах
          </Link>
        </motion.div>
      </div>
    );
  }

  const percent = Math.round((startup.raised / startup.fundGoal) * 100);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] text-slate-900 dark:text-slate-100 selection:bg-blue-500/30">
      {/* 1. Навигаци - Floating Style */}
      <nav className="fixed top-25 inset-x-0 z-50 max-w-5xl mx-auto px-4">
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-2xl shadow-black/5 rounded-3xl px-6 py-3 flex items-center justify-between">
          <Link
            href="/invest"
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </Link>
          <div className="flex items-center gap-4">
            <SaveButton startupId={startup.id} />
            <Link
              href={`/invest/${startup.id}/checkout`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 block text-center"
            >
              Хөрөнгө оруулах
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex gap-2 mb-6">
              <span className="px-4 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-widest uppercase rounded-full border border-blue-500/20">
                {startup.industry}
              </span>
              <span className="px-4 py-1.5 bg-slate-500/10 text-slate-500 text-[10px] font-black tracking-widest uppercase rounded-full border border-slate-500/20">
                {startup.stage} Stage
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-500">
              {startup.name}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {startup.pitch}
            </p>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 pb-32">
        {/* LEFT: Content */}
        <div className="lg:col-span-8 space-y-16">
          {/* Video with Premium Frame */}
          {startup.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2.5rem] blur opacity-15 group-hover:opacity-25 transition duration-1000"></div>
              <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-black border border-white/10 shadow-2xl">
                <img
                  src={startup.image}
                  alt={startup.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}

          {/* About Section */}
          <section className="relative">
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
              <span className="w-8 h-1 bg-blue-600 rounded-full" /> Төслийн
              тухай
            </h3>
            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-loose">
              {startup.description}
            </div>
          </section>

          {/* Team Grid */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold">Багийн гишүүд</h3>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800 ml-8" />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {startup.team.map((m, i) => (
                <motion.div
                  whileHover={{ y: -5 }}
                  key={i}
                  className="flex items-center gap-5 p-6 rounded-[2rem] bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 transition-all"
                >
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-50 dark:ring-slate-800"
                  />
                  <div>
                    <h4 className="text-lg font-bold">{m.name}</h4>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide uppercase">
                      {m.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT: Stats Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl">
                  <TrendingUp className="text-blue-600" size={24} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Funding Goal
                  </p>
                  <p className="text-xl font-bold">
                    ${startup.fundGoal.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-end">
                  <span className="text-5xl font-black text-slate-900 dark:text-white">
                    {percent}%
                  </span>
                  <span className="text-sm font-bold text-blue-600 mb-1">
                    Цугларсан
                  </span>
                </div>
                <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full relative shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[shimmer_2s_linear_infinite]" />
                  </motion.div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                    Raised
                  </p>
                  <p className="text-lg font-bold">
                    ${startup.raised.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                    Backers
                  </p>
                  <p className="text-lg font-bold">124</p>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-black/10">
                  <Mail size={20} /> Холбоо барих
                </button>

                <div className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
                      <FileText size={18} className="text-slate-500" />
                    </div>
                    <span className="text-sm font-bold">Pitch Deck.pdf</span>
                  </div>
                  <Download
                    size={18}
                    className="text-slate-400 group-hover:text-blue-600 transition-colors"
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 justify-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <ShieldCheck size={12} className="text-emerald-500" />{" "}
                Баталгаажсан төсөл
              </div>
            </div>

            {/* Minor Info Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-6 text-white">
              <p className="text-sm font-medium opacity-80 mb-1">
                Хөрөнгө оруулалт хийхээс өмнө бүх эрсдэл болон нөхцөлтэй
                танилцана уу.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
