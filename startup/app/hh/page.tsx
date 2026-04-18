"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  FileText,
  ShieldCheck,
  Globe,
  Mail,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  UploadCloud,
  Briefcase,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Next.js ашиглаж байгаа гэж үзэв

export default function OrgRegistrationPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500 font-sans">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex p-4 bg-blue-600/10 rounded-3xl text-blue-600 mb-6 border border-blue-500/20"
          >
            <Building2 size={32} />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tight mb-3 italic uppercase">
            Байгууллагын Бүртгэл
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Хөрөнгө оруулагч байгууллагын мэдээллээ баталгаажуулна уу.
          </p>
        </div>

        {/* Stepper Indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${
                  step >= item
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-slate-100 dark:bg-white/5 text-slate-400"
                }`}
              >
                {item}
              </div>
              {item < 3 && (
                <div
                  className={`w-12 h-1 rounded-full ${step > item ? "bg-blue-600" : "bg-slate-100 dark:bg-white/5"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <div className="absolute top-6 left-8 z-10">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <AnimatePresence mode="wait">
            {/* STEP 1: Basic Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                      Байгууллагын нэр
                    </label>
                    <div className="relative">
                      <Building2
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="Менежмент ХХК"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                      Регистрийн дугаар
                    </label>
                    <div className="relative">
                      <FileText
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="1234567"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Вэбсайт
                  </label>
                  <div className="relative">
                    <Globe
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="url"
                      placeholder="https://company.com"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  onClick={nextStep}
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 mt-8 flex items-center justify-center gap-2 group"
                >
                  Үргэлжлүүлэх{" "}
                  <ChevronRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </motion.div>
            )}

            {/* STEP 2: Representative Info */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Төлөөлөх албан тушаалтан
                  </label>
                  <div className="relative">
                    <Briefcase
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Овог Нэр"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Холбоо барих мэйл
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="email"
                      placeholder="contact@company.mn"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={prevStep}
                    className="flex-1 py-5 bg-slate-100 dark:bg-white/5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={18} /> Буцах
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex-[2] py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 group"
                  >
                    Баримт бичиг{" "}
                    <ChevronRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Verification Documents */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2rem] p-12 text-center space-y-4 hover:border-blue-500/50 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto text-blue-600 group-hover:scale-110 transition-transform">
                    <UploadCloud size={32} />
                  </div>
                  <div>
                    <p className="text-lg font-bold">Гэрчилгээний хуулбар</p>
                    <p className="text-sm text-slate-500">
                      PDF эсвэл JPG (Макс 5MB)
                    </p>
                  </div>
                </div>

                <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl flex items-start gap-4">
                  <ShieldCheck
                    className="text-emerald-500 shrink-0"
                    size={24}
                  />
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium leading-relaxed">
                    Таны мэдээлэл нууцлалын өндөр зэрэглэлд хадгалагдах бөгөөд
                    зөвхөн хөрөнгө оруулалтын баталгаажуулалтад ашиглагдана.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={prevStep}
                    className="flex-1 py-5 bg-slate-100 dark:bg-white/5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={18} /> Буцах
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="flex-[2] py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2"
                  >
                    Бүртгэл дуусгах <ShieldCheck size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
