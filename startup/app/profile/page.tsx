"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Briefcase,
  Wallet,
  Bell,
  LogOut,
  Plus,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  LayoutGrid,
  X,
} from "lucide-react";

export default function ProfilePage() {
  const [showRequests, setShowRequests] = useState(false);

  const user = {
    name: "Mongolia Ventures",
    role: "Investor Account",
    email: "investor@startup.mn",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=Investor",
    balance: "₮240,500,000",
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
        growth: "+4%",
        color: "bg-emerald-500",
      },
    ],
  };

  const incomingRequests = [
    {
      id: 1,
      startup: "Tech-Ulaanbaatar",
      founder: "Бат-Эрдэнэ",
      amount: "$50,000",
      stage: "Pre-seed",
      date: "2 цагийн өмнө",
    },
    {
      id: 2,
      startup: "EduNomad",
      founder: "Номин",
      amount: "$120,000",
      stage: "Seed",
      date: "Өчигдөр",
    },
    {
      id: 3,
      startup: "GreenPay",
      founder: "Тэмка",
      amount: "$300,000",
      stage: "Series A",
      date: "3 хоногийн өмнө",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#0b0f1a] text-slate-900 dark:text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-8 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl"
          >
            <div className="flex flex-col items-center mb-10">
              <img
                src={user.avatar}
                className="w-28 h-28 rounded-3xl ring-4 ring-white dark:ring-slate-800 shadow-xl"
                alt="avatar"
              />
              <h3 className="text-xl font-black mt-4">{user.name}</h3>
              <p className="text-sm text-blue-600 font-bold mt-1">
                {user.role}
              </p>
            </div>

            <nav className="space-y-2">
              <SidebarItem
                icon={<LayoutGrid size={20} />}
                label="Хяналтын самбар"
                active
              />
              <SidebarItem icon={<Briefcase size={20} />} label="Портфолио" />
              <SidebarItem icon={<Wallet size={20} />} label="Санхүү" />

              <button
                onClick={() => setShowRequests(true)}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all text-slate-500 hover:bg-white dark:hover:bg-slate-800 group"
              >
                <div className="relative">
                  <Bell size={20} />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-black">
                    {incomingRequests.length}
                  </span>
                </div>
                Мэдэгдэл
              </button>

              <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

              <SidebarItem icon={<Settings size={20} />} label="Тохиргоо" />
              <SidebarItem icon={<LogOut size={20} />} label="Гарах" danger />
            </nav>
          </motion.div>
        </aside>

        {/* Main */}
        <main className="lg:col-span-9 space-y-8">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black">
                Сайн байна уу, хөрөнгө оруулагч 👋
              </h1>
              <p className="text-slate-500 mt-1">
                Танд шинэ startup хүсэлтүүд ирсэн байна.
              </p>
            </div>

            <button className="flex items-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:scale-105 transition-all">
              <Plus size={20} />
              Шинэ Deal
            </button>
          </header>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard
              label="Нийт хөрөнгө"
              value={user.balance}
              trend="+5.4%"
              trendUp
            />
            <StatCard label="Идэвхтэй төсөл" value="12" trend="+2" trendUp />
            <StatCard label="Шинэ хүсэлт" value="03" trend="Today" trendUp />
          </div>

          {/* Portfolio */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black">Миний төслүүд</h2>
              <button className="text-blue-600 font-bold text-sm">
                Бүгдийг үзэх
              </button>
            </div>

            <div className="grid gap-4">
              {user.projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -4 }}
                  className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl ${project.color} flex items-center justify-center text-white`}
                    >
                      <Briefcase size={24} />
                    </div>

                    <div>
                      <h4 className="font-black">{project.name}</h4>
                      <div className="flex gap-3 mt-1">
                        <span className="text-emerald-500 text-sm font-bold flex items-center gap-1">
                          <CheckCircle2 size={14} />
                          {project.status}
                        </span>

                        <span className="text-slate-400 text-sm font-bold">
                          {project.growth}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white transition-all">
                    <ArrowUpRight size={20} />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Requests Modal */}
      {showRequests && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black">Ирсэн хүсэлтүүд</h3>
                <p className="text-sm text-slate-500">
                  Startup funding хүсэлтүүд
                </p>
              </div>

              <button
                onClick={() => setShowRequests(false)}
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {incomingRequests.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-black">{item.startup}</h4>
                      <p className="text-sm text-slate-500">
                        Founder: {item.founder}
                      </p>

                      <div className="flex gap-2 flex-wrap mt-3">
                        <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-700 text-xs font-bold">
                          {item.amount}
                        </span>

                        <span className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold">
                          {item.stage}
                        </span>

                        <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-700 text-xs font-bold">
                          {item.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <button className="px-4 py-3 rounded-2xl bg-slate-900 text-white text-sm font-bold">
                        Дэлгэрэнгүй
                      </button>

                      <button className="px-4 py-3 rounded-2xl bg-emerald-600 text-white text-sm font-bold">
                        Approve
                      </button>

                      <button className="px-4 py-3 rounded-2xl bg-red-500 text-white text-sm font-bold">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function SidebarItem({ icon, label, active = false, danger = false }) {
  return (
    <button
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${
        active
          ? "bg-slate-900 text-white"
          : danger
            ? "text-red-500 hover:bg-red-50"
            : "text-slate-500 hover:bg-white dark:hover:bg-slate-800"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({ label, value, trend, trendUp }) {
  return (
    <div className="p-7 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
      <p className="text-xs font-bold text-slate-400 uppercase mb-3">{label}</p>

      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-black">{value}</h3>

        <span
          className={`text-[10px] px-2 py-1 rounded-lg font-black ${
            trendUp
              ? "bg-emerald-100 text-emerald-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {trend}
        </span>
      </div>
    </div>
  );
}
