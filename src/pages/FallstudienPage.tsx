import { SEO } from "@/components/SEO";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useContactForm } from "@/components/ContactFormDialog";
import { useLanguage } from "@/components/LanguageContext";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Clock,
  CalendarCheck,
} from "lucide-react";

const FallstudienPage = () => {
  const { openForm } = useContactForm();
  const { language } = useLanguage();
  const isEn = language === "en";

  const cases = [
    {
      client: "Arvené",
      industry: isEn ? "Premium Beauty Salon" : "Premium Beauty-Salon",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/attachments/12ea5c34-dace-4303-8cf4-f21c47723265.png",
      metrics: [
        {
          icon: TrendingUp,
          value: "+42%",
          label: isEn ? "More Bookings" : "Mehr Buchungen",
        },
        {
          icon: Clock,
          value: "-15h",
          label: isEn ? "Less phone time/week" : "Weniger Telefonzeit/Woche",
        },
        {
          icon: CalendarCheck,
          value: "-85%",
          label: isEn ? "Fewer No-Shows" : "Weniger Ausfälle",
        },
      ],
      problem: isEn
        ? "Constant phone ringing interrupted treatments. Many appointments were forgotten by clients, leading to revenue loss."
        : "Ständiges Telefonklingeln unterbrach die Behandlungen. Viele Termine wurden von Kunden vergessen, was zu Umsatzeinbußen führte.",
      solution: isEn
        ? "Implementation of the AI Telephone Assistant for 24/7 availability and intelligent appointment automation with automated SMS reminders."
        : "Einsatz des KI-Telefon-Assistenten für 24/7 Erreichbarkeit und der intelligenten Termin-Automation mit automatischen SMS-Erinnerungen.",
      result: isEn
        ? "The team can now focus 100% on clients. No-shows have been practically eliminated, and revenue has noticeably increased due to automated upselling in the booking process."
        : "Das Team kann sich nun zu 100% auf die Kunden konzentrieren. Terminausfälle wurden praktisch eliminiert und der Umsatz stieg durch automatisiertes Upselling im Buchungsprozess spürbar an.",
    },
    {
      client: "Delphin Feinkost",
      industry: isEn ? "Specialty Food & Catering" : "Feinkost & Catering",
      image:
        "/media/vibe.filesafe.space/1778931020193405557/attachments/1f94c6c6-5348-4828-9196-05cff248ceb5.png",
      metrics: [
        {
          icon: TrendingUp,
          value: "+300%",
          label: isEn ? "More online inquiries" : "Mehr Online-Anfragen",
        },
        {
          icon: Clock,
          value: "24/7",
          label: isEn ? "Order acceptance" : "Bestellannahme",
        },
        {
          icon: CheckCircle2,
          value: "100%",
          label: isEn ? "Automated processing" : "Automatisierte Abwicklung",
        },
      ],
      problem: isEn
        ? "Catering inquiries came in unstructured via email, phone, and WhatsApp. Creating offers cost hours every day."
        : "Catering-Anfragen kamen unstrukturiert per E-Mail, Telefon und WhatsApp. Die Angebotserstellung kostete täglich Stunden.",
      solution: isEn
        ? "A new, SEO-optimized website with an integrated AI Live Chat that pre-qualifies inquiries and automatically generates standardized catering offers."
        : "Eine neue, SEO-optimierte Website mit integriertem KI Live-Chat, der Anfragen vorqualifiziert und standardisierte Catering-Angebote automatisch generiert.",
      result: isEn
        ? "Catering orders are now processed completely digitally. The AI chat answers customer questions immediately, significantly increasing the conversion rate."
        : "Catering-Bestellungen laufen nun komplett digital ab. Der KI-Chat beantwortet Kundenfragen sofort, was die Conversion-Rate massiv erhöht hat.",
    },
    {
      client: "Matou Kfz Schilder Express (Dortmund & Bundesweit)",
      industry: isEn
        ? "Vehicle Registration & License Plates"
        : "KFZ-Zulassungsdienst & Schilder",
      image:
        "/media/vibe.filesafe.space/1779266194699726281/attachments/f908adde-363b-424a-9efa-c58282ea44bb.jpg",
      metrics: [
        {
          icon: TrendingUp,
          value: "+350%",
          label: isEn
            ? "Online License Plate Orders"
            : "Online Schilder-Bestellungen",
        },
        {
          icon: Clock,
          value: "5 Min",
          label: isEn ? "Online Registration" : "Online-Zulassungszeit",
        },
        {
          icon: CheckCircle2,
          value: "100%",
          label: isEn ? "i-Kfz Stage 4 Compliant" : "i-Kfz Stufe 4 konform",
        },
      ],
      problem: isEn
        ? "Customers faced long waiting times at registration offices and local plate shops were losing customers to outdated online portals."
        : "Lange Wartezeiten bei den Zulassungsstellen und Kunden, die Schilder mühsam vor Ort kaufen mussten, führten zu Umsatzeinbußen.",
      solution: isEn
        ? "Development of a high-performance web platform for Matou Kfz Express with a custom plate configurator, city authority locator, and digital i-Kfz Stage 4 registration."
        : "Entwicklung der vollumfänglichen Plattform matou-kfz-express.de mit Wunschkennzeichen-Konfigurator, Behörden-Finder und digitalem i-Kfz Stufe 4 Zulassungsprozess.",
      result: isEn
        ? "Vehicle owners can now check plate availability in 5 minutes, purchase DIN-certified plates online, and initiate instant registration directly from home."
        : "Fahrzeughalter können in unter 5 Minuten ihr Kennzeichen prüfen, DIN-zertifizierte Schilder bestellen und die Zulassung direkt von zuhause veranlassen.",
    },
  ];

  return (
    <div className="w-full bg-white">
      <SEO
        title={
          isEn
            ? "Success Stories & Case Studies | PS Professional Solutions"
            : "Erfolgsgeschichten & Fallstudien | PS Professional Solutions"
        }
        description={
          isEn
            ? "Real results from real clients. See how we help companies save time and gain more customers through AI automation and web design."
            : "Echte Ergebnisse von echten Kunden. Sehen Sie, wie wir Unternehmen durch KI-Automation und Webdesign helfen, Zeit zu sparen und mehr Kunden zu gewinnen."
        }
        keywords="Fallstudien, Case Studies, Erfolgsgeschichten, KI Automation Erfahrungen, Webdesign Referenzen"
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-[#153a48] to-[#1e9fae] py-20 lg:py-32">
        <FadeIn
          className="container relative z-10 mx-auto px-4 text-center"
          direction="up"
        >
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
            {isEn ? "Real Results." : "Echte Ergebnisse."} <br />
            <span className="text-primary-foreground/80">
              {isEn ? "Measurable Success." : "Messbarer Erfolg."}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
            {isEn
              ? "Discover how we transform everyday business challenges into automated, highly profitable workflows."
              : "Entdecken Sie, wie wir alltägliche geschäftliche Herausforderungen in automatisierte, hochprofitable Workflows verwandeln."}
          </p>
        </FadeIn>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl space-y-24">
          {cases.map((study, index) => (
            <FadeIn key={index} direction={index % 2 === 0 ? "left" : "right"}>
              <Card className="overflow-hidden border-none shadow-2xl rounded-3xl bg-muted/20">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
                    <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      {study.industry}
                    </div>
                    <h2 className="text-3xl font-bold mb-8 text-secondary">
                      {study.client}
                    </h2>

                    <div className="space-y-6 mb-8">
                      <div>
                        <h3 className="text-lg font-bold text-destructive mb-2 flex items-center gap-2">
                          <XIcon className="h-5 w-5" />{" "}
                          {isEn ? "The Problem" : "Das Problem"}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {study.problem}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5" />{" "}
                          {isEn ? "Our Solution" : "Unsere Lösung"}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-green-600 mb-2 flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />{" "}
                          {isEn ? "The Result" : "Das Ergebnis"}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed font-medium">
                          {study.result}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50"></div>
                    <img
                      src={study.image}
                      alt={study.client}
                      className="w-48 h-48 object-contain mx-auto mb-12 relative z-10 drop-shadow-2xl bg-white/10 rounded-full p-4 border border-white/20"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
                      {study.metrics.map((metric, mIndex) => (
                        <div
                          key={mIndex}
                          className="text-center bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10"
                        >
                          <metric.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                          <div className="text-3xl font-bold text-white mb-1">
                            {metric.value}
                          </div>
                          <div className="text-xs text-white/80 font-medium uppercase tracking-wider">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20 text-white text-center">
        <FadeIn className="container mx-auto px-4" direction="up">
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            {isEn
              ? "Ready for your own success story?"
              : "Bereit für Ihre eigene Erfolgsgeschichte?"}
          </h2>
          <p className="mb-10 text-lg text-white/80 max-w-2xl mx-auto">
            {isEn
              ? "Let's find out in a free potential analysis how much time and money you can save with AI."
              : "Lassen Sie uns in einer kostenlosen Potenzialanalyse herausfinden, wie viel Zeit und Geld Sie mit KI sparen können."}
          </p>
          <Button
            size="lg"
            className="h-14 px-8 text-lg font-semibold shadow-xl hover:scale-105 transition-transform"
            onClick={() => openForm("contact", "Fallstudien")}
          >
            {isEn ? "Secure Free Check" : "Gratis-Check sichern"}{" "}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </FadeIn>
      </section>
    </div>
  );
};

const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default FallstudienPage;
