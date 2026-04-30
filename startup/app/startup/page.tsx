"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Wallet,
  Heart,
  Loader2,
} from "lucide-react";

// Typescript ашиглаж байгаа тул датаны бүтцийг тодорхойлно
interface Startup {
  id: number;
  startup_name: string;
  industry: string;
  stage: string;
  pitch_deck_link: string;
  description: string;
  equity_offered: string;
  fund_amount: number;
  raised_amount: number;
  image_url: string;
}

interface PageContent {
  id: number;
  page_name: string;
  content_key: string;
  text_content: string;
  updated_at: string;
}

export default function InvestPage() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");

  // --- API-аас дата татах хэсэг ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/projects/");
        const data = await response.json();

        // Дата ирэх формат нь Array мөн эсэхийг шалгаад онооно
        if (Array.isArray(data)) {
          setStartups(data);
        } else if (data.results && Array.isArray(data.results)) {
          // Хэрэв Django Pagination ашиглаж байгаа бол дата 'results' дотор ирдэг
          setStartups(data.results);
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/contents/");
        const data = await response.json();

        // Дата ирэх формат нь Array мөн эсэхийг шалгаад онооно
        if (Array.isArray(data)) {
          setContents(data);
        } else if (data.results && Array.isArray(data.results)) {
          // Хэрэв Django Pagination ашиглаж байгаа бол дата 'results' дотор ирдэг
          setContents(data.results);
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const industries = useMemo(() => {
    return Array.from(new Set(startups.map((s) => s.industry)));
  }, [startups]);
  //-------------------------------
  // WISHLIST POST
  // -------------------------------
  const toggleWishlist = async (startupId: number) => {
    try {
      const token = localStorage.getItem("access");
      const response = await fetch("http://127.0.0.1:8000/api/wishlist/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          startup: startupId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setWishlist((prev) => [...prev, startupId]);
      } else {
        console.log(data);
        alert(data.non_field_errors?.[0] || "Алдаа гарлаа");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Тухайн хуудсанд хамааралтай контентыг шүүж авах туслах функц
  const getContent = (key: string, defaultValue: string) => {
    const item = contents.find((c) => c.content_key === key);
    return item ? item.text_content : defaultValue;
  };

  // Хайлт хийх логик (Client-side filtering)
  const filteredStartups = startups.filter((s) => {
    const matchesSearch =
      s.startup_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.industry.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry =
      selectedIndustry === "" || s.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500 font-sans selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[5%] left-[5%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* --- 1. Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-blue-500/10 text-slate-900 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 border border-slate-200 dark:border-blue-500/20">
              <TrendingUp size={14} className="text-blue-600" />
              <span>Хөрөнгө оруулалт</span>
            </div>

            <h1
              className="text-5xl md:text-6xl font-black tracking-tight dark:text-white whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html:
                  getContent("startup_title", "Ирээдүйг <br /> эндээс ол.") ||
                  "",
              }}
            />
          </motion.div>

          {/* --- 2. Filters & Search --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-4 mb-16 p-2 bg-slate-100/50 dark:bg-slate-900/30 rounded-[2.5rem] backdrop-blur-md"
          >
            <div className="flex gap-2">
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-8 py-5 rounded-[2rem] bg-white dark:bg-slate-900 ..."
              >
                <option value="">Бүх салбар</option>

                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              {/* <button className="px-8 py-5 rounded-[2rem] bg-slate-900 dark:bg-blue-600 text-white flex items-center gap-3 hover:shadow-xl hover:shadow-blue-500/20 transition-all active:scale-95">
                <Filter size={18} />
                <span className="font-bold">Шүүлтүүр</span>
              </button> */}
            </div>
          </motion.div>
        </div>

        {/* --- 3. Startup Cards Grid (Data Rendering) --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="animate-spin text-blue-600" size={48} />
            <p className="text-slate-500 font-bold">
              Төслүүдийг ачаалж байна...
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredStartups.map((s, idx) => {
              const percent = Math.min(
                Math.round((s.raised_amount / s.fund_amount) * 100),
                100,
              );
              const isWishlisted = wishlist.includes(s.id);

              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800/50 overflow-hidden shadow-xl shadow-slate-200/60 dark:shadow-none hover:border-blue-500/30 transition-all duration-500"
                >
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={
                        s.image_url ||
                        "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                      }
                      alt={s.startup_name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-[10px] font-black text-white uppercase tracking-widest">
                        {s.industry}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleWishlist(s.id)}
                      className={`absolute top-6 right-6 p-3 rounded-2xl backdrop-blur-xl transition-all duration-300 ${
                        isWishlisted
                          ? "bg-red-500 text-white"
                          : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                      }`}
                    >
                      <Heart
                        size={20}
                        fill={isWishlisted ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  {/* Content Section */}
                  <div className="p-10">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-3xl font-black tracking-tight dark:text-white mb-2">
                          {s.startup_name}
                        </h3>
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-tighter">
                          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                          {s.stage} Round
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:rotate-45">
                        <ArrowUpRight size={22} />
                      </div>
                    </div>

                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-10 line-clamp-2 font-medium">
                      {s.description}
                    </p>

                    <Link
                      href={`/startup/${s.id}`}
                      className="group/btn relative flex items-center justify-center w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-[1.5rem] font-black text-sm overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-500/20 active:scale-95"
                    >
                      <span className="relative z-10">ТӨСӨЛТЭЙ ТАНИЛЦАХ</span>
                      <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredStartups.length === 0 && (
          <div className="text-center py-20 text-slate-500 font-bold">
            Ийм нэртэй төсөл олдсонгүй.
          </div>
        )}

        {/* --- 4. Footer Banner --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 p-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-[3rem]"
        >
          <div className="bg-white dark:bg-slate-950 rounded-[2.9rem] p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black dark:text-white mb-2">
                Өөрийн стартапыг бүртгүүлэх үү?
              </h2>
              <p className="text-slate-500 font-medium">
                Дэлхийн хэмжээний хөрөнгө оруулагчидтай холбогдох боломж.
              </p>
            </div>
            <button className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black hover:scale-105 transition-transform">
              АНКЕТ ИЛГЭЭХ
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
