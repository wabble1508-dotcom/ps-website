import { submitForm } from "./submitForm";

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  message: string;
}

const WHATSAPP_NUMBER = "4915207595260";
const FALLBACK_EMAIL = "info@ps-professional-solutions.de";

const positionLabels: Record<string, { de: string; en: string }> = {
  "web-developer": {
    de: "Web Developer (m/w/d)",
    en: "Web Developer (m/w/d)",
  },
  "ai-engineer": {
    de: "AI Automation Engineer (m/w/d)",
    en: "AI Automation Engineer (m/w/d)",
  },
  sales: {
    de: "Sales Manager (m/w/d)",
    en: "Sales Manager (m/w/d)",
  },
  marketing: {
    de: "Marketing Specialist (m/w/d)",
    en: "Marketing Specialist (m/w/d)",
  },
  initiativ: {
    de: "Initiativbewerbung",
    en: "Open Application",
  },
};

export const getPositionLabel = (position: string, lang: "de" | "en") =>
  positionLabels[position]?.[lang] || position;

export const submitApplication = (data: ApplicationData, lang: "de" | "en") => {
  const isEn = lang === "en";
  const positionLabel = getPositionLabel(data.position, lang);
  const fullName = `${data.firstName} ${data.lastName}`.trim();

  // 1) Eintrag in Netlify Forms (kommt zusätzlich per E-Mail)
  void submitForm("bewerbung", {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: data.phone,
    position: positionLabel,
    message: data.message,
  });

  // 2) Direkt-Benachrichtigung an Pankaj: WhatsApp bevorzugt, E-Mail als Fallback
  const cleanedPhone = (data.phone || "").replace(/[^\d+]/g, "");
  const digitsOnly = cleanedPhone.replace(/\D/g, "");
  const isValidPhone = digitsOnly.length >= 7 && digitsOnly.length <= 15;

  if (isValidPhone) {
    const msg = isEn
      ? `🔔 New application via website:\n\n👤 Name: ${fullName}\n📧 Email: ${data.email}\n📞 Phone: ${data.phone}\n💼 Position: ${positionLabel}\n📝 Message: ${data.message}`
      : `🔔 Neue Bewerbung über die Website:\n\n👤 Name: ${fullName}\n📧 E-Mail: ${data.email}\n📞 Telefon: ${data.phone}\n💼 Position: ${positionLabel}\n📝 Nachricht: ${data.message}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer",
    );
  } else {
    const subject = isEn
      ? `New Application - ${fullName} - ${positionLabel}`
      : `Neue Bewerbung - ${fullName} - ${positionLabel}`;
    const body = isEn
      ? `Name: ${fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\nPosition: ${positionLabel}\n\nMessage:\n${data.message}`
      : `Name: ${fullName}\nE-Mail: ${data.email}\nTelefon: ${data.phone}\nPosition: ${positionLabel}\n\nNachricht:\n${data.message}`;
    window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
};
