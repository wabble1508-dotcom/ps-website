import { SEO } from "@/components/SEO";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { useContactForm } from "@/components/ContactFormDialog";
import { useLanguage } from "@/components/LanguageContext";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const GlossarPage = () => {
  const { openForm } = useContactForm();
  const { language } = useLanguage();
  const isEn = language === "en";
  const [searchTerm, setSearchTerm] = useState("");

  const terms = [
    {
      term: "A/B-Testing",
      enTerm: "A/B Testing",
      definition: isEn
        ? "Comparing two versions of a webpage or email to see which performs better in terms of conversions."
        : "Der Vergleich zweier Versionen einer Webseite oder E-Mail, um herauszufinden, welche besser konvertiert.",
    },
    {
      term: "API (Schnittstelle)",
      enTerm: "API (Interface)",
      definition: isEn
        ? "A software intermediary that allows two applications to talk to each other, essential for automation."
        : "Eine Schnittstelle, die es zwei Anwendungen ermöglicht, miteinander zu kommunizieren, essenziell für Automatisierungen.",
    },
    {
      term: "B2B (Business-to-Business)",
      enTerm: "B2B (Business-to-Business)",
      definition: isEn
        ? "Business conducted between companies, rather than between a company and individual consumers."
        : "Geschäftsbeziehungen zwischen zwei oder mehr Unternehmen (im Gegensatz zu Endkunden).",
    },
    {
      term: "B2C (Business-to-Consumer)",
      enTerm: "B2C (Business-to-Consumer)",
      definition: isEn
        ? "Business conducted directly between a company and consumers who are the end-users of its products or services."
        : "Geschäftsbeziehungen direkt zwischen einem Unternehmen und dem Endverbraucher.",
    },
    {
      term: "Call-to-Action (CTA)",
      enTerm: "Call-to-Action (CTA)",
      definition: isEn
        ? "A prompt on a website that tells the user to take some specified action, like 'Buy Now' or 'Book Appointment'."
        : "Eine Handlungsaufforderung auf einer Website, die dem Nutzer sagt, was er tun soll, z.B. 'Jetzt kaufen' oder 'Termin buchen'.",
    },
    {
      term: "Conversion-Rate",
      enTerm: "Conversion Rate",
      definition: isEn
        ? "The percentage of website visitors who take a desired action (e.g., booking an appointment, filling out a contact form, or making a call)."
        : "Der Prozentsatz der Website-Besucher, die eine gewünschte Aktion ausführen (z. B. einen Termin buchen, ein Kontaktformular ausfüllen oder anrufen).",
    },
    {
      term: "CRM-System",
      enTerm: "CRM System",
      definition: isEn
        ? "Customer Relationship Management. A software to manage all your company's relationships and interactions with customers and potential customers."
        : "Customer Relationship Management. Eine Software zur Verwaltung aller Beziehungen und Interaktionen Ihres Unternehmens mit Kunden und potenziellen Kunden.",
    },
    {
      term: "Google Unternehmensprofil",
      enTerm: "Google Business Profile",
      definition: isEn
        ? "Your digital business card on Google Maps and Google Search. An optimized profile leads to significantly more local visibility and customer inquiries."
        : "Ihre digitale Visitenkarte bei Google Maps und in der Google-Suche. Ein optimiertes Profil führt zu deutlich mehr lokaler Sichtbarkeit und Kundenanfragen.",
    },
    {
      term: "KI-Telefon-Assistent",
      enTerm: "AI Voice Assistant",
      definition: isEn
        ? "An artificial intelligence that answers phone calls, understands natural language, answers customer questions, and can automatically schedule appointments directly in your calendar."
        : "Eine Künstliche Intelligenz, die Telefonanrufe entgegennimmt, natürliche Sprache versteht, Kundenfragen beantwortet und Termine vollautomatisch direkt im Kalender eintragen kann.",
    },
    {
      term: "Leadgenerierung",
      enTerm: "Lead Generation",
      definition: isEn
        ? "The process of attracting the interest of potential customers (leads) and capturing their contact information to turn them into paying customers."
        : "Der Prozess, das Interesse potenzieller Kunden (Leads) zu wecken und deren Kontaktdaten zu erfassen, um sie in zahlende Kunden zu verwandeln.",
    },
    {
      term: "Missed Call Text Back",
      enTerm: "Missed Call Text Back",
      definition: isEn
        ? "An automated system that immediately sends an SMS to a caller if the call could not be answered. It prevents potential customers from calling the competition."
        : "Ein automatisiertes System, das einem Anrufer sofort eine SMS sendet, falls der Anruf nicht entgegengenommen werden konnte. Es verhindert, dass potenzielle Kunden bei der Konkurrenz anrufen.",
    },
    {
      term: "No-Shows",
      enTerm: "No-Shows",
      definition: isEn
        ? "Customers or patients who do not show up for an agreed appointment without canceling. This can be massively reduced through automated SMS reminders."
        : "Kunden oder Patienten, die zu einem vereinbarten Termin nicht erscheinen, ohne abzusagen. Durch automatisierte SMS-Erinnerungen lässt sich dies massiv reduzieren.",
    },
    {
      term: "SEO (Suchmaschinenoptimierung)",
      enTerm: "SEO (Search Engine Optimization)",
      definition: isEn
        ? "Strategies and technical adjustments to a website to rank higher in search results on Google, making it easier for new customers to find you."
        : "Strategien und technische Anpassungen an einer Website, um in den Suchergebnissen bei Google weiter oben zu erscheinen und so leichter von Neukunden gefunden zu werden.",
    },
    {
      term: "Termin-Automation",
      enTerm: "Appointment Automation",
      definition: isEn
        ? "A digital booking system where customers can select free slots 24/7. It automatically syncs with your calendar and sends SMS reminders."
        : "Ein digitales Buchungssystem, bei dem Kunden 24/7 freie Termine auswählen können. Es synchronisiert sich automatisch mit Ihrem Kalender und sendet SMS-Erinnerungen.",
    },
    {
      term: "Workflow-Automatisierung",
      enTerm: "Workflow Automation",
      definition: isEn
        ? "The design, execution, and automation of processes based on workflow rules where human tasks, data or files are routed between people or systems."
        : "Die Gestaltung, Ausführung und Automatisierung von Prozessen basierend auf Regeln, bei denen Aufgaben oder Daten automatisch zwischen Systemen weitergeleitet werden.",
    },
  ].sort((a, b) =>
    (isEn ? a.enTerm : a.term).localeCompare(isEn ? b.enTerm : b.term),
  );

  const [activeLetter, setActiveLetter] = useState("Alle");

  const letters = [
    "Alle",
    ...Array.from(
      new Set(terms.map((t) => (isEn ? t.enTerm : t.term)[0].toUpperCase())),
    ).sort(),
  ];

  const filteredTerms = terms.filter((t) => {
    const termName = isEn ? t.enTerm : t.term;
    const matchesSearch =
      termName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLetter =
      activeLetter === "Alle" || termName.startsWith(activeLetter);
    return matchesSearch && matchesLetter;
  });

  return (
    <div className="w-full bg-white min-h-screen">
      <SEO
        title={
          isEn
            ? "AI & Marketing Glossary | PS Professional Solutions"
            : "KI & Marketing Lexikon | PS Professional Solutions"
        }
        description={
          isEn
            ? "Understand the most important terms around AI automation, SEO, and lead generation. Our glossary explains everything simply and clearly."
            : "Verstehen Sie die wichtigsten Begriffe rund um KI-Automation, SEO und Leadgenerierung. Unser Lexikon erklärt alles einfach und verständlich."
        }
        keywords="KI Lexikon, SEO Glossar, Marketing Begriffe, Missed Call Text Back, Leadgenerierung Erklärung"
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-[#153a48] to-[#1e9fae] py-20 lg:py-32">
        <FadeIn
          className="container relative z-10 mx-auto px-4 text-center"
          direction="up"
        >
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
            {isEn ? "The AI & Marketing" : "Das KI & Marketing"} <br />
            <span className="text-primary-foreground/80">
              {isEn ? "Glossary." : "Lexikon."}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl mb-10">
            {isEn
              ? "Simple explanations for the most important digital terms for your business success."
              : "Einfache Erklärungen für die wichtigsten digitalen Fachbegriffe für Ihren Unternehmenserfolg."}
          </p>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder={
                isEn ? "Search for terms..." : "Nach Begriffen suchen..."
              }
              className="w-full h-14 pl-12 rounded-full text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </FadeIn>
      </section>

      <section className="py-8 bg-muted/10 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap gap-2 justify-center">
            {letters.map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  activeLetter === letter
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-secondary hover:bg-muted border border-border"
                } ${letter === "Alle" ? "w-auto px-4" : ""}`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground text-lg">
              {isEn
                ? "No terms found matching your search."
                : "Keine Begriffe für Ihre Suche gefunden."}
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredTerms.map((item, index) => (
                <FadeIn key={index} direction="up" className="delay-[100ms]">
                  <div className="bg-muted/20 border border-border rounded-2xl p-6 md:p-8 hover:border-primary/30 hover:shadow-md transition-all">
                    <h2 className="text-2xl font-bold text-secondary mb-4">
                      {isEn ? item.enTerm : item.term}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {item.definition}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-muted/30 py-20 text-center">
        <FadeIn className="container mx-auto px-4" direction="up">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl text-secondary">
            {isEn ? "Still have questions?" : "Noch Fragen offen?"}
          </h2>
          <p className="mb-10 text-lg text-muted-foreground max-w-2xl mx-auto">
            {isEn
              ? "We are happy to explain personally how these technologies can be specifically applied in your company."
              : "Wir erklären Ihnen gerne persönlich, wie diese Technologien in Ihrem Unternehmen konkret eingesetzt werden können."}
          </p>
          <Button
            size="lg"
            className="h-14 px-8 text-lg font-semibold shadow-xl hover:scale-105 transition-transform"
            onClick={() => openForm("contact", "KI Lexikon")}
          >
            {isEn ? "Get free consultation" : "Kostenlos beraten lassen"}
          </Button>
        </FadeIn>
      </section>
    </div>
  );
};

export default GlossarPage;
