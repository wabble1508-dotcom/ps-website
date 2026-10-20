import { useState } from "react";
import {
  Check,
  ArrowRight,
  Laptop,
  Search,
  MessageSquare,
  Phone,
  LayoutDashboard,
  Calendar,
} from "lucide-react";
import { Button } from "./ui/button";
import { useContactForm } from "./ContactFormDialog";
import { useLanguage } from "./LanguageContext";
import { FadeIn } from "./FadeIn";

const featuresDe = [
  {
    id: "web",
    label: "Neue Webseite / Redesign",
    icon: Laptop,
    desc: "Modern, schnell & verkaufsstark",
  },
  {
    id: "seo",
    label: "Google Sichtbarkeit (SEO)",
    icon: Search,
    desc: "Gefunden werden, wenn Kunden suchen",
  },
  {
    id: "chat",
    label: "KI Live-Chat für Website",
    icon: MessageSquare,
    desc: "24/7 Fragen klären & Leads sammeln",
  },
  {
    id: "phone",
    label: "KI Telefon-Assistent",
    icon: Phone,
    desc: "Keine verpassten Anrufe mehr",
  },
  {
    id: "crm",
    label: "Zentrales Lead-Dashboard",
    icon: LayoutDashboard,
    desc: "Alle Kundenanfragen an einem Ort",
  },
  {
    id: "auto",
    label: "Termin-Automatisierung",
    icon: Calendar,
    desc: "Online-Buchung & SMS-Erinnerungen",
  },
];

const featuresEn = [
  {
    id: "web",
    label: "New Website / Redesign",
    icon: Laptop,
    desc: "Modern, fast & high-converting",
  },
  {
    id: "seo",
    label: "Google Visibility (SEO)",
    icon: Search,
    desc: "Get found when clients search",
  },
  {
    id: "chat",
    label: "AI Live Chat for Website",
    icon: MessageSquare,
    desc: "24/7 answers & lead generation",
  },
  {
    id: "phone",
    label: "AI Phone Assistant",
    icon: Phone,
    desc: "No more missed calls",
  },
  {
    id: "crm",
    label: "Central Lead Dashboard",
    icon: LayoutDashboard,
    desc: "All inquiries in one place",
  },
  {
    id: "auto",
    label: "Appointment Automation",
    icon: Calendar,
    desc: "Online booking & SMS reminders",
  },
];

export function PackageConfigurator() {
  const [selected, setSelected] = useState<string[]>([]);
  const { openForm } = useContactForm();
  const { language } = useLanguage();
  const features = language === "de" ? featuresDe : featuresEn;

  const toggleFeature = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const getRecommendation = () => {
    const count = selected.length;
    if (count === 0) return null;

    if (count >= 5) {
      return {
        name:
          language === "de" ? "All-in-One KI-System" : "All-in-One AI System",
        desc:
          language === "de"
            ? "Die Komplettlösung für maximale Dominanz und volle Automatisierung."
            : "The complete solution for maximum dominance and full automation.",
        color: "bg-primary text-primary-foreground",
        level: "Premium",
      };
    } else if (count >= 3) {
      return {
        name: language === "de" ? "Growth Paket" : "Growth Package",
        desc:
          language === "de"
            ? "Perfekt für spürbares Wachstum und deutliche Zeitersparnis."
            : "Perfect for noticeable growth and significant time savings.",
        color: "bg-accent text-accent-foreground",
        level: "Advanced",
      };
    } else {
      return {
        name: language === "de" ? "Starter Paket" : "Starter Package",
        desc:
          language === "de"
            ? "Der ideale Einstieg in die digitale Sichtbarkeit und Automatisierung."
            : "The ideal entry into digital visibility and automation.",
        color: "bg-secondary text-secondary-foreground",
        level: "Basic",
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="grid lg:grid-cols-5 gap-12">
        {/* Left: Selection */}
        <div className="lg:col-span-3">
          <h3 className="text-2xl font-bold text-secondary mb-2">
            {language === "de"
              ? "1. Was benötigen Sie?"
              : "1. What do you need?"}
          </h3>
          <p className="text-muted-foreground mb-8">
            {language === "de"
              ? "Wählen Sie Ihre gewünschten Funktionen aus."
              : "Select your desired features."}
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature) => {
              const isSelected = selected.includes(feature.id);
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col gap-3 ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                      : "border-border/50 bg-white hover:border-primary/30 hover:bg-muted/30"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div
                      className={`p-2 rounded-xl ${isSelected ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary text-sm mb-1">
                      {feature.label}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Recommendation */}
        <div className="lg:col-span-2">
          <div className="sticky top-32">
            <h3 className="text-2xl font-bold text-secondary mb-2">
              {language === "de"
                ? "2. Ihre Empfehlung"
                : "2. Your Recommendation"}
            </h3>
            <p className="text-muted-foreground mb-8">
              {language === "de"
                ? "Basierend auf Ihrer Auswahl."
                : "Based on your selection."}
            </p>

            {recommendation ? (
              <FadeIn>
                <div className="bg-white rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
                  <div
                    className={`${recommendation.color} p-8 text-center relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <SparklesIcon className="w-24 h-24" />
                    </div>
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                      {recommendation.level}
                    </span>
                    <h4 className="text-3xl font-bold mb-3">
                      {recommendation.name}
                    </h4>
                    <p className="text-white/90 text-sm">
                      {recommendation.desc}
                    </p>
                  </div>

                  <div className="p-8">
                    <h5 className="font-bold text-secondary mb-4 text-sm uppercase tracking-wider">
                      {language === "de"
                        ? "Enthaltene Features:"
                        : "Included Features:"}
                    </h5>
                    <ul className="space-y-3 mb-8">
                      {selected.map((id) => {
                        const feature = features.find((f) => f.id === id);
                        return (
                          <li
                            key={id}
                            className="flex items-start gap-3 text-sm text-muted-foreground"
                          >
                            <Check className="w-5 h-5 text-primary shrink-0" />
                            <span>
                              <strong className="text-secondary">
                                {feature?.label}
                              </strong>{" "}
                              - {feature?.desc}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    <Button
                      className="w-full h-auto min-h-[3.5rem] py-3 text-lg font-bold shadow-xl hover:scale-105 transition-transform whitespace-normal"
                      onClick={() => {
                        const selectedNames = selected
                          .map((id) => features.find((f) => f.id === id)?.label)
                          .join(", ");
                        openForm(
                          "contact",
                          `Paket: ${recommendation.name} | Features: ${selectedNames}`,
                        );
                      }}
                    >
                      {language === "de"
                        ? "Angebot anfordern"
                        : "Request Quote"}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <p className="text-center text-xs text-muted-foreground mt-4">
                      {language === "de"
                        ? "Kostenlos und unverbindlich."
                        : "Free and without obligation."}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ) : (
              <div className="bg-muted/30 rounded-3xl border-2 border-dashed border-border p-12 text-center flex flex-col items-center justify-center h-[400px]">
                <LayoutDashboard className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground font-medium">
                  {language === "de"
                    ? "Wählen Sie links Ihre gewünschten Features aus, um Ihre persönliche Paket-Empfehlung zu sehen."
                    : "Select your desired features on the left to see your personal package recommendation."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinelinejoin="round"
      {...props}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
