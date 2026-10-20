import { Outlet, useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { QuickContactWidget } from "./QuickContactWidget";
import { MobileStickyCTA } from "./MobileStickyCTA";
import { ScrollToTopButton } from "./ScrollToTopButton";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AiChatWidget } from "./AiChatWidget";

export const Layout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="min-h-screen flex flex-col w-full relative">
      <Header />
      <main className="flex-1 pb-20 lg:pb-0 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-1 flex flex-col h-full"
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <QuickContactWidget />
      <MobileStickyCTA />
      <ScrollToTopButton />
      <AiChatWidget />
    </div>
  );
};
