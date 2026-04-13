"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Rocket,
  ShieldCheck,
  Clock,
} from "lucide-react";

const steps = ["intro", "basic", "pitch", "fund", "founder", "done"];

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    startupName: "",
    industry: "",
    stage: "",
    pitchDeck: "",
    demoLink: "",
    fundAmount: "",
    fundPurpose: "",
    equity: "",
    founderName: "",
    email: "",
    linkedin: "",
    phone: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-slate-800 relative overflow-hidden">
        {/* Progress Bar */}
        {step > 0 && step < 5 && (
          <div className="mb-12">
            <div className="flex justify-between mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>Progress</span>
              <span>{Math.round((step / 4) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 0 && <Intro key="intro" onNext={next} />}
          {step === 1 && (
            <BasicInfo
              key="basic"
              data={form}
              onChange={handleChange}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 2 && (
            <Pitch
              key="pitch"
              data={form}
              onChange={handleChange}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 3 && (
            <Fundraising
              key="fund"
              data={form}
              onChange={handleChange}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 4 && (
            <Founder
              key="founder"
              data={form}
              onChange={handleChange}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 5 && <Success key="success" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

const Intro = ({ onNext }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="text-center"
  >
    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-3xl mb-8">
      <Rocket className="w-10 h-10 text-blue-600" />
    </div>
    <h1 className="text-4xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">
      Төслөө бүртгүүлэх
    </h1>
    <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg">
      Хөрөнгө оруулалт татах аялалаа өнөөдөр эхлүүлээрэй.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <Clock className="w-5 h-5 mb-2 mx-auto text-blue-500" />
        <span className="text-sm font-medium">5-10 минут</span>
      </div>
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <ShieldCheck className="w-5 h-5 mb-2 mx-auto text-green-500" />
        <span className="text-sm font-medium">100% Нууц</span>
      </div>
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <CheckCircle2 className="w-5 h-5 mb-2 mx-auto text-purple-500" />
        <span className="text-sm font-medium">Хурдан хариу</span>
      </div>
    </div>

    <button
      onClick={onNext}
      className="w-full bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-200"
    >
      Эхлэх
    </button>
  </motion.div>
);

const BasicInfo = ({ data, onChange, onNext, onBack }) => (
  <StepWrapper
    title="Үндсэн мэдээлэл"
    subtitle="Таны стартапын талаарх ерөнхий ойлголт"
  >
    <div className="space-y-6">
      <Input
        label="Төслийн нэр"
        name="startupName"
        placeholder="Жишээ: Meta"
        value={data.startupName}
        onChange={onChange}
      />
      <Input
        label="Үйл ажиллагааны чиглэл"
        name="industry"
        placeholder="Жишээ: Fintech, AI"
        value={data.industry}
        onChange={onChange}
      />

      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
          Хөгжүүлэлтийн шат
        </label>
        <div className="grid grid-cols-3 gap-3">
          {["Idea", "MVP", "Growth"].map((s) => (
            <label
              key={s}
              className={`
              cursor-pointer flex items-center justify-center py-3 px-4 rounded-xl border-2 transition-all
              ${data.stage === s ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 dark:border-slate-800 hover:border-slate-200"}
            `}
            >
              <input
                type="radio"
                name="stage"
                value={s}
                onChange={onChange}
                className="hidden"
              />
              <span className="font-bold text-sm">{s}</span>
            </label>
          ))}
        </div>
      </div>
      <NavButtons onNext={onNext} onBack={onBack} />
    </div>
  </StepWrapper>
);

const Pitch = ({ data, onChange, onNext, onBack }) => (
  <StepWrapper
    title="Бүтээгдэхүүн"
    subtitle="Таны хийж буй зүйл хэрхэн ажилладаг вэ?"
  >
    <div className="space-y-6">
      <Input
        label="Төслийн танилцуулга"
        type="file"
        name="pitchDeck"
        placeholder="Google Drive эсвэл Docsend link"
        value={data.pitchDeck}
        onChange={onChange}
      />
      <Input
        label="Вэбсайт / Демо холбоос"
        name="demoLink"
        placeholder="https://..."
        value={data.demoLink}
        onChange={onChange}
      />
      <NavButtons onNext={onNext} onBack={onBack} />
    </div>
  </StepWrapper>
);

const Fundraising = ({ data, onChange, onNext, onBack }) => (
  <StepWrapper
    title="Хөрөнгө таталт"
    subtitle="Санхүүжилтийн хэмжээ болон зорилго"
  >
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Хүсэж буй хөрөнгийн хэмжээ"
          name="fundAmount"
          placeholder="Жишээ: $50,000"
          value={data.fundAmount}
          onChange={onChange}
        />
        <Input
          label="Санал болгож буй хувь (%)"
          name="equity"
          placeholder="Оролцох хувь"
          value={data.equity}
          onChange={onChange}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
          Хөрөнгийн ашиглах зорилго
        </label>
        <textarea
          name="fundPurpose"
          placeholder="Энэхүү хөрөнгө оруулалтаар юуг шийдвэрлэх вэ?"
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[120px]"
          onChange={onChange}
          value={data.fundPurpose}
        />
      </div>
      <NavButtons onNext={onNext} onBack={onBack} />
    </div>
  </StepWrapper>
);

const Founder = ({ data, onChange, onNext, onBack }) => (
  <StepWrapper
    title="Үүсгэн байгуулагч"
    subtitle="Бид тантай эргэн холбогдох болно"
  >
    <div className="space-y-6">
      <Input
        label="Бүтэн нэр"
        name="founderName"
        placeholder="Нэр"
        value={data.founderName}
        onChange={onChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Цахим хаяг"
          name="email"
          placeholder="example@gmail.com"
          value={data.email}
          onChange={onChange}
        />
        <Input
          label="Холбоос"
          name="linkedin"
          placeholder="linkedin.com/in/..."
          value={data.linkedin}
          onChange={onChange}
        />
      </div>
      <Input
        label="Утасны дугаар"
        name="phone"
        placeholder="+976"
        value={data.phone}
        onChange={onChange}
      />
      <NavButtons onNext={onNext} onBack={onBack} final />
    </div>
  </StepWrapper>
);

const Success = () => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="text-center py-10"
  >
    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
      <CheckCircle2 className="w-12 h-12 text-green-600" />
    </div>
    <h2 className="text-3xl font-bold mb-4">Амжилттай илгээгдлээ!</h2>
    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-10">
      Таны мэдээллийг хүлээн авлаа. Манай баг 24–48 цагийн дотор хянаад тантай
      холбогдох болно.
    </p>
    <button
      onClick={() => window.location.reload()}
      className="text-blue-600 font-semibold hover:underline"
    >
      Дахин бүртгүүлэх
    </button>
  </motion.div>
);

/* ---------------- UI HELPERS ---------------- */

const StepWrapper = ({ title, subtitle, children }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
  >
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-slate-500 text-sm">{subtitle}</p>
    </div>
    {children}
  </motion.div>
);

const Input = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
    />
  </div>
);

const NavButtons = ({ onNext, onBack, final }) => (
  <div className="flex justify-between items-center pt-8">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-medium transition-colors"
    >
      <ChevronLeft className="w-4 h-4" /> Буцах
    </button>
    <button
      onClick={onNext}
      className="flex items-center gap-2 bg-slate-900 dark:bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
    >
      {final ? "Илгээх" : "Дараах"}
      {!final && <ChevronRight className="w-4 h-4" />}
    </button>
  </div>
);
