"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { 
  Play, Pause, Trash2, Camera, Download, Maximize2, Minimize2, 
  Upload, Settings2, Eye, EyeOff, RefreshCw, X
} from "lucide-react";
import { GazeData } from "@/hooks/use-webgazer";
import { GazeCanvas, TraceStyle } from "./GazeCanvas";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PrivacyNotice } from "./PrivacyNotice";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface ArtworkScreenProps {
  gazeData: GazeData | null;
  isTracking: boolean;
  setTracking: (enabled: boolean) => void;
  showPreview: (show: boolean) => void;
  recalibrate: () => void;
}

export function ArtworkScreen({ 
  gazeData, 
  isTracking, 
  setTracking, 
  showPreview, 
  recalibrate 
}: ArtworkScreenProps) {
  const { t } = useLanguage();
  const [style, setStyle] = useState<TraceStyle>("neon");
  const [thickness, setThickness] = useState(8);
  const [opacity, setOpacity] = useState(0.8);
  const [imageUrl, setImageUrl] = useState(PlaceHolderImages.find(i => i.id === "default-artwork")?.imageUrl || "");
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageBounds, setImageBounds] = useState<DOMRect | null>(null);
  const [showControls, setShowControls] = useState(true);

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateBounds = useCallback(() => {
    if (imageRef.current) {
      setImageBounds(imageRef.current.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [updateBounds, imageUrl]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleExport = async () => {
    if (!imageRef.current || !canvasRef.current) return;
    
    const exportCanvas = document.createElement("canvas");
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    const sourceCanvas = canvasRef.current.getCanvas();
    exportCanvas.width = imageRef.current.naturalWidth;
    exportCanvas.height = imageRef.current.naturalHeight;

    ctx.drawImage(imageRef.current, 0, 0);
    ctx.drawImage(
      sourceCanvas, 
      0, 0, sourceCanvas.width, sourceCanvas.height,
      0, 0, exportCanvas.width, exportCanvas.height
    );

    const link = document.createElement("a");
    link.download = "visart-gaze-art.png";
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const togglePreview = () => {
    const newVal = !isPreviewVisible;
    setIsPreviewVisible(newVal);
    showPreview(newVal);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background flex flex-col items-center overflow-hidden">
      {/* Background Ambience adjusted for green */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,244,134,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Floating Header */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-40 p-6 flex items-center justify-between transition-transform duration-500",
        !showControls && "-translate-y-full"
      )}>
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-primary glow-text tracking-widest leading-none">VISART</h1>
          <p className="text-[8px] text-muted-foreground uppercase tracking-[0.4em] font-medium mt-1">{t.artwork.subTitle}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:flex" />
          <Button variant="ghost" size="icon" onClick={() => setShowControls(!showControls)} className="rounded-full bg-card/40 backdrop-blur-md border border-border/20">
            <Settings2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={togglePreview} className="hidden md:flex gap-2 rounded-full border-primary/30 bg-card/40 backdrop-blur-md">
            {isPreviewVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {t.artwork.preview}
          </Button>
          <Button variant="outline" size="sm" onClick={toggleFullscreen} className="hidden md:flex gap-2 rounded-full border-primary/30 bg-card/40 backdrop-blur-md">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            {t.artwork.view}
          </Button>
        </div>
      </header>

      {/* Main Canvas Area */}
      <div className="relative flex-1 w-full flex items-center justify-center p-4 md:p-12">
        <div className="relative inline-block max-w-full max-h-full">
          <img 
            ref={imageRef}
            src={imageUrl} 
            alt="Artwork" 
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 transition-all"
            onLoad={updateBounds}
          />
          <GazeCanvas 
            ref={canvasRef}
            gazeData={gazeData}
            isTracking={isTracking}
            style={style}
            thickness={thickness}
            opacity={opacity}
            imageBounds={imageBounds}
          />
        </div>
        
        {/* Real-time Gaze feedback cursor - Green Glow */}
        {isTracking && gazeData && (
          <div 
            className="fixed w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-50 mix-blend-difference flex items-center justify-center transition-all duration-75"
            style={{ left: gazeData.x - 16, top: gazeData.y - 16 }}
          >
             <div className="w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(0,244,134,1)]" />
          </div>
        )}
      </div>

      {/* Persistent Mobile Bottom Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 bg-card/80 backdrop-blur-xl border border-border/50 p-2 rounded-full shadow-2xl md:hidden">
        <Button size="icon" variant="ghost" onClick={() => setTracking(!isTracking)} className={cn("rounded-full", isTracking ? "text-primary" : "text-muted-foreground")}>
          {isTracking ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
        <Button size="icon" variant="ghost" onClick={() => canvasRef.current?.clear()} className="rounded-full">
          <Trash2 className="w-5 h-5" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => setShowControls(true)} className="rounded-full bg-primary/20 text-primary">
          <Settings2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Sidebar Controls Overlay */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-full md:w-80 bg-background/95 md:bg-card/90 backdrop-blur-2xl z-50 border-l border-border/50 transition-transform duration-500 ease-in-out shadow-[-20px_0_50px_rgba(0,0,0,0.5)]",
        showControls ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="h-full flex flex-col p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-2">
              <Settings2 className="w-4 h-4" /> {t.artwork.controlPanel}
            </h3>
            <Button variant="ghost" size="icon" onClick={() => setShowControls(false)} className="rounded-full hover:bg-white/5">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.artwork.trackingStatus}</p>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={isTracking ? "secondary" : "default"} 
                  onClick={() => setTracking(!isTracking)}
                  className="w-full gap-2 rounded-xl h-12"
                >
                  {isTracking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isTracking ? t.artwork.pause : t.artwork.start}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={recalibrate}
                  className="w-full gap-2 rounded-xl h-12"
                >
                  <RefreshCw className="w-4 h-4" /> {t.artwork.recalibrate}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.artwork.visualStyle}</p>
              <Select value={style} onValueChange={(v: any) => setStyle(v)}>
                <SelectTrigger className="w-full h-12 rounded-xl bg-background/50 border-border/50">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/50 bg-card/95 backdrop-blur-xl">
                  {Object.entries(t.artwork.styles).map(([key, label]) => (
                    <SelectItem key={key} value={key} className="rounded-lg m-1">{label as string}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.artwork.thickness}</p>
                  <span className="text-[10px] text-primary">{thickness}px</span>
                </div>
                <Slider 
                  value={[thickness]} 
                  onValueChange={(v) => setThickness(v[0])} 
                  min={1} 
                  max={60} 
                  step={1} 
                  className="py-4"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.artwork.opacity}</p>
                  <span className="text-[10px] text-primary">{Math.round(opacity * 100)}%</span>
                </div>
                <Slider 
                  value={[opacity * 100]} 
                  onValueChange={(v) => setOpacity(v[0] / 100)} 
                  min={1} 
                  max={100} 
                  step={1} 
                  className="py-4"
                />
              </div>
            </div>

            <div className="pt-6 space-y-3 border-t border-border/20">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.artwork.actions}</p>
              <div className="flex flex-col gap-3">
                <Button variant="outline" onClick={() => canvasRef.current?.clear()} className="w-full gap-2 rounded-xl h-12 border-destructive/20 hover:bg-destructive/10 text-destructive">
                  <Trash2 className="w-4 h-4" /> {t.artwork.clearCanvas}
                </Button>
                <Button variant="outline" className="w-full h-12 gap-2 rounded-xl relative overflow-hidden" asChild>
                  <label className="cursor-pointer">
                    <Upload className="w-4 h-4" /> {t.artwork.changeImage}
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </Button>
                <Button variant="default" onClick={handleExport} className="w-full h-14 gap-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg text-lg font-bold">
                  <Download className="w-5 h-5" /> {t.artwork.exportPng}
                </Button>
              </div>
            </div>

            <div className="mt-auto pt-8">
               <PrivacyNotice />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
