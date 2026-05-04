"use client";

import { Button } from "@/components/ui/button";
import { Eye, ShieldCheck, Sparkles, MousePointer2 } from "lucide-react";
import { Footer } from "./Footer";
import { PrivacyNotice } from "./PrivacyNotice";
import { useLanguage } from "@/context/language-context";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between relative overflow-hidden bg-background">
      {/* Decorative background elements adjusted for green palette */}
      <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] pointer-events-none opacity-60" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[140px] pointer-events-none opacity-60" />
      
      {/* Header with language switcher */}
      <div className="absolute top-6 right-6 z-50">
        <LanguageSwitcher />
      </div>

      <div className="flex-1 w-full max-w-6xl flex flex-col items-center justify-center z-10 px-6 py-20 text-center gap-20">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
          <div className="space-y-4">
            <p className="text-primary font-bold tracking-[0.5em] uppercase text-xs mb-2">{t.welcome.tagline}</p>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter glow-text text-primary leading-none">
              {t.welcome.title}
            </h1>
          </div>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-light text-foreground/90 italic leading-tight">
              {t.welcome.quote}
            </h2>
            <p className="text-muted-foreground/80 text-sm md:text-base leading-relaxed">
              {t.welcome.description}
            </p>
          </div>

          <div className="pt-8">
            <Button 
              size="lg" 
              onClick={onStart}
              className="text-xl px-16 py-8 rounded-full bg-primary hover:bg-primary/90 transition-all duration-500 hover:scale-105 shadow-[0_0_50px_rgba(0,244,134,0.3)] font-bold group border-t border-white/20 text-primary-foreground"
            >
              {t.welcome.startBtn}
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
              title: t.welcome.conceptTitle,
              desc: t.welcome.conceptDesc
            },
            {
              icon: Sparkles,
              color: "text-secondary",
              bg: "bg-secondary/10",
              title: t.welcome.interactionTitle,
              desc: t.welcome.interactionDesc
            },
            {
              icon: ShieldCheck,
              color: "text-emerald-400",
              bg: "bg-emerald-500/10",
              title: t.welcome.ethicalTitle,
              desc: t.welcome.ethicalDesc
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
