import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-[160px] right-4 z-[55] h-10 w-10 rounded-full bg-background/90 dark:bg-slate-800/90 backdrop-blur-md shadow-xl border-border md:bottom-[180px] md:right-6 lg:bottom-28 lg:right-8 lg:h-12 lg:w-12 hover:scale-110 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
    >
      <ArrowUp className="h-6 w-6 text-primary" />
    </Button>
  );
};
