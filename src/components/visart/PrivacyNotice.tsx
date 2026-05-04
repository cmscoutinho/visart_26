
"use client";

import { ShieldAlert } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function PrivacyNotice() {
  const { t } = useLanguage();
  return (
    <div className="max-w-2xl mx-auto p-4 rounded-lg bg-muted/30 border border-border/50 flex gap-4 text-xs text-muted-foreground mt-8 text-left">
      <ShieldAlert className="w-5 h-5 shrink-0 text-primary" />
      <div className="space-y-2">
        <p className="font-semibold text-foreground">{t.privacy.title}</p>
        <p>
          {t.privacy.content}
        </p>
      </div>
    </div>
  );
}
