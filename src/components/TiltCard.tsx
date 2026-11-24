import { useRef, type ReactNode, type MouseEvent } from "react";
import { Link } from "react-router-dom";

// Glas-Karte, die sich beim Überfahren leicht in 3D neigt und an der Mausposition aufleuchtet.
// Ohne Maus (Handy) bzw. bei „Bewegung reduzieren“ bleibt sie ruhig.
export const TiltCard = ({ to, className = "", children, max = 6 }: { to: string; className?: string; children: ReactNode; max?: number }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (!reduce) el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateY(-2px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <Link
      ref={ref}
      to={to}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`glass spotlight group block rounded-3xl transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </Link>
  );
};
