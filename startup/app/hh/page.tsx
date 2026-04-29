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
  Loader2,
  CheckCircle2,
  Home,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrgRegistrationPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // Амжилтын төлөв
  const router = useRouter();

  // --- API-д зориулсан State-үүд ---
  const [formData, setFormData] = useState({
    company_name: "",
    registration_number: "",
    website: "",
    representative_name: "",
    contact_email: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  // --- Илгээх функц ---
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("company_name", formData.company_name);
    data.append("registration_number", formData.registration_number);
    data.append("website", formData.website);
    data.append("representative_name", formData.representative_name);
    data.append("contact_email", formData.contact_email);
    if (file) {
      data.append("certificate_file", file);
    }

    try {
      const token = localStorage.getItem("access");

      const response = await fetch("http://127.0.0.1:8000/api/investors/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true); // Амжилттай болсон үед төлөвийг өөрчилнө
      } else {
        setError(
          result.detail || "Бүртгэл хийхэд алдаа гарлаа. Мэдээллээ шалгана уу.",
        );
      }
    } catch (err: any) {
      setError("Сүлжээний алдаа гарлаа. Та дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500 font-sans">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20">
        {!isSuccess && (
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
        )}

        {/* Stepper - Зөвхөн бүртгэлийн явцад харагдана */}
        {!isSuccess && (
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
        )}

        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">
          {error && !isSuccess && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            {isSuccess ? (
              // --- АМЖИЛТТАЙ ИЛГЭЭГДСЭН ҮЕД ХАРАГДАХ ---
              <motion.div
                key="success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10"
              >
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Амжилттай илгээгдлээ!
                </h2>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-[1.02] transition-all w-full text-center"
                >
                  <Home className="w-5 h-5" /> Нүүр хуудас
                </Link>
              </motion.div>
            ) : (
              // --- БҮРТГЭЛИЙН АЛХМУУД ---
              <>
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
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleInputChange}
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
                            name="registration_number"
                            value={formData.registration_number}
                            onChange={handleInputChange}
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
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
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
                          name="representative_name"
                          value={formData.representative_name}
                          onChange={handleInputChange}
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
                          name="contact_email"
                          value={formData.contact_email}
                          onChange={handleInputChange}
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

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <label className="block cursor-pointer group">
                      <div
                        className={`border-2 border-dashed ${file ? "border-emerald-500 bg-emerald-500/5" : "border-slate-200 dark:border-white/10"} rounded-[2rem] p-12 text-center space-y-4 hover:border-blue-500/50 transition-colors`}
                      >
                        <div
                          className={`w-16 h-16 ${file ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-600/10 text-blue-600"} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}
                        >
                          <UploadCloud size={32} />
                        </div>
                        <div>
                          <p className="text-lg font-bold">
                            {file ? file.name : "Гэрчилгээний хуулбар"}
                          </p>
                          <p className="text-sm text-slate-500">
                            PDF эсвэл JPG (Макс 5MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                      </div>
                    </label>
                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl flex items-start gap-4">
                      <ShieldCheck
                        className="text-emerald-500 shrink-0"
                        size={24}
                      />
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium leading-relaxed">
                        Таны мэдээлэл нууцлалын өндөр зэрэглэлд хадгалагдах
                        бөгөөд зөвхөн хөрөнгө оруулалтын баталгаажуулалтад
                        ашиглагдана.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={prevStep}
                        disabled={loading}
                        className="flex-1 py-5 bg-slate-100 dark:bg-white/5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                      >
                        <ArrowLeft size={18} /> Буцах
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={loading || !file}
                        className="flex-[2] py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <>
                            Илгээх <ShieldCheck size={20} />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
