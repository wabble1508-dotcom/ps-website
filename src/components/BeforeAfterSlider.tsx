import React, { useState, useRef, useCallback, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Vorher",
  afterLabel = "Nachher",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(85);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setPosition(percent);
  }, []);

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      handleMove(e.clientX);
      // Prevent text selection while dragging
      e.preventDefault();
    },
    [handleMove],
  );

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    } else {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [isDragging, onPointerMove, onPointerUp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-2xl select-none group touch-none bg-muted shadow-2xl border border-border/50 cursor-crosshair"
      onPointerDown={onPointerDown}
    >
      {/* Base Image (After / New / Good) */}
      <img
        src={afterImage}
        className="absolute inset-0 w-full h-full object-cover object-top"
        alt="After"
        draggable={false}
      />

      {/* After Label (Left Top) - Visible underneath when sliding */}
      <div className="absolute top-4 left-4 bg-primary/95 backdrop-blur-md text-white px-5 py-2 rounded-xl text-sm font-bold tracking-wider shadow-xl border border-white/20 z-0 whitespace-nowrap">
        {afterLabel}
      </div>

      {/* Clipped Image (Before / Old / Bad) */}
      <div
        className="absolute inset-0 w-full h-full z-10"
        style={{
          clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
        }}
      >
        <img
          src={beforeImage}
          className="absolute inset-0 w-full h-full object-cover object-top filter grayscale-[20%]"
          alt="Before"
          draggable={false}
        />

        {/* Before Label (Left Top) - Visible on the left side */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white px-5 py-2 rounded-xl text-sm font-bold tracking-wider shadow-xl border border-white/10 whitespace-nowrap">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1.5 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(0,0,0,0.6)] z-20"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.4)] border border-border text-primary group-hover:scale-110 transition-transform duration-200">
          <ArrowLeftRight className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
