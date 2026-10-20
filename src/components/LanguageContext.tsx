import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: keyof (typeof translations)["de"], key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("app_language");
    const valid: string[] = [
      "de",
      "en",
      "es",
      "fr",
      "it",
      "tr",
      "ro",
      "ru",
      "bg",
      "ar",
      "zh",
      "fa",
      "ps",
    ];
    return saved && valid.includes(saved) ? (saved as Language) : "de";
  });

  useEffect(() => {
    localStorage.setItem("app_language", language);
    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "ar" || language === "fa" || language === "ps"
        ? "rtl"
        : "ltr";
  }, [language]);

  const t = (section: keyof (typeof translations)["de"], key: string) => {
    try {
      // @ts-ignore - dynamic key access
      return (
        translations[language][section][key] ||
        translations["de"][section][key] ||
        key
      );
    } catch (e) {
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const fallbackT = (_section: string, key: string) => key;

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Fallback for components rendered outside LanguageProvider
    return {
      language: "de" as Language,
      setLanguage: (_l: Language) => {},
      t: fallbackT,
    };
  }
  return context;
};
