import { BadgeEuro, CalendarX2, Code2, Clock, ShieldCheck, Star, UserRound } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/components/LanguageContext";

// Statt erfundener Kundenstimmen: überprüfbare Zusagen und ein Link, über den echte Kunden
// bei Google bewerten können. Sobald es echte Bewertungen gibt, können sie hier ergänzt werden.
const GOOGLE_REVIEWS = "https://www.google.com/search?q=PS+Professional+Solutions+Dortmund";

type L = { de: string; en: string; tr: string };

const PROMISES: { icon: typeof Star; title: L; text: L }[] = [
  {
    icon: BadgeEuro,
    title: { de: "Festpreis vor dem Start", en: "Fixed price before we start", tr: "Başlamadan önce sabit fiyat" },
    text: {
      de: "Sie erhalten vorab ein verbindliches Angebot – ohne versteckte Kosten.",
      en: "You receive a binding quote in advance – no hidden costs.",
      tr: "Önceden bağlayıcı bir teklif alırsınız – gizli maliyet yok.",
    },
  },
  {
    icon: CalendarX2,
    title: { de: "Monatlich kündbar", en: "Cancellable monthly", tr: "Aylık iptal edilebilir" },
    text: {
      de: "Keine langen Vertragslaufzeiten bei unseren Website-Paketen.",
      en: "No long contract terms on our website packages.",
      tr: "Web sitesi paketlerimizde uzun sözleşme süresi yok.",
    },
  },
  {
    icon: Code2,
    title: { de: "Programmiert statt Baukasten", en: "Coded, not a site builder", tr: "Site oluşturucu değil, kodlanmış" },
    text: {
      de: "Schnelle, saubere Websites, die für Google gebaut sind.",
      en: "Fast, clean websites built for Google.",
      tr: "Google için yapılmış hızlı ve temiz siteler.",
    },
  },
  {
    icon: UserRound,
    title: { de: "Ein fester Ansprechpartner", en: "One fixed contact person", tr: "Tek bir sabit muhatap" },
    text: {
      de: "Sie sprechen direkt mit Pankaj – kein Callcenter, keine Warteschleife.",
      en: "You talk directly to Pankaj – no call centre, no hold music.",
      tr: "Doğrudan Pankaj ile konuşursunuz – çağrı merkezi yok, bekleme yok.",
    },
  },
  {
    icon: Clock,
    title: { de: "Antwort innerhalb von 24 Stunden", en: "Reply within 24 hours", tr: "24 saat içinde yanıt" },
    text: {
      de: "Werktags melden wir uns spätestens am nächsten Tag bei Ihnen.",
      en: "On working days we get back to you by the next day at the latest.",
      tr: "İş günlerinde en geç ertesi gün size döneriz.",
    },
  },
  {
    icon: ShieldCheck,
    title: { de: "Datenschutz nach DSGVO", en: "GDPR-compliant privacy", tr: "GDPR'a uygun gizlilik" },
    text: {
      de: "Daten in der EU, keine Tracking-Cookies, Cookie-Banner und Pflichtseiten inklusive.",
      en: "Data in the EU, no tracking cookies, cookie banner and legal pages included.",
      tr: "Veriler AB'de, izleme çerezi yok, çerez banner'ı ve zorunlu sayfalar dahil.",
    },
  },
];

const UI = {
  kicker: { de: "Unser Versprechen", en: "Our promise", tr: "Sözümüz" },
  title: { de: "Darauf können Sie sich verlassen", en: "What you can rely on", tr: "Güvenebileceğiniz şeyler" },
  subtitle: {
    de: "Klare Zusagen statt leerer Versprechen – schwarz auf weiß in jedem Angebot.",
    en: "Clear commitments instead of empty promises – in black and white in every quote.",
    tr: "Boş vaatler yerine net taahhütler – her teklifte yazılı olarak.",
  },
  reviewTitle: { de: "Schon Kunde bei uns?", en: "Already a customer?", tr: "Zaten müşterimiz misiniz?" },
  reviewText: {
    de: "Wir freuen uns über Ihre ehrliche Bewertung bei Google – sie hilft anderen Betrieben bei der Entscheidung.",
    en: "We'd appreciate your honest review on Google – it helps other businesses decide.",
    tr: "Google'daki dürüst yorumunuz bizi çok mutlu eder – diğer işletmelerin karar vermesine yardımcı olur.",
  },
  reviewBtn: { de: "Auf Google bewerten", en: "Review us on Google", tr: "Google'da değerlendir" },
};

export const PromiseSection = () => {
  const { language } = useLanguage();
  const pick = (t: L) => (language === "en" ? t.en : language === "tr" ? t.tr : t.de);

  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <FadeIn className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">{pick(UI.kicker)}</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-5xl">{pick(UI.title)}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{pick(UI.subtitle)}</p>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROMISES.map(({ icon: Icon, title, text }) => (
            <FadeIn key={title.de} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{pick(title)}</h3>
              <p className="text-sm text-muted-foreground">{pick(text)}</p>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-12">
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-secondary p-8 text-center text-white md:flex-row md:text-left">
            <div className="flex gap-1 text-yellow-400">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-6 w-6" fill="currentColor" />
              ))}
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold">{pick(UI.reviewTitle)}</p>
              <p className="text-sm text-white/75">{pick(UI.reviewText)}</p>
            </div>
            <a
              href={GOOGLE_REVIEWS}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-secondary transition hover:bg-white/90"
            >
              {pick(UI.reviewBtn)}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
