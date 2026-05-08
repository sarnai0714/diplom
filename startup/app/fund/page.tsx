"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FundedStartups = () => {
  const [fundedStartups, setFundedStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        // localStorage-с token авах
        const token = localStorage.getItem("access");

        // token байхгүй бол
        if (!token) {
          console.error("Token олдсонгүй");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://127.0.0.1:8000/api/investments/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Unauthorized
        if (response.status === 401) {
          console.error("Нэвтрэх эрхгүй байна");
          setLoading(false);
          return;
        }

        const data = await response.json();

        // Pagination эсэхийг шалгах
        if (Array.isArray(data)) {
          setFundedStartups(data);
        } else if (Array.isArray(data.results)) {
          setFundedStartups(data.results);
        } else {
          setFundedStartups([]);
        }
      } catch (error) {
        console.error("API Error:", error);
        setFundedStartups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Толгой */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent inline-block">
            Амжилттай хөрөнгө оруулалт авсан стартапууд
          </h2>

          <p className="text-gray-400 mt-2">
            Манай платформоор дамжуулан өсөлтөө хурдасгаж буй төслүүд.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Уншиж байна...
          </div>
        ) : fundedStartups.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Хөрөнгө оруулалт олдсонгүй.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundedStartups.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-emerald-500/50 transition-all duration-300"
              >
                {/* Glow */}
                <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  {/* Logo + Stage */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 overflow-hidden bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                      {item.startup_details?.image_url ? (
                        <img
                          src={item.startup_details.image_url}
                          alt={item.startup_details.startup_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xl font-bold">
                          {item.startup_details?.startup_name?.[0] || "S"}
                        </span>
                      )}
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.startup_details?.stage}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold mb-1 group-hover:text-emerald-400 transition-colors">
                    {item.startup_details?.startup_name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {item.startup_details?.description}
                  </p>

                  {/* Amount */}
                  <div className="mb-4">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      Босгосон дүн
                    </span>

                    <p className="text-2xl font-black text-white">
                      ₮{Number(item.amount).toLocaleString()}
                    </p>
                  </div>

                  {/* Investor */}
                  <div className="pt-4 border-t border-white/5">
                    <span className="text-xs text-gray-500 block mb-2 font-medium">
                      Хөрөнгө оруулагч:
                    </span>

                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-300">
                        {item.investor_name}
                      </span>
                    </div>
                  </div>

                  {/* Industry */}
                  <div className="mt-4">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500">
                      Industry
                    </span>

                    <p className="text-sm text-emerald-400 mt-1">
                      {item.startup_details?.industry}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FundedStartups;