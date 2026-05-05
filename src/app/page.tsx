
"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { WelcomeScreen } from "@/components/visart/WelcomeScreen";
import { CalibrationScreen } from "@/components/visart/CalibrationScreen";
import { ArtworkScreen } from "@/components/visart/ArtworkScreen";
import { useWebGazer } from "@/hooks/use-webgazer";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

type AppState = "welcome" | "calibrating" | "artwork";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("welcome");
  const { 
    isReady, 
    error, 
    gazeData, 
    isTracking, 
    availableCameras,
    selectedCameraId,
    initWebGazer, 
    setTracking, 
    switchCamera,
    showPreview, 
    clearData 
  } = useWebGazer();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Webcam Access Denied",
        description: "VISART requires webcam access to estimate gaze direction. Please allow permission and refresh.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleStartExperience = async () => {
    await initWebGazer();
    setAppState("calibrating");
  };

  const handleCalibrationComplete = () => {
    setAppState("artwork");
  };

  const handleRecalibrate = () => {
    clearData();
    setAppState("calibrating");
  };

  return (
    <main className="min-h-screen relative">
      <Script 
        src="https://cdn.jsdelivr.net/npm/webgazer@2.1.0/dist/webgazer.min.js"
        strategy="lazyOnload"
      />
      
      {appState === "welcome" && (
        <WelcomeScreen onStart={handleStartExperience} />
      )}

      {appState === "calibrating" && (
        <CalibrationScreen 
          onComplete={handleCalibrationComplete} 
          showPreview={showPreview}
        />
      )}

      {appState === "artwork" && (
        <ArtworkScreen 
          gazeData={gazeData}
          isTracking={isTracking}
          setTracking={setTracking}
          showPreview={showPreview}
          recalibrate={handleRecalibrate}
          availableCameras={availableCameras}
          selectedCameraId={selectedCameraId}
          onCameraChange={switchCamera}
        />
      )}

      <Toaster />
    </main>
  );
}
