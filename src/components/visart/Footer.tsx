
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { useLanguage } from "@/context/language-context";

export function Footer() {
  const { t } = useLanguage();
  const uepaLogo = PlaceHolderImages.find(img => img.id === "uepa-logo");
  const unifesspaLogo = PlaceHolderImages.find(img => img.id === "unifesspa-logo");
  const medialabLogo = PlaceHolderImages.find(img => img.id === "medialab-logo");

  return (
    <footer className="w-full mt-auto py-12 px-6 bg-background/20 backdrop-blur-md border-t border-border/10">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-8">
        <div className="text-center space-y-2">
          <p className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase">
            {t.footer.institutions}
          </p>
          <h4 className="text-sm font-light text-foreground/70 max-w-2xl">
            {t.footer.collab
              .replace('{uepa}', t.footer.uepaFull)
              .replace('{unifesspa}', t.footer.unifesspaFull)
              .replace('{medialab}', t.footer.medialabFull)}
          </h4>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-40 hover:opacity-100 transition-opacity duration-700 ease-in-out">
          {/* UEPA */}
          <div className="flex items-center gap-4 group">
            <div className="w-16 h-16 relative flex items-center justify-center bg-white/5 rounded-full p-2 transition-transform group-hover:scale-110">
              {uepaLogo && (
                <Image 
                  src={uepaLogo.imageUrl} 
                  alt={t.footer.uepaName} 
                  width={48} 
                  height={48} 
                  className="object-contain"
                  data-ai-hint="university logo"
                />
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-black tracking-tighter leading-none">{t.footer.uepaName}</span>
              <span className="text-[8px] uppercase tracking-wider text-muted-foreground">{t.footer.uepaSub}</span>
            </div>
          </div>

          {/* UNIFESSPA */}
          <div className="flex items-center gap-4 group">
            <div className="w-16 h-16 relative flex items-center justify-center bg-white/5 rounded-full p-2 transition-transform group-hover:scale-110">
              {unifesspaLogo && (
                <Image 
                  src={unifesspaLogo.imageUrl} 
                  alt={t.footer.unifesspaName} 
                  width={48} 
                  height={48} 
                  className="object-contain"
                  data-ai-hint="university logo"
                />
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-black tracking-tighter leading-none">{t.footer.unifesspaName}</span>
              <span className="text-[8px] uppercase tracking-wider text-muted-foreground">{t.footer.unifesspaSub}</span>
            </div>
          </div>

          {/* MediaLab */}
          <div className="flex items-center gap-4 group">
            <div className="w-16 h-16 relative flex items-center justify-center bg-white/5 rounded-full p-2 transition-transform group-hover:scale-110">
              {medialabLogo && (
                <Image 
                  src={medialabLogo.imageUrl} 
                  alt={t.footer.medialabName} 
                  width={48} 
                  height={48} 
                  className="object-contain"
                  data-ai-hint="tech lab logo"
                />
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-black tracking-tighter leading-none whitespace-nowrap">{t.footer.medialabName}</span>
              <span className="text-[8px] uppercase tracking-wider text-muted-foreground">{t.footer.medialabSub}</span>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-muted-foreground/50 italic">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
