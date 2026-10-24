import { Play } from "lucide-react";
import { saveConsent, useConsent } from "@/lib/consent";

type Props = {
  src: string;
  title: string;
  className?: string;
  allow?: string;
  allowFullScreen?: boolean;
  /** Hintergrundvideo: ohne Zustimmung einfach nichts anzeigen statt Platzhalter */
  background?: boolean;
};

const ALLOW = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

// YouTube & Co. erst nach Einwilligung laden, vorher ein Platzhalter mit „Video laden“
export const ExternalEmbed = ({ src, title, className, allow = ALLOW, allowFullScreen, background }: Props) => {
  const { media } = useConsent();
  if (media) {
    return <iframe src={src} title={title} allow={allow} allowFullScreen={allowFullScreen} className={className} />;
  }
  if (background) return null;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-secondary to-[#1e9fae] p-4 text-center text-white">
      <button
        type="button"
        onClick={(e) => {
          // nicht gleichzeitig die umgebende Karte (Kontaktformular) auslösen
          e.stopPropagation();
          saveConsent(true);
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur transition hover:scale-110 hover:bg-white/30"
        aria-label="Video laden"
      >
        <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />
      </button>
      <p className="max-w-sm text-xs text-white/80">
        Dieses Video wird von YouTube geladen. Mit Klick stimmen Sie zu, dass Daten an Google übermittelt werden.
      </p>
    </div>
  );
};
