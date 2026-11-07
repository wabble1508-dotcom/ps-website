import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  ChevronRight,
  MapPin,
  Phone,
} from "lucide-react";
import { ExternalEmbed } from "@/components/ExternalEmbed";

// Kopfbereich der Startseite: echtes Foto bzw. Video im Hintergrund (Video von YouTube erst nach
// Einwilligung, bis dahin das Standbild von der eigenen Domain), klare Schrift ohne Effekte.
const VIDEO_ID = "xycMn76O0M0";
const VIDEO_SRC = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${VIDEO_ID}&playsinline=1&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1`;

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
  // Überschrift am Komma teilen: zweiter Teil in der Markenfarbe
  const comma = title.indexOf(",");
  const first = comma > 0 ? title.slice(0, comma + 1) : title;
  const second = comma > 0 ? title.slice(comma + 1).trim() : "";

  return (
    <section className="dark relative isolate flex min-h-[86svh] items-center overflow-hidden bg-[#0b1419] text-white">
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
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center md:mx-0 md:text-left"
        >
          <span className="inline-block rounded-md bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur">
            {eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {first}
            {second && (
              <>
                {" "}
                <span className="text-[#5fd4dc]">{second}</span>
              </>
            )}
          </h1>
          {cityNote && (
            <div className="mt-5 inline-flex items-center gap-2 text-sm text-white/85">
              <MapPin className="h-4 w-4 text-[#5fd4dc]" /> {cityNote}
            </div>
          )}
          <p className="mt-5 text-lg text-white/85 md:text-xl">{subtitle}</p>
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
              to="/analyse-bestaetigungen"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              <CalendarCheck className="h-4 w-4" />
              {bookLabel}
            </Link>
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
