import { ArrowUpRight, Download, FileSignature, Radar, Repeat, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/components/LanguageContext";

// Werbung für unsere eigene App WebsiteNova (websitenova.de) – richtet sich an andere Webdesigner.
// Angaben zu Funktionen und Preisen wie auf websitenova.de; bei Änderungen dort hier mitpflegen.
const URL = "https://websitenova.de/";
const DOWNLOAD = "https://websitenova.de/download";

type L = { de: string; en: string; tr: string };

const UI = {
  kicker: { de: "Für Webdesigner", en: "For web designers", tr: "Web tasarımcılar için" },
  title: {
    de: "Du bist selbst Webdesigner? Dann hol dir WebsiteNova.",
    en: "Are you a web designer yourself? Then get WebsiteNova.",
    tr: "Sen de web tasarımcı mısın? O zaman WebsiteNova'yı indir.",
  },
  text: {
    de: "Unsere eigene App für Webdesigner, Freelancer und kleine Studios: Kunden finden, Angebote digital unterschreiben lassen und mit Wartung jeden Monat verdienen – alles auf deinem Handy.",
    en: "Our own app for web designers, freelancers and small studios: find clients, get quotes signed digitally and earn every month with maintenance plans – all on your phone.",
    tr: "Web tasarımcılar, serbest çalışanlar ve küçük stüdyolar için kendi uygulamamız: müşteri bul, teklifleri dijital imzalat ve bakım sözleşmeleriyle her ay kazan – hepsi telefonunda.",
  },
  features: [
    {
      icon: Radar,
      title: { de: "Website-Check in 10 Sekunden", en: "Website check in 10 seconds", tr: "10 saniyede site kontrolü" },
      text: {
        de: "Domain rein, Schwachstellen raus – der perfekte Grund für die erste Nachricht.",
        en: "Enter a domain, get the weak spots – the perfect reason for a first message.",
        tr: "Alan adını gir, zayıf noktaları gör – ilk mesaj için mükemmel bir sebep.",
      },
    },
    {
      icon: Sparkles,
      title: { de: "Entwurf vor dem ersten Call", en: "Draft before the first call", tr: "İlk görüşmeden önce taslak" },
      text: {
        de: "Zeig deinem Lead, wie seine neue Website aussehen könnte.",
        en: "Show your lead what their new website could look like.",
        tr: "Potansiyel müşterine yeni sitesinin nasıl görünebileceğini göster.",
      },
    },
    {
      icon: FileSignature,
      title: { de: "Angebote mit Unterschrift", en: "Quotes with signature", tr: "İmzalı teklifler" },
      text: {
        de: "Link schicken – du siehst, wann es geöffnet wird, der Kunde unterschreibt am Handy.",
        en: "Send a link – see when it's opened, the client signs on their phone.",
        tr: "Bağlantı gönder – ne zaman açıldığını gör, müşteri telefonda imzalasın.",
      },
    },
    {
      icon: Repeat,
      title: { de: "Wartung als Abo", en: "Maintenance as a subscription", tr: "Abonelik olarak bakım" },
      text: {
        de: "Aus jedem Projekt einen Wartungsvertrag machen – mit Monatsbericht für den Kunden.",
        en: "Turn every project into a maintenance contract – with a monthly report for the client.",
        tr: "Her projeyi bakım sözleşmesine dönüştür – müşteriye aylık raporla.",
      },
    },
  ],
  price: {
    de: "Kostenlos starten · Pro ab 14,99 €/Monat · 7 Tage Pro gratis, ohne Kreditkarte",
    en: "Start for free · Pro from €14.99/month · 7 days of Pro free, no credit card",
    tr: "Ücretsiz başla · Pro aylık 14,99 €'dan · 7 gün Pro ücretsiz, kredi kartı gerekmez",
  },
  download: { de: "App kostenlos holen", en: "Get the app for free", tr: "Uygulamayı ücretsiz al" },
  more: { de: "Mehr auf websitenova.de", en: "More on websitenova.de", tr: "websitenova.de'de daha fazlası" },
  notifOpened: { de: "Angebot geöffnet 👀", en: "Quote opened 👀", tr: "Teklif açıldı 👀" },
  notifSigned: { de: "Unterschrieben ✍️", en: "Signed ✍️", tr: "İmzalandı ✍️" },
  now: { de: "gerade eben", en: "just now", tr: "az önce" },
};

export const WebsiteNovaSection = () => {
  const { language } = useLanguage();
  const pick = (t: L) => (language === "en" ? t.en : language === "tr" ? t.tr : t.de);

  return (
    <section className="relative overflow-hidden bg-[#13111f] py-20 text-white md:py-24">
      <div className="pointer-events-none absolute -right-32 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[#6d3df5]/40 blur-[120px]" />
      <div className="container relative mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[1.25fr_1fr]">
        <FadeIn>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#b49cff]">
            {pick(UI.kicker)}
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">{pick(UI.title)}</h2>
          <p className="mt-4 text-lg text-white/75">{pick(UI.text)}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {UI.features.map(({ icon: Icon, title, text }) => (
              <div key={title.de} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <Icon className="mb-2 h-5 w-5 text-[#b49cff]" />
                <p className="font-semibold">{pick(title)}</p>
                <p className="mt-1 text-sm text-white/65">{pick(text)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={DOWNLOAD}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-[#7c4dff] px-6 py-3 font-bold text-white shadow-lg shadow-[#7c4dff]/30 transition hover:bg-[#6d3df5]"
            >
              <Download className="h-4 w-4" /> {pick(UI.download)}
            </a>
            <a
              href={URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {pick(UI.more)} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-4 text-sm text-white/55">{pick(UI.price)}</p>
        </FadeIn>

        {/* Handy-Vorschau mit Benachrichtigungen */}
        <FadeIn direction="left" className="flex justify-center">
          <div className="relative w-[260px] rounded-[2.6rem] border-[6px] border-[#2a2640] bg-gradient-to-b from-[#1d1934] to-[#2c1f63] p-4 pb-10 shadow-2xl">
            <div className="mx-auto mb-6 h-5 w-24 rounded-full bg-black/60" />
            <div className="mb-8 flex items-center gap-2">
              <img src="/media/kunden/websitenova.jpg" alt="WebsiteNova" className="h-9 w-9 rounded-xl object-cover" loading="lazy" />
              <span className="text-lg font-bold">
                Website<span className="text-[#b49cff]">Nova</span>
              </span>
            </div>
            {[
              [UI.notifOpened, "Café Morgenrot"],
              [UI.notifSigned, "Relaunch · 2.400 €"],
            ].map(([title, sub], i) => (
              <div
                key={i}
                className="mb-3 rounded-2xl bg-white/95 p-3 text-[#13111f] shadow-lg"
                style={{ animation: `float ${4 + i}s ease-in-out infinite` }}
              >
                <p className="text-sm font-bold">{pick(title as L)}</p>
                <p className="text-xs text-black/55">
                  {sub as string} · {pick(UI.now)}
                </p>
              </div>
            ))}
            <div className="mt-6 space-y-2">
              <div className="h-3 w-4/5 rounded-full bg-white/15" />
              <div className="h-3 w-3/5 rounded-full bg-white/10" />
              <div className="h-20 rounded-2xl bg-gradient-to-br from-[#7c4dff]/60 to-[#b49cff]/30" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
