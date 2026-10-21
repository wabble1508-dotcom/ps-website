import { useEffect, useRef, useState } from "react";

const LOGO =
  "/media/vibe.filesafe.space/1778931020193405557/attachments/98e2f944-6284-4364-828f-058da15e3823.png";

// Lage der Bildteile im Logo (in % der Bildgröße, gemessen am 500×500-PNG)
const EMBLEM = { top: 20.6, bottom: 57.2 }; // „PS“ mit Zahnrad
const TEXT = { top: 60.4, bottom: 65.8, left: 14, right: 86 }; // „Professional Solutions“
const LEFT = 14;
const RIGHT = 86;

const MIN_MS = 1800; // mindestens so lange sichtbar, damit die Animation wirken kann
const MAX_MS = 4000; // spätestens dann ausblenden, auch wenn die Seite noch lädt

// Weiche Kurve: sanft starten und sanft abbremsen, damit man das Füllen gut sieht
const ease = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);
  const [visible, setVisible] = useState(true);
  const pageLoaded = useRef(document.readyState === "complete");

  useEffect(() => {
    const onLoad = () => (pageLoaded.current = true);
    window.addEventListener("load", onLoad);

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      // Bis 90 % läuft es von selbst, die letzten 10 % erst, wenn die Seite fertig ist
      const ready = elapsed >= MIN_MS && (pageLoaded.current || elapsed >= MAX_MS);
      const target = ready ? 100 : 90 * ease(Math.min(elapsed / MIN_MS, 1));
      setProgress((p) => Math.max(p, ready ? Math.min(100, p + 3) : target));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (progress < 100 || fade) return;
    const t1 = setTimeout(() => setFade(true), 500);
    const t2 = setTimeout(() => setVisible(false), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [progress, fade]);

  if (!visible) return null;

  const percent = Math.round(progress);
  const done = percent >= 100;
  // 0–75 %: Emblem füllt sich von unten nach oben, 60–100 %: Schriftzug erscheint von links
  const emblemFill = clamp01(progress / 75);
  const textFill = clamp01((progress - 60) / 40);
  const fillTop = EMBLEM.bottom - (EMBLEM.bottom - EMBLEM.top) * emblemFill;
  const textRight = TEXT.left + (TEXT.right - TEXT.left) * textFill;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-slate-950 transition-all duration-700 ${
        fade ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100"
      }`}
      role="progressbar"
      aria-label="PS Professional Solutions"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
    >
      {/* Weicher Lichtschein hinter dem Logo, wird mit dem Fortschritt stärker */}
      <div
        className="absolute w-[28rem] h-[28rem] rounded-full bg-primary blur-3xl transition-opacity duration-300"
        style={{ opacity: 0.05 + 0.15 * (progress / 100) }}
      />

      <div
        className={`relative w-72 h-72 md:w-96 md:h-96 transition-transform duration-500 ${done ? "scale-105" : "scale-100"}`}
        style={{ marginTop: "-2rem" }}
      >
        {/* Graue Vorlage: so sieht das Logo vor dem Laden aus */}
        <img
          src={LOGO}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain grayscale opacity-20"
        />

        {/* Emblem in Farbe, füllt sich von unten nach oben */}
        <img
          src={LOGO}
          alt="PS Professional Solutions"
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            clipPath: `inset(${fillTop}% 0 ${100 - EMBLEM.bottom}% 0)`,
            filter: done ? "drop-shadow(0 0 18px hsl(var(--primary) / 0.7))" : "none",
            transition: "filter 0.4s",
          }}
        />

        {/* Leuchtende Linie an der Füllkante */}
        {emblemFill < 1 && (
          <div
            className="absolute h-[3px] rounded-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_16px_4px_hsl(var(--primary)/0.6)]"
            style={{ top: `${fillTop}%`, left: `${LEFT}%`, right: `${100 - RIGHT}%` }}
          />
        )}

        {/* Schriftzug erscheint von links nach rechts */}
        <img
          src={LOGO}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            clipPath: `inset(${TEXT.top - 1}% ${100 - textRight}% ${100 - TEXT.bottom - 1}% 0)`,
            filter: done ? "drop-shadow(0 0 10px hsl(var(--primary) / 0.5))" : "none",
          }}
        />

        {/* Funkelnder Cursor am Ende des Schriftzugs */}
        {textFill > 0 && textFill < 1 && (
          <div
            className="absolute w-[3px] rounded-full bg-primary shadow-[0_0_10px_2px_hsl(var(--primary))]"
            style={{ left: `${textRight}%`, top: `${TEXT.top - 1}%`, height: `${TEXT.bottom - TEXT.top + 2}%` }}
          />
        )}
      </div>

      {/* Prozentzahl und dünner Balken */}
      <div className="relative -mt-10 md:-mt-14 flex flex-col items-center gap-3">
        <span className="text-sm font-semibold tabular-nums tracking-widest text-primary">{percent}%</span>
        <div className="w-40 h-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
