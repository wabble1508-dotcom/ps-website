import { Star, Instagram, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContactForm } from "@/components/ContactFormDialog";
import { useLanguage } from "@/components/LanguageContext";

interface NfcShopHeroProps {
  selectedPlatform: "google" | "instagram" | "whatsapp";
  setSelectedPlatform: (platform: "google" | "instagram" | "whatsapp") => void;
}

export function NfcShopHero({
  selectedPlatform,
  setSelectedPlatform,
}: NfcShopHeroProps) {
  const { openForm } = useContactForm();
  const { language } = useLanguage();
  const pick = (de: string, en: string, tr: string) =>
    language === "en" ? en : language === "tr" ? tr : de;

  return (
    <section className="bg-gradient-to-br from-secondary via-[#153a48] to-[#1e9fae] py-16 md:py-24 text-white relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold border border-white/20 backdrop-blur-md mb-6">
              <Sparkles className="w-4 h-4 text-amber-300" />
              {pick(
                "NTAG215 NFC-Produkte für Google, Instagram & WhatsApp",
                "NTAG215 NFC Products for Google, Instagram & WhatsApp",
                "Google, Instagram & WhatsApp için NTAG215 NFC Ürünleri",
              )}
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              {pick(
                "Verwandeln Sie Vor-Ort-Gäste in 5-Sterne-Bewertungen & Follower",
                "Turn In-Store Guests into 5-Star Reviews & Followers",
                "Mağaza müşterilerini 5 yıldızlı değerlendirmelere ve takipçilere dönüştürün",
              )}
            </h1>
            <p className="text-base sm:text-xl text-white/90 mb-8 max-w-xl leading-relaxed">
              {pick(
                "Gedruckte NFC Tischaufsteller, Scheckkarten und Aufkleber. Kunde hält das Handy ran — Google-Bewertung, Instagram-Seite oder WhatsApp-Chat öffnen sich in Millisekunden.",
                "Custom NFC table stands, pocket cards, and stickers. Your customers tap their phone — Google reviews, Instagram, or WhatsApp open instantly.",
                "Baskılı NFC masa standları, kartlar ve etiketler. Müşteri telefonunu yaklaştırır — Google değerlendirmesi, Instagram veya WhatsApp anında açılır.",
              )}
            </p>

            {/* Platform Selector Badge */}
            <div className="mb-8 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
                {pick(
                  "Wählen Sie Ihre Ziel-Plattform:",
                  "Select Target Platform:",
                  "Hedef platformunuzu seçin:",
                )}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedPlatform("google")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    selectedPlatform === "google"
                      ? "bg-white text-secondary shadow-lg scale-105"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  Google Reviews
                </button>
                <button
                  onClick={() => setSelectedPlatform("instagram")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    selectedPlatform === "instagram"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <Instagram className="w-4 h-4" />
                  Instagram Follow
                </button>
                <button
                  onClick={() => setSelectedPlatform("whatsapp")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    selectedPlatform === "whatsapp"
                      ? "bg-[#25D366] text-white shadow-lg scale-105"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Chat
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="h-auto min-h-[3.5rem] py-3 px-8 text-base sm:text-lg font-bold shadow-xl hover:scale-105 transition-transform duration-300 bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-full"
              >
                <a
                  href={`https://wa.me/4915207595260?text=${encodeURIComponent(
                    `Hallo Pankaj, ich interessiere mich für die NFC-Karten & Aufsteller (${selectedPlatform.toUpperCase()}). Bitte lass uns Details und Preise direkt abstimmen.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 mr-1" />
                  {pick(
                    "Jetzt per WhatsApp anfragen",
                    "Inquire via WhatsApp",
                    "WhatsApp ile Bilgi & Fiyat Al",
                  )}
                </a>
              </Button>
              <a href="#produkte">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-auto min-h-[3.5rem] py-3 px-8 text-base sm:text-lg font-bold bg-white/10 text-white border-white/30 hover:bg-white/20 rounded-full w-full sm:w-auto"
                >
                  {pick(
                    "Produkte & Formate ansehen",
                    "View Formats",
                    "Ürünleri ve formatları gör",
                  )}
                </Button>
              </a>
            </div>
          </div>

          {/* Product Images Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group w-full max-w-md">
              <div className="absolute -inset-4 bg-amber-400/20 rounded-3xl blur-3xl group-hover:bg-amber-400/30 transition-all duration-500"></div>
              <div className="relative bg-card/90 dark:bg-card/80 backdrop-blur-md p-4 rounded-3xl border border-white/30 dark:border-border shadow-2xl overflow-hidden">
                <img
                  src={
                    selectedPlatform === "whatsapp"
                      ? "/media/vibe.filesafe.space/1778931020193405557/attachments/0bc4dc89-1898-4712-b889-5603a2eeb816.png"
                      : selectedPlatform === "instagram"
                        ? "/media/vibe.filesafe.space/1778931020193405557/attachments/c63ba50b-7667-4b4d-8304-e694dce5bbff.png"
                        : "/media/vibe.filesafe.space/1778931020193405557/attachments/5bf63474-2030-4a26-92b8-81400b6a8a5b.png"
                  }
                  alt="NFC Google, Instagram & WhatsApp Aufsteller & Karten"
                  className="w-full h-56 sm:h-64 object-contain rounded-2xl bg-white/90 p-2 transition-all duration-300 drop-shadow-md"
                />
                <div className="mt-3 bg-secondary/80 text-white p-3 rounded-xl text-center border border-white/10">
                  <p className="text-xs font-bold tracking-wide uppercase text-amber-300">
                    {selectedPlatform === "google" &&
                      pick(
                        "Google Bewertungs-Aufsteller & Karten (128x76 mm)",
                        "Google Review Stands & Cards (128x76 mm)",
                        "Google Değerlendirme Standları & Kartları (128x76 mm)",
                      )}
                    {selectedPlatform === "instagram" &&
                      pick(
                        "Instagram Follow Aufsteller & Plate-Sticker",
                        "Instagram Follow Stands & Plate Stickers",
                        "Instagram Takip Standları & Plate Etiketleri",
                      )}
                    {selectedPlatform === "whatsapp" &&
                      pick(
                        "WhatsApp Kundenservice Tischaufsteller",
                        "WhatsApp Customer Service Table Stands",
                        "WhatsApp Müşteri Hizmetleri Masa Standları",
                      )}
                  </p>
                  <p className="text-[11px] text-white/80 mt-0.5">
                    {pick(
                      "Original NTAG215 Chips • Schlüsselfertig programmiert",
                      "Original NTAG215 chips • Pre-programmed & Ready to use",
                      "Orijinal NTAG215 çipler • Önceden programlanmış, kullanıma hazır",
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
