import React from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useContactForm } from "@/components/ContactFormDialog";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export interface TestimonialItem {
  title: string;
  description: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const TestimonialsAndFaq = ({
  faqs,
  title,
}: {
  testimonials?: TestimonialItem[];
  faqs: FaqItem[];
  title: string;
}) => {
  const { openForm } = useContactForm();
  const { t, language } = useLanguage();
  const pick = (de: string, en: string, tr: string) =>
    language === "en" ? en : language === "tr" ? tr : de;

  return (
    <>
      {/* Anonyme „Praxis-Ergebnisse“ mit unbelegten Zahlen werden bewusst nicht mehr angezeigt
          (nur echte, nachprüfbare Kundenstimmen veröffentlichen). */}

      {/* FAQs */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-primary">
              {t("home", "faqTitle")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("home", "faqDesc")}
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border rounded-2xl px-6 bg-slate-50 border-slate-200"
              >
                <AccordionTrigger className="text-left font-bold text-lg py-6 hover:no-underline text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-6 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 text-center p-8 bg-slate-50 border border-slate-200 rounded-3xl">
            <h3 className="mb-3 text-xl font-bold text-primary">
              {t("home", "faqFooterTitle")}
            </h3>
            <p className="mb-6 text-slate-600 max-w-lg mx-auto text-sm md:text-base">
              {pick(
                "Wir zeigen Ihnen in 15 Minuten, welche 3 Aufgaben wir Ihnen ab sofort abnehmen. Keine Theorie, nur echter Zeitgewinn.",
                "We show you in 15 minutes which 3 tasks we take off your plate right now. No theory, just real time saved.",
                "15 dakikada size hangi 3 görevi hemen üstlendiğimizi gösteriyoruz. Teori değil, gerçek zaman tasarrufu.",
              )}
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-8 py-3"
              onClick={() =>
                openForm("contact", `Branche: ${title} - FAQ Footer`)
              }
            >
              {t("home", "faqBtn")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
