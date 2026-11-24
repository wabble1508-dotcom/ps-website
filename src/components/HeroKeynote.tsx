import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  ChevronRight,
  Code2,
  MapPin,
  Phone,
  Search,
  Smartphone,
} from "lucide-react";
import { ExternalEmbed } from "@/components/ExternalEmbed";

// Kopfbereich der Startseite: echtes Foto bzw. Video im Hintergrund (Video von YouTube erst nach
// Einwilligung, bis dahin das Standbild von der eigenen Domain), klare Schrift ohne Effekte.
const VIDEO_ID = "xycMn76O0M0";
const VIDEO_SRC = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${VIDEO_ID}&playsinline=1&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1`;

type L = { de: string; en: string; tr: string };

// Schwebende Glas-Kärtchen über dem Bild (nur am Rechner), bewegen sich leicht mit der Maus
const CHIPS: { icon: typeof Code2; title: L; text: L; pos: string; depth: number }[] = [
  {
    icon: Code2,
    title: { de: "Programmiert", en: "Hand-coded", tr: "Kodlanmış" },
    text: { de: "statt Baukasten", en: "not a site builder", tr: "site oluşturucu değil" },
    pos: "right-[5%] top-[17%]",
    depth: 24,
  },
  {
    icon: Smartphone,
    title: { de: "Apps", en: "Apps", tr: "Uygulamalar" },
    text: { de: "iOS, Android & Web", en: "iOS, Android & web", tr: "iOS, Android ve web" },
    pos: "right-[3%] top-[52%]",
    depth: 40,
  },
  {
    icon: Search,
    title: { de: "SEO & GEO", en: "SEO & GEO", tr: "SEO ve GEO" },
    text: { de: "Google & KI-Suche", en: "Google & AI search", tr: "Google ve AI arama" },
    pos: "right-[30%] bottom-[11%]",
    depth: 16,
  },
];

const Chip = ({ chip, mx, my, label }: { chip: (typeof CHIPS)[number]; mx: ReturnType<typeof useSpring>; my: ReturnType<typeof useSpring>; label: (t: L) => string }) => {
  const x = useTransform(mx, (v: number) => v * chip.depth);
  const y = useTransform(my, (v: number) => v * chip.depth);
  const Icon = chip.icon;
  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay: 0.9 + chip.depth / 60, ease: [0.22, 1, 0.36, 1] }}
      className={`glass absolute hidden items-center gap-3 rounded-2xl px-4 py-3 lg:flex ${chip.pos}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-[#7ee3ee]">
        <Icon className="h-4 w-4" />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-white">{label(chip.title)}</span>
        <span className="block text-xs text-white/70">{label(chip.text)}</span>
      </span>
    </motion.div>
  );
};

type Props = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  onCta: () => void;
  projectsLabel: string;
  bookLabel: string;
  eyebrow: string;
  priceNote: string;
  cityNote?: string;
};

