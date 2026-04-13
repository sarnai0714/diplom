"use client";

import { motion } from "framer-motion";
import {
  User,
  Settings,
  Briefcase,
  Wallet,
  Bell,
  LogOut,
  ExternalLink,
  Plus,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  LayoutGrid,
} from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: "Тэмүүлэн Бат-Эрдэнэ",
    role: "Founder & Developer",
    email: "temuulen@startup.mn",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Temuulen",
    balance: "₮24,500,000",
    projects: [
      {
        id: 1,
        name: "EduTech Platform",
        status: "Active",
        growth: "+12%",
        color: "bg-blue-500",
      },
      {
        id: 2,
        name: "Green Energy AI",
        status: "Pending",
        growth: "0%",
        color: "bg-emerald-500",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#0b0f1a] text-slate-900 dark:text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SIDEBAR NAVIGATION */}
        <aside className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-8 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white dark:border-slate-800 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none"
          >
            <div className="flex flex-col items-center mb-10">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <img
                  src={user.avatar}
                  className="relative w-28 h-28 rounded-3xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-2xl"
                  alt="avatar"
                />
              </div>
              <h3 className="text-xl font-extrabold tracking-tight text-center">
                {user.name}
              </h3>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                {user.role}
              </p>
            </div>

            <nav className="space-y-1">
              <SidebarItem
                icon={<LayoutGrid size={20} />}
                label="Хяналтын самбар"
                active
              />
              <SidebarItem icon={<Briefcase size={20} />} label="Төслүүд" />
              <SidebarItem icon={<Wallet size={20} />} label="Түрүүвч" />
              <SidebarItem icon={<Bell size={20} />} label="Мэдэгдэл" />
              <div className="my-6 border-t border-slate-200 dark:border-slate-800" />
              <SidebarItem icon={<Settings size={20} />} label="Тохиргоо" />
              <SidebarItem icon={<LogOut size={20} />} label="Гарах" danger />
            </nav>
          </motion.div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="lg:col-span-9 space-y-8">
          {/* HEADER SECTION */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight">
                Сайн байна уу, Тэмүүлэн? 👋
              </h1>
              <p className="text-slate-500 font-medium mt-1">
                Өнөөдрийн байдлаар таны төслүүд хэвийн үргэлжилж байна.
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-lg active:scale-95">
              <Plus size={20} /> Шинэ төсөл эхлүүлэх
            </button>
          </header>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              label="Нийт баланс"
              value={user.balance}
              trend="+2.4%"
              trendUp={true}
            />
            <StatCard
              label="Идэвхтэй төсөл"
              value="08"
              trend="Шинэ 2"
              trendUp={true}
            />
            <StatCard
              label="Амжилтын хувь"
              value="94.2%"
              trend="-0.5%"
              trendUp={false}
            />
          </div>

          {/* PROJECTS LIST */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                Миний төслүүд
              </h2>
              <button className="text-sm font-bold text-blue-600 hover:underline">
                Бүгдийг үзэх
              </button>
            </div>

            <div className="grid gap-4">
              {user.projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -4 }}
                  className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-14 h-14 rounded-2xl ${project.color} flex items-center justify-center text-white shadow-lg shadow-blue-500/20`}
                    >
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{project.name}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span
                          className={`flex items-center gap-1 text-xs font-bold ${project.status === "Active" ? "text-emerald-500" : "text-amber-500"}`}
                        >
                          {project.status === "Active" ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <Clock size={14} />
                          )}
                          {project.status}
                        </span>
                        <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                          {project.growth} Өсөлт
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border-t md:border-t-0 pt-4 md:pt-0">
                    <div className="flex -space-x-2 mr-4">
                      {[1, 2, 3].map((i) => (
                        <img
                          key={i}
                          src={`https://i.pravatar.cc/150?u=${i + project.id}`}
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900"
                        />
                      ))}
                    </div>
                    <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-blue-600 hover:text-white transition-all group">
                      <ArrowUpRight
                        size={20}
                        className="group-hover:rotate-45 transition-transform"
                      />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* PROMO CARD */}
          <section className="relative overflow-hidden p-10 rounded-[3rem] bg-slate-900 text-white">
            <div className="relative z-10 md:w-2/3">
              <span className="bg-blue-500 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4 inline-block">
                Academy
              </span>
              <h3 className="text-3xl font-black mb-4 leading-tight">
                Бизнесээ дараагийн <br /> түвшинд гаргаарай
              </h3>
              <p className="text-slate-400 mb-8 font-medium">
                Стартап академийн экспертүүдээс хөрөнгө оруулалт босгох нууцыг
                суралц.
              </p>
              <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:shadow-2xl hover:shadow-white/20 transition-all active:scale-95">
                Сургалтанд бүртгүүлэх
              </button>
            </div>
            <div className="absolute top-1/2 -right-20 -translate-y-1/2 opacity-10 pointer-events-none">
              <Rocket size={400} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false, danger = false }) {
  return (
    <button
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all group ${
        active
          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-300 dark:shadow-none"
          : danger
            ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
            : "text-slate-500 hover:bg-white dark:hover:bg-slate-800"
      }`}
    >
      <span
        className={
          active ? "scale-110" : "group-hover:scale-110 transition-transform"
        }
      >
        {icon}
      </span>
      {label}
    </button>
  );
}

function StatCard({ label, value, trend, trendUp }) {
  return (
    <div className="p-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm relative overflow-hidden group hover:border-blue-500/50 transition-colors">
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-[50px] group-hover:bg-blue-500/10 transition-colors"></div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
        {label}
      </p>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-black">{value}</h3>
        <span
          className={`text-[10px] font-black px-2 py-1 rounded-lg ${trendUp ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}
        >
          {trend}
        </span>
      </div>
    </div>
  );
}

const Rocket = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.79-1.81.79-1.81l-1.98-1.98s-1.1.08-1.81.79Z" />
    <path d="M15 8s-4 0-7 3l-4-4 4-4c3-3 7-3 7-3s0 4-3 7Z" />
    <path d="M14.5 14.5 19 19" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);
