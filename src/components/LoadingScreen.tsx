import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const LOGO =
  "/media/vibe.filesafe.space/1778931020193405557/attachments/98e2f944-6284-4364-828f-058da15e3823.png";

// Die Schritte werden nacheinander abgehakt, sobald der Ladestand die Schwelle erreicht
const STEPS = {
  de: ["Design wird geladen", "KI-Assistent wird verbunden", "Terminkalender wird vorbereitet", "Bereit"],
  en: ["Loading design", "Connecting AI assistant", "Preparing calendar", "Ready"],
};
const THRESHOLDS = [20, 50, 80, 100];

const MIN_MS = 1600; // mindestens so lange sichtbar, damit die Animation wirken kann
const MAX_MS = 4000; // spätestens dann ausblenden, auch wenn die Seite noch lädt

const RADIUS = 104;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Weiche Kurve: schnell starten, zum Ende hin abbremsen
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export const LoadingScreen = () => {
  const { language } = useLanguage();
  const steps = language === "de" ? STEPS.de : STEPS.en;
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
      // Bis 90 % läuft der Balken von selbst, die letzten 10 % erst, wenn die Seite fertig ist
      const ready = elapsed >= MIN_MS && (pageLoaded.current || elapsed >= MAX_MS);
      const target = ready ? 100 : 90 * easeOut(Math.min(elapsed / MIN_MS, 1));
      setProgress((p) => Math.max(p, ready ? Math.min(100, p + 4) : target));
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
    const t1 = setTimeout(() => setFade(true), 250);
    const t2 = setTimeout(() => setVisible(false), 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [progress, fade]);

  if (!visible) return null;

  const percent = Math.round(progress);
  const activeStep = THRESHOLDS.findIndex((t) => percent < t);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-slate-950 transition-all duration-700 ${
        fade ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
    >
      {/* Weiche Farbflächen im Hintergrund */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/15 blur-3xl animate-pulse motion-reduce:animate-none" />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/15 blur-3xl animate-pulse motion-reduce:animate-none"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative flex flex-col items-center animate-in fade-in zoom-in-95 duration-700">
        {/* Logo mit Fortschrittsring */}
        <div className="relative w-60 h-60 flex items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 240 240" aria-hidden="true">
            <defs>
              <linearGradient id="loader-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
            <circle cx="120" cy="120" r={RADIUS} fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
            <circle
              cx="120"
              cy="120"
              r={RADIUS}
              fill="none"
              stroke="url(#loader-gradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
              style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.6))" }}
            />
          </svg>

          {/* Kreisende Punkte */}
          <div className="absolute inset-3 animate-spin motion-reduce:animate-none" style={{ animationDuration: "6s" }}>
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
          </div>
          <div
            className="absolute inset-8 animate-spin motion-reduce:animate-none"
            style={{ animationDuration: "4s", animationDirection: "reverse" }}
          >
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary/70" />
          </div>

          <img
            src={LOGO}
            alt="PS Professional Solutions"
            className="relative w-36 h-auto object-contain drop-shadow-xl animate-float motion-reduce:animate-none"
          />
        </div>

        {/* Prozentzahl */}
        <div className="mt-6 text-5xl font-bold tabular-nums bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {percent}%
        </div>

        {/* Balken mit Lichtreflex */}
        <div className="relative mt-4 w-64 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-secondary"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-[shine_1.2s_linear_infinite] motion-reduce:hidden"
          />
        </div>

        {/* Schritte */}
        <ul className="mt-6 flex flex-col gap-2 text-sm">
          {steps.map((label, i) => {
            const done = percent >= THRESHOLDS[i];
            const active = i === activeStep;
            return (
              <li
                key={label}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  done ? "text-foreground" : active ? "text-muted-foreground" : "text-muted-foreground/40"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-5 h-5 rounded-full border transition-all duration-300 ${
                    done
                      ? "bg-primary border-primary text-white scale-110"
                      : active
                        ? "border-primary border-t-transparent animate-spin"
                        : "border-muted-foreground/30"
                  }`}
                >
                  {done && <Check className="w-3 h-3" strokeWidth={3} />}
                </span>
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
