import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronRight, MapPin } from "lucide-react";

// Kopfbereich der Startseite im Keynote-Stil: schwarzer Hintergrund mit Lichtverläufen,
// große Überschrift mit Farbverlauf und Geräte-Vorschau, die sich beim Scrollen aufrichtet.
type Props = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  onCta: () => void;
  projectsLabel: string;
  eyebrow: string;
  priceNote: string;
  cityNote?: string;
};

export const HeroKeynote = ({ title, subtitle, ctaLabel, onCta, projectsLabel, eyebrow, priceNote, cityNote }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.45], reduce ? [0, 0] : [28, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], reduce ? [1, 1] : [0.86, 1]);
  const phoneY = useTransform(scrollYProgress, [0, 0.6], reduce ? [0, 0] : [120, -10]);

  // Überschrift am Komma teilen: zweiter Teil bekommt den Farbverlauf
  const comma = title.indexOf(",");
  const first = comma > 0 ? title.slice(0, comma + 1) : title;
  const second = comma > 0 ? title.slice(comma + 1).trim() : "";

  return (
    <section className="dark relative isolate overflow-hidden bg-background pb-10 pt-20 text-white md:pt-28">
      {/* Lichtverläufe */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="keynote-blob left-[-10%] top-[-10%] h-[520px] w-[520px] bg-[#1e9fae]" />
        <div className="keynote-blob right-[-12%] top-[5%] h-[560px] w-[560px] bg-[#1d4ed8] [animation-delay:-6s]" />
        <div className="keynote-blob bottom-[-20%] left-[25%] h-[600px] w-[600px] bg-[#0e7490] opacity-40 [animation-delay:-12s]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            {eyebrow}
          </span>
          <h1 className="mx-auto mt-6 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">{first}</span>
            {second && (
              <>
                {" "}
                <span className="keynote-gradient-text">{second}</span>
              </>
            )}
          </h1>
          {cityNote && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/85 backdrop-blur">
              <MapPin className="h-4 w-4 text-[#7ee3ee]" /> {cityNote}
            </div>
          )}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">{subtitle}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onCta}
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-[0_10px_40px_-10px_rgba(30,159,174,0.8)] transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a href="#portfolio" className="group inline-flex items-center gap-1 rounded-xl border border-white/20 px-6 py-3.5 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/5">
              {projectsLabel}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <p className="mt-6 text-sm text-white/70">{priceNote}</p>
        </motion.div>

        {/* Geräte-Vorschau */}
        <div ref={ref} className="relative mx-auto mt-16 max-w-5xl [perspective:1400px]">
          <motion.div style={{ rotateX, scale }} className="origin-bottom">
            <div className="rounded-[1.4rem] border border-white/15 bg-gradient-to-b from-[#2a2a2e] to-[#121214] p-2 shadow-[0_40px_120px_-20px_rgba(30,159,174,0.45)] md:p-3">
              <div className="overflow-hidden rounded-xl bg-background">
                <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#1c1c1f] px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 rounded-md bg-white/10 px-3 py-0.5 text-[11px] text-white/75">matou-kfz-express.de</span>
                </div>
                <img
                  src="/media/portfolio/matou.jpg"
                  alt="Matou Kfz Schilder Express – Website von PS Professional Solutions"
                  className="aspect-[16/10] w-full object-cover object-top"
                  fetchPriority="high"
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            style={{ y: phoneY }}
            className="absolute -bottom-6 right-2 w-[26%] max-w-[220px] rounded-[2rem] border border-white/20 bg-[#121214] p-1.5 shadow-2xl md:right-[-3%]"
          >
            <div className="overflow-hidden rounded-[1.6rem]">
              <img src="/media/portfolio/websitenova-mobile.jpg" alt="WebsiteNova – Web-App" className="aspect-[1/2] w-full object-cover object-top" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
