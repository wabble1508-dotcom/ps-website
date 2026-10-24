import { ShieldCheck, Award, Lock, CheckCircle, BadgeEuro } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const pick = (lang: string, obj: { de: string; en: string; tr: string }) =>
  (obj as Record<string, string>)[lang] || obj.de;

export const TrustSeals = () => {
  const { language } = useLanguage();

  const seals = [
    {
      icon: ShieldCheck,
      text: pick(language, {
        de: "Datenschutz nach DSGVO",
        en: "Privacy under GDPR",
        tr: "GDPR'a uygun veri koruma",
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
        de: "Persönlicher Ansprechpartner",
        en: "Personal contact person",
        tr: "Kişisel muhatap",
      }),
    },
    {
      icon: BadgeEuro,
      text: pick(language, {
        de: "Transparente Festpreise",
        en: "Transparent fixed prices",
        tr: "Şeffaf sabit fiyatlar",
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
