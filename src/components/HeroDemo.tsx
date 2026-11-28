import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, Monitor, Phone, Smartphone } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { useContactForm } from "@/components/ContactFormDialog";

// Kopfbereich der Startseite: Besucher tippen den Namen ihres Betriebs, wählen die Branche und sehen
// sofort eine Beispiel-Website in einem Glas-Gerät (Laptop- oder Handy-Ansicht). Das ist das eine
// auffällige Element der Seite – alles andere bleibt bewusst ruhig.

type L = { de: string; en: string; tr: string };

type Branch = {
  id: string;
  label: L;
  name: string;
  tagline: L;
  cta: L;
  items: L[];
  bg: string;
  ink: string;
  accent: string;
  accentInk: string;
  soft: string;
  font: string;
};

const BRANCHES: Branch[] = [
  {
    id: "friseur",
    label: { de: "Friseur", en: "Hair salon", tr: "Kuaför" },
    name: "Salon Aylin",
    tagline: { de: "Schnitt, Farbe und Pflege in Dortmund-Mitte.", en: "Cuts, colour and care in central Dortmund.", tr: "Dortmund merkezde kesim, boya ve bakım." },
    cta: { de: "Termin buchen", en: "Book appointment", tr: "Randevu al" },
    items: [
      { de: "Damenschnitt", en: "Women's cut", tr: "Kadın kesimi" },
      { de: "Balayage", en: "Balayage", tr: "Balyaj" },
      { de: "Herrenschnitt", en: "Men's cut", tr: "Erkek kesimi" },
    ],
    bg: "#f7efea",
    ink: "#3b2328",
    accent: "#b4637a",
    accentInk: "#ffffff",
    soft: "#ecdcd5",
    font: "'Instrument Serif', Georgia, serif",
  },
  {
    id: "handwerk",
    label: { de: "Handwerk", en: "Trades", tr: "Zanaat" },
    name: "Elektro Yilmaz",
    tagline: { de: "Elektroinstallation und Smart Home im Ruhrgebiet.", en: "Electrical installation and smart home in the Ruhr area.", tr: "Ruhr bölgesinde elektrik tesisatı ve akıllı ev." },
    cta: { de: "Rückruf anfordern", en: "Request a callback", tr: "Geri arama iste" },
    items: [
      { de: "Neubau & Sanierung", en: "New builds & renovation", tr: "Yeni yapı ve tadilat" },
      { de: "Wallbox", en: "Wallbox", tr: "Wallbox" },
      { de: "Notdienst", en: "Emergency service", tr: "Acil servis" },
    ],
    bg: "#16191d",
    ink: "#f1f3f5",
    accent: "#f5b700",
    accentInk: "#16191d",
    soft: "#23282e",
    font: "'Bricolage Grotesque Variable', system-ui, sans-serif",
  },
  {
    id: "restaurant",
    label: { de: "Restaurant", en: "Restaurant", tr: "Restoran" },
    name: "Trattoria Luca",
    tagline: { de: "Hausgemachte Pasta, mitten im Kreuzviertel.", en: "Homemade pasta in the heart of the Kreuzviertel.", tr: "Kreuzviertel'in kalbinde ev yapımı makarna." },
    cta: { de: "Tisch reservieren", en: "Reserve a table", tr: "Masa ayırt" },
    items: [
      { de: "Speisekarte", en: "Menu", tr: "Menü" },
      { de: "Mittagstisch", en: "Lunch menu", tr: "Öğle menüsü" },
      { de: "Catering", en: "Catering", tr: "Catering" },
    ],
    bg: "#1d2a22",
    ink: "#f3ecdc",
    accent: "#e9c46a",
    accentInk: "#1d2a22",
    soft: "#28382e",
    font: "'Instrument Serif', Georgia, serif",
  },
  {
    id: "praxis",
    label: { de: "Praxis", en: "Practice", tr: "Muayenehane" },
    name: "Physio am Phoenixsee",
    tagline: { de: "Physiotherapie und Rückentraining – auch abends.", en: "Physiotherapy and back training – evenings too.", tr: "Fizyoterapi ve sırt egzersizi – akşamları da." },
    cta: { de: "Termin online buchen", en: "Book online", tr: "Online randevu" },
    items: [
      { de: "Krankengymnastik", en: "Physiotherapy", tr: "Fizik tedavi" },
      { de: "Manuelle Therapie", en: "Manual therapy", tr: "Manuel terapi" },
      { de: "Hausbesuche", en: "Home visits", tr: "Ev ziyareti" },
    ],
    bg: "#f4f8fb",
    ink: "#12324a",
    accent: "#2b6cb0",
    accentInk: "#ffffff",
    soft: "#e1ebf3",
    font: "'Instrument Sans Variable', system-ui, sans-serif",
  },
  {
    id: "cafe",
    label: { de: "Café", en: "Café", tr: "Kafe" },
    name: "Kaffeebude Hörde",
    tagline: { de: "Frisch gerösteter Kaffee und Kuchen vom Blech.", en: "Freshly roasted coffee and homemade cake.", tr: "Taze kavrulmuş kahve ve ev yapımı kek." },
    cta: { de: "Vorbestellen", en: "Pre-order", tr: "Ön sipariş" },
    items: [
      { de: "Frühstück", en: "Breakfast", tr: "Kahvaltı" },
      { de: "Kuchen", en: "Cake", tr: "Kek" },
      { de: "Bohnen to go", en: "Beans to go", tr: "Paket kahve" },
    ],
    bg: "#2b1f1a",
    ink: "#f6e9dc",
    accent: "#e07a4f",
    accentInk: "#2b1f1a",
    soft: "#3a2a23",
    font: "'Bricolage Grotesque Variable', system-ui, sans-serif",
  },
];

