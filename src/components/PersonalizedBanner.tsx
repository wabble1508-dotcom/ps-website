import { useState, useEffect } from "react";
import { Sparkles, X } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export function PersonalizedBanner() {
  const [greeting, setGreeting] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const hour = new Date().getHours();
    const dayIndex = new Date().getDay();

    const daysDe = [
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
    ];
    const daysEn = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const day = language === "de" ? daysDe[dayIndex] : daysEn[dayIndex];

    let timeGreeting = language === "de" ? "Guten Tag" : "Good afternoon";
    if (hour < 12) {
      timeGreeting = language === "de" ? "Guten Morgen" : "Good morning";
    } else if (hour > 17) {
      timeGreeting = language === "de" ? "Guten Abend" : "Good evening";
    }

    if (language === "de") {
      setGreeting(
        `${timeGreeting}! Machen Sie diesen ${day} zu Ihrem erfolgreichsten Tag mit KI-Automation.`,
      );
    } else {
      setGreeting(
        `${timeGreeting}! Make this ${day} your most successful day with AI automation.`,
      );
    }
  }, [language]);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-3 flex items-center justify-center relative text-sm sm:text-base font-medium z-50 shadow-md">
      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-pulse shrink-0 text-yellow-300" />
      <span className="text-center pr-8">{greeting}</span>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 sm:right-4 hover:bg-white/20 rounded-full p-1 transition-colors"
        aria-label="Schließen"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
