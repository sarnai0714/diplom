"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-xl">
        <StepIndicator step={step} />

        {step === 0 && <Intro onNext={next} />}
        {step === 1 && (
          <BasicInfo
            data={form}
            onChange={handleChange}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 2 && (
          <Pitch
            data={form}
            onChange={handleChange}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 3 && (
          <Fundraising
            data={form}
            onChange={handleChange}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 4 && (
          <Founder
            data={form}
            onChange={handleChange}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 5 && <Success />}
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

const StepIndicator = ({ step }) => (
  <div className="flex justify-center gap-2 mb-10">
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className={`h-2 w-10 rounded-full ${
          step > i ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"
        }`}
      />
    ))}
  </div>
);

const Intro = ({ onNext }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <h1 className="text-3xl font-bold mb-4">🚀 Төслөө бүртгүүлэх</h1>
    <ul className="text-slate-600 dark:text-slate-400 mb-6 space-y-1">
      <li>⏱ 5–10 минут</li>
      <li>🔒 Мэдээлэл нууц</li>
      <li>📂 Pitch дараа upload хийж болно</li>
    </ul>
    <button
      onClick={onNext}
      className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700"
    >
      Төсөл бүртгүүлэх
    </button>
  </motion.div>
);

const BasicInfo = ({ data, onChange, onNext, onBack }) => (
  <StepWrapper title="Алхам 1 / 4 — Үндсэн мэдээлэл">
    <Input
      name="startupName"
      placeholder="Стартап нэр"
      value={data.startupName}
      onChange={onChange}
    />
    <Input
      name="industry"
      placeholder="Салбар (Fintech гэх мэт)"
      value={data.industry}
      onChange={onChange}
    />
    <div className="flex gap-4">
      {["Idea", "MVP", "Growth"].map((s) => (
        <label key={s} className="flex items-center gap-2">
          <input type="radio" name="stage" value={s} onChange={onChange} />
          {s}
        </label>
      ))}
    </div>
    <NavButtons onNext={onNext} onBack={onBack} />
  </StepWrapper>
);

const Pitch = ({ data, onChange, onNext, onBack }) => (
  <StepWrapper title="Алхам 2 / 4 — Pitch & Product">
    <Input
      name="pitchDeck"
      placeholder="Pitch deck link"
      value={data.pitchDeck}
      onChange={onChange}
    />
    <Input
      name="demoLink"
      placeholder="Demo / Website link"
      value={data.demoLink}
      onChange={onChange}
    />
    <NavButtons onNext={onNext} onBack={onBack} />
  </StepWrapper>
);

const Fundraising = ({ data, onChange, onNext, onBack }) => (
  <StepWrapper title="Алхам 3 / 4 — Хөрөнгө таталт">
    <Input
      name="fundAmount"
      placeholder="Татах дүн ($ / ₮)"
      value={data.fundAmount}
      onChange={onChange}
    />
    <textarea
      name="fundPurpose"
      placeholder="Ашиглах зорилго"
      className="w-full p-3 rounded-xl border dark:bg-slate-800"
      onChange={onChange}
      value={data.fundPurpose}
    />
    <Input
      name="equity"
      placeholder="Equity (%) optional"
      value={data.equity}
      onChange={onChange}
    />
    <NavButtons onNext={onNext} onBack={onBack} />
  </StepWrapper>
);

const Founder = ({ data, onChange, onNext, onBack }) => (
  <StepWrapper title="Алхам 4 / 4 — Үүсгэн байгуулагч">
    <Input
      name="founderName"
      placeholder="Нэр"
      value={data.founderName}
      onChange={onChange}
    />
    <Input
      name="email"
      placeholder="Email"
      value={data.email}
      onChange={onChange}
    />
    <Input
      name="linkedin"
      placeholder="LinkedIn"
      value={data.linkedin}
      onChange={onChange}
    />
    <Input
      name="phone"
      placeholder="Утас (optional)"
      value={data.phone}
      onChange={onChange}
    />
    <NavButtons onNext={onNext} onBack={onBack} final />
  </StepWrapper>
);

const Success = () => (
  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
    <h2 className="text-3xl font-bold mb-4">🎉 Амжилттай!</h2>
    <p className="text-slate-600 dark:text-slate-400">
      Таны төслийг 24–48 цагийн дотор шалгана.
    </p>
  </motion.div>
);

/* ---------------- UI HELPERS ---------------- */

const StepWrapper = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-5"
  >
    <h2 className="text-xl font-bold">{title}</h2>
    {children}
  </motion.div>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full p-3 rounded-xl border dark:bg-slate-800"
  />
);

const NavButtons = ({ onNext, onBack, final }) => (
  <div className="flex justify-between pt-4">
    <button onClick={onBack} className="text-slate-500">
      ← Буцах
    </button>
    <button
      onClick={onNext}
      className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold"
    >
      {final ? "Илгээх" : "Дараах →"}
    </button>
  </div>
);
