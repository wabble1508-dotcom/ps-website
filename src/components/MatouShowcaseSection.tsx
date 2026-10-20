import React, { useState } from "react";
import {
  Check,
  ShieldCheck,
  Zap,
  Globe,
  FileCheck,
  Search,
  ShoppingCart,
  Upload,
  Truck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContactForm } from "@/components/ContactFormDialog";

export const MatouShowcaseSection = () => {
  const { openForm } = useContactForm();
  const [activeTab, setActiveTab] = useState<
    "step1" | "step2" | "step3" | "step4"
  >("step1");

  const screenshotMap = {
    step1: {
      title: "1. Wunschkennzeichen konfigurieren & Verfügbarkeit prüfen",
      desc: "Live-Kennzeichen-Vorschau (z. B. DO-MA 1234), Direktprüfung bei der Stadt & Preisanzeige ab 25,00 € mit Zubehör (Umweltplakette, Halter).",
      img: "/media/vibe.filesafe.space/1778931020193405557/attachments/d8669466-9984-4188-a1c1-c74881c5b2e6.png",
      badge: "Konfigurator-Modul",
    },
    step2: {
      title: "2. Express-Zulassung & i-Kfz Stufe 4 Formular",
      desc: "Vollständig digitaler Upload von Ausweis (eID), eVB-Nummer, Fahrzeugschein und SEPA-Mandat. Legal, sicher & SSL-verschlüsselt.",
      img: "/media/vibe.filesafe.space/1778931020193405557/attachments/0bf4b637-bba0-4c52-9871-9e96e48b9cda.png",
      badge: "Digitaler Zulassungsdienst",
    },
    step3: {
      title: "3. Transparente Trust-Siegel & Behörden-Partner",
      desc: "DIN-Geprüft, Zulassungspartner (Staatlich anerkannt), 99% Zufriedenheit, Express-Versand per DHL/Hermes & TÜV/SSL Zertifikate.",
      img: "/media/vibe.filesafe.space/1778931020193405557/attachments/c56a969b-3683-4ac3-85df-bf9b3b364a84.png",
      badge: "Vertrauens- & Partner-Gürtel",
    },
    step4: {
      title: "4. So einfach funktioniert's: 4-Schritte Kunden-Journey",
      desc: "Klare Schritt-für-Schritt Nutzerführung: Kennzeichen prüfen → Online bestellen → Dokumente hochladen → Schnelle Lieferung direkt nach Hause.",
      img: "/media/vibe.filesafe.space/1778931020193405557/attachments/ed3a9e7a-c225-4928-8a5a-d1be915c53a5.png",
      badge: "4-Schritte Workflow",
    },
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/20 blur-[150px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            Exklusiver System-Showcase & Live-UI
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Das Matou Express E-Commerce & Zulassungs-System
          </h2>
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto">
            So sieht ein hochkonvertierendes, vollautomatisiertes System für den
            Kfz- & Schilder-Bereich aus. Werfen Sie einen Blick direkt in die
            von uns entwickelte Live-Plattform.
          </p>
        </div>

        {/* Feature Grid showcasing Matou website functions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 group">
            <div className="h-12 w-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Live-Wunschkennzeichen</h3>
            <p className="text-sm text-slate-300">
              Kunden geben ihr Wunschkennzeichen ein und erhalten sofort die
              Live-Verfügbarkeit direkt bei der zuständigen Zulassungsstelle.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 group">
            <div className="h-12 w-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Behörden-Finder</h3>
            <p className="text-sm text-slate-300">
              Automatische Zuordnung von Postleitzahl und Stadt zu
              Öffnungszeiten, Adressen und Direktlinks der örtlichen
              Straßenverkehrsämter.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 group">
            <div className="h-12 w-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">i-Kfz Stufe 4 Express</h3>
            <p className="text-sm text-slate-300">
              Sicherer Upload von Ausweis (eID), eVB-Nummer & Fahrzeugschein.
              Vollständig digitale Zulassung ohne 1 Minute Wartezeit im Amt.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 group">
            <div className="h-12 w-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">DIN-Schilder Shop</h3>
            <p className="text-sm text-slate-300">
              Carbon-, Standard- und Saison-Kennzeichen inklusive 24h
              Blitzversand & Zubehör zum Online-Bestpreis.
            </p>
          </div>
        </div>

        {/* Interactive UI Screenshot Viewer */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold">
              Interaktiver Seiten-Einblick: Entdecken Sie alle Module
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Klicken Sie auf die Reiter, um die verschiedenen Bereiche der von
              uns programmierten Plattform live zu sehen:
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
            <button
              onClick={() => setActiveTab("step1")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === "step1"
                  ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              <Search className="h-4 w-4" />
              1. Kennzeichen-Konfigurator
            </button>

            <button
              onClick={() => setActiveTab("step2")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === "step2"
                  ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              <Upload className="h-4 w-4" />
              2. Digitaler Zulassungsdienst
            </button>

            <button
              onClick={() => setActiveTab("step3")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === "step3"
                  ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              3. Trust- & Partner-Elemente
            </button>

            <button
              onClick={() => setActiveTab("step4")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === "step4"
                  ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              <Truck className="h-4 w-4" />
              4. Workflow & 4 Schritte
            </button>
          </div>

          {/* Screenshot Display Card */}
          <div className="rounded-3xl border border-white/15 bg-slate-900/90 overflow-hidden shadow-2xl p-4 md:p-8">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold uppercase mb-2">
                  {screenshotMap[activeTab].badge}
                </span>
                <h4 className="text-xl md:text-2xl font-bold">
                  {screenshotMap[activeTab].title}
                </h4>
                <p className="text-slate-300 text-sm mt-1">
                  {screenshotMap[activeTab].desc}
                </p>
              </div>
              <a
                href="https://matou-kfz-express.de"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs md:text-sm border border-white/10 transition-colors"
              >
                <span>Live-Seite aufrufen</span>
                <span className="text-primary">↗</span>
              </a>
            </div>

            {/* Browser Frame Window */}
            <div className="rounded-2xl border border-slate-700 bg-slate-950 overflow-hidden shadow-2xl">
              {/* Browser Bar */}
              <div className="bg-slate-800/80 px-4 py-3 flex items-center gap-3 border-b border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 max-w-xl mx-auto bg-slate-900 border border-slate-700 rounded-md px-3 py-1 text-xs text-slate-400 font-mono text-center truncate">
                  https://matou-kfz-express.de
                </div>
              </div>

              {/* Image Preview */}
              <div className="relative group bg-slate-900 overflow-hidden">
                <img
                  src={screenshotMap[activeTab].img}
                  alt={screenshotMap[activeTab].title}
                  className="w-full h-auto object-cover max-h-[600px] object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Call to Action Box */}
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/10 via-slate-900 to-primary/10 overflow-hidden shadow-2xl p-6 md:p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Möchten Sie für Ihren Betrieb ebenfalls ein solches System?
          </h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-sm md:text-base">
            Egal ob E-Commerce, KFZ-Dienstleister, Werkstatt oder
            Zulassungsservice – wir bauen Ihre maßgeschneiderte Plattform mit
            Live-Funktionen, Automatismus & Anbindung an Behörden oder
            Zahlungsanbieter.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-8 py-3.5 text-base w-full sm:w-auto"
              onClick={() => openForm("contact", "Matou Showcase - KI Check")}
            >
              Ähnliche Plattform für mein Business anfragen
            </Button>
            <a
              href="https://matou-kfz-express.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-white/20 hover:bg-white/10 text-white font-bold rounded-full px-6 py-3.5 text-base w-full sm:w-auto transition-colors"
            >
              matou-kfz-express.de besuchen ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
