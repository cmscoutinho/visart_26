
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

export function Footer() {
  const uepaLogo = PlaceHolderImages.find(img => img.id === "uepa-logo");
  const unifesspaLogo = PlaceHolderImages.find(img => img.id === "unifesspa-logo");

  return (
    <footer className="w-full mt-auto py-12 px-6 bg-background/20 backdrop-blur-md border-t border-border/10">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-8">
        <div className="text-center space-y-2">
          <p className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase">
            Participating institutions
          </p>
          <h4 className="text-sm font-light text-foreground/70 max-w-2xl">
            A collaboration between <span className="text-foreground font-semibold">Universidade do Estado do Pará (UEPA)</span> and <span className="text-foreground font-semibold">Universidade Federal do Sul e Sudeste do Pará (UNIFESSPA)</span>.
          </h4>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-16 md:gap-24 opacity-40 hover:opacity-100 transition-opacity duration-700 ease-in-out">
          <div className="flex items-center gap-4 group">
            <div className="w-16 h-16 relative flex items-center justify-center bg-white/5 rounded-full p-2 transition-transform group-hover:scale-110">
              {uepaLogo && (
                <Image 
                  src={uepaLogo.imageUrl} 
                  alt="UEPA" 
                  width={48} 
                  height={48} 
                  className="object-contain"
                  data-ai-hint="university logo"
                />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter leading-none">UEPA</span>
              <span className="text-[8px] uppercase tracking-wider text-muted-foreground">Estado do Pará</span>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="w-16 h-16 relative flex items-center justify-center bg-white/5 rounded-full p-2 transition-transform group-hover:scale-110">
              {unifesspaLogo && (
                <Image 
                  src={unifesspaLogo.imageUrl} 
                  alt="UNIFESSPA" 
                  width={48} 
                  height={48} 
                  className="object-contain"
                  data-ai-hint="university logo"
                />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter leading-none">UNIFESSPA</span>
              <span className="text-[8px] uppercase tracking-wider text-muted-foreground">Federal Sul e Sudeste</span>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-muted-foreground/50 italic">
          VISART © 2024 • Experimental Technological Art Platform
        </div>
      </div>
    </footer>
  );
}
