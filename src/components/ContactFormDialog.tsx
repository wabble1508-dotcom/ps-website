import { createContext, useContext } from "react";

type FormType = "contact" | "lead-magnet";

interface ContactFormContextType {
  openForm: (type?: FormType, source?: string) => void;
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(
  undefined,
);

export const useContactForm = () => {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error("useContactForm must be used within a ContactFormProvider");
  }
  return context;
};

// WhatsApp number in international format (no +, spaces or leading zeros)
const WHATSAPP_NUMBER = "4915207595260";

export const ContactFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const openForm = (type: FormType = "contact", source?: string) => {
    let message = `Hallo Pankaj, ich interessiere mich für Ihre Leistungen${source ? ` (über: ${source})` : ""}.`;
    if (source && source.includes("NFC")) {
      message = `Hallo Pankaj, ich möchte gerne NFC Google Business Karten bestellen (${source}). Bitte senden Sie mir die Details zur einfachen Abwicklung.`;
    } else if (type === "lead-magnet") {
      message =
        "Hallo Pankaj, ich habe Interesse an der kostenlosen Checkliste von PS Professional Solutions.";
    }
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <ContactFormContext.Provider value={{ openForm }}>
      {children}
    </ContactFormContext.Provider>
  );
};
