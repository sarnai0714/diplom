"use client";

import { Heart } from "lucide-react";
import { useSavedStartup } from "@/hooks/useSaved";

export default function SaveStartupButton({ startupId }) {
  const { saved, toggleSave, loading } = useSavedStartup({
    startupId,
    initialSaved: false,
  });

  return (
    <button
      onClick={toggleSave}
      disabled={loading}
      className={`flex items-center gap-2 px-5 py-2 rounded-xl border font-semibold transition
        ${
          saved
            ? "bg-red-50 border-red-400 text-red-600"
            : "hover:bg-slate-100 dark:hover:bg-slate-800"
        }
      `}
    >
      <Heart
        size={18}
        className={saved ? "fill-red-500 text-red-500" : ""}
      />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
