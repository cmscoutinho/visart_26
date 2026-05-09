
"use client";

import { ShieldAlert } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function PrivacyNotice() {
  const { t } = useLanguage();
  return (
    <div className="max-w-2xl mx-auto p-4 rounded-xl bg-primary/5 border border-primary/20 flex gap-4 text-xs text-muted-foreground mt-8 text-left shadow-[0_0_20px_rgba(0,244,134,0.05)]">
      <ShieldAlert className="w-5 h-5 shrink-0 text-primary" />
      <div className="space-y-2">
        <p className="font-bold text-primary uppercase tracking-wider">{t.privacy.title}</p>
        <p className="leading-relaxed">
          {t.privacy.content}
        </p>
      </div>
    </div>
  );
}
