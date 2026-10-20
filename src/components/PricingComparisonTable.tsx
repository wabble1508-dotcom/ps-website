import { Check, Minus, Gift } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/components/LanguageContext";
import { packages } from "@/lib/pricingData";
import { getPricingT } from "@/lib/translations/pages/pricingIndex";

type Row = {
  labelDe: string;
  labelEn: string;
  labelTr: string;
  values: (boolean | "bonus")[]; // one per package
};

const rows: Row[] = [
  {
    labelDe: "Moderne, responsive Website",
    labelEn: "Modern, responsive website",
    labelTr: "Modern, responsive web sitesi",
    values: [true, true, false],
  },
  {
    labelDe: "Smartphone & Tablet optimiert",
    labelEn: "Smartphone & tablet optimized",
    labelTr: "Akıllı telefon & tablet optimize",
    values: [true, true, false],
  },
  {
    labelDe: "Google Maps Integration",
    labelEn: "Google Maps integration",
    labelTr: "Google Maps entegrasyonu",
    values: [true, true, false],
  },
  {
    labelDe: "Kontaktformular / Anfragen",
    labelEn: "Contact form / inquiries",
    labelTr: "İletişim formu / Talepler",
    values: [true, true, false],
  },
  {
    labelDe: "SSL-Zertifikat",
    labelEn: "SSL certificate",
    labelTr: "SSL sertifikası",
    values: ["bonus", "bonus", "bonus"],
  },
  {
    labelDe: "Hosting inklusive",
    labelEn: "Hosting included",
    labelTr: "Hosting dahil",
    values: ["bonus", true, false],
  },
  {
    labelDe: "Termine & Anfragen aufs Handy",
    labelEn: "Appointments to your phone",
    labelTr: "Randevular ve talepler telefonunuza",
    values: [false, true, false],
  },
  {
    labelDe: "SMS-Erinnerungen (No-Show-Schutz)",
    labelEn: "SMS reminders (no-show protection)",
    labelTr: "SMS hatırlatmaları (gelmeyen koruması)",
    values: [false, true, false],
  },
  {
    labelDe: "Google-Bewertungen automatisch sammeln",
    labelEn: "Automatic Google review collection",
    labelTr: "Otomatik Google değerlendirme toplama",
    values: [false, "bonus", false],
  },
  {
    labelDe: "KI-Telefonassistent & Live-Chat",
    labelEn: "AI phone assistant & live chat",
    labelTr: "Yapay zeka telefon asistanı ve canlı sohbet",
    values: [false, "bonus", false],
  },
  {
    labelDe: "Zentrales CRM",
    labelEn: "Central CRM",
    labelTr: "Merkezi CRM",
    values: [false, true, false],
  },
  {
    labelDe: "Sicherheits-Backups",
    labelEn: "Security backups",
    labelTr: "Güvenlik yedeklemeleri",
    values: [false, "bonus", true],
  },
  {
    labelDe: "Software-Updates im Hintergrund",
    labelEn: "Background software updates",
    labelTr: "Arka planda yazılım güncellemeleri",
    values: [false, "bonus", true],
  },
  {
    labelDe: "Schutz vor Hackern & Malware",
    labelEn: "Hacker & malware protection",
    labelTr: "Hacker ve kötü amaçlı yazılım koruması",
    values: [false, "bonus", true],
  },
  {
    labelDe: "Laufende Wartung & Updates",
    labelEn: "Ongoing maintenance & updates",
    labelTr: "Sürekli bakım ve güncellemeler",
    values: [false, "bonus", false],
  },
  {
    labelDe: "Kleine Textänderungen auf Anfrage",
    labelEn: "Small text changes on request",
    labelTr: "İstek üzerine küçük metin değişiklikleri",
    values: [false, "bonus", "bonus"],
  },
  {
    labelDe: "Persönlicher Ansprechpartner",
    labelEn: "Personal contact",
    labelTr: "Kişisel iletişim kişisi",
    values: [false, "bonus", false],
  },
  {
    labelDe: "Monatlich kündbar",
    labelEn: "Monthly cancellable",
    labelTr: "Aylık iptal edilebilir",
    values: [true, true, true],
  },
];

const Cell = ({ val }: { val: boolean | "bonus" }) => {
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
                      {language === "en"
                        ? pkg.nameEn
                        : language === "tr"
                          ? pkg.nameTr
                          : pkg.nameDe}
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
              <Gift className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              {t.legendBonus}
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
