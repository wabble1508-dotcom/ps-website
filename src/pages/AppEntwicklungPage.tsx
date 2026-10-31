import { ArrowRight, Check, Globe, Smartphone, Users, Wrench, Sparkles, Plug } from "lucide-react";
import { SEO } from "@/components/SEO";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageContext";
import { useContactForm } from "@/components/ContactFormDialog";
import { WebsiteNovaSection } from "@/components/WebsiteNovaSection";

// Leistungsseite App-Entwicklung. Texte auf Deutsch, Englisch und Türkisch;
// die übrigen Sprachen kommen aus den Übersetzungs-Wörterbüchern (src/lib/i18n/dict).
type L = { de: string; en: string; tr: string };

const HERO = {
  kicker: { de: "App-Entwicklung", en: "App development", tr: "Uygulama geliştirme" },
  title: {
    de: "Ihre eigene App – programmiert statt zusammengeklickt.",
    en: "Your own app – coded, not clicked together.",
    tr: "Kendi uygulamanız – sürükle-bırak değil, gerçek kod.",
  },
  subtitle: {
    de: "Web-Apps und mobile Apps nach Maß für Ihr Unternehmen: von der Idee über den klickbaren Prototyp bis zum Livegang – alles aus einer Hand in Dortmund.",
    en: "Custom web and mobile apps for your business: from the idea and a clickable prototype to launch – all from one source in Dortmund.",
    tr: "İşletmeniz için özel web ve mobil uygulamalar: fikirden tıklanabilir prototipe ve yayına kadar – Dortmund'dan tek elden.",
  },
  cta: { de: "Projekt anfragen", en: "Request a project", tr: "Proje talep et" },
};

const SERVICES: { icon: typeof Globe; title: L; text: L }[] = [
  {
    icon: Globe,
    title: { de: "Web-Apps & PWAs", en: "Web apps & PWAs", tr: "Web uygulamaları ve PWA'lar" },
    text: {
      de: "Laufen direkt im Browser und lassen sich wie eine App auf dem Handy installieren – ohne App-Store.",
      en: "Run directly in the browser and can be installed on a phone like an app – no app store needed.",
      tr: "Doğrudan tarayıcıda çalışır ve uygulama mağazası olmadan telefona uygulama gibi kurulabilir.",
    },
  },
  {
    icon: Smartphone,
    title: { de: "iOS- & Android-Apps", en: "iOS & Android apps", tr: "iOS ve Android uygulamaları" },
    text: {
      de: "Mobile Apps für iPhone und Android – inklusive Veröffentlichung im App Store und bei Google Play.",
      en: "Mobile apps for iPhone and Android – including publishing on the App Store and Google Play.",
      tr: "iPhone ve Android için mobil uygulamalar – App Store ve Google Play'de yayın dahil.",
    },
  },
  {
    icon: Users,
    title: { de: "Kundenportale & Bonus-Apps", en: "Customer portals & loyalty apps", tr: "Müşteri portalları ve sadakat uygulamaları" },
    text: {
      de: "Buchungen, Bestellungen, Stempelkarten oder ein Login-Bereich für Ihre Kunden.",
      en: "Bookings, orders, stamp cards or a login area for your customers.",
      tr: "Randevular, siparişler, damga kartları veya müşterileriniz için giriş alanı.",
    },
  },
  {
    icon: Wrench,
    title: { de: "Interne Tools", en: "Internal tools", tr: "Dahili araçlar" },
    text: {
      de: "Dienstpläne, Auftragsverwaltung, Checklisten – Software, die genau zu Ihren Abläufen passt.",
      en: "Shift plans, order management, checklists – software that fits your processes exactly.",
      tr: "Vardiya planları, sipariş yönetimi, kontrol listeleri – süreçlerinize tam uyan yazılım.",
    },
  },
  {
    icon: Sparkles,
    title: { de: "KI-Funktionen", en: "AI features", tr: "AI özellikleri" },
    text: {
      de: "Chat-Assistenten, automatische Texte oder Auswertungen – direkt in Ihrer App.",
      en: "Chat assistants, automatic texts or analyses – built right into your app.",
      tr: "Sohbet asistanları, otomatik metinler veya analizler – doğrudan uygulamanızda.",
    },
  },
  {
    icon: Plug,
    title: { de: "Schnittstellen", en: "Integrations", tr: "Entegrasyonlar" },
    text: {
      de: "Anbindung an Kasse, CRM, Kalender, Zahlungsanbieter oder Ihre bestehende Software.",
      en: "Connections to your POS, CRM, calendar, payment provider or existing software.",
      tr: "Kasa, CRM, takvim, ödeme sağlayıcı veya mevcut yazılımınızla bağlantı.",
    },
  },
];

