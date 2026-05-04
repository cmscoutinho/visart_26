
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Crosshair, HelpCircle } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/language-context";

interface CalibrationScreenProps {
  onComplete: () => void;
  showPreview: (show: boolean) => void;
}

export function CalibrationScreen({ onComplete, showPreview }: CalibrationScreenProps) {
  const { t } = useLanguage();
  const clicksRequired = 5;

  const [points, setPoints] = useState([
    { id: 1, x: 50, y: 50, clicks: 0 },
    { id: 2, x: 10, y: 10, clicks: 0 },
    { id: 3, x: 90, y: 10, clicks: 0 },
    { id: 4, x: 10, y: 90, clicks: 0 },
    { id: 5, x: 90, y: 90, clicks: 0 },
    { id: 6, x: 50, y: 10, clicks: 0 },
    { id: 7, x: 50, y: 90, clicks: 0 },
    { id: 8, x: 10, y: 50, clicks: 0 },
    { id: 9, x: 90, y: 50, clicks: 0 },
  ]);

  const [showInstructions, setShowInstructions] = useState(true);

  const totalRequired = points.length * clicksRequired;
  const totalClicks = points.reduce((sum, p) => sum + p.clicks, 0);
  const progress = (totalClicks / totalRequired) * 100;

  const handleClick = (id: number) => {
    setPoints(prev => prev.map(p => {
      if (p.id === id && p.clicks < clicksRequired) {
        return { ...p, clicks: p.clicks + 1 };
      }
      return p;
    }));
  };

  useEffect(() => {
    showPreview(true);
    return () => showPreview(false);
  }, [showPreview]);

  return (
    <div className="fixed inset-0 bg-background/98 z-[100] flex flex-col items-center justify-center p-6 cursor-crosshair perspective-1000">
      {/* Dynamic Grid Overlay for visual precision */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
      />

      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-xl text-center space-y-6 z-[101]">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-primary tracking-tighter glow-text">{t.calibration.title}</h2>
          <p className="text-muted-foreground font-medium text-sm md:text-base">
            {t.calibration.subtitle}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-primary/70">
            <span>{t.calibration.progress}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 w-full bg-white/5" />
        </div>
      </div>

      {points
        .filter((p) => p.clicks < clicksRequired)
        .map((p) => {
          return (
            <button
              key={p.id}
              onClick={() => handleClick(p.id)}
              className="calibration-point group flex items-center justify-center z-[102] hover:scale-125 active:scale-95 transition-all duration-300"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <Crosshair className="w-5 h-5 text-primary-foreground group-active:rotate-90 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-50" />
              <div className="absolute -bottom-8 bg-card/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-primary shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {clicksRequired - p.clicks} {t.calibration.clicks}
              </div>
            </button>
          );
        })}

      {/* Completion Modal */}
      {totalClicks >= totalRequired && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-2xl p-6">
          <div className="bg-card w-full max-w-md p-10 rounded-[3rem] border border-primary/30 shadow-[0_0_100px_rgba(181,77,255,0.2)] text-center space-y-8 animate-in zoom-in slide-in-from-bottom-12 duration-500">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                <CheckCircle2 className="w-24 h-24 text-primary relative" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-4xl font-black tracking-tighter">{t.calibration.successTitle}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t.calibration.successDesc}
              </p>
            </div>
            <Button size="lg" onClick={onComplete} className="w-full text-xl h-20 rounded-[2rem] bg-primary hover:bg-primary/90 shadow-2xl font-bold">
              {t.calibration.beginBtn}
            </Button>
          </div>
        </div>
      )}

      {/* Intro Instruction Dialog */}
      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent className="max-w-md rounded-[2.5rem] bg-card/95 border-white/10 backdrop-blur-3xl p-10">
          <DialogHeader className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary">
                <HelpCircle className="w-8 h-8" />
              </div>
            </div>
            <div className="space-y-2 text-center">
              <DialogTitle className="text-3xl font-black tracking-tighter">{t.calibration.howToTitle}</DialogTitle>
              <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                {t.calibration.howToDesc.replace('{n}', clicksRequired.toString())}
              </DialogDescription>
            </div>
          </DialogHeader>
          <Button onClick={() => setShowInstructions(false)} className="w-full h-14 rounded-2xl mt-4 text-lg font-bold">
            {t.calibration.readyBtn}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
