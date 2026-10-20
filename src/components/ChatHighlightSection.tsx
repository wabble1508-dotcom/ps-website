import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";

const pick = (lang: string, obj: { de: string; en: string; tr: string }) =>
  (obj as Record<string, string>)[lang] || obj.de;

export const ChatHighlightSection = () => {
  const { language } = useLanguage();

  const [chatState, setChatState] = useState<"idle" | "typing" | "answered">(
    "idle",
  );
  const [userMessage, setUserMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  const handleChatSimulation = (type: string) => {
    setChatState("typing");
    if (type === "termin") {
      setUserMessage(
        pick(language, {
          de: "Ich brauche einen Termin.",
          en: "I need an appointment.",
          tr: "Bir randevuya ihtiyacım var.",
        }),
      );
      setTimeout(() => {
        setChatMessage(
          pick(language, {
            de: "Gerne! Wann passt es Ihnen am besten? Ich habe morgen um 10:00 oder 14:00 Uhr noch etwas frei.",
            en: "I'd be happy to help! When would you like to come in? I have availability tomorrow at 10 AM or 2 PM.",
            tr: "Memnuniyetle! Ne zaman uygun? Yarın 10:00 veya 14:00'te yerim var.",
          }),
        );
        setChatState("answered");
      }, 1500);
    } else if (type === "preise") {
      setUserMessage(
        pick(language, {
          de: "Was kostet eine Webseite?",
          en: "How much does a website cost?",
          tr: "Bir web sitesi ne kadar?",
        }),
      );
      setTimeout(() => {
        setChatMessage(
          pick(language, {
            de: "Unsere Webseiten starten bei 1.500€, je nach Anforderung. Soll ich Ihnen einen kostenlosen Beratungstermin eintragen?",
            en: "Our websites start at €1,500 depending on your needs. Would you like to schedule a free consultation?",
            tr: "Web sitelerimiz ihtiyaca göre 1.500€'dan başlıyor. Ücretsiz bir danışmanlık randevusu ister misiniz?",
          }),
        );
        setChatState("answered");
      }, 1500);
    } else {
      setUserMessage(
        pick(language, {
          de: "Ich habe eine Frage.",
          en: "I have a question.",
          tr: "Bir sorum var.",
        }),
      );
      setTimeout(() => {
        setChatMessage(
          pick(language, {
            de: "Klar! Was möchten Sie wissen?",
            en: "Sure! What would you like to know?",
            tr: "Tabii! Ne öğrenmek istersiniz?",
          }),
        );
        setChatState("answered");
      }, 1500);
    }
  };

  return (
    <section className="py-24 bg-background overflow-hidden border-t border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <FadeIn direction="left">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-6">
              {pick(language, {
                de: "Neues Feature",
                en: "New Feature",
                tr: "Yeni Özellik",
              })}
            </div>
            <h2 className="mb-6 text-3xl font-bold md:text-5xl text-secondary leading-tight">
              {pick(language, {
                de: "Intelligenter KI Live-Chat",
                en: "Intelligent AI Live Chat",
                tr: "Akıllı Yapay Zeka Canlı Sohbet",
              })}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
              {pick(language, {
                de: "Verwandeln Sie Website-Besucher automatisch in qualifizierte Leads. Unser KI-Chat beantwortet Fragen 24/7, qualifiziert Interessenten und bucht Termine direkt in Ihren Kalender.",
                en: "Turn website visitors into qualified leads automatically. Our AI chat answers questions 24/7, qualifies prospects, and books appointments directly in your calendar.",
                tr: "Web sitesi ziyaretçilerini otomatik olarak nitelikli müşterilere dönüştürün. Yapay zeka sohbetimiz 7/24 soruları yanıtlar, ilgilenenleri nitelendirir ve randevuları doğrudan takviminize ayarlar.",
              })}
            </p>
            <ul className="mb-10 space-y-4">
              {[
                pick(language, {
                  de: "24/7 sofortige Antworten auf Kundenfragen",
                  en: "24/7 instant answers to customer questions",
                  tr: "7/24 müşteri sorularına anında yanıt",
                }),
                pick(language, {
                  de: "Automatisierte Lead-Qualifizierung",
                  en: "Automated lead qualification",
                  tr: "Otomatik potansiyel müşteri nitelendirme",
                }),
                pick(language, {
                  de: "Direkte Terminbuchung integriert",
                  en: "Direct appointment booking integration",
                  tr: "Doğrudan randevu entegrasyonu",
                }),
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 font-medium text-secondary"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm">
                    ✓
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className="h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-base sm:text-lg font-semibold shadow-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto whitespace-normal"
              onClick={() => (window.location.href = "/ki-live-chat")}
            >
              {pick(language, {
                de: "KI-Chat entdecken",
                en: "Discover AI Chat",
                tr: "Yapay Zeka Sohbeti Keşfet",
              })}
            </Button>
          </FadeIn>
          <FadeIn className="relative" direction="right">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border bg-gradient-to-br from-muted/50 to-muted/20 p-6 md:p-10 min-h-[400px]">
              <img
                src="/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Robot/3D/robot_3d.png"
                alt="AI Chat"
                className="w-32 h-32 mx-auto drop-shadow-2xl animate-bounce"
                style={{ animationDuration: "3s" }}
              />
              <div className="mt-8 space-y-4">
                <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-md max-w-[85%] inline-block">
                  <p className="text-sm md:text-base font-medium text-secondary">
                    {pick(language, {
                      de: "Hallo! Wie kann ich Ihnen heute helfen?",
                      en: "Hello! How can I help you today?",
                      tr: "Merhaba! Bugün size nasıl yardımcı olabilirim?",
                    })}
                  </p>
                </div>

                {chatState !== "idle" && (
                  <div className="bg-primary text-white p-5 rounded-2xl rounded-tr-none shadow-md max-w-[85%] ml-auto block animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-sm md:text-base font-medium">
                      {userMessage}
                    </p>
                  </div>
                )}

                {chatState === "typing" && (
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-md max-w-[85%] inline-block animate-in fade-in">
                    <div className="flex gap-1.5 items-center h-6">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></span>
                      <span
                        className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></span>
                    </div>
                  </div>
                )}

                {chatState === "answered" && (
                  <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-md max-w-[85%] inline-block animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-sm md:text-base font-medium text-secondary">
                      {chatMessage}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-border mt-6 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs rounded-full bg-white hover:bg-muted"
                    onClick={() => handleChatSimulation("termin")}
                    disabled={chatState === "typing"}
                  >
                    {pick(language, {
                      de: "Termin buchen",
                      en: "Book appointment",
                      tr: "Randevu al",
                    })}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs rounded-full bg-white hover:bg-muted"
                    onClick={() => handleChatSimulation("preise")}
                    disabled={chatState === "typing"}
                  >
                    {pick(language, {
                      de: "Preise",
                      en: "Prices",
                      tr: "Fiyatlar",
                    })}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs rounded-full bg-white hover:bg-muted"
                    onClick={() => handleChatSimulation("frage")}
                    disabled={chatState === "typing"}
                  >
                    {pick(language, {
                      de: "Frage stellen",
                      en: "Ask question",
                      tr: "Soru sor",
                    })}
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
