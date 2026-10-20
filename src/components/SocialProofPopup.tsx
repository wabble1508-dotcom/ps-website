import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { Card } from "./ui/card";
import { CheckCircle2, X } from "lucide-react";

const eventsDe = [
  {
    name: "M. Weber",
    city: "München",
    action: "hat eine KI-Analyse gebucht",
    time: "Vor 12 Minuten",
  },
  {
    name: "Sarah L.",
    city: "Berlin",
    action: "nutzt jetzt den KI-Telefon-Assistenten",
    time: "Vor 2 Stunden",
  },
  {
    name: "Thomas K.",
    city: "Hamburg",
    action: "hat den Potenzial-Check abgeschlossen",
    time: "Gestern",
  },
  {
    name: "Julia M.",
    city: "Köln",
    action: "hat sich für Webdesign beraten lassen",
    time: "Vor 3 Tagen",
  },
  {
    name: "Elena R.",
    city: "Wien",
    action: "hat eine Automatisierung angefragt",
    time: "Vor 5 Stunden",
  },
  {
    name: "Mateo C.",
    city: "Frankfurt",
    action: "nutzt nun den KI-Live-Chat",
    time: "Letzte Woche",
  },
  {
    name: "Youssef A.",
    city: "Düsseldorf",
    action: "hat den ROI-Rechner getestet",
    time: "Gestern",
  },
  {
    name: "Amina S.",
    city: "Stuttgart",
    action: "hat einen Termin gebucht",
    time: "Vor 4 Stunden",
  },
  {
    name: "David B.",
    city: "Zürich",
    action: "interessiert sich für SEO",
    time: "Vor 2 Tagen",
  },
  {
    name: "Maria G.",
    city: "Leipzig",
    action: "hat den Potenzial-Check abgeschlossen",
    time: "Vor 45 Minuten",
  },
  {
    name: "Ali H.",
    city: "Bremen",
    action: "hat eine KI-Analyse gebucht",
    time: "Vor 6 Stunden",
  },
  {
    name: "Sophie T.",
    city: "Hannover",
    action: "nutzt jetzt den KI-Telefon-Assistenten",
    time: "Letzte Woche",
  },
];

const eventsEn = [
  {
    name: "M. Weber",
    city: "Munich",
    action: "booked an AI analysis",
    time: "12 minutes ago",
  },
  {
    name: "Sarah L.",
    city: "Berlin",
    action: "is now using the AI Phone Assistant",
    time: "2 hours ago",
  },
  {
    name: "Thomas K.",
    city: "Hamburg",
    action: "completed the Potential Check",
    time: "Yesterday",
  },
  {
    name: "Julia M.",
    city: "Cologne",
    action: "got a consultation for web design",
    time: "3 days ago",
  },
  {
    name: "Elena R.",
    city: "Vienna",
    action: "requested an automation",
    time: "5 hours ago",
  },
  {
    name: "Mateo C.",
    city: "Frankfurt",
    action: "is now using the AI Live Chat",
    time: "Last week",
  },
  {
    name: "Youssef A.",
    city: "Dusseldorf",
    action: "tested the ROI calculator",
    time: "Yesterday",
  },
  {
    name: "Amina S.",
    city: "Stuttgart",
    action: "booked an appointment",
    time: "4 hours ago",
  },
  {
    name: "David B.",
    city: "Zurich",
    action: "is interested in SEO",
    time: "2 days ago",
  },
  {
    name: "Maria G.",
    city: "Leipzig",
    action: "completed the Potential Check",
    time: "45 minutes ago",
  },
  {
    name: "Ali H.",
    city: "Bremen",
    action: "booked an AI analysis",
    time: "6 hours ago",
  },
  {
    name: "Sophie T.",
    city: "Hanover",
    action: "is now using the AI Phone Assistant",
    time: "Last week",
  },
];

export const SocialProofPopup = () => {
  const { language } = useLanguage();
  const [currentEvent, setCurrentEvent] = useState(
    Math.floor(Math.random() * 12),
  );
  const [isVisible, setIsVisible] = useState(false);

  const events = language === "de" ? eventsDe : eventsEn;

  useEffect(() => {
    const showInterval = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }, 20000); // Show every 20s

    // Initial delay
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }, 10000);

    return () => {
      clearInterval(showInterval);
      clearTimeout(initialTimeout);
    };
  }, [events.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-4 right-4 sm:top-24 md:top-auto md:bottom-28 md:left-6 md:right-auto z-[60] animate-in slide-in-from-top-5 md:slide-in-from-bottom-5 fade-in duration-500 flex justify-center md:justify-start pointer-events-none">
      <Card className="p-3 md:p-4 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border-border/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm flex items-center gap-3 md:gap-4 pr-8 md:pr-10 relative rounded-xl md:rounded-2xl pointer-events-auto max-w-[280px] md:max-w-sm w-full md:w-auto">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground p-1"
        >
          <X className="h-3 w-3" />
        </button>
        <div className="bg-primary/10 p-2.5 rounded-full text-primary shrink-0">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-secondary">
            {events[currentEvent].name} {language === "de" ? "aus" : "from"}{" "}
            {events[currentEvent].city}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {events[currentEvent].action}
          </p>
          <p className="text-[10px] text-primary/80 font-semibold mt-1.5">
            {events[currentEvent].time}
          </p>
        </div>
      </Card>
    </div>
  );
};
