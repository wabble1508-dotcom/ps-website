import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { FadeIn } from "./FadeIn";
import { Download, CheckCircle2, Zap, Clock, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "./LanguageContext";
import { submitForm } from "@/lib/submitForm";

const pick = (lang: string, obj: { de: string; en: string; tr: string }) =>
  (obj as Record<string, string>)[lang] || obj.de;

export function LeadMagnetSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsSubmitting(true);

    const ok = await submitForm("ebook", { first_name: name, email });

    setIsSubmitting(false);
    if (!ok) {
      toast({
        title: pick(language, {
          de: "Senden fehlgeschlagen",
          en: "Sending failed",
          tr: "Gönderilemedi",
        }),
        description: pick(language, {
          de: "Bitte versuchen Sie es erneut oder schreiben Sie uns per WhatsApp.",
          en: "Please try again or message us on WhatsApp.",
          tr: "Lütfen tekrar deneyin veya bize WhatsApp'tan yazın.",
        }),
        variant: "destructive",
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: pick(language, {
        de: "Erfolgreich angefordert!",
        en: "Successfully requested!",
        tr: "Başarıyla talep edildi!",
      }),
      description: pick(language, {
        de: "Ihr E-Book ist auf dem Weg in Ihr Postfach.",
        en: "Your E-Book is on its way to your inbox.",
        tr: "E-Kitabınız e-posta kutunuza yolda.",
      }),
    });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-muted/30 overflow-hidden relative border-t border-border">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left" className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm border border-primary/20 shadow-sm">
              <Download className="w-4 h-4" />{" "}
              {pick(language, {
                de: "Kostenloses E-Book",
                en: "Free E-Book",
                tr: "Ücretsiz E-Kitap",
              })}
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-secondary">
              {pick(language, {
                de: "Vom Chaos zur",
                en: "From Chaos to",
                tr: "Kaostan",
              })}{" "}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x bg-[length:200%_auto]">
                {pick(language, {
                  de: "KI-Automation",
                  en: "AI Automation",
                  tr: "Yapay Zeka Otomasyonuna",
                })}
              </span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              {pick(language, {
                de: "Laden Sie unseren exklusiven Praxis-Guide herunter und erfahren Sie, wie Sie mit KI-Tools wöchentlich 15 Stunden sparen und Ihre Lead-Qualität verdoppeln.",
                en: "Download our exclusive practical guide and discover how to save 15 hours weekly and double your lead quality using AI tools.",
                tr: "Özel pratik kılavuzu indirin ve yapay zeka araçlarıyla haftada 15 saat nasıl tasarruf edeceğinizi ve müşteri kalitenizi nasıl ikiye katlayacağınızı keşfedin.",
              })}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {[
                {
                  icon: Zap,
                  text: pick(language, {
                    de: "3 Praxiserprobte Workflows",
                    en: "3 Proven Workflows",
                    tr: "3 Kanıtlanmış İş Akışı",
                  }),
                },
                {
                  icon: Clock,
                  text: pick(language, {
                    de: "Zeitfresser eliminieren",
                    en: "Eliminate Time Wasters",
                    tr: "Zaman hırsızlarını yok edin",
                  }),
                },
                {
                  icon: TrendingUp,
                  text: pick(language, {
                    de: "Lead-Qualität verdoppeln",
                    en: "Double Lead Quality",
                    tr: "Müşteri kalitesini ikiye katlayın",
                  }),
                },
                {
                  icon: CheckCircle2,
                  text: pick(language, {
                    de: "Schritt-für-Schritt Anleitung",
                    en: "Step-by-Step Guide",
                    tr: "Adım adım kılavuz",
                  }),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-border/50"
                >
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-sm text-secondary">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-6 items-stretch">
              <div className="flex-1 w-full">
                {!submitted ? (
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-border relative z-10 h-full flex flex-col justify-center"
                  >
                    <h3 className="font-bold text-2xl mb-6 text-secondary">
                      {pick(language, {
                        de: "Jetzt gratis sichern",
                        en: "Secure your free copy now",
                        tr: "Ücretsiz kopyanızı hemen alın",
                      })}
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-muted-foreground pl-1">
                            {pick(language, {
                              de: "Vorname",
                              en: "First Name",
                              tr: "Ad",
                            })}
                          </label>
                          <Input
                            placeholder={pick(language, {
                              de: "z.B. Max",
                              en: "e.g. Max",
                              tr: "ör. Max",
                            })}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="h-12 bg-muted/30 border-muted focus:bg-white text-base rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-muted-foreground pl-1">
                            {pick(language, {
                              de: "E-Mail Adresse",
                              en: "Email Address",
                              tr: "E-posta Adresi",
                            })}
                          </label>
                          <Input
                            type="email"
                            placeholder="max@beispiel.de"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12 bg-muted/30 border-muted focus:bg-white text-base rounded-xl"
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full h-auto min-h-[3.5rem] py-3 text-lg font-bold shadow-xl hover:scale-[1.02] transition-all rounded-xl mt-2 whitespace-normal"
                      >
                        {isSubmitting
                          ? "..."
                          : pick(language, {
                              de: "E-Book jetzt herunterladen",
                              en: "Download E-Book Now",
                              tr: "E-Kitabı şimdi indir",
                            })}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground pt-2">
                        {pick(language, {
                          de: "100% kostenlos. Kein Spam. Abmeldung jederzeit möglich.",
                          en: "100% free. No spam. Unsubscribe anytime.",
                          tr: "100% ücretsiz. Spam yok. İstediğiniz zaman abonelikten çıkın.",
                        })}
                      </p>
                    </div>
                  </form>
                ) : (
                  <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 text-center space-y-4 shadow-inner h-full flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="font-bold text-3xl text-secondary">
                      {pick(language, {
                        de: "Vielen Dank!",
                        en: "Thank You!",
                        tr: "Teşekkürler!",
                      })}
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      {pick(language, {
                        de: "Das E-Book wird in wenigen Minuten an Ihre E-Mail gesendet.",
                        en: "The E-Book will be sent to your email in a few minutes.",
                        tr: "E-Kitap birkaç dakika içinde e-postanıza gönderilecek.",
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>

          <FadeIn
            direction="right"
            className="relative h-full flex items-center justify-center lg:pl-10 mt-12 lg:mt-0"
          >
            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 rounded-full blur-3xl -z-10"></div>

            <div className="relative w-full group">
              {/* E-Book Mockup Floating Element */}
              <div
                className="absolute -top-10 -right-6 md:-right-12 z-20 w-32 md:w-48 animate-float drop-shadow-2xl"
                style={{ animationDuration: "6s" }}
              >
                <div className="relative aspect-[3/4] bg-white rounded-r-xl rounded-l-sm shadow-2xl border-l-[8px] border-l-primary/80 overflow-hidden transform rotate-12 group-hover:rotate-6 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary p-4 flex flex-col items-center justify-center text-white text-center">
                    <Zap className="w-8 h-8 mb-2 text-accent" />
                    <h4 className="font-bold text-xs md:text-sm leading-tight">
                      KI-Automation
                      <br />
                      Masterclass
                    </h4>
                    <p className="text-[8px] md:text-[10px] mt-2 text-white/80">
                      Praxis-Guide 2026
                    </p>
                  </div>
                  {/* Book spine highlight */}
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-white/30"></div>
                </div>
              </div>

              {/* Before/After Slider Container */}
              <div className="bg-white p-3 rounded-[2rem] shadow-2xl border border-border/50 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <BeforeAfterSlider
                  beforeImage="/media/vibe.filesafe.space/1778931020193405557/assets/27644151-71d2-46ac-971f-c0a962d1b1f3.png"
                  afterImage="/media/vibe.filesafe.space/1778931020193405557/assets/58de0893-b650-46e0-97bd-e952621ca26e.png"
                  beforeLabel={pick(language, {
                    de: "Schlechte Webseite",
                    en: "Bad Website",
                    tr: "Kötü Web Sitesi",
                  })}
                  afterLabel={pick(language, {
                    de: "Gute Webseite",
                    en: "Good Website",
                    tr: "İyi Web Sitesi",
                  })}
                />
              </div>

              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm border border-border/50">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                  <p className="text-sm font-semibold text-secondary">
                    {pick(language, {
                      de: "Slider ziehen für Transformation",
                      en: "Drag slider to see transformation",
                      tr: "Dönüşümü görmek için kaydırıcıyı sürükleyin",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
