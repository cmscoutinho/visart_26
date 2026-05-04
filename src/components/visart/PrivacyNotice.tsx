
"use client";

import { ShieldAlert } from "lucide-react";

export function PrivacyNotice() {
  return (
    <div className="max-w-2xl mx-auto p-4 rounded-lg bg-muted/30 border border-border/50 flex gap-4 text-xs text-muted-foreground mt-8">
      <ShieldAlert className="w-5 h-5 shrink-0 text-primary" />
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Privacy & Ethical Notice</p>
        <p>
          VISART uses the webcam only in the browser to estimate gaze direction. 
          No camera images or gaze data are stored or sent to servers. 
          Gaze tracking is approximate and may vary depending on lighting, camera quality, face position, browser, and device. 
          The experience is purely artistic and experimental.
        </p>
      </div>
    </div>
  );
}
