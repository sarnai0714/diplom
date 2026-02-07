"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import SaveButton from "@/component/SaveButton";

const startups = [
  {
    id: "1",
    name: "UrgaaTech",
    industry: "Fintech",
    stage: "MVP",
    pitch: "ЖДБ-д зориулсан ухаалаг санхүүгийн платформ.",
    fundGoal: 500000,
    raised: 300000,
    team: [
      { name: "Бат", role: "CEO" },
      { name: "Сараа", role: "CTO" },
    ],
    pitchDeck: "PitchDeck.pdf",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "2",
    name: "EduBulag",
    industry: "Edtech",
    stage: "Growth",
    pitch: "AI ашигласан онлайн боловсролын платформ.",
    fundGoal: 800000,
    raised: 450000,
    team: [{ name: "Тэмүүлэн", role: "Founder" }],
    pitchDeck: "EduPitch.pdf",
    video: null,
  },
];

export default function StartupDetailPage() {
  const { id } = useParams();
  const startup = startups.find((s) => s.id === id);

  if (!startup) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Стартап олдсонгүй
      </div>
    );
  }

  const percent = Math.round((startup.raised / startup.fundGoal) * 100);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 px-6 py-20">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{startup.name}</h1>
          <div className="text-slate-500 mb-4">
            {startup.industry} • {startup.stage}
          </div>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            {startup.pitch}
          </p>

          <div className="flex gap-4 mt-6">
            <SaveButton startupId={startup.id} />
            {/* <button className="px-6 py-2 rounded-xl border font-semibold">
              ❤️ Save
            </button> */}
            <button className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">
              📩 Сонирхож байна
            </button>
          </div>
        </div>

        {/* FUNDRAISING */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl">
          <h3 className="font-bold mb-4">📊 Хөрөнгө таталт</h3>

          <div className="flex justify-between text-sm mb-2">
            <span>{percent}%</span>
            <span>
              ${startup.raised.toLocaleString()} / $
              {startup.fundGoal.toLocaleString()}
            </span>
          </div>

          <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              className="h-3 bg-blue-600 rounded-full"
            />
          </div>
        </div>

        {/* TEAM */}
        <div>
          <h3 className="text-2xl font-bold mb-4">👥 Баг</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {startup.team.map((m, i) => (
              <div
                key={i}
                className="border dark:border-slate-800 rounded-xl p-4"
              >
                <div className="font-semibold">{m.name}</div>
                <div className="text-sm text-slate-500">{m.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PITCH */}
        <div>
          <h3 className="text-2xl font-bold mb-4">📂 Pitch</h3>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border">
              Pitch deck: {startup.pitchDeck}
            </div>

            {startup.video && (
              <div className="aspect-video">
                <iframe
                  src={startup.video}
                  className="w-full h-full rounded-xl"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
