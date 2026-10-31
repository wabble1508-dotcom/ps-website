import { createContext, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageContext";

type FormType = "contact" | "lead-magnet";

interface ContactFormContextType {
  openForm: (type?: FormType, source?: string) => void;
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(undefined);

export const useContactForm = () => {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error("useContactForm must be used within a ContactFormProvider");
  }
  return context;
};

// WhatsApp number in international format (no +, spaces or leading zeros)
const WHATSAPP_NUMBER = "4915207595260";

type L = { de: string; en: string; tr: string };

// Anliegen im Formular – die IDs passen zu den automatischen Antwort-Mails in server/autoReply.ts
const TOPICS: { id: string; label: L }[] = [
  { id: "website", label: { de: "Website", en: "Website", tr: "Web sitesi" } },
  { id: "app", label: { de: "App-Entwicklung", en: "App development", tr: "Uygulama geliştirme" } },
  { id: "software", label: { de: "Software-Entwicklung", en: "Software development", tr: "Yazılım geliştirme" } },
  { id: "chat", label: { de: "KI-Live-Chat", en: "AI live chat", tr: "AI canlı sohbet" } },
  { id: "telefon", label: { de: "KI-Telefonassistent", en: "AI phone assistant", tr: "AI telefon asistanı" } },
  { id: "termine", label: { de: "Online-Terminbuchung", en: "Online booking", tr: "Online randevu" } },
  { id: "google", label: { de: "Google & SEO", en: "Google & SEO", tr: "Google ve SEO" } },
  { id: "design", label: { de: "Design, Druck & NFC-Karten", en: "Design, print & NFC cards", tr: "Tasarım, baskı ve NFC kartları" } },
  { id: "crm", label: { de: "CRM & Automatisierung", en: "CRM & automation", tr: "CRM ve otomasyon" } },
  { id: "sonstiges", label: { de: "Sonstiges", en: "Other", tr: "Diğer" } },
];

// Anliegen aus dem Button bzw. der Seite erraten, von der das Formular geöffnet wurde
const guessTopic = (source: string, path: string) => {
  const s = `${source} ${path}`.toLowerCase();
  const rules: [string, string[]][] = [
    ["app", ["app-entwicklung", "app ", "app-", "/app"]],
    ["software", ["software"]],
    ["telefon", ["telefon"]],
    ["chat", ["chat"]],
    ["termine", ["termin"]],
    ["design", ["nfc", "druck", "design"]],
    ["crm", ["crm", "dashboard", "integration"]],
    ["google", ["google", "seo"]],
  ];
  return rules.find(([, words]) => words.some((w) => s.includes(w)))?.[0] || "website";
};

const UI = {
  title: { de: "Anfrage senden", en: "Send an enquiry", tr: "Talep gönder" },
  desc: {
    de: "Sie erhalten sofort eine Bestätigung per E-Mail und wir melden uns innerhalb von 24 Stunden (werktags).",
    en: "You'll get an instant confirmation by email and we'll get back to you within 24 hours (on working days).",
    tr: "Hemen e-posta ile onay alırsınız, iş günlerinde 24 saat içinde size döneriz.",
  },
  name: { de: "Name", en: "Name", tr: "Ad" },
  email: { de: "E-Mail", en: "Email", tr: "E-posta" },
  phone: { de: "Telefon (optional)", en: "Phone (optional)", tr: "Telefon (isteğe bağlı)" },
  topic: { de: "Worum geht es?", en: "What is it about?", tr: "Konu nedir?" },
  message: { de: "Ihre Nachricht (optional)", en: "Your message (optional)", tr: "Mesajınız (isteğe bağlı)" },
  messagePh: {
    de: "z. B. Branche, gewünschte Funktionen, Zeitrahmen …",
    en: "e.g. industry, desired features, timeframe …",
    tr: "örn. sektör, istenen özellikler, zaman planı …",
  },
  privacy: {
    de: "Ihre Angaben verwenden wir nur zur Bearbeitung Ihrer Anfrage. Mehr in der",
    en: "We only use your details to handle your enquiry. More in the",
    tr: "Bilgilerinizi yalnızca talebinizi işlemek için kullanırız. Ayrıntılar:",
  },
  privacyLink: { de: "Datenschutzerklärung", en: "privacy policy", tr: "Gizlilik politikası" },
  send: { de: "Anfrage senden", en: "Send enquiry", tr: "Talebi gönder" },
  whatsapp: { de: "Lieber per WhatsApp", en: "Prefer WhatsApp", tr: "WhatsApp tercih ederim" },
  error: {
    de: "Das hat leider nicht geklappt. Bitte prüfen Sie Ihre Angaben oder schreiben Sie uns per WhatsApp.",
    en: "Unfortunately that didn't work. Please check your details or message us on WhatsApp.",
    tr: "Maalesef olmadı. Lütfen bilgilerinizi kontrol edin veya bize WhatsApp'tan yazın.",
  },
  thanks: { de: "Vielen Dank!", en: "Thank you!", tr: "Çok teşekkürler!" },
  thanksText: {
    de: "Ihre Anfrage ist bei uns angekommen. Eine Bestätigung mit den nächsten Schritten ist unterwegs in Ihr E-Mail-Postfach.",
    en: "Your enquiry has reached us. A confirmation with the next steps is on its way to your inbox.",
    tr: "Talebiniz bize ulaştı. Sonraki adımları içeren bir onay e-postanız yolda.",
  },
  book: { de: "Gleich einen Termin wählen", en: "Pick an appointment now", tr: "Hemen randevu seç" },
  close: { de: "Schließen", en: "Close", tr: "Kapat" },
};

const inputClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

export const ContactFormProvider = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const pick = (t: L) => (language === "en" ? t.en : language === "tr" ? t.tr : t.de);

  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("");
  const [topic, setTopic] = useState("website");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const whatsappMessage = (src?: string) =>
    src && src.includes("NFC")
      ? `Hallo Pankaj, ich möchte gerne NFC Google Business Karten bestellen (${src}). Bitte senden Sie mir die Details zur einfachen Abwicklung.`
      : `Hallo Pankaj, ich interessiere mich für Ihre Leistungen${src ? ` (über: ${src})` : ""}.`;

  const openWhatsApp = (message: string) =>
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");

  const openForm = (type: FormType = "contact", src?: string) => {
    if (type === "lead-magnet") {
      openWhatsApp("Hallo Pankaj, ich habe Interesse an der kostenlosen Checkliste von PS Professional Solutions.");
      return;
    }
    setSource(src || "");
    setTopic(guessTopic(src || "", pathname));
    setStatus("idle");
    setOpen(true);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: "kontakt",
          page: pathname,
          language,
          website: data.get("website"),
          fields: {
            first_name: data.get("name"),
            email: data.get("email"),
            phone: data.get("phone"),
            topic,
            message: data.get("message"),
            ...(source ? { source } : {}),
          },
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <ContactFormContext.Provider value={{ openForm }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
          {status === "done" ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-green-600" />
              <DialogTitle className="mb-2 text-2xl">{pick(UI.thanks)}</DialogTitle>
              <DialogDescription className="mb-6">{pick(UI.thanksText)}</DialogDescription>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button className="rounded-full" asChild onClick={() => setOpen(false)}>
                  <Link to="/analyse-bestaetigungen">{pick(UI.book)}</Link>
                </Button>
                <Button variant="outline" className="rounded-full" onClick={() => setOpen(false)}>
                  {pick(UI.close)}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{pick(UI.title)}</DialogTitle>
                <DialogDescription>{pick(UI.desc)}</DialogDescription>
              </DialogHeader>
              <form onSubmit={submit} className="space-y-4">
                {/* Spam-Falle: für Menschen unsichtbar */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div>
                  <p className="mb-2 text-sm font-semibold text-foreground">{pick(UI.topic)}</p>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTopic(t.id)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                          topic === t.id
                            ? "border-primary bg-primary text-white"
                            : "border-border bg-background text-foreground hover:border-primary"
                        }`}
                      >
                        {pick(t.label)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-foreground">
                    {pick(UI.name)} *
                    <input name="name" required maxLength={80} autoComplete="name" className={`${inputClass} mt-1`} />
                  </label>
                  <label className="block text-sm font-medium text-foreground">
                    {pick(UI.email)} *
                    <input name="email" type="email" required maxLength={120} autoComplete="email" className={`${inputClass} mt-1`} />
                  </label>
                </div>
                <label className="block text-sm font-medium text-foreground">
                  {pick(UI.phone)}
                  <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={`${inputClass} mt-1`} />
                </label>
                <label className="block text-sm font-medium text-foreground">
                  {pick(UI.message)}
                  <textarea name="message" rows={4} maxLength={2000} placeholder={pick(UI.messagePh)} className={`${inputClass} mt-1`} />
                </label>
                <p className="text-xs text-muted-foreground">
                  {pick(UI.privacy)}{" "}
                  <Link to="/datenschutz" className="underline" onClick={() => setOpen(false)}>
                    {pick(UI.privacyLink)}
                  </Link>
                  .
                </p>
                {status === "error" && <p className="text-sm font-medium text-red-600">{pick(UI.error)}</p>}
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button type="submit" className="flex-1 rounded-full" disabled={status === "sending"}>
                    {status === "sending" ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Send className="mr-1 h-4 w-4" />}
                    {pick(UI.send)}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full border-[#25D366] text-[#128C7E] hover:bg-[#25D366]/10"
                    onClick={() => openWhatsApp(whatsappMessage(source))}
                  >
                    {pick(UI.whatsapp)}
                  </Button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </ContactFormContext.Provider>
  );
};
