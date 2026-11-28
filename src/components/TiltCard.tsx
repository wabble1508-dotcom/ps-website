import { useEffect, useRef, type ReactNode, type MouseEvent, type TouchEvent } from "react";
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
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  // Touch: Lichtschein dort, wo der Finger tippt
  const onTouch = (e: TouchEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    const t = e.touches[0];
    if (!el || !t) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((t.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((t.clientY - r.top) / r.height) * 100}%`);
  };

  // Handy/Tablet (ohne Maus): Karte leuchtet auf, solange sie in der Bildschirmmitte ist
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia?.("(hover: none)").matches || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => el.classList.toggle("is-lit", entry.isIntersecting), {
      rootMargin: "-35% 0px -35% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      to={to}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onTouchStart={onTouch}
      className={`glass spotlight group block rounded-3xl transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </Link>
  );
};