const STEPS: { title: L; text: L }[] = [
  {
    title: { de: "Erstgespräch & Konzept", en: "Consultation & concept", tr: "İlk görüşme ve konsept" },
    text: {
      de: "Wir klären Ziel, Funktionen und Budget. Sie erhalten ein verbindliches Angebot.",
      en: "We clarify goals, features and budget. You receive a binding quote.",
      tr: "Hedefi, özellikleri ve bütçeyi netleştiririz. Bağlayıcı bir teklif alırsınız.",
    },
  },
  {
    title: { de: "Klickbarer Prototyp", en: "Clickable prototype", tr: "Tıklanabilir prototip" },
    text: {
      de: "Sie sehen und testen Ihre App, bevor programmiert wird.",
      en: "You see and test your app before any code is written.",
      tr: "Kodlama başlamadan önce uygulamanızı görür ve test edersiniz.",
    },
  },
  {
    title: { de: "Entwicklung in Etappen", en: "Development in stages", tr: "Aşamalı geliştirme" },
    text: {
      de: "Regelmäßige Zwischenstände – Sie behalten jederzeit den Überblick.",
      en: "Regular progress updates – you always keep the overview.",
      tr: "Düzenli ara sonuçlar – her zaman genel bakışa sahipsiniz.",
    },
  },
  {
    title: { de: "Livegang & Betreuung", en: "Launch & support", tr: "Yayın ve destek" },
    text: {
      de: "Veröffentlichung, Hosting und Weiterentwicklung – auf Wunsch mit Wartungsvertrag.",
      en: "Publishing, hosting and further development – with a maintenance plan if you wish.",
      tr: "Yayın, hosting ve geliştirme – isterseniz bakım sözleşmesiyle.",
    },
  },
];

const PRICE = {
  title: { de: "Was kostet eine App?", en: "How much does an app cost?", tr: "Bir uygulama ne kadar?" },
  value: { de: "Projekte ab 4.900 €", en: "Projects from €4,900", tr: "Projeler 4.900 €'dan" },
  text: {
    de: "Jede App ist anders – deshalb erhalten Sie nach dem kostenlosen Erstgespräch ein individuelles, verbindliches Angebot. Wartung und Hosting ab 149 € im Monat.",
    en: "Every app is different – so after a free initial consultation you receive an individual, binding quote. Maintenance and hosting from €149 a month.",
    tr: "Her uygulama farklıdır – bu yüzden ücretsiz ilk görüşmeden sonra bireysel, bağlayıcı bir teklif alırsınız. Bakım ve hosting aylık 149 €'dan.",
  },
  points: [
    { de: "Fester Preis nach Angebot – keine Überraschungen", en: "Fixed price per quote – no surprises", tr: "Teklife göre sabit fiyat – sürpriz yok" },
    { de: "Sie erhalten die Rechte an Ihrer App", en: "You receive the rights to your app", tr: "Uygulamanızın haklarını alırsınız" },
    { de: "Persönlicher Ansprechpartner statt Callcenter", en: "A personal contact instead of a call centre", tr: "Çağrı merkezi yerine kişisel muhatap" },
  ] as L[],
  vat: {
    de: "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.",
    en: "In accordance with Section 19 UStG, no VAT is charged.",
    tr: "§ 19 UStG uyarınca KDV alınmaz.",
  },
};

// Kunden-Projekte, die auf der App-Seite als Referenz gezeigt werden
const REFERENCES: { name: string; logo: string; text: L }[] = [
  {
    name: "SkyJoin",
    logo: "/media/kunden/skyjoin.jpg",
    text: { de: "Mobile App", en: "Mobile app", tr: "Mobil uygulama" },
  },
  {
    name: "WebsiteNova",
    logo: "/media/kunden/websitenova.jpg",
    text: { de: "SaaS-Plattform", en: "SaaS platform", tr: "SaaS platformu" },
  },
];

