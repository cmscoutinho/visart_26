
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

export type CameraDevice = {
  deviceId: string;
  label: string;
};

export function useWebGazer() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gazeData, setGazeData] = useState<GazeData | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [availableCameras, setAvailableCameras] = useState<CameraDevice[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>("");
  const historyRef = useRef<GazeData[]>([]);
  const MAX_HISTORY = 5;

  const getCameras = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices) return;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices
        .filter(device => device.kind === 'videoinput')
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${device.deviceId.slice(0, 5)}...`
        }));
      setAvailableCameras(videoDevices);
      if (videoDevices.length > 0 && !selectedCameraId) {
        setSelectedCameraId(videoDevices[0].deviceId);
      }
    } catch (err) {
      console.error("Error enumerating cameras:", err);
    }
  }, [selectedCameraId]);

  const initWebGazer = useCallback(async (deviceId?: string) => {
    if (typeof window === "undefined" || !window.webgazer) {
      setError("WebGazer library not loaded. Please ensure script is present.");
      return;
    }

    try {
      // Clear previous instances if any
      if (window.webgazer.isReady()) {
        window.webgazer.end();
      }

      // If a specific deviceId is provided, we might need to handle constraints
      // WebGazer 2.x internally calls getUserMedia. To specify a camera, we can use constraints.
      // Note: WebGazer doesn't have a direct "setDeviceId" but we can try to set it before begin
      
      await window.webgazer
        .setRegression("ridge")
        .setTracker("TMBolton")
        .setGazeListener((data: any) => {
          if (!data) return;

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

      window.webgazer.showVideoPreview(false).showPredictionPoints(false);
      
      setIsReady(true);
      setIsTracking(true);
      getCameras(); // Refresh list after permission granted
    } catch (err: any) {
      console.error("WebGazer init error:", err);
      setError(err.message || "Failed to initialize gaze tracking.");
    }
  }, [getCameras]);

  const setTracking = useCallback((enabled: boolean) => {
    if (!window.webgazer) return;
    if (enabled) {
      window.webgazer.resume();
    } else {
      window.webgazer.pause();
    }
    setIsTracking(enabled);
  }, []);

  const switchCamera = useCallback(async (deviceId: string) => {
    setSelectedCameraId(deviceId);
    // WebGazer restart with new device is complex; often requires full re-init
    // for this MVP we update the state and would ideally restart the stream
    // Many browsers don't allow changing constraints on an active track easily via WebGazer
    // so we re-initialize.
    if (window.webgazer) {
      window.webgazer.end();
      // Re-init with potential constraint logic would go here if WebGazer supported it natively
      // For now, we re-initialize the standard way which usually picks the default or last used
      initWebGazer();
    }
  }, [initWebGazer]);

  const showPreview = useCallback((show: boolean) => {
    if (!window.webgazer) return;
    window.webgazer.showVideoPreview(show).showPredictionPoints(show);
  }, []);

  const clearData = useCallback(() => {
    if (!window.webgazer) return;
    window.webgazer.clearData();
  }, []);

  useEffect(() => {
    getCameras();
    return () => {
      if (window.webgazer) {
        window.webgazer.end();
      }
    };
  }, [getCameras]);

  return {
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
    clearData,
  };
}
