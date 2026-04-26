"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Editor } from "@tinymce/tinymce-react";
import {
  CheckCircle2,
  XCircle,
  Search,
  Save,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Eye,
} from "lucide-react";

// --- Тогтмол текстүүдийн тохиргоо (Slug систем) ---
const STATIC_CONTENTS = [
  { key: "hero_badge", label: "Нүүр: Эхлэл", page: "Home" },
  { key: "hero_title", label: "Нүүр: Гол гарчиг", page: "Home" },
  { key: "hero_description", label: "Нүүр: Тайлбар текст", page: "Home" },
  { key: "startup_hero_title", label: "Стартап: Гол гарчиг", page: "Startup" },
  { key: "invest_hero_title", label: "Хөрөнгө оруулалт: Гол гарчиг", page: "Invest" },
  { key: "invest_hero_description", label: "Хөрөнгө оруулалт: Тайлбар текст", page: "Invest" },

];

// --- Mock Data (Туршилтын өгөгдөл) ---
const initialProjects = [
  {
    id: 1,
    name: "EcoWaste Solution",
    founder: "Бат-Эрдэнэ",
    industry: "Green Tech",
    status: "pending",
    date: "2026-04-20",
  },
  {
    id: 2,
    name: "Surgalt App",
    founder: "Дулмаа",
    industry: "EdTech",
    status: "approved",
    date: "2026-04-18",
  },
  {
    id: 3,
    name: "FinSave Gamified",
    founder: "Болд",
    industry: "Fintech",
    status: "pending",
    date: "2026-04-21",
  },
  {
    id: 4,
    name: "Smart Farm Pro",
    founder: "Сараа",
    industry: "AgriTech",
    status: "rejected",
    date: "2026-04-15",
  },
];

export default function AdminDashboard() {
  // --- States ---
  const [projects, setProjects] = useState(initialProjects);
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  // --- Content Editor States ---
  const [selectedKey, setSelectedKey] = useState(STATIC_CONTENTS[0].key);

  // --- Handlers ---
  const handleStatus = (id: number, newStatus: string) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, status: newStatus } : p)),
    );
  };

  const handleSavePost = async () => {
    if (!title || !content) {
      alert("Гарчиг болон агуулга оруулна уу!");
      return;
    }
    setSaving(true);
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Нийтлэгдсэн:", { title, content });
    setSaving(false);
    setTitle("");
    setContent("");
    alert("Контент амжилттай нийтлэгдлээ!");
  };

  const filteredProjects = projects.filter(
    (p) => filter === "all" || p.status === filter,
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex font-sans">
      {/* --- Sidebar --- */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 hidden md:block">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/30" />
          <span className="font-black text-xl tracking-tight dark:text-white uppercase italic">
            Admin
          </span>
        </div>
        <nav className="space-y-2">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Хянах самбар"
            active
          />
          <NavItem icon={<FileText size={20} />} label="Төслүүд" />
          <NavItem icon={<Users size={20} />} label="Хэрэглэгчид" />
          <NavItem icon={<Settings size={20} />} label="Тохиргоо" />
        </nav>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* 1. Content Editor Section */}
        <section className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-500/10 rounded-lg">
                <FileText className="text-blue-600" size={24} />
              </div>
              Вебсайтын текст удирдах
            </h2>

            <select
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              className="w-full md:w-auto bg-slate-100 dark:bg-slate-800 dark:text-white px-5 py-3 rounded-2xl outline-none border border-transparent focus:border-blue-500 font-bold transition-all cursor-pointer"
            >
              {STATIC_CONTENTS.map((item) => (
                <option key={item.key} value={item.key}>
                  [{item.page}] - {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <Editor
                apiKey="4r9p8gumquq3zotnmlmpfvc0qgfok603v3jxp03uq97y1jg8"
                id="main-content-editor"
                value={content}
                onEditorChange={(newVal) => setContent(newVal)}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: ["lists", "link", "image", "table", "code"],
                  toolbar:
                    "undo redo | bold italic underline | bullist numlist | link image | code",
                  skin: "oxide-dark",
                  content_css: "dark",
                  placeholder: "Энд агуулгаа бичнэ үү...",
                }}
              />
            </div>

            <button
              onClick={handleSavePost}
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50 active:scale-95"
            >
              <Save size={18} />
              {saving ? "Хадгалж байна..." : "Нийтлэх"}
            </button>
          </div>
        </section>

        {/* 2. Header & Search */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-bold dark:text-white">
              Төсөл баталгаажуулалт
            </h1>
            <p className="text-slate-500 text-sm">
              Ирсэн төслүүдийг хянах болон шийдвэрлэх
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Төсөл хайх..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white shadow-sm"
            />
          </div>
        </header>

        {/* 3. Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <StatCard label="Нийт хүсэлт" value={projects.length} color="blue" />
          <StatCard
            label="Хүлээгдэж буй"
            value={projects.filter((p) => p.status === "pending").length}
            color="amber"
          />
          <StatCard
            label="Зөвшөөрсөн"
            value={projects.filter((p) => p.status === "approved").length}
            color="emerald"
          />
        </div>

        {/* 4. Filter Tabs */}
        <div className="flex gap-2 mb-6 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 w-fit shadow-sm">
          {["all", "pending", "approved", "rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                filter === tab
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              {tab === "all"
                ? "Бүгд"
                : tab === "pending"
                  ? "Хүлээгдэж буй"
                  : tab === "approved"
                    ? "Зөвшөөрсөн"
                    : "Татгалзсан"}
            </button>
          ))}
        </div>

        {/* 5. Projects Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                    Төслийн нэр
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                    Үүсгэн байгуулагч
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                    Салбар
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                    Төлөв
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">
                    Үйлдэл
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => (
                    <motion.tr
                      key={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-bold dark:text-white block">
                          {project.name}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase">
                          {project.date}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">
                        {project.founder}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[11px] font-semibold dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          {project.industry}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={project.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-1">
                          {project.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatus(project.id, "approved")
                                }
                                className="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-all"
                                title="Зөвшөөрөх"
                              >
                                <CheckCircle2 size={20} />
                              </button>
                              <button
                                onClick={() =>
                                  handleStatus(project.id, "rejected")
                                }
                                className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all"
                                title="Татгалзах"
                              >
                                <XCircle size={20} />
                              </button>
                            </>
                          )}
                          <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                            <Eye size={20} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Helper Components ---

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
        active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
          : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:scale-[1.02]">
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
        {label}
      </p>
      <p className="text-3xl font-black dark:text-white">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    pending: {
      label: "Хүлээгдэж буй",
      style:
        "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-500",
    },
    approved: {
      label: "Зөвшөөрсөн",
      style:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-500",
    },
    rejected: {
      label: "Татгалзсан",
      style: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-500",
    },
  };

  const current = config[status as keyof typeof config] || config.pending;

  return (
    <span
      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${current.style}`}
    >
      {current.label}
    </span>
  );
}
