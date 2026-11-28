import type { ReactNode } from "react";

// Abschnitts-Überschrift: linksbündig, rechts daneben ein kurzer Text. Bewusst ohne Nummern,
// Großbuchstaben-Label oder Linie (typische Merkmale generierter Seiten). index/kicker bleiben
// als Props erhalten, werden aber nicht mehr angezeigt.
export const SectionHead = ({
  title,
  sub,
  className = "",
}: {
  index?: string;
  kicker?: string;
  title: ReactNode;
  sub?: ReactNode;
  className?: string;
}) => (
  <div className={`mb-12 grid gap-5 md:mb-16 md:grid-cols-12 md:items-end ${className}`}>
    <h2 className="text-balance text-4xl font-bold leading-[1] text-foreground md:col-span-8 md:text-6xl" style={{ fontVariationSettings: '"wdth" 85' }}>
      {title}
    </h2>
    {sub && <p className="text-pretty text-base text-muted-foreground md:col-span-4 md:text-lg">{sub}</p>}
  </div>
);
