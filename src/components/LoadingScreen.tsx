import { useEffect, useRef, useState } from "react";

const LOGO =
  "/media/vibe.filesafe.space/1778931020193405557/attachments/98e2f944-6284-4364-828f-058da15e3823.png";

const MIN_MS = 2200; // mindestens so lange sichtbar, damit die Animation wirken kann
const MAX_MS = 4500; // spätestens dann ausblenden, auch wenn die Seite noch lädt
const STEP = 3; // Abstand der Punkte im Logo (in Logo-Pixeln) – kleiner = mehr Punkte
const PUSH_RADIUS = 70; // so weit weichen die Punkte vor Maus/Finger aus

const ease = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

type Particle = {
  tx: number; // Zielposition im Logo
  ty: number;
  sx: number; // Startposition irgendwo im Wirbel
  sy: number;
  spin: number; // wie stark der Punkt auf dem Weg kreist
  delay: number; // wann er losfliegt (0–1)
  color: string;
  ox: number; // Auslenkung durch Maus/Finger
  oy: number;
};

// Liest das Logo Pixel für Pixel aus und macht aus jedem sichtbaren Bereich einen Punkt
const buildParticles = (img: HTMLImageElement, size: number, w: number, h: number): Particle[] => {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) return [];
  ctx.drawImage(img, 0, 0, size, size);
  const data = ctx.getImageData(0, 0, size, size).data;
  const ox = (w - size) / 2;
  const oy = (h - size) / 2;
  const list: Particle[] = [];
  for (let y = 0; y < size; y += STEP) {
    for (let x = 0; x < size; x += STEP) {
      const i = (y * size + x) * 4;
      if (data[i + 3] < 140) continue;
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.min(w, h) * (0.25 + Math.random() * 0.45);
      list.push({
        tx: ox + x,
        ty: oy + y,
        sx: w / 2 + Math.cos(angle) * dist,
        sy: h / 2 + Math.sin(angle) * dist,
        spin: (Math.random() < 0.5 ? -1 : 1) * (1.5 + Math.random() * 2),
        // Punkte links kommen etwas früher an als rechts – das Logo „baut sich auf“
        delay: (x / size) * 0.35 + Math.random() * 0.2,
        color: `rgb(${data[i]},${data[i + 1]},${data[i + 2]})`,
        ox: 0,
        oy: 0,
      });
    }
  }
  return list;
};

export const LoadingScreen = () => {
  const [percent, setPercent] = useState(0);
  const [fade, setFade] = useState(false);
  const [visible, setVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const progress = useRef(0);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const pageLoaded = useRef(document.readyState === "complete");

  // Ladestand: bis 90 % von selbst, die letzten 10 % erst, wenn die Seite fertig ist
  useEffect(() => {
    const onLoad = () => (pageLoaded.current = true);
    window.addEventListener("load", onLoad);
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const ready = elapsed >= MIN_MS && (pageLoaded.current || elapsed >= MAX_MS);
      const target = 90 * ease(Math.min(elapsed / MIN_MS, 1));
      progress.current = ready ? Math.min(100, progress.current + 2.5) : Math.max(progress.current, target);
      setPercent(Math.round(progress.current));
      if (progress.current < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  // Punkte-Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let particles: Particle[] = [];
    let frame = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const img = new Image();
    img.src = LOGO;

    const setup = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const size = Math.round(Math.min(w * 0.8, 380));
      if (logoRef.current) logoRef.current.style.width = `${size}px`;
      if (img.complete && img.naturalWidth) particles = buildParticles(img, size, w, h);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const p = progress.current / 100;
      // Ab 85 % übernimmt das echte, gestochen scharfe Logo
      const handover = clamp01((p - 0.85) / 0.15);
      if (logoRef.current) logoRef.current.style.opacity = String(handover);

      if (!reduceMotion && handover < 1) {
        const pt = pointer.current;
        ctx.globalAlpha = 1 - handover;
        for (const q of particles) {
          const local = easeOut(clamp01((p * 1.15 - q.delay) / 0.6));
          const swirl = (1 - local) * q.spin;
          // Auf dem Weg ins Logo kreisen die Punkte um die Mitte
          const bx = q.sx + (q.tx - q.sx) * local;
          const by = q.sy + (q.ty - q.sy) * local;
          const cx = w / 2;
          const cy = h / 2;
          const cos = Math.cos(swirl + time * 0.0006 * (1 - local));
          const sin = Math.sin(swirl + time * 0.0006 * (1 - local));
          let x = cx + (bx - cx) * cos - (by - cy) * sin;
          let y = cy + (bx - cx) * sin + (by - cy) * cos;

          // Maus/Finger schiebt Punkte weg, danach federn sie zurück
          if (pt) {
            const dx = x + q.ox - pt.x;
            const dy = y + q.oy - pt.y;
            const d = Math.hypot(dx, dy);
            if (d < PUSH_RADIUS && d > 0.1) {
              const force = (1 - d / PUSH_RADIUS) * 6;
              q.ox += (dx / d) * force;
              q.oy += (dy / d) * force;
            }
          }
          q.ox *= 0.9;
          q.oy *= 0.9;
          x += q.ox;
          y += q.oy;

          const r = 1.2 + (1 - local) * 1.3;
          ctx.fillStyle = q.color;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      frame = requestAnimationFrame(draw);
    };

    img.onload = () => {
      setup();
      frame = requestAnimationFrame(draw);
    };
    if (img.complete && img.naturalWidth) img.onload(new Event("load"));

    const onMove = (e: PointerEvent) => (pointer.current = { x: e.clientX, y: e.clientY });
    const onLeave = () => (pointer.current = null);
    window.addEventListener("resize", setup);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onMove);
    window.addEventListener("pointerup", onLeave);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", setup);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerup", onLeave);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Fertig: kurz aufleuchten lassen, dann ausblenden
  useEffect(() => {
    if (percent < 100 || fade) return;
    const t1 = setTimeout(() => setFade(true), 600);
    const t2 = setTimeout(() => setVisible(false), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [percent, fade]);

  if (!visible) return null;
  const done = percent >= 100;

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-white dark:bg-slate-950 transition-all duration-700 touch-none ${
        fade ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100"
      }`}
      role="progressbar"
      aria-label="PS Professional Solutions"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
    >
      {/* Lichtschein, der mit dem Fortschritt wächst */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-primary blur-3xl"
        style={{ opacity: 0.04 + 0.16 * (percent / 100) }}
      />

      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Das echte Logo blendet am Ende über die Punkte */}
      <img
        ref={logoRef}
        src={LOGO}
        alt="PS Professional Solutions"
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-auto transition-[transform,filter] duration-500 ${
          done ? "scale-105" : "scale-100"
        }`}
        style={{
          opacity: 0,
          width: 380,
          filter: done ? "drop-shadow(0 0 22px hsl(var(--primary) / 0.7))" : "none",
        }}
      />

      {/* Prozentzahl */}
      <div className="absolute left-1/2 bottom-[18%] -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-sm font-semibold tabular-nums tracking-[0.3em] text-primary">{percent}%</span>
        <div className="w-40 h-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
