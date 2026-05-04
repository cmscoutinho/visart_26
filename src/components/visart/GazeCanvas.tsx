"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { GazeData } from "@/hooks/use-webgazer";

export type TraceStyle = 
  | "red-line" 
  | "neon" 
  | "dotted" 
  | "soft-brush" 
  | "particles" 
  | "heatmap" 
  | "ghost" 
  | "random";

interface GazeCanvasProps {
  gazeData: GazeData | null;
  isTracking: boolean;
  style: TraceStyle;
  thickness: number;
  opacity: number;
  imageBounds: DOMRect | null;
}

export const GazeCanvas = forwardRef<any, GazeCanvasProps>(({
  gazeData,
  isTracking,
  style,
  thickness,
  opacity,
  imageBounds,
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPointRef = useRef<{x: number, y: number} | null>(null);
  const particlesRef = useRef<any[]>([]);
  const requestRef = useRef<number>(null);

  useImperativeHandle(ref, () => ({
    clear: () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      particlesRef.current = [];
    },
    getCanvas: () => canvasRef.current
  }));

  useEffect(() => {
    if (imageBounds && canvasRef.current) {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvasRef.current.width;
      tempCanvas.height = canvasRef.current.height;
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx?.drawImage(canvasRef.current, 0, 0);

      canvasRef.current.width = imageBounds.width;
      canvasRef.current.height = imageBounds.height;

      const ctx = canvasRef.current.getContext("2d");
      ctx?.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [imageBounds]);

  const draw = () => {
    if (!canvasRef.current || !imageBounds) {
      requestRef.current = requestAnimationFrame(draw);
      return;
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (isTracking && gazeData) {
      const localX = gazeData.x - imageBounds.left;
      const localY = gazeData.y - imageBounds.top;

      const isInBounds = localX >= 0 && localX <= imageBounds.width && localY >= 0 && localY <= imageBounds.height;

      if (isInBounds) {
        ctx.globalAlpha = opacity;
        ctx.lineWidth = thickness;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        switch (style) {
          case "red-line":
            ctx.strokeStyle = "#ff3333";
            if (lastPointRef.current) {
              ctx.beginPath();
              ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
              ctx.lineTo(localX, localY);
              ctx.stroke();
            }
            break;

          case "neon":
            ctx.strokeStyle = `hsl(${(Date.now() / 15) % 360}, 100%, 70%)`;
            ctx.shadowBlur = thickness * 1.5;
            ctx.shadowColor = ctx.strokeStyle as string;
            if (lastPointRef.current) {
              ctx.beginPath();
              ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
              ctx.lineTo(localX, localY);
              ctx.stroke();
            }
            ctx.shadowBlur = 0;
            break;

          case "dotted":
            ctx.fillStyle = `hsl(${(Date.now() / 20) % 360}, 80%, 65%)`;
            ctx.beginPath();
            ctx.arc(localX, localY, thickness / 2, 0, Math.PI * 2);
            ctx.fill();
            break;

          case "soft-brush":
            const grad = ctx.createRadialGradient(localX, localY, 0, localX, localY, thickness * 2.5);
            grad.addColorStop(0, `rgba(181, 77, 255, ${opacity * 0.4})`);
            grad.addColorStop(1, "transparent");
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(localX, localY, thickness * 2.5, 0, Math.PI * 2);
            ctx.fill();
            break;

          case "particles":
            for (let i = 0; i < 6; i++) {
              particlesRef.current.push({
                x: localX,
                y: localY,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                size: Math.random() * (thickness / 1.5) + 1,
                life: 1.0,
                color: `hsl(${Math.random() * 80 + 240}, 100%, 70%)`
              });
            }
            break;

          case "heatmap":
            ctx.globalAlpha = 0.05;
            // More "heat-like" accumulation
            ctx.globalCompositeOperation = "screen";
            const heatGrad = ctx.createRadialGradient(localX, localY, 0, localX, localY, thickness * 5);
            heatGrad.addColorStop(0, "rgba(255, 69, 0, 0.8)");
            heatGrad.addColorStop(0.5, "rgba(255, 165, 0, 0.4)");
            heatGrad.addColorStop(1, "transparent");
            ctx.fillStyle = heatGrad;
            ctx.beginPath();
            ctx.arc(localX, localY, thickness * 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = "source-over";
            break;

          case "ghost":
            ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
            ctx.lineWidth = thickness * 2;
            if (lastPointRef.current) {
              ctx.beginPath();
              ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
              ctx.lineTo(localX, localY);
              ctx.stroke();
            }
            break;

          case "random":
            ctx.strokeStyle = `hsla(${Math.random() * 360}, 100%, 70%, ${opacity})`;
            ctx.lineWidth = Math.random() * thickness * 2 + 1;
            if (lastPointRef.current) {
              ctx.beginPath();
              // Jitter for expressive effect
              const jx = (Math.random() - 0.5) * 25;
              const jy = (Math.random() - 0.5) * 25;
              ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
              ctx.lineTo(localX + jx, localY + jy);
              ctx.stroke();
            }
            break;
        }
        lastPointRef.current = { x: localX, y: localY };
      } else {
        lastPointRef.current = null;
      }
    } else {
      lastPointRef.current = null;
    }

    if (particlesRef.current.length > 0) {
      ctx.save();
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life * opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    requestRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(draw);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isTracking, gazeData, style, thickness, opacity, imageBounds]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 pointer-events-none z-10"
    />
  );
});

GazeCanvas.displayName = "GazeCanvas";
