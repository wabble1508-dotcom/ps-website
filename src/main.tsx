import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
// Eigene Schriften, lokal ausgeliefert (keine Verbindung zu Google Fonts – DSGVO)
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/instrument-sans";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./index.css";
import { initAnalytics } from "./lib/analytics";

// Google Analytics nur, wenn der Besucher „Statistik“ zugestimmt hat
initAnalytics();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
