
"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, Pause, Trash2, Download, Maximize2, Minimize2, 
  Upload, Settings2, Eye, EyeOff, RefreshCw, X,
  Video, Sparkles
} from "lucide-react";
import { GazeData, CameraDevice } from "@/hooks/use-webgazer";
import { GazeCanvas, TraceStyle } from "./GazeCanvas";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PrivacyNotice } from "./PrivacyNotice";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import { LanguageSwitcher } from "./LanguageSwitcher";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";

interface ArtworkScreenProps {
  gazeData: GazeData | null;
  isTracking: boolean;
  setTracking: (enabled: boolean) => void;
  showPreview: (show: boolean) => void;
  recalibrate: () => void;
  availableCameras: CameraDevice[];
  selectedCameraId: string;
  onCameraChange: (deviceId: string) => void;
}

export function ArtworkScreen({ 
  gazeData, 
  isTracking, 
  setTracking, 
  showPreview, 
  recalibrate,
  availableCameras,
  selectedCameraId,
  onCameraChange
}: ArtworkScreenProps) {
  const { t } = useLanguage();
  const [style, setStyle] = useState<TraceStyle>("neon");
  const [thickness, setThickness] = useState(8);
  const [opacity, setOpacity] = useState(0.8);
  
  const artworks = useMemo(() => 
    PlaceHolderImages.filter(img => img.id.includes("artwork") || img.id === "default-artwork"),
  []);
  
  const [imageUrl, setImageUrl] = useState(artworks[0]?.imageUrl || "");
  const [carouselActive, setCarouselActive] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [showFinishedDialog, setShowFinishedDialog] = useState(false);
  
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

  const generateExportUrl = useCallback(async () => {
    if (!imageRef.current || !canvasRef.current) return null;
    
    const exportCanvas = document.createElement("canvas");
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return null;

    const sourceCanvas = canvasRef.current.getCanvas();
    if (!sourceCanvas) return null;

    // Use natural dimensions to preserve quality
    exportCanvas.width = imageRef.current.naturalWidth;
    exportCanvas.height = imageRef.current.naturalHeight;

    try {
      ctx.drawImage(imageRef.current, 0, 0);
      ctx.drawImage(
        sourceCanvas, 
        0, 0, sourceCanvas.width, sourceCanvas.height,
        0, 0, exportCanvas.width, exportCanvas.height
      );
      return exportCanvas.toDataURL("image/png");
    } catch (err) {
      console.error("Capture failed:", err);
      return null;
    }
  }, []);

  const handleExport = async () => {
    const url = await generateExportUrl();
    if (url) {
      const link = document.createElement("a");
      link.download = `visart-${Date.now()}.png`;
      link.href = url;
      link.click();
    }
  };

  const startCarousel = () => {
    setCapturedImages([]);
    setCarouselIndex(0);
    setImageUrl(artworks[0].imageUrl);
    canvasRef.current?.clear();
    setCarouselActive(true);
    setTracking(true);
  };

  // Carousel loop logic
  useEffect(() => {
    if (!carouselActive) return;

    const timer = setTimeout(async () => {
      // 1. Capture current drawing
      const result = await generateExportUrl();
      if (result) {
        setCapturedImages(prev => [...prev, result]);
      }

      // 2. Determine next step
      const nextIndex = carouselIndex + 1;
      if (nextIndex < artworks.length) {
        setCarouselIndex(nextIndex);
        setImageUrl(artworks[nextIndex].imageUrl);
        canvasRef.current?.clear();
      } else {
        // Sequence finished
        setCarouselActive(false);
        setTracking(false);
        setShowFinishedDialog(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [carouselActive, carouselIndex, artworks, generateExportUrl, setTracking]);

  const saveAllImages = () => {
    capturedImages.forEach((url, i) => {
      const link = document.createElement("a");
      link.download = `visart-carousel-${i + 1}.png`;
      link.href = url;
      link.click();
    });
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
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,244,134,0.03)_0%,transparent_70%)] pointer-events-none" />

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

      <div className="relative flex-1 w-full flex items-center justify-center p-4 md:p-12">
        <div className="relative inline-block max-w-full max-h-full">
          <img 
            ref={imageRef}
            src={imageUrl} 
            alt="Artwork" 
            crossOrigin="anonymous"
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
        
        {isTracking && gazeData && (
          <div 
            className="fixed w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-50 mix-blend-difference flex items-center justify-center transition-all duration-75"
            style={{ left: gazeData.x - 16, top: gazeData.y - 16 }}
          >
             <div className="w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(0,244,134,1)]" />
          </div>
        )}

        {carouselActive && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary/20 backdrop-blur-xl border border-primary/40 rounded-full text-primary font-bold animate-pulse z-50">
            {t.artwork.carousel.running} ({carouselIndex + 1}/{artworks.length})
          </div>
        )}
      </div>

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
                  disabled={carouselActive}
                  className="w-full gap-2 rounded-xl h-12"
                >
                  {isTracking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isTracking ? t.artwork.pause : t.artwork.start}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={recalibrate}
                  disabled={carouselActive}
                  className="w-full gap-2 rounded-xl h-12"
                >
                  <RefreshCw className="w-4 h-4" /> {t.artwork.recalibrate}
                </Button>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> {t.artwork.carousel.title}
                </p>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed mb-4">
                {t.artwork.carousel.desc}
              </p>
              <Button 
                onClick={startCarousel} 
                disabled={carouselActive}
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-[0_0_20px_rgba(0,244,134,0.3)] transition-all"
              >
                {carouselActive ? t.artwork.carousel.running : t.artwork.carousel.start}
              </Button>
            </div>

            {availableCameras.length > 1 && (
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.artwork.selectCamera}</p>
                <Select value={selectedCameraId} onValueChange={onCameraChange}>
                  <SelectTrigger className="w-full h-12 rounded-xl bg-background/50 border-border/50">
                    <Video className="w-4 h-4 mr-2 text-primary" />
                    <SelectValue placeholder="Select Camera" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/50 bg-card/95 backdrop-blur-xl">
                    {availableCameras.map((camera) => (
                      <SelectItem key={camera.deviceId} value={camera.deviceId} className="rounded-lg m-1">
                        {camera.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.artwork.sampleArtworks}</p>
              <div className="grid grid-cols-2 gap-3">
                {artworks.map((artwork) => (
                  <button
                    key={artwork.id}
                    onClick={() => {
                      setImageUrl(artwork.imageUrl);
                      canvasRef.current?.clear();
                    }}
                    disabled={carouselActive}
                    className={cn(
                      "group relative aspect-video rounded-lg overflow-hidden border-2 transition-all",
                      imageUrl === artwork.imageUrl ? "border-primary shadow-[0_0_15px_rgba(0,244,134,0.4)]" : "border-transparent opacity-60 hover:opacity-100",
                      carouselActive && "opacity-30 cursor-not-allowed"
                    )}
                  >
                    <Image 
                      src={artwork.imageUrl} 
                      alt={artwork.description}
                      fill
                      className="object-cover"
                      data-ai-hint={artwork.imageHint}
                    />
                  </button>
                ))}
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
                <Button 
                  variant="outline" 
                  onClick={() => canvasRef.current?.clear()} 
                  disabled={carouselActive}
                  className="w-full gap-2 rounded-xl h-12 border-destructive/20 hover:bg-destructive/10 text-destructive"
                >
                  <Trash2 className="w-4 h-4" /> {t.artwork.clearCanvas}
                </Button>
                <Button 
                  variant="outline" 
                  disabled={carouselActive}
                  className="w-full h-12 gap-2 rounded-xl relative overflow-hidden" 
                  asChild
                >
                  <label className="cursor-pointer">
                    <Upload className="w-4 h-4" /> {t.artwork.changeImage}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImageUrl(URL.createObjectURL(file));
                        canvasRef.current?.clear();
                      }
                    }} />
                  </label>
                </Button>
                <Button 
                  variant="default" 
                  onClick={handleExport} 
                  disabled={carouselActive}
                  className="w-full h-14 gap-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg text-lg font-bold"
                >
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

      <Dialog open={showFinishedDialog} onOpenChange={setShowFinishedDialog}>
        <DialogContent className="max-w-md rounded-[2rem] bg-card/95 border-primary/20 backdrop-blur-3xl p-8">
          <DialogHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-black">{t.artwork.carousel.finish}</DialogTitle>
            <DialogDescription>
              {capturedImages.length} images were successfully recorded during the sequence.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button variant="outline" onClick={() => setShowFinishedDialog(false)} className="rounded-xl h-14">
              {t.artwork.view}
            </Button>
            <Button onClick={saveAllImages} className="rounded-xl h-14 bg-primary text-primary-foreground font-bold">
              <Download className="w-4 h-4 mr-2" /> {t.artwork.carousel.saveAll}
            </Button>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={startCarousel} className="w-full rounded-xl text-primary hover:bg-primary/10">
              <RefreshCw className="w-4 h-4 mr-2" /> {t.artwork.carousel.runAgain}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
