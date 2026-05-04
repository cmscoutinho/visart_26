"use client";

import { Button } from "@/components/ui/button";
import { Eye, ShieldCheck, Sparkles, MousePointer2 } from "lucide-react";
import { Footer } from "./Footer";
import { PrivacyNotice } from "./PrivacyNotice";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between relative overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] pointer-events-none opacity-60" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[140px] pointer-events-none opacity-60" />
      
      <div className="flex-1 w-full max-w-6xl flex flex-col items-center justify-center z-10 px-6 py-20 text-center gap-20">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
          <div className="space-y-4">
            <p className="text-primary font-bold tracking-[0.5em] uppercase text-xs mb-2">Technological Art Experience</p>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter glow-text text-primary leading-none">
              VISART
            </h1>
          </div>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-light text-foreground/90 italic leading-tight">
              "An artistic experience where your gaze draws over the image."
            </h2>
            <p className="text-muted-foreground/80 text-sm md:text-base leading-relaxed">
              VISART transforms the viewer’s gaze into visual traces, creating an interactive artwork in real time. 
              A performative installation that bridges the gap between vision and digital canvas.
            </p>
          </div>

          <div className="pt-8">
            <Button 
              size="lg" 
              onClick={onStart}
              className="text-xl px-16 py-8 rounded-full bg-primary hover:bg-primary/90 transition-all duration-500 hover:scale-110 shadow-[0_0_50px_rgba(181,77,255,0.4)] font-bold group border-t border-white/20"
            >
              Start Experience
              <MousePointer2 className="ml-2 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left w-full animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-500 ease-out">
          {[
            {
              icon: Eye,
              color: "text-primary",
              bg: "bg-primary/10",
              title: "Concept",
              desc: "VISART transforms your vision into a creative brush. By simply looking, you generate dynamic traces and expressive marks on digital artworks."
            },
            {
              icon: Sparkles,
              color: "text-secondary",
              bg: "bg-secondary/10",
              title: "Interaction",
              desc: "Quick calibration enables real-time performance. Choose from diverse styles like neon paths, watercolor stains, or particle systems."
            },
            {
              icon: ShieldCheck,
              color: "text-emerald-400",
              bg: "bg-emerald-500/10",
              title: "Ethical Art",
              desc: "Designed with privacy as a priority. All gaze processing happens locally in your browser. No webcam data ever leaves your device."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-card/30 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-xl transition-all hover:bg-card/50 hover:border-primary/20 group relative overflow-hidden">
              <div className={`${item.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-2xl mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full max-w-4xl animate-in fade-in delay-700 duration-1000">
           <PrivacyNotice />
        </div>
      </div>

      <Footer />
    </div>
  );
}
