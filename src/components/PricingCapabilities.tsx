import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { useContactForm } from "@/components/ContactFormDialog";
import { useLanguage } from "@/components/LanguageContext";
import { getPricingT } from "@/lib/translations/pages/pricingIndex";

const capabilities = [
  {
    tDe: "KI Telefonassistent",
    tEn: "AI Phone Assistant",
    tTr: "Yapay Zeka Telefon Asistanı",
    dDe: "24/7 Anrufannahme & Termine.",
    dEn: "24/7 call handling & appointments.",
    dTr: "7/24 arama karşılama ve randevular.",
  },
  {
    tDe: "KI Live-Chat",
    tEn: "AI Live Chat",
    tTr: "Yapay Zeka Canlı Sohbet",
    dDe: "Qualifiziert Leads in Echtzeit.",
    dEn: "Qualifies leads in real-time.",
    dTr: "Potansiyel müşterileri gerçek zamanlı nitelendirir.",
  },
  {
    tDe: "Termin-Automation",
    tEn: "Appointment Automation",
    tTr: "Randevu Otomasyonu",
    dDe: "SMS-Erinnerungen gegen No-Shows.",
    dEn: "SMS reminders for no-shows.",
    dTr: "Gelmeyenlere karşı SMS hatırlatmaları.",
  },
  {
    tDe: "Live-Dashboard",
    tEn: "Live Dashboard",
    tTr: "Canlı Panel",
    dDe: "Alle Zahlen im Blick.",
    dEn: "All metrics at a glance.",
    dTr: "Tüm rakamlar tek bakışta.",
  },
  {
    tDe: "Zentrales CRM",
    tEn: "Central CRM",
    tTr: "Merkezi CRM",
    dDe: "Kundenverwaltung & History.",
    dEn: "Client management & history.",
    dTr: "Müşteri yönetimi ve geçmiş.",
  },
  {
    tDe: "Google SEO",
    tEn: "Google SEO",
    tTr: "Google SEO",
    dDe: "Lokal dominieren.",
    dEn: "Local dominance.",
    dTr: "Yerel olarak öne çıkın.",
  },
];

export const PricingCapabilities = () => {
  const { openForm } = useContactForm();
  const { language } = useLanguage();
  const t = getPricingT(language);
  const pick = (de: string, en: string, tr: string) =>
    language === "en" ? en : language === "tr" ? tr : de;

  return (
    <section className="py-20 bg-muted/30 dark:bg-muted/20">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t.capTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.capDesc}
          </p>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {capabilities.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all"
            >
              <h3 className="font-bold mb-2 text-foreground">
                {pick(f.tDe, f.tEn, f.tTr)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {pick(f.dDe, f.dEn, f.dTr)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Button
            size="lg"
            className="h-14 px-10 text-base font-semibold rounded-full"
            onClick={() => openForm("contact", "Preise Footer")}
          >
            {t.capBtn}
          </Button>
        </div>
      </div>
    </section>
  );
};
