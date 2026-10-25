import { Check, Minus, Gift } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/components/LanguageContext";
import { packages } from "@/lib/pricingData";
import { getPricingT } from "@/lib/translations/pages/pricingIndex";

type Row = {
  labelDe: string;
  labelEn: string;
  labelTr: string;
  values: (boolean | "bonus" | string)[]; // one per package
};

const rows: Row[] = [
  {
    labelDe: "Professionell programmierte Website",
    labelEn: "Professionally coded website",
    labelTr: "Profesyonelce kodlanmış web sitesi",
    values: [true, true, true],
  },
  {
    labelDe: "Für Smartphone & Tablet optimiert",
    labelEn: "Optimised for smartphone & tablet",
    labelTr: "Akıllı telefon ve tablete uygun",
    values: [true, true, true],
  },
  {
    labelDe: "Hosting, SSL & Updates",
    labelEn: "Hosting, SSL & updates",
    labelTr: "Hosting, SSL ve güncellemeler",
    values: [true, true, true],
  },
  {
    labelDe: "Google-Unternehmensprofil einrichten",
    labelEn: "Google Business Profile setup",
    labelTr: "Google İşletme Profili kurulumu",
    values: [true, true, true],
  },
  {
    labelDe: "Anzahl Seiten",
    labelEn: "Number of pages",
    labelTr: "Sayfa sayısı",
    values: ["bis 4", "bis 8", "bis 8"],
  },
  {
    labelDe: "Individuelles Design",
    labelEn: "Custom design",
    labelTr: "Özel tasarım",
    values: [false, true, true],
  },
  {
    labelDe: "Lokales SEO für Google",
    labelEn: "Local SEO for Google",
    labelTr: "Google için yerel SEO",
    values: [false, true, true],
  },
  {
    labelDe: "KI-Live-Chat",
    labelEn: "AI live chat",
    labelTr: "AI canlı sohbet",
    values: [false, true, true],
  },
  {
    labelDe: "Online-Terminbuchung",
    labelEn: "Online booking",
    labelTr: "Online randevu",
    values: [false, true, true],
  },
  {
    labelDe: "Admin-Bereich für Anfragen & Termine",
    labelEn: "Admin area for enquiries & bookings",
    labelTr: "Talepler ve randevular için yönetim paneli",
    values: [false, true, true],
  },
  {
    labelDe: "KI-Telefonassistent 24/7",
    labelEn: "24/7 AI phone assistant",
    labelTr: "7/24 AI telefon asistanı",
    values: [false, false, true],
  },
  {
    labelDe: "Änderungen pro Monat",
    labelEn: "Changes per month",
    labelTr: "Aylık değişiklik",
    values: ["1 kleine", "30 Min.", "60 Min."],
  },
  {
    labelDe: "Monatlich kündbar",
    labelEn: "Cancellable monthly",
    labelTr: "Aylık iptal edilebilir",
    values: [true, true, true],
  },
];

const Cell = ({ val }: { val: boolean | "bonus" | string }) => {
  if (typeof val === "string" && val !== "bonus")
    return <span className="text-xs font-semibold text-foreground">{val}</span>;
  if (val === "bonus")
    return (
      <span className="inline-flex items-center justify-center">
        <Gift className="w-4 h-4 text-green-600 dark:text-green-400" />
      </span>
    );
  if (val === true)
    return (
      <span className="inline-flex items-center justify-center">
        <Check className="w-4 h-4 text-primary" />
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center">
      <Minus className="w-4 h-4 text-muted-foreground/30" />
    </span>
  );
};

export const PricingComparisonTable = () => {
  const { language } = useLanguage();
  const t = getPricingT(language);

  return (
    <section className="py-16 md:py-24 bg-muted/30 dark:bg-muted/20">
      <div className="container mx-auto px-4 max-w-5xl">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t.comparisonTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.comparisonDesc}
          </p>
        </FadeIn>

        <FadeIn>
          <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-card border-b border-border">
                  <th className="text-left p-4 font-bold text-foreground whitespace-nowrap min-w-[200px]">
                    {t.featureHeader}
                  </th>
                  {packages.map((pkg) => (
                    <th
                      key={pkg.id}
                      className={`text-center p-4 font-bold whitespace-nowrap ${
                        pkg.popular
                          ? "text-primary bg-primary/5"
                          : "text-foreground"
                      }`}
                    >
                      {language === "en" ? pkg.name.en : language === "tr" ? pkg.name.tr : pkg.name.de}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-border/60 ${
                      i % 2 === 0 ? "bg-card/50" : "bg-card"
                    }`}
                  >
                    <td className="text-left p-4 text-muted-foreground font-medium">
                      {language === "en"
                        ? row.labelEn
                        : language === "tr"
                          ? row.labelTr
                          : row.labelDe}
                    </td>
                    {row.values.map((val, j) => (
                      <td
                        key={j}
                        className={`text-center p-4 ${
                          packages[j].popular ? "bg-primary/5" : ""
                        }`}
                      >
                        <Cell val={val} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        <FadeIn className="mt-6">
          <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-primary" />
              {t.legendIncluded}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Minus className="w-3.5 h-3.5 text-muted-foreground/30" />
              {t.legendNot}
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
};
