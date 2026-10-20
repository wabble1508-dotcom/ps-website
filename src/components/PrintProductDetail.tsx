import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import type { PrintCategory } from "@/lib/printShopData";

const WHATSAPP_NUMBER = "4915207595260";
const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const pick = (lang: string, obj: { de: string; en: string; tr: string }) =>
  (obj as Record<string, string>)[lang] || obj.de;

interface Props {
  lang: string;
  activeCategory: string;
  categories: PrintCategory[];
}

export function PrintProductDetail({
  lang,
  activeCategory,
  categories,
}: Props) {
  return (
    <div className="max-w-3xl mx-auto">
      {categories.map((c) => {
        if (c.id !== activeCategory) return null;
        const Icon = c.icon;
        const waMessage =
          lang === "en"
            ? `Hello Pankaj, I'm interested in your design & print service — category: ${c.tEn}. Please send me details & pricing.`
            : lang === "tr"
              ? `Merhaba Pankaj, tasarım & baskı servisinizle ilgileniyorum — kategori: ${c.tTr}. Lütfen detay ve fiyat gönderin.`
              : `Hallo Pankaj, ich interessiere mich für Ihren Design & Druck-Service (Kategorie: ${c.tDe}). Bitte senden Sie mir Details & Preise.`;
        return (
          <Card
            key={c.id}
            className="p-6 sm:p-8 border-border bg-card rounded-3xl shadow-lg"
          >
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">
                    {pick(lang, {
                      de: c.tDe,
                      en: c.tEn,
                      tr: c.tTr,
                    })}
                  </h3>
                  <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {pick(lang, {
                      de: c.priceDe,
                      en: c.priceEn,
                      tr: c.priceTr,
                    })}
                  </span>
                </div>
                <p className="text-muted-foreground mb-5">
                  {pick(lang, {
                    de: c.dDe,
                    en: c.dEn,
                    tr: c.dTr,
                  })}
                </p>

                {/* Scarcity */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-muted-foreground">
                      {pick(lang, {
                        de: "Verfügbare Plätze diese Woche",
                        en: "Available slots this week",
                        tr: "Bu haftaki müsait yerler",
                      })}
                    </span>
                    <span className="text-primary">
                      {pick(lang, {
                        de: `Nur noch ${c.stock} verfügbar`,
                        en: `Only ${c.stock} left`,
                        tr: `Sadece ${c.stock} kaldı`,
                      })}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(c.stock * 12, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                  {(lang === "en"
                    ? [
                        "Premium materials & finishes",
                        "Brand-strong custom design",
                        "Free shipping in Germany",
                        "Satisfaction guarantee",
                      ]
                    : lang === "tr"
                      ? [
                          "Premium malzemeler & kaplamalar",
                          "Markaya özel güçlü tasarım",
                          "Almanya'da ücretsiz kargo",
                          "Memnuniyet garantisi",
                        ]
                      : [
                          "Premium-Materialien & Veredelung",
                          "Markenstarkes individuelles Design",
                          "Versandkostenfrei in Deutschland",
                          "Zufriedenheitsgarantie",
                        ]
                  ).map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 font-bold rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white shadow-md"
                  onClick={() =>
                    window.open(
                      buildWhatsAppLink(waMessage),
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {pick(lang, {
                    de: "Jetzt per WhatsApp anfragen",
                    en: "Order via WhatsApp",
                    tr: "WhatsApp ile sipariş ver",
                  })}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
