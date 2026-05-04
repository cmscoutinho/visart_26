
"use client";

import { useState, useEffect, useCallback, useRef } from "react";

declare global {
  interface Window {
    webgazer: any;
  }
}

export type GazeData = {
  x: number;
  y: number;
};

export function useWebGazer() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gazeData, setGazeData] = useState<GazeData | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const historyRef = useRef<GazeData[]>([]);
  const MAX_HISTORY = 5;

  const initWebGazer = useCallback(async () => {
    if (typeof window === "undefined" || !window.webgazer) {
      setError("WebGazer library not loaded. Please ensure script is present.");
      return;
    }

    try {
      await window.webgazer
        .setRegression("ridge")
        .setTracker("TMBolton")
        .setGazeListener((data: any, elapsedTime: number) => {
          if (!data) return;

          // Simple moving average to reduce jitter
          historyRef.current.push({ x: data.x, y: data.y });
          if (historyRef.current.length > MAX_HISTORY) {
            historyRef.current.shift();
          }

          const avgX = historyRef.current.reduce((sum, p) => sum + p.x, 0) / historyRef.current.length;
          const avgY = historyRef.current.reduce((sum, p) => sum + p.y, 0) / historyRef.current.length;

          setGazeData({ x: avgX, y: avgY });
        })
        .saveDataAcrossSessions(true)
        .begin();

      // Hide the default WebGazer preview by default
      window.webgazer.showVideoPreview(false).showPredictionPoints(false);
      
      setIsReady(true);
      setIsTracking(true);
    } catch (err: any) {
      console.error("WebGazer init error:", err);
      setError(err.message || "Failed to initialize gaze tracking.");
    }
  }, []);

  const setTracking = useCallback((enabled: boolean) => {
    if (!window.webgazer) return;
    if (enabled) {
      window.webgazer.resume();
    } else {
      window.webgazer.pause();
    }
    setIsTracking(enabled);
  }, []);

  const showPreview = useCallback((show: boolean) => {
    if (!window.webgazer) return;
    window.webgazer.showVideoPreview(show).showPredictionPoints(show);
  }, []);

  const clearData = useCallback(() => {
    if (!window.webgazer) return;
    window.webgazer.clearData();
  }, []);

  useEffect(() => {
    return () => {
      if (window.webgazer) {
        window.webgazer.end();
      }
    };
  }, []);

  return {
    isReady,
    error,
    gazeData,
    isTracking,
    initWebGazer,
    setTracking,
    showPreview,
    clearData,
  };
}