const SECTION_TITLES = {
  references: { de: "Apps & Plattformen, die wir entwickelt haben", en: "Apps & platforms we have built", tr: "Geliştirdiğimiz uygulamalar ve platformlar" },
  services: { de: "Was wir für Sie entwickeln", en: "What we build for you", tr: "Sizin için neler geliştiriyoruz" },
  steps: { de: "So läuft Ihr App-Projekt ab", en: "How your app project works", tr: "Uygulama projeniz nasıl ilerler" },
  final: {
    de: "Sie haben eine App-Idee? Lassen Sie uns darüber sprechen.",
    en: "Have an app idea? Let's talk about it.",
    tr: "Bir uygulama fikriniz mi var? Konuşalım.",
  },
  finalBtn: { de: "Kostenloses Erstgespräch", en: "Free initial consultation", tr: "Ücretsiz ilk görüşme" },
};

export default function AppEntwicklungPage() {
  const { language } = useLanguage();
  const { openForm } = useContactForm();
  const pick = (t: L) => (language === "en" ? t.en : language === "tr" ? t.tr : t.de);
  const enquire = () => openForm("contact", "App-Entwicklung");

  return (
    <div className="w-full bg-background">
      <SEO
        title="App-Entwicklung Dortmund | Web-Apps & mobile Apps | PS Professional Solutions"
        description="App-Entwicklung aus Dortmund: Web-Apps, iOS- und Android-Apps, Kundenportale und interne Tools nach Maß. Vom Prototyp bis zum Livegang – Projekte ab 4.900 €."
        canonical="/app-entwicklung"
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-[#153a48] to-[#1e9fae] py-20 text-center text-white lg:py-28">
        <FadeIn className="container relative z-10 mx-auto max-w-3xl px-4">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            {pick(HERO.kicker)}
          </span>
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">{pick(HERO.title)}</h1>
          <p className="mb-8 text-lg text-white/85 md:text-xl">{pick(HERO.subtitle)}</p>
          <Button size="lg" className="rounded-full" onClick={enquire}>
            {pick(HERO.cta)} <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </FadeIn>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">{pick(SECTION_TITLES.services)}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, text }) => (
              <FadeIn key={title.de} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{pick(title)}</h3>
                <p className="text-sm text-muted-foreground">{pick(text)}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">{pick(SECTION_TITLES.references)}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {REFERENCES.map((ref) => (
              <FadeIn key={ref.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <img src={ref.logo} alt={ref.name} className="aspect-[1000/560] w-full object-cover" loading="lazy" />
                <div className="p-4 text-center">
                  <p className="font-bold text-foreground">{ref.name}</p>
                  <p className="text-sm text-muted-foreground">{pick(ref.text)}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <WebsiteNovaSection />

      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">{pick(SECTION_TITLES.steps)}</h2>
          <ol className="grid gap-6 md:grid-cols-4">
            {STEPS.map((step, i) => (
              <FadeIn key={step.title.de} className="rounded-2xl bg-card p-6 shadow-sm">
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mb-2 font-bold text-foreground">{pick(step.title)}</h3>
                <p className="text-sm text-muted-foreground">{pick(step.text)}</p>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <FadeIn className="container mx-auto max-w-3xl px-4">
          <div className="rounded-3xl border border-primary bg-card p-8 text-center shadow-xl shadow-primary/10">
            <h2 className="mb-2 text-2xl font-bold text-foreground">{pick(PRICE.title)}</h2>
            <p className="mb-4 text-4xl font-black text-primary">{pick(PRICE.value)}</p>
            <p className="mx-auto mb-6 max-w-xl text-muted-foreground">{pick(PRICE.text)}</p>
            <ul className="mx-auto mb-8 max-w-md space-y-2 text-left">
              {PRICE.points.map((p) => (
                <li key={p.de} className="flex items-start gap-2 text-sm text-foreground/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  {pick(p)}
                </li>
              ))}
            </ul>
            <Button size="lg" className="rounded-full" onClick={enquire}>
              {pick(HERO.cta)} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">{pick(PRICE.vat)}</p>
          </div>
        </FadeIn>
      </section>

      <section className="bg-secondary py-16 text-center text-white">
        <FadeIn className="container mx-auto max-w-2xl px-4">
          <h2 className="mb-6 text-3xl font-bold">{pick(SECTION_TITLES.final)}</h2>
          <Button size="lg" variant="secondary" className="rounded-full" onClick={enquire}>
            {pick(SECTION_TITLES.finalBtn)} <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </FadeIn>
      </section>
    </div>
  );
}
