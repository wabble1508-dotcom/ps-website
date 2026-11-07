import { Link } from "react-router-dom";
import { CalendarCheck, Mail, MessageCircle, Phone } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { ContactForm } from "@/components/ContactFormDialog";
import { useLanguage } from "@/components/LanguageContext";

// Kontakt direkt auf der Seite: kurzes Formular (4 Felder) und Ein-Tipp-Kontaktwege
export const PHONE = "+4915207595260";
export const PHONE_LABEL = "+49 152 0759 5260";
export const EMAIL = "info@ps-professional-solutions.de";
export const WHATSAPP_URL = "https://wa.me/4915207595260";

type L = { de: string; en: string; tr: string };

const UI = {
  kicker: { de: "Kontakt", en: "Contact", tr: "İletişim" },
  title: { de: "Angebot anfragen – unverbindlich", en: "Request a quote – no obligation", tr: "Teklif isteyin – bağlayıcı değil" },
  text: {
    de: "Schreiben Sie uns in einer Minute, rufen Sie direkt an oder buchen Sie gleich einen Termin. Wir melden uns werktags innerhalb von 24 Stunden.",
    en: "Write to us in a minute, call us directly or book an appointment right away. We reply within 24 hours on working days.",
    tr: "Bir dakikada yazın, doğrudan arayın veya hemen randevu alın. İş günlerinde 24 saat içinde yanıt veririz.",
  },
  call: { de: "Anrufen", en: "Call", tr: "Ara" },
  whatsapp: { de: "WhatsApp schreiben", en: "Message on WhatsApp", tr: "WhatsApp'tan yaz" },
  mail: { de: "E-Mail schreiben", en: "Send an email", tr: "E-posta gönder" },
  book: { de: "Termin buchen", en: "Book an appointment", tr: "Randevu al" },
};

export const ContactSection = () => {
  const { language } = useLanguage();
  const pick = (t: L) => (language === "en" ? t.en : language === "tr" ? t.tr : t.de);

  const ways = [
    { icon: Phone, label: pick(UI.call), sub: PHONE_LABEL, href: `tel:${PHONE}` },
    { icon: MessageCircle, label: pick(UI.whatsapp), sub: "WhatsApp", href: WHATSAPP_URL, external: true },
    { icon: Mail, label: pick(UI.mail), sub: EMAIL, href: `mailto:${EMAIL}` },
  ];

  return (
    <section id="kontakt" className="scroll-mt-24 border-t border-border bg-muted/30 py-20 md:py-24">
      <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_1.2fr]">
        <FadeIn>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{pick(UI.kicker)}</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">{pick(UI.title)}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{pick(UI.text)}</p>
          <div className="mt-8 space-y-3">
            {ways.map(({ icon: Icon, label, sub, href, external }) => (
              <a
                key={href}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold text-foreground">{label}</span>
                  <span className="block text-sm text-muted-foreground">{sub}</span>
                </span>
              </a>
            ))}
            <Link
              to="/analyse-bestaetigungen"
              className="flex items-center gap-4 rounded-2xl bg-primary p-4 text-white transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <CalendarCheck className="h-5 w-5" />
              </span>
              <span className="font-semibold">{pick(UI.book)}</span>
            </Link>
          </div>
        </FadeIn>
        <FadeIn className="rounded-3xl border border-border bg-card p-6 shadow-xl md:p-8">
          <ContactForm compact source="Startseite – Kontaktbereich" />
        </FadeIn>
      </div>
    </section>
  );
};