const UI = {
  tryLabel: { de: "Ihr Betrieb", en: "Your business", tr: "İşletmeniz" },
  placeholder: { de: "z. B. Salon Aylin…", en: "e.g. Salon Aylin…", tr: "ör. Salon Aylin…" },
  branchLabel: { de: "Branche", en: "Industry", tr: "Sektör" },
  hint: {
    de: "Tippen Sie Ihren Namen ein und wählen Sie Ihre Branche – die Vorschau passt sich sofort an.",
    en: "Type your business name and pick your industry – the preview updates instantly.",
    tr: "İşletmenizin adını yazın ve sektörünüzü seçin – önizleme anında güncellenir.",
  },
  desktop: { de: "Laptop-Ansicht", en: "Laptop view", tr: "Dizüstü görünümü" },
  mobile: { de: "Handy-Ansicht", en: "Phone view", tr: "Telefon görünümü" },
  example: { de: "Beispiel-Entwurf", en: "Sample draft", tr: "Örnek taslak" },
  request: { de: "Diese Website anfragen", en: "Request this website", tr: "Bu siteyi talep et" },
  open: { de: "Geöffnet heute bis 18 Uhr", en: "Open today until 6 pm", tr: "Bugün 18:00'e kadar açık" },
};

export const HeroDemo = ({
  title,
  subtitle,
  bookLabel,
  priceNote,
}: {
  title: string;
  subtitle: string;
  bookLabel: string;
  priceNote: string;
}) => {
  const { language } = useLanguage();
  const pick = (t: L) => (language === "en" ? t.en : language === "tr" ? t.tr : t.de);
  const { openForm } = useContactForm();
  const reduce = useReducedMotion();
  const inputId = useId();
  const [branchId, setBranchId] = useState(BRANCHES[0].id);
  const [name, setName] = useState("");
  // Auf dem Handy startet die Vorschau gleich in der Handy-Ansicht
  const [device, setDevice] = useState<"desktop" | "mobile">(() =>
    typeof window !== "undefined" && window.matchMedia?.("(max-width: 640px)").matches ? "mobile" : "desktop",
  );
  const b = BRANCHES.find((x) => x.id === branchId) || BRANCHES[0];
  const shown = name.trim().slice(0, 40) || b.name;

  const request = () => openForm("contact", `Live-Vorschau: ${pick(b.label)} – ${shown}`);

  return (
    <section className="dark relative isolate -mt-[4.5rem] overflow-hidden bg-[#071318] pt-[4.5rem] text-white md:-mt-[5.25rem] md:pt-[5.25rem]">
      {/* Farbiges Licht hinter dem Glas – übernimmt die Akzentfarbe der gewählten Branche */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -right-32 top-10 h-[34rem] w-[34rem] rounded-full blur-[140px]"
          animate={{ backgroundColor: b.accent, opacity: 0.35 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[#1e9fae]/30 blur-[140px]" />
      </div>

      <div className="container mx-auto grid max-w-7xl gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-x-16 lg:gap-y-8 lg:py-24">
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-[2.6rem] font-bold leading-[0.98] sm:text-6xl lg:text-[4.6rem]"
            style={{ fontVariationSettings: '"wdth" 85, "opsz" 96', letterSpacing: "-0.01em" }}
          >
            {title}
          </motion.h1>
          <p className="mt-6 max-w-xl text-pretty text-base text-white/80 sm:text-lg">{subtitle}</p>
        </div>

        {/* Glas-Gerät mit der Live-Vorschau (auf dem Handy direkt unter der Überschrift) */}
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-sm text-white/60">{pick(UI.example)}</span>
            <div className="glass inline-flex rounded-lg p-1" role="group" aria-label="Ansicht">
              {(["desktop", "mobile"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={device === d}
                  aria-label={pick(d === "desktop" ? UI.desktop : UI.mobile)}
                  onClick={() => setDevice(d)}
                  className={`flex h-8 w-10 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ee3ee] ${
                    device === d ? "bg-white text-[#071318]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {d === "desktop" ? <Monitor className="h-4 w-4" aria-hidden="true" /> : <Smartphone className="h-4 w-4" aria-hidden="true" />}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout={!reduce}
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
            className={`glass mx-auto overflow-hidden ${device === "mobile" ? "max-w-[300px] rounded-[2.2rem] p-2.5" : "w-full rounded-2xl p-2"}`}
          >
            {device === "desktop" && (
              <div className="flex items-center gap-1.5 px-2 pb-2 pt-1" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="ml-3 truncate rounded-md bg-white/10 px-3 py-0.5 text-xs text-white/70" translate="no">
                  {shown.toLowerCase().replace(/[^a-z0-9äöüß]+/g, "-").replace(/^-|-$/g, "")}.de
                </span>
              </div>
            )}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={b.id + device}
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className={`overflow-hidden ${device === "mobile" ? "rounded-[1.8rem]" : "rounded-xl"}`}
                style={{ background: b.bg, color: b.ink }}
                aria-label={`${pick(UI.example)}: ${shown}`}
                role="img"
              >
                <div className="flex items-center justify-between px-5 py-3 text-xs" style={{ borderBottom: `1px solid ${b.soft}` }}>
                  <span className="font-semibold" translate="no" style={{ fontFamily: b.font, fontSize: device === "mobile" ? 15 : 17 }}>
                    {shown}
                  </span>
                  {device === "desktop" ? (
                    <span className="flex gap-4 opacity-70">
                      {b.items.slice(0, 2).map((i) => (
                        <span key={i.de}>{pick(i)}</span>
                      ))}
                      <span>Kontakt</span>
                    </span>
                  ) : (
                    <span className="flex flex-col gap-1" aria-hidden="true">
                      <span className="h-0.5 w-4 rounded" style={{ background: b.ink }} />
                      <span className="h-0.5 w-4 rounded" style={{ background: b.ink }} />
                    </span>
                  )}
                </div>
                <div className={device === "mobile" ? "px-5 pb-6 pt-8" : "grid grid-cols-[1.3fr_1fr] gap-6 px-6 pb-7 pt-10"}>
                  <div>
                    <p
                      className="break-words leading-[1.02]"
                      style={{ fontFamily: b.font, fontSize: device === "mobile" ? 34 : 44, fontWeight: b.font.includes("Serif") ? 400 : 700 }}
                      translate="no"
                    >
                      {shown}
                    </p>
                    <p className="mt-3 text-sm opacity-75">{pick(b.tagline)}</p>
                    <span
                      className="mt-5 inline-block rounded-md px-4 py-2 text-sm font-semibold"
                      style={{ background: b.accent, color: b.accentInk }}
                    >
                      {pick(b.cta)}
                    </span>
                    <p className="mt-4 text-xs opacity-60">{pick(UI.open)}</p>
                  </div>
                  <ul className={`flex flex-col gap-2 ${device === "mobile" ? "mt-7" : ""}`}>
                    {b.items.map((i) => (
                      <li key={i.de} className="rounded-lg px-4 py-3 text-sm font-medium" style={{ background: b.soft }}>
                        {pick(i)}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
        <div className="lg:col-start-1 lg:row-start-2">

          {/* Bedienung der Vorschau */}
          <div className="glass mt-8 max-w-xl rounded-2xl p-4 sm:p-5">
            <label htmlFor={inputId} className="text-sm font-semibold text-white">
              {pick(UI.tryLabel)}
            </label>
            <input
              id={inputId}
              name="business-name"
              autoComplete="organization"
              spellCheck={false}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={pick(UI.placeholder)}
              maxLength={40}
              className="mt-2 h-11 w-full rounded-lg border border-white/15 bg-black/30 px-3 text-base text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ee3ee]"
            />
            <p id={`${inputId}-b`} className="mt-4 text-sm font-semibold text-white">
              {pick(UI.branchLabel)}
            </p>
            <div role="radiogroup" aria-labelledby={`${inputId}-b`} className="mt-2 flex flex-wrap gap-2">
              {BRANCHES.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  role="radio"
                  aria-checked={x.id === branchId}
                  onClick={() => setBranchId(x.id)}
                  className={`h-9 rounded-lg px-3.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ee3ee] ${
                    x.id === branchId ? "bg-white text-[#071318]" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {pick(x.label)}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-white/60">{pick(UI.hint)}</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={request}
              className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-6 text-base font-semibold text-[#071318] transition-colors hover:bg-[#7ee3ee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ee3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071318]"
            >
              {pick(UI.request)}
            </button>
            <Link
              to="/termin"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ee3ee]"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              {bookLabel}
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/70">{priceNote}</p>
          <a href="tel:+4915207595260" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline">
            <Phone className="h-4 w-4 text-[#7ee3ee]" aria-hidden="true" /> +49&nbsp;152&nbsp;0759&nbsp;5260
          </a>
        </div>

      </div>
    </section>
  );
};
