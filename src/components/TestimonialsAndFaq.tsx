import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  testimonials,
  faqs,
  title,
}: {
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
  title: string;
}) => {
  const { openForm } = useContactForm();
  const { t, language } = useLanguage();
  const pick = (de: string, en: string, tr: string) =>
    language === "en" ? en : language === "tr" ? tr : de;

  return (
    <>
      {/* Testimonials */}
      <section className="bg-secondary py-16 text-white md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-white">
              {t("home", "testiTitle")}
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {t("home", "testiDesc")}
            </p>
          </div>
          {testimonials.length === 1 ? (
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden bg-[#1f2937] border border-gray-700 shadow-2xl">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0 items-center">
                    <div className="p-8 md:p-10">
                      <h3 className="mb-4 text-xl md:text-2xl font-bold text-white leading-snug">
                        {testimonials[0].title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-300 leading-relaxed whitespace-pre-line">
                        {testimonials[0].description}
                      </p>
                    </div>
                    <div className="relative h-64 md:h-full min-h-[280px]">
                      <img
                        src={testimonials[0].image}
                        alt={testimonials[0].title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, i) => (
                <Card
                  key={i}
                  className="overflow-hidden bg-[#1f2937] border border-gray-700 shadow-xl flex flex-col justify-between"
                >
                  <CardContent className="p-8 flex flex-col h-full justify-between">
                    <div>
                      <h3 className="mb-4 text-xl font-bold text-white leading-snug">
                        {testimonial.title}
                      </h3>
                      <p className="mb-6 text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                        {testimonial.description}
                      </p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-700/60">
                      <img
                        src={testimonial.image}
                        alt={testimonial.title}
                        className="h-20 w-auto object-contain mx-auto max-w-full rounded-md"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="mt-20 text-center">
            <h3 className="mb-6 text-2xl font-bold text-white">
              {t("home", "testiFooterTitle")}
            </h3>
            <Button
              size="lg"
              className="h-auto min-h-[3.5rem] py-3 px-6 text-base md:text-lg font-semibold shadow-xl bg-primary hover:bg-primary/90 text-white border-none w-full sm:w-auto whitespace-normal"
              onClick={() =>
                openForm("contact", `Branche: ${title} - Testimonials`)
              }
            >
              {t("home", "testiBtn")}
            </Button>
          </div>
        </div>
      </section>

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
