import { cn } from "@/lib/utils";

// Früher: jeder Abschnitt glitt beim Scrollen ein. Das wirkt generisch („KI-Look“), deshalb
// bleiben die Inhalte jetzt ruhig stehen – die Bewegung ist bewusst nur im Kopfbereich.
// Die Schnittstelle (delay, direction) bleibt, damit alle Seiten unverändert funktionieren.
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export const FadeIn = ({ children, className }: FadeInProps) => <div className={cn(className)}>{children}</div>;
