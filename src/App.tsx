import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ProzessPage from "./pages/ProzessPage";
import PreisePage from "./pages/PreisePage";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AdminPage } from "./pages/AdminPage";
import { Layout } from "./components/Layout";
import HandwerkerPage from "./pages/HandwerkerPage";
import BeautysalonPage from "./pages/BeautysalonPage";
import GesundheitswesenPage from "./pages/GesundheitswesenPage";
import KiTelefonAssistentPage from "./pages/KiTelefonAssistentPage";
import TerminAutomationPage from "./pages/TerminAutomationPage";
import GoogleBusinessPage from "./pages/GoogleBusinessPage";
import WebseitenPage from "./pages/WebseitenPage";
import { ContactFormProvider } from "./components/ContactFormDialog";
import { VielenDankPage } from "./pages/VielenDankPage";
import ImpressumPage from "./pages/ImpressumPage";
import DatenschutzPage from "./pages/DatenschutzPage";
import BlogPage from "./pages/BlogPage";
import { LanguageProvider } from "./components/LanguageContext";
import { useState, useEffect } from "react";
import UeberUnsPage from "./pages/UeberUnsPage";
import { AnimatedLogo } from "./components/AnimatedLogo";
import KiLiveChatPage from "./pages/KiLiveChatPage";
import FallstudienPage from "./pages/FallstudienPage";
import GlossarPage from "./pages/GlossarPage";
import IntegrationenPage from "./pages/IntegrationenPage";
import DashboardPage from "./pages/DashboardPage";
import KarrierePage from "./pages/KarrierePage";
import NfcShopPage from "./pages/NfcShopPage";
import DesignPrintPage from "./pages/DesignPrintPage";
import KfzZulassungPage from "./pages/KfzZulassungPage";
import FestivalsPage from "./pages/FestivalsPage";
import VereinePage from "./pages/VereinePage";
import TextilPage from "./pages/TextilPage";
import GastronomiePage from "./pages/GastronomiePage";
import BildungPage from "./pages/BildungPage";
import SchneidereiPage from "./pages/SchneidereiPage";

const queryClient = new QueryClient();

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [progressText, setProgressText] = useState("System wird gestartet...");

  useEffect(() => {
    const texts = [
      "System wird gestartet...",
      "KI-Modelle werden geladen...",
      "Verbindung wird hergestellt...",
      "Fast fertig...",
    ];
    let i = 0;
    const textInterval = setInterval(() => {
      i = (i + 1) % texts.length;
      setProgressText(texts[i]);
    }, 400);

    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => setLoading(false), 800);
    }, 1800);

    return () => {
      clearTimeout(timer);
      clearInterval(textInterval);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-700 ${fade ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="relative flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
        <div className="relative mb-16 flex items-center justify-center">
          {/* Outer rotating dashed ring */}
          <div
            className="absolute -inset-12 border-[3px] border-dashed border-primary/40 rounded-full animate-spin"
            style={{ animationDuration: "8s" }}
          ></div>

          {/* Inner rotating gradient ring */}
          <div
            className="absolute -inset-8 border-[4px] border-transparent border-t-primary border-r-secondary rounded-full animate-spin"
            style={{ animationDuration: "3s", animationDirection: "reverse" }}
          ></div>

          {/* Innermost pulsing ring */}
          <div
            className="absolute -inset-4 border-[2px] border-primary/20 rounded-full animate-ping"
            style={{ animationDuration: "2s" }}
          ></div>

          {/* Logo with float animation */}
          <div className="animate-float" style={{ animationDuration: "4s" }}>
            <img
              src="/media/vibe.filesafe.space/1778931020193405557/attachments/98e2f944-6284-4364-828f-058da15e3823.png"
              alt="PS Professional Solutions"
              className="w-48 md:w-56 h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
        <div className="w-56 h-1.5 bg-muted rounded-full overflow-hidden relative mb-4 mt-12">
          <div className="absolute top-0 left-0 h-full bg-primary rounded-full animate-[progress_1.5s_ease-in-out_infinite] w-full origin-left"></div>
        </div>
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          {progressText}
        </p>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <BrowserRouter>
          <ContactFormProvider>
            <LoadingScreen />
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/admin" element={<AdminPage />} />
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/handwerker" element={<HandwerkerPage />} />
                <Route path="/beautysalon" element={<BeautysalonPage />} />
                <Route
                  path="/gesundheitswesen"
                  element={<GesundheitswesenPage />}
                />
                <Route
                  path="/ki-telefon-assistent"
                  element={<KiTelefonAssistentPage />}
                />
                <Route
                  path="/intelligente-termin-automation"
                  element={<TerminAutomationPage />}
                />
                <Route
                  path="/google-business-optimierung"
                  element={<GoogleBusinessPage />}
                />
                <Route path="/webseiten" element={<WebseitenPage />} />
                <Route path="/ki-live-chat" element={<KiLiveChatPage />} />
                <Route path="/magazin" element={<BlogPage />} />
                <Route path="/ueber-uns" element={<UeberUnsPage />} />
                <Route
                  path="/erfolgsgeschichten"
                  element={<FallstudienPage />}
                />
                <Route path="/ki-lexikon" element={<GlossarPage />} />
                <Route path="/integrationen" element={<IntegrationenPage />} />
                <Route
                  path="/all-in-one-dashboard"
                  element={<DashboardPage />}
                />
                <Route path="/ablauf" element={<ProzessPage />} />
                <Route path="/preise" element={<PreisePage />} />
                <Route path="/karriere" element={<KarrierePage />} />
                <Route path="/nfc-karten" element={<NfcShopPage />} />
                <Route path="/design-druck" element={<DesignPrintPage />} />
                <Route path="/kfz-zulassung" element={<KfzZulassungPage />} />
                <Route path="/festivals" element={<FestivalsPage />} />
                <Route path="/vereine" element={<VereinePage />} />
                <Route path="/textil" element={<TextilPage />} />
                <Route path="/gastronomie" element={<GastronomiePage />} />
                <Route path="/bildung" element={<BildungPage />} />
                <Route path="/schneiderei" element={<SchneidereiPage />} />
                <Route path="/info" element={<ImpressumPage />} />
                <Route path="/datenschutz" element={<DatenschutzPage />} />
                <Route
                  path="/analyse-bestaetigungen"
                  element={<VielenDankPage />}
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ContactFormProvider>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
// Trigger HMR
