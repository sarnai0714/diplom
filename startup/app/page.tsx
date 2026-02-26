"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Rocket,
  Target,
  BarChart3,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "lucide-react";

const HomePage = () => {
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

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* 2. Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-24 flex flex-col items-center text-center">
        <motion.div {...fadeIn}>
          <div className="max-w-7xl mx-auto px-8 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold mb-8 uppercase tracking-widest"
            >
              <Zap size={14} className="fill-current" />
              <span>V1.0 Шинээр гарлаа</span>
            </motion.div>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 leading-[1.1]">
            Ирээдүйн Юникорныг <br /> Өнөөдөр Дэмжье
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed">
            Бид гарааны бизнес эрхлэгчдийг хөрөнгө оруулагчидтай холбож,
            инновацилаг санааг бодит ажил хэрэг болгоход тусална.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* 1. Төсөл бүртгүүлэх товч */}
            <button
              onClick={() => router.push("/apply")}
              className="w-full sm:w-auto bg-slate-900 dark:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
            >
              Төсөл бүртгүүлэх <ChevronRight size={18} />
            </button>

            {/* 2. Хөрөнгө оруулах товч */}
            <button
              onClick={() => router.push("/invest")}
              className="w-full sm:w-auto bg-white dark:bg-transparent text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition shadow-sm"
            >
              Хөрөнгө оруулах
            </button>
          </div>
        </motion.div>
      </section>

      {/* 3. Dashboard Preview (Chart.js орлох хэсэг) */}
      <section className="max-w-5xl mx-auto px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl"
        >
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-xl font-bold mb-1">Төслийн өсөлт</h3>
              <p className="text-sm text-slate-500">Сүүлийн 6 сарын байдлаар</p>
            </div>
            <BarChart3 className="text-blue-600" />
          </div>

          {/* Энгийн CSS Chart Mockup */}
          <div className="flex items-end justify-between h-48 gap-2">
            {[40, 70, 45, 90, 65, 80].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className="w-full bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-lg relative group"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  {height}%
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4. Features Section */}
      <section className="relative py-32 bg-slate-50/50 dark:bg-[#060b18] transition-colors overflow-hidden">
        {/* Background Decor - Илүү чамин харагдуулах гэрлийн эффект */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-8">
          {/* Header Part */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-6 tracking-tight dark:text-white"
            >
              Системийн <span className="text-blue-600">давуу талууд</span>
            </motion.h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Зөвхөн хөрөнгө оруулалт биш, тогтвортой өсөлтийг бий болгох дэд
              бүтэц.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Хөрөнгө оруулалт",
                desc: "Шилдэг төслүүдийг нэг дороос харж, эрсдэл багатайгаар хөрөнгө оруулах боломж.",
                icon: <Target className="w-7 h-7" />,
                href: "/project"
              },
              {
                title: "Менторшип",
                desc: "Туршлагатай бизнес эрхлэгчид болон салбарын мэргэжилтнүүдээс зааварчилгаа авах.",
                icon: <Rocket className="w-7 h-7" />,
              },
              {
                title: "Дата шинжилгээ",
                desc: "Төслийн явц болон зах зээлийн бодит өсөлтийг хянах ухаалаг хянах самбар.",
                icon: <BarChart3 className="w-7 h-7" />,
              },
            ].map((feature, i) => (
              
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Icon Container */}
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-8 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                  {feature.icon}
                </div>

                {/* Text Content */}
                <h3 className="text-2xl font-bold mb-4 tracking-tight dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
