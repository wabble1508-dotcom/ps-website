import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/components/LanguageContext";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";

const WHATSAPP_NUMBER = "4915207595260";

const pick = (lang: string, obj: { de: string; en: string; tr: string }) =>
  (obj as Record<string, string>)[lang] || obj.de;

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export const QuizSection = () => {
  const { language } = useLanguage();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const questions = [
    {
      id: 1,
      title: pick(language, {
        de: "In welcher Branche sind Sie tätig?",
        en: "What industry are you in?",
        tr: "Hangi sektörde faaliyet gösteriyorsunuz?",
      }),
      options: [
        {
          id: "handwerk",
          label: pick(language, {
            de: "Handwerk & Bau",
            en: "Crafts & Construction",
            tr: "Zanaatkârlık & İnşaat",
          }),
          emoji: "🔨",
        },
        {
          id: "kfz",
          label: pick(language, {
            de: "KFZ-Zulassung & Schilder (Matou, XL)",
            en: "Vehicle Registration & License Plates",
            tr: "Araç Tescili & Plakalar (Matou, XL)",
          }),
          emoji: "🚗",
        },
        {
          id: "festivals",
          label: pick(language, {
            de: "Festivals & Events (Sunset Sounds)",
            en: "Festivals & Events",
            tr: "Festivaller & Etkinlikler (Sunset Sounds)",
          }),
          emoji: "🎪",
        },
        {
          id: "vereine",
          label: pick(language, {
            de: "Vereine & Verbände (Cohedo)",
            en: "Clubs & Associations",
            tr: "Dernekler & Birlikler (Cohedo)",
          }),
          emoji: "🤝",
        },
        {
          id: "textil",
          label: pick(language, {
            de: "Textil, Mode & Merch",
            en: "Textile & Fashion",
            tr: "Tekstil, Moda & Merch",
          }),
          emoji: "👕",
        },
        {
          id: "beauty",
          label: pick(language, {
            de: "Beauty & Wellness",
            en: "Beauty & Wellness",
            tr: "Güzellik & Wellness",
          }),
          emoji: "💅",
        },
        {
          id: "gesundheit",
          label: pick(language, {
            de: "Gesundheitswesen & Praxen",
            en: "Healthcare & Clinics",
            tr: "Sağlık & Muayenehaneler",
          }),
          emoji: "🩺",
        },
        {
          id: "andere",
          label: pick(language, {
            de: "Sonstige Dienstleistungen",
            en: "Other Services",
            tr: "Diğer Hizmetler",
          }),
          emoji: "🏢",
        },
      ],
    },
    {
      id: 2,
      title: pick(language, {
        de: "Was ist Ihre aktuell größte Herausforderung?",
        en: "What is your biggest current challenge?",
        tr: "Şu anki en büyük zorluğunuz nedir?",
      }),
      options: [
        {
          id: "telefon",
          label: pick(language, {
            de: "Ständige Telefonunterbrechungen",
            en: "Too many phone interruptions",
            tr: "Sürekli telefon kesintileri",
          }),
          emoji: "📞",
        },
        {
          id: "kunden",
          label: pick(language, {
            de: "Zu wenig qualifizierte Neukunden",
            en: "Not enough new customers",
            tr: "Yeterli yeni müşteri yok",
          }),
          emoji: "📉",
        },
        {
          id: "termine",
          label: pick(language, {
            de: "Terminausfälle & Chaos",
            en: "No-shows and appointment chaos",
            tr: "Randevu iptalleri & kaos",
          }),
          emoji: "📅",
        },
        {
          id: "website",
          label: pick(language, {
            de: "Veraltete oder unsichtbare Website",
            en: "Outdated online presence",
            tr: "Eski veya görünmez web sitesi",
          }),
          emoji: "🖥️",
        },
      ],
    },
    {
      id: 3,
      title: pick(language, {
        de: "Was ist Ihr Hauptziel für die nächsten 6 Monate?",
        en: "What is your primary goal for the next 6 months?",
        tr: "Önümüzdeki 6 ay için ana hedefiniz nedir?",
      }),
      options: [
        {
          id: "zeit",
          label: pick(language, {
            de: "Zeit sparen & automatisieren",
            en: "Save time & automate",
            tr: "Zaman kazan & otomatikleştir",
          }),
          emoji: "⏱️",
        },
        {
          id: "umsatz",
          label: pick(language, {
            de: "Umsatz steigern & mehr Leads",
            en: "Increase revenue & leads",
            tr: "Geliri artır & daha fazla müşteri",
          }),
          emoji: "💰",
        },
        {
          id: "image",
          label: pick(language, {
            de: "Professionelleres Image aufbauen",
            en: "Improve professional image",
            tr: "Profesyonel imaj oluştur",
          }),
          emoji: "✨",
        },
      ],
    },
  ];

  const handleSelect = (optionId: string) => {
    setAnswers({ ...answers, [step]: optionId });
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        setStep(4);
        setIsCalculating(false);
      }, 1800);
    }
  };

  const getRecommendation = () => {
    const industry = answers[1];
    const problem = answers[2];

    if (industry === "kfz") {
      return {
        title: pick(language, {
          de: "KFZ Kennzeichen-Konfigurator & Behörden-Direktlink Automation",
          en: "KFZ Plate Configurator & Direct Authority Link Automation",
          tr: "Araç Plaka Konfigüratörü & Daire Doğrudan Bağlantı Otomasyonu",
        }),
        desc: pick(language, {
          de: "Ermöglicht es Fahrzeughaltern, ihr Wunschkennzeichen einzugeben, die Verfügbarkeit bei der lokalen Zulassungsstelle zu prüfen und direkt zur Anmeldestelle ihrer Stadt weiterzuleiten.",
          en: "Allows vehicle owners to enter their custom plate, check local registration office availability, and automatically redirect to their city's registration portal.",
          tr: "Araç sahiplerinin istedikleri plakayı girmesini, yerel tescil dairesindeki müsaitliği kontrol etmesini ve doğrudan şehirlerinin tescil portalına yönlendirilmesini sağlar.",
        }),
      };
    }

    if (problem === "telefon" || problem === "termine") {
      return {
        title: pick(language, {
          de: "KI-Telefon-Assistent & Termin-Automation",
          en: "AI Telephone Assistant & Booking",
          tr: "Yapay Zeka Telefon Asistanı & Randevu Otomasyonu",
        }),
        desc: pick(language, {
          de: "Basierend auf Ihren Antworten wird Ihnen ein KI-Sprachassistent kombiniert mit smarter Terminbuchung die meiste Zeit sparen und den Telefonstress eliminieren.",
          en: "Based on your answers, an AI voice assistant combined with smart scheduling will save you the most time and eliminate phone stress.",
          tr: "Cevaplarınıza göre, akıllı randevu sistemiyle birleşen bir yapay zeka sesli asistanı size en çok zaman kazandıracak ve telefon stresini ortadan kaldıracak.",
        }),
      };
    }
    if (problem === "website" || answers[3] === "image") {
      return {
        title: pick(language, {
          de: "High-Conversion Webdesign & SEO",
          en: "High-Conversion Webdesign & SEO",
          tr: "Yüksek Dönüşümlü Web Tasarım & SEO",
        }),
        desc: pick(language, {
          de: "Um Vertrauen aufzubauen und online gefunden zu werden, ist eine moderne, SEO-optimierte Website Ihr perfekter nächster Schritt.",
          en: "To build trust and get found online, a modern, SEO-optimized website is your perfect next step.",
          tr: "Güven oluşturmak ve online bulunmak için modern, SEO optimize bir web sitesi mükemmel sonraki adımdır.",
        }),
      };
    }
    return {
      title: pick(language, {
        de: "KI Live-Chat & Leadgenerierung",
        en: "AI Live Chat & Lead Generation",
        tr: "Yapay Zeka Canlı Sohbet & Müşteri Kazanma",
      }),
      desc: pick(language, {
        de: "Um mehr qualifizierte Kunden zu gewinnen, wird ein intelligenter KI-Chat auf Ihrer Seite rund um die Uhr Leads erfassen und qualifizieren.",
        en: "To generate more qualified customers, an intelligent AI chat on your site will capture and qualify leads 24/7.",
        tr: "Daha fazla nitelikli müşteri kazanmak için sitenizdeki akıllı yapay zeka sohbeti 7/24 müşteri yakalar ve nitelendirir.",
      }),
    };
  };

  const sendWhatsApp = () => {
    const industryLabel =
      questions[0].options.find((o) => o.id === answers[1])?.label || "";
    const challengeLabel =
      questions[1].options.find((o) => o.id === answers[2])?.label || "";
    const goalLabel =
      questions[2].options.find((o) => o.id === answers[3])?.label || "";
    const rec = getRecommendation();
    const greeting =
      language === "tr"
        ? "Merhaba Pankaj, ana sayfadaki quizi doldurdum:"
        : language === "en"
          ? "Hello Pankaj, I completed the quiz on your homepage:"
          : "Hallo Pankaj, ich habe das Quiz auf Ihrer Startseite ausgefüllt:";
    const industryHeading =
      language === "tr" ? "Sektör" : language === "en" ? "Industry" : "Branche";
    const challengeHeading =
      language === "tr"
        ? "Zorluk"
        : language === "en"
          ? "Challenge"
          : "Herausforderung";
    const goalHeading =
      language === "tr" ? "Hedef" : language === "en" ? "Goal" : "Hauptziel";
    const solutionHeading =
      language === "tr"
        ? "Önerilen Çözüm"
        : language === "en"
          ? "Recommended Solution"
          : "Empfohlene Lösung";

    const msg =
      `${greeting}\n\n` +
      `🏢 ${industryHeading}: ${industryLabel}\n` +
      `⚠️ ${challengeHeading}: ${challengeLabel}\n` +
      `🎯 ${goalHeading}: ${goalLabel}\n\n` +
      `💡 ${solutionHeading}: ${rec.title}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const reset = () => {
    setAnswers({});
    setIsCalculating(false);
    setStep(1);
  };

  const totalSteps = questions.length;

  return (
    <section className="bg-secondary py-20 text-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-3xl">
        <FadeIn className="text-center mb-10">
          <div className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-bold text-primary mb-4 border border-primary/30">
            {pick(language, {
              de: "Interaktives Quiz",
              en: "Interactive Quiz",
              tr: "Etkileşimli Quiz",
            })}
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl lg:leading-tight">
            {pick(language, {
              de: "Finden Sie Ihre perfekte KI-Lösung",
              en: "Find your perfect AI solution",
              tr: "Mükemmel yapay zeka çözümünüzü bulun",
            })}
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {pick(language, {
              de: "Beantworten Sie 3 kurze Fragen und erhalten Sie Ihre maßgeschneiderte Automatisierungs-Strategie – direkt via WhatsApp.",
              en: "Answer 3 quick questions and get your tailored automation strategy — sent directly via WhatsApp.",
              tr: "3 kısa soruyu cevaplayın ve size özel otomasyon stratejinizi alın — doğrudan WhatsApp üzerinden.",
            })}
          </p>
        </FadeIn>

        <FadeIn direction="up">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
            {isCalculating ? (
              <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
                <h3 className="text-2xl font-bold mb-2">
                  {pick(language, {
                    de: "Ihre Antworten werden analysiert...",
                    en: "Analyzing your answers...",
                    tr: "Cevaplarınız analiz ediliyor...",
                  })}
                </h3>
                <p className="text-white/70">
                  {pick(language, {
                    de: "Wir ermitteln die beste KI-Strategie für Sie.",
                    en: "Finding the best AI strategy for you.",
                    tr: "Sizin için en iyi yapay zeka stratejisini belirliyoruz.",
                  })}
                </p>
              </div>
            ) : step === 4 ? (
              <FadeIn className="text-center py-6" direction="up">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 text-primary rounded-full mb-6">
                  <Lightbulb className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  {pick(language, {
                    de: "Ihre ideale Lösung",
                    en: "Your Ideal Solution",
                    tr: "İdeal çözümünüz",
                  })}
                </h3>
                <div className="bg-white/5 p-8 rounded-2xl mb-8 border border-white/10 text-left">
                  <h4 className="text-2xl font-bold text-primary mb-3">
                    {getRecommendation().title}
                  </h4>
                  <p className="text-lg text-white/80">
                    {getRecommendation().desc}
                  </p>
                </div>
                <p className="text-white/90 font-medium mb-8">
                  {pick(language, {
                    de: "Lassen Sie uns besprechen, wie wir dies nahtlos in Ihren Betrieb integrieren.",
                    en: "Let's discuss how to implement this for your business seamlessly.",
                    tr: "Bunu işletmenize nasıl sorunsuz entegre edeceğimizi konuşalım.",
                  })}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-base sm:text-lg font-semibold shadow-xl hover:scale-105 transition-transform w-full sm:w-auto whitespace-normal bg-[#25D366] hover:bg-[#1ebe5b] text-white flex items-center justify-center gap-2"
                    onClick={sendWhatsApp}
                  >
                    <WhatsAppIcon />
                    {pick(language, {
                      de: "Via WhatsApp senden",
                      en: "Send via WhatsApp",
                      tr: "WhatsApp ile gönder",
                    })}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-base sm:text-lg font-semibold w-full sm:w-auto whitespace-normal border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                    onClick={reset}
                  >
                    {pick(language, {
                      de: "Quiz neu starten",
                      en: "Restart Quiz",
                      tr: "Quizi yeniden başlat",
                    })}
                  </Button>
                </div>
              </FadeIn>
            ) : (
              <FadeIn key={step} direction="up" className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                  {step > 1 ? (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="text-white/70 hover:text-primary transition-colors flex items-center text-sm font-medium"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />{" "}
                      {pick(language, {
                        de: "Zurück",
                        en: "Back",
                        tr: "Geri",
                      })}
                    </button>
                  ) : (
                    <div></div>
                  )}
                  <div className="text-sm font-bold text-primary bg-primary/20 px-3 py-1 rounded-full">
                    {pick(language, {
                      de: `Schritt ${step} von ${totalSteps}`,
                      en: `Step ${step} of ${totalSteps}`,
                      tr: `Adım ${step} / ${totalSteps}`,
                    })}
                  </div>
                </div>

                <div className="w-full bg-white/10 rounded-full h-2 mb-10 overflow-hidden">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${((step - 1) / totalSteps) * 100}%`,
                    }}
                  ></div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  {questions[step - 1].title}
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {questions[step - 1].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option.id)}
                      className="flex flex-col items-center justify-center p-6 border-2 border-white/15 hover:border-primary bg-white/5 hover:bg-primary/10 rounded-2xl transition-all duration-300 group text-center gap-4 text-white"
                    >
                      <span className="text-4xl transition-transform group-hover:scale-125 duration-300">
                        {option.emoji}
                      </span>
                      <span className="font-semibold text-white group-hover:text-primary transition-colors">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>

                {step === totalSteps && (
                  <p className="text-center text-white/50 text-sm mt-6 flex items-center justify-center gap-1.5">
                    <ArrowRight className="w-4 h-4" />
                    {pick(language, {
                      de: "Letzter Schritt – Ergebnis anzeigen",
                      en: "Last step — get your result",
                      tr: "Son adım – sonucunuzu görün",
                    })}
                  </p>
                )}
              </FadeIn>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