export const HeroKeynote = ({
  title,
  subtitle,
  ctaLabel,
  onCta,
  projectsLabel,
  bookLabel,
  eyebrow,
  priceNote,
  cityNote,
}: Props) => {
  const { language } = useLanguage();
  const label = (t: L) => (language === "en" ? t.en : language === "tr" ? t.tr : t.de);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // Mausposition (-0.5 … 0.5) weich gefedert – für Lichtschein und Kärtchen
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useSpring(rx, { stiffness: 60, damping: 18 });
  const my = useSpring(ry, { stiffness: 60, damping: 18 });
  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rx.set((e.clientX - r.left) / r.width - 0.5);
    ry.set((e.clientY - r.top) / r.height - 0.5);
    ref.current.style.setProperty("--hx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--hy", `${e.clientY - r.top}px`);
  };

  // Überschrift am Komma teilen: zweiter Teil in der Markenfarbe
  const comma = title.indexOf(",");
  const first = comma > 0 ? title.slice(0, comma + 1) : title;
  const second = comma > 0 ? title.slice(comma + 1).trim() : "";

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="grain dark relative isolate -mt-[4.5rem] flex min-h-[92svh] items-center overflow-hidden bg-[#0b1419] pt-[4.5rem] text-white md:-mt-[5.25rem] md:pt-[5.25rem]"
    >
      {/* Hintergrund: Standbild, darüber (nach Einwilligung) das Video */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* am Rechner rechts neben dem Text, auf dem Handy vollflächig */}
        <div className="absolute inset-0 md:left-[34%]">
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="/media/hero/pankaj-hero-sm.jpg"
            />
            <img
              src="/media/hero/pankaj-hero.jpg"
              alt=""
              fetchPriority="high"
              className="h-full w-full object-cover object-[60%_center] md:object-center"
            />
          </picture>
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <ExternalEmbed
              src={VIDEO_SRC}
              title="Hintergrundvideo"
              className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
              background
            />
          </div>
        </div>
        {/* Abdunkeln für gute Lesbarkeit: auf dem Handy gleichmäßig, am Rechner von links */}
        <div className="absolute inset-0 bg-[#0b1419]/70 md:bg-transparent md:bg-gradient-to-r md:from-[#0b1419] md:from-35% md:via-[#0b1419]/60 md:via-55% md:to-[#0b1419]/5" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        {/* Lichtschein, der der Maus folgt */}
        <div
          className="pointer-events-none absolute inset-0 hidden mix-blend-soft-light md:block"
          style={{ background: "radial-gradient(520px circle at var(--hx, 70%) var(--hy, 40%), rgba(126,227,238,0.35), transparent 65%)" }}
        />
      </div>
      {CHIPS.map((chip) => (
        <Chip key={chip.depth} chip={chip} mx={mx} my={my} label={label} />
      ))}

      <div className="container mx-auto max-w-6xl px-4 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center md:mx-0 md:text-left"
        >
          <p className="flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-white/75 md:justify-start">
            <span aria-hidden className="hidden h-px w-8 bg-[#5fd4dc] md:block" />
            {eyebrow}
          </p>
          <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1] sm:text-6xl lg:text-7xl">
            {first.split(" ").map((w, i) => (
              <motion.span
                key={`a${i}`}
                className="inline-block"
                initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}&nbsp;
              </motion.span>
            ))}
            {second &&
              second.split(" ").map((w, i) => (
                <motion.span
                  key={`b${i}`}
                  className="accent-serif inline-block text-[#7ee3ee]"
                  initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, delay: 0.35 + (first.split(" ").length + i) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}&nbsp;
                </motion.span>
              ))}
          </h1>
          {cityNote && (
            <div className="mt-5 inline-flex items-center gap-2 text-sm text-white/85">
              <MapPin className="h-4 w-4 text-[#5fd4dc]" /> {cityNote}
            </div>
          )}
          <p className="mt-5 text-base text-white/85 sm:text-lg md:text-xl">{subtitle}</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start">
            <button
              type="button"
              onClick={onCta}
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-primary/90"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <Link
              to="/termin"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              <CalendarCheck className="h-4 w-4" />
              {bookLabel}
            </Link>
          </div>
          {/* Handy & Tablet: Glas-Kärtchen als schwebende Reihe */}
          <div className="mt-7 flex flex-wrap justify-center gap-2 md:justify-start lg:hidden">
            {CHIPS.map((chip, i) => {
              const Icon = chip.icon;
              return (
                <motion.span
                  key={chip.depth}
                  initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.9 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="glass chip-float inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5" style={{ animationDelay: `${i * 0.8}s` }}>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-[#7ee3ee]">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs font-semibold text-white">{label(chip.title)}</span>
                  </span>
                </motion.span>
              );
            })}
          </div>
          <p className="mt-5 text-sm text-white/80">{priceNote}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm md:justify-start">
            <a
              href="tel:+4915207595260"
              className="inline-flex items-center gap-1.5 font-semibold text-white hover:underline"
            >
              <Phone className="h-4 w-4 text-[#5fd4dc]" /> +49 152 0759 5260
            </a>
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-1 font-semibold text-[#5fd4dc] hover:underline"
            >
              {projectsLabel}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
