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
import { LoadingScreen } from "./components/LoadingScreen";
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
