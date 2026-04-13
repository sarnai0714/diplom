"use client";

import React, { useState } from "react";
import {
  Search,
  Trash2,
  ExternalLink,
  Bookmark,
  FolderOpen,
} from "lucide-react";

const SavedProjectsPage = () => {
  // Жишээ өгөгдөл (Төслүүд)
  const initialProjects = [
    {
      id: 1,
      title: "Цахим дэлгүүрийн вэб",
      category: "Web Design",
      date: "2026-03-15",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
    },
    {
      id: 2,
      title: "Бүртгэлийн систем",
      category: "Fullstack",
      date: "2026-03-20",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80",
    },
    {
      id: 3,
      title: "Фитнес апп UI",
      category: "Mobile UI",
      date: "2026-03-22",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80",
    },
    {
      id: 4,
      title: "Лого дизайн багц",
      category: "Branding",
      date: "2026-03-23",
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80",
    },
  ];

  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");

  // Төсөл устгах функц
  const removeProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  // Хайлтаар шүүх
  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header хэсэг */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              <Bookmark className="text-blue-600" /> Миний хадгалсан төслүүд
            </h1>
            <p className="text-gray-500 mt-1 font-medium">
              Нийт {projects.length} төсөл хадгалагдсан байна
            </p>
          </div>

          {/* Хайлтын хэсэг */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Төслийн нэрээр хайх..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Төслүүдийн жагсаалт */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Зураг */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => removeProject(project.id)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Мэдээлэл */}
                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 mt-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    Огноо: {project.date}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t pt-4">
                    <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition">
                      <ExternalLink size={16} /> Үзэх
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                      <FolderOpen size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Хоосон үед харагдах хэсэг */
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="text-gray-400" size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-700">
              Одоогоор төсөл алга
            </h2>
            <p className="text-gray-400 mt-2">
              Таны хадгалсан төслүүд энд харагдах болно.
            </p>
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
              Төсөл хайх
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProjectsPage;
