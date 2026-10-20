import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { useContactForm } from "@/components/ContactFormDialog";
import { useLanguage } from "@/components/LanguageContext";
import { CreditCard, Store, ArrowRight, MessageCircle } from "lucide-react";
import {
  standProducts,
  cardProducts,
  stickerProducts,
} from "@/lib/nfcShopData";

interface NfcShopProductsProps {
  activeCategory: "stands" | "flat";
  setActiveCategory: (category: "stands" | "flat") => void;
  selectedPlatform: "google" | "instagram" | "whatsapp";
}

// Simulated limited stock per product id (scarcity)
const stockMap: Record<string, number> = {
  "stand-single": 7,
  "stand-double": 4,
  "stand-business": 3,
  "card-single": 12,
  "card-team": 5,
  "card-business": 2,
  "sticker-single": 15,
  "sticker-trio": 6,
  "sticker-bundle": 3,
};

export function NfcShopProducts({
  activeCategory,
  setActiveCategory,
  selectedPlatform,
}: NfcShopProductsProps) {
  const { openForm } = useContactForm();
  const { language } = useLanguage();
  const pick = (de: string, en: string, tr: string) =>
    language === "en" ? en : language === "tr" ? tr : de;

  const flatProducts = [...cardProducts, ...stickerProducts];
  const currentProducts =
    activeCategory === "stands" ? standProducts : flatProducts;

  return (
    <section
      id="produkte"
      className="py-16 md:py-24 bg-background scroll-mt-16"
    >
      <FadeIn className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            {pick("2 Formate", "2 Formats", "2 Format")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
            {pick(
              "Wählen Sie Ihr NFC-Format",
              "Choose Your NFC Format",
              "NFC Formatınızı Seçin",
            )}
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            {pick(
              "Tischaufsteller für die Theke oder flache Karten & Sticker für jede Oberfläche.",
              "Table stands for your counter or flat cards & stickers for any surface.",
              "Tezgah için masa standları veya her yüzey için düz kartlar ve etiketler.",
            )}
          </p>

          {/* Minimalist Category Selector */}
          <div className="mt-8 inline-flex p-1 bg-muted rounded-full border border-border">
            <button
              onClick={() => setActiveCategory("stands")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === "stands"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Store className="w-4 h-4" />
              <span>
                {pick("Tischaufsteller", "Table Stands", "Masa Standları")}
              </span>
            </button>
            <button
              onClick={() => setActiveCategory("flat")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === "flat"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>
                {pick(
                  "Karten & Sticker",
                  "Cards & Stickers",
                  "Kartlar & Etiketler",
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-6 lg:gap-8 items-stretch ${
            activeCategory === "stands"
              ? "md:grid-cols-3"
              : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {currentProducts.map((p, i) => {
            const stock = stockMap[p.id] ?? 5;
            const lowStock = stock <= 4;
            return (
              <FadeIn key={p.id} direction="up" delay={i * 80}>
                <div id={p.id} className="scroll-mt-32 h-full">
                  <Card
                    className={`relative h-full flex flex-col rounded-2xl border ${
                      p.popular
                        ? "border-primary/60 shadow-lg shadow-primary/5 bg-card"
                        : "border-border bg-card"
                    } overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
                  >
                    {p.popular && (
                      <div className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Bestseller
                      </div>
                    )}
                    <CardContent className="flex flex-col flex-1 p-6">
                      {/* Product Image */}
                      <div className="mb-5 bg-muted/40 dark:bg-muted/15 p-4 rounded-xl flex items-center justify-center">
                        <img
                          src={p.image}
                          alt={language === "en" ? p.nameEn : p.nameDe}
                          className="w-full h-32 object-contain"
                        />
                      </div>

                      <h3 className="text-lg font-bold mb-1.5 text-foreground">
                        {language === "en" ? p.nameEn : p.nameDe}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                        {language === "en" ? p.descEn : p.descDe}
                      </p>

                      {/* Price - minimal */}
                      {/* Price hidden per user request — negotiated directly via WhatsApp */}
                      <div className="mb-5 pt-3 border-t border-border/50">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span className="font-medium">
                            {language === "tr"
                              ? "Fiyat & Kişiselleştirme"
                              : language === "en"
                                ? "Pricing & Customization"
                                : "Preis & Personalisierung"}
                          </span>
                          <span className="inline-flex items-center text-primary font-semibold text-[11px] bg-primary/10 px-2 py-0.5 rounded-full">
                            {language === "tr"
                              ? "WhatsApp ile görüşülür"
                              : language === "en"
                                ? "Quote via WhatsApp"
                                : "Individuell via WhatsApp"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground/80 leading-relaxed mb-4">
                          {language === "tr"
                            ? "Fiyatlar sipariş adedi, logo baskısı ve NFC kodlamasına göre WhatsApp üzerinden bireysel belirlenir."
                            : language === "en"
                              ? "Pricing is tailored to quantity, branding and NFC configuration via WhatsApp."
                              : "Preise richten sich nach Stückzahl, Veredelung und NFC-Programmierung – transparent & direkt via WhatsApp."}
                        </p>

                        <Button
                          asChild
                          size="lg"
                          className="w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold h-11 text-sm rounded-full shadow-md hover:shadow-lg transition-all"
                        >
                          <a
                            href={`https://wa.me/4915207595260?text=${encodeURIComponent(
                              `Hallo Pankaj, ich interessiere mich für: ${language === "en" ? p.nameEn : p.nameDe} (${activeCategory === "stands" ? "Tischaufsteller" : "Karte / Sticker"}). Bitte sende mir Infos zu Preisen, Mengenrabatten und der NFC-Programmierung für mein Unternehmen.`,
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {pick(
                              "Preis via WhatsApp anfragen",
                              "Get Price via WhatsApp",
                              "Fiyatı WhatsApp ile Al",
                            )}
                            <ArrowRight className="ml-1 w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground max-w-xl mx-auto mt-10">
          {pick(
            "Alle Produkte werden von PS Professional Solutions mit NTAG215 High-Speed Chips programmiert und schlüsselfertig geliefert. Versandkostenfrei in Deutschland.",
            "All products are custom programmed by PS Professional Solutions with original NTAG215 chips. Free shipping within Germany.",
            "Tüm ürünler PS Professional Solutions tarafından orijinal NTAG215 çiplerle programlanır ve kullanıma hazır teslim edilir. Almanya içi kargo ücretsizdir.",
          )}
        </p>
      </FadeIn>
    </section>
  );
}
