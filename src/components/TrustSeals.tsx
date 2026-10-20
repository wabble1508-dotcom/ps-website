import { ShieldCheck, Award, Lock, CheckCircle, Star } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const pick = (lang: string, obj: { de: string; en: string; tr: string }) =>
  (obj as Record<string, string>)[lang] || obj.de;

export const TrustSeals = () => {
  const { language } = useLanguage();

  const seals = [
    {
      icon: ShieldCheck,
      text: pick(language, {
        de: "100% DSGVO Konform",
        en: "100% GDPR Compliant",
        tr: "100% GDPR Uyumlu",
      }),
    },
    {
      icon: Lock,
      text: pick(language, {
        de: "SSL Verschlüsselt",
        en: "SSL Encrypted",
        tr: "SSL Şifreli",
      }),
    },
    {
      icon: Award,
      text: pick(language, {
        de: "Zertifizierte Qualität 2025",
        en: "Certified Quality 2025",
        tr: "Sertifikalı Kalite 2025",
      }),
    },
    {
      icon: Star,
      text: pick(language, {
        de: "5.0 Google Bewertung",
        en: "5.0 Google Rating",
        tr: "5.0 Google Derecelendirme",
      }),
    },
    {
      icon: CheckCircle,
      text: pick(language, {
        de: "Made in Germany",
        en: "Made in Germany",
        tr: "Almanya'da Üretildi",
      }),
    },
  ];

  return (
    <div className="w-full py-8 bg-white/50 backdrop-blur-sm border-y border-border overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {seals.map((seal, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full shadow-sm border border-border/50 hover:shadow-md hover:border-primary/30 transition-all duration-300"
            >
              <seal.icon className="h-5 w-5 text-primary" />
              <span className="font-bold text-xs md:text-sm text-secondary whitespace-nowrap">
                {seal.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
