import { useState, useEffect } from "react";
import { Phone, Mail, X } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.357.198-6.78 2.618-6.978 6.978-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.198 4.357 2.618 6.78 6.978 6.978 1.281.059 1.689.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.354-.198 6.778-2.618 6.978-6.978.059-1.281.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.198-4.354-2.617-6.78-6.977-6.978-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.06v14.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
  </svg>
);
import { useLanguage } from "./LanguageContext";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export function QuickContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:flex fixed bottom-6 left-6 z-30 flex-col items-start gap-3 pointer-events-none">
      {/* Menu Options */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 origin-bottom-left pointer-events-auto ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-0 opacity-0 translate-y-10"
        }`}
      >
        <a
          href="https://www.instagram.com/ps_professional_solutions/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-card p-3 pr-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all group border border-border"
        >
          <div className="bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] p-2 rounded-full text-white group-hover:scale-110 transition-transform">
            <InstagramIcon className="w-5 h-5" />
          </div>
          <span className="font-semibold text-secondary text-sm">
            Instagram
          </span>
        </a>

        <a
          href="https://www.tiktok.com/@psprofessional.solutions"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-card p-3 pr-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all group border border-border"
        >
          <div className="bg-foreground p-2 rounded-full text-background group-hover:scale-110 transition-transform">
            <TikTokIcon className="w-5 h-5" />
          </div>
          <span className="font-semibold text-secondary text-sm">TikTok</span>
        </a>

        <a
          href={`https://wa.me/4915207595260?text=${encodeURIComponent(
            language === "en"
              ? "Hello Pankaj, I'm interested in your services!"
              : language === "tr"
                ? "Merhaba Pankaj, hizmetlerinizle ilgileniyorum!"
                : "Hallo Pankaj, ich interessiere mich für Ihre Leistungen!",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-card p-3 pr-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all group border border-border"
        >
          <div className="bg-[#25D366]/10 p-2 rounded-full text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
            <WhatsAppIcon className="w-5 h-5" />
          </div>
          <span className="font-semibold text-secondary text-sm">
            {language === "en"
              ? "WhatsApp us"
              : language === "tr"
                ? "WhatsApp yazın"
                : "WhatsApp schreiben"}
          </span>
        </a>

        <a
          href="tel:+4915207595260"
          className="flex items-center gap-3 bg-card p-3 pr-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all group border border-border"
        >
          <div className="bg-primary/10 p-2 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
          </div>
          <span className="font-semibold text-secondary text-sm">
            {language === "en"
              ? "Call us"
              : language === "tr"
                ? "Arayın"
                : "Anrufen"}
          </span>
        </a>

        <a
          href="mailto:info@ps-professional-solutions.de"
          className="flex items-center gap-3 bg-card p-3 pr-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all group border border-border"
        >
          <div className="bg-primary/10 p-2 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </div>
          <span className="font-semibold text-secondary text-sm">
            {language === "en"
              ? "Send Email"
              : language === "tr"
                ? "E-posta gönderin"
                : "E-Mail senden"}
          </span>
        </a>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 pointer-events-auto ${
          isOpen
            ? "bg-secondary rotate-90"
            : "bg-[#25D366] hover:bg-[#1ebe5b] animate-bounce"
        }`}
        style={!isOpen ? { animationDuration: "3s" } : {}}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <WhatsAppIcon className="w-7 h-7" />
        )}
      </button>
    </div>
  );
}
