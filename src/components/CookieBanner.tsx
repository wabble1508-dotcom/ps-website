import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setIsVisible(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem("cookieConsent", "necessary");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f222d] text-white p-4 shadow-2xl border-t border-white/10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/80 max-w-4xl">
          Wir verwenden Cookies, um unsere Website für Sie optimal zu gestalten
          und unsere Dienste zu verbessern. In unseren Datenschutzbestimmungen
          erfahren Sie mehr darüber.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
            onClick={acceptNecessary}
          >
            Nur notwendige
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={acceptAll}
          >
            Alle akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
};
