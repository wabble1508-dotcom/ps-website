import type { ReactNode } from "react";
import { FadeIn } from "@/components/FadeIn";

// Abschnitts-Überschrift im Studio-Stil: Nummer + Stichwort + feine Linie, darunter
// linksbündig die große Überschrift und rechts daneben ein kurzer Text.
export const SectionHead = ({
  index,
  kicker,
  title,
  sub,
  className = "",
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  sub?: ReactNode;
  className?: string;
}) => (
  <FadeIn className={`mb-12 md:mb-16 ${className}`}>
    <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
      <span className="font-display tabular-nums text-primary dark:text-[#7ee3ee]">{index}</span>
      <span>{kicker}</span>
      <span aria-hidden className="h-px flex-1 bg-border" />
    </div>
    <div className="mt-6 grid gap-5 md:grid-cols-12 md:items-end">
      <h2 className="text-4xl font-semibold leading-[1.02] text-foreground md:col-span-8 md:text-6xl">{title}</h2>
      {sub && <p className="text-base text-muted-foreground md:col-span-4 md:text-lg">{sub}</p>}
    </div>
  </FadeIn>
);
