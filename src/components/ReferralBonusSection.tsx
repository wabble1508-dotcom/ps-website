import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/components/LanguageContext";

const pick = (lang: string, obj: { de: string; en: string; tr: string }) =>
  (obj as Record<string, string>)[lang] || obj.de;

export const ReferralBonusSection = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-secondary via-[#153a48] to-[#1e9fae] text-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid items-center gap-10 md:gap-12 md:grid-cols-2">
          <FadeIn direction="right" className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-primary mb-6 backdrop-blur-md border border-white/20">
              {pick(language, {
                de: "Weiterempfehlungs-Bonus",
                en: "Referral Bonus",
                tr: "Tavsiye Bonusu",
              })}
            </div>
            <h2 className="mb-6 text-3xl font-bold md:text-5xl leading-tight">
              {pick(language, {
                de: "Empfehlen Sie uns weiter & kassieren Sie 250 €",
                en: "Recommend us & earn €250",
                tr: "Bizi tavsiye edin & 250 € kazanın",
              })}
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed font-medium max-w-xl mx-auto md:mx-0">
              {pick(language, {
                de: "Kennen Sie einen Unternehmer, der unsere Hilfe gebrauchen könnte? Schicken Sie ihn zu uns — sobald er Kunde wird, erhalten Sie 250 € bar auf die Hand. Keine Grenzen, kein Kleingedrucktes.",
                en: "Know a business owner who could use our help? Send them our way — once they become a client, you receive €250 cash. No limits, no fine print.",
                tr: "Yardımımızı kullanabilecek bir işletme sahibi tanıyor musunuz? Bizi önerin — müşteri olduğu anda 250 € nakit alırsınız. Sınır yok, küçük yazı yok.",
              })}
            </p>
            <div className="space-y-3 mb-8">
              {[
                pick(language, {
                  de: "250 € bar pro erfolgreicher Weiterempfehlung",
                  en: "€250 cash per successful referral",
                  tr: "Başarılı her tavsiye için 250 € nakit",
                }),
                pick(language, {
                  de: "Keine Grenze — so oft Sie wollen",
                  en: "No limit — refer as many as you like",
                  tr: "Sınır yok — istediğiniz kadar tavsiye edin",
                }),
                pick(language, {
                  de: "Sie müssen selbst kein Kunde sein",
                  en: "You don't need to be a client yourself",
                  tr: "Kendiniz müşteri olmanız gerekmez",
                }),
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-base md:text-lg font-medium bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl"
                >
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Button
              size="lg"
              className="h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-base sm:text-lg font-semibold shadow-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto whitespace-normal bg-[#25D366] hover:bg-[#1ebe5b] text-white"
              onClick={() =>
                window.open(
                  "https://wa.me/4915207595260?text=" +
                    encodeURIComponent(
                      pick(language, {
                        de: "Hallo Pankaj, ich möchte jemanden weiterempfehlen und die 250 € Prämie sichern.",
                        en: "Hello Pankaj, I'd like to refer a business and claim the €250 bonus.",
                        tr: "Merhaba Pankaj, bir işletmeyi tavsiye etmek ve 250 € bonusunu almak istiyorum.",
                      }),
                    ),
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              {pick(language, {
                de: "250 € per WhatsApp sichern",
                en: "Claim €250 via WhatsApp",
                tr: "250 € WhatsApp ile alın",
              })}
            </Button>
          </FadeIn>
          <FadeIn className="flex justify-center" direction="left">
            <a
              href="https://www.instagram.com/p/Dbx8R2otP4R/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br from-secondary via-[#153a48] to-[#1e9fae]"
            >
              <div className="aspect-[9/16] w-full flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/30">
                  <svg
                    className="w-9 h-9 text-white ml-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white mb-4 backdrop-blur-md border border-white/20">
                  {pick(language, {
                    de: "Auf Instagram ansehen",
                    en: "Watch on Instagram",
                    tr: "Instagram'da izle",
                  })}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {pick(language, {
                    de: "250 € pro Empfehlung",
                    en: "Earn €250 per referral",
                    tr: "Her tavsiye için 250 €",
                  })}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed max-w-xs">
                  {pick(language, {
                    de: "Tippen Sie, um das kurze Video anzusehen und zu erfahren, wie der Weiterempfehlungs-Bonus funktioniert.",
                    en: "Tap to watch the short video and learn how the referral bonus works.",
                    tr: "Kısa videoyu izlemek ve tavsiye bonusunun nasıl çalıştığını öğrenmek için dokunun.",
                  })}
                </p>
              </div>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
