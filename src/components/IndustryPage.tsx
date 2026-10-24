import React from "react";
import { ExternalEmbed } from "@/components/ExternalEmbed";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useContactForm } from "@/components/ContactFormDialog";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import {
  IndustryPartnerSlider,
  AnimatedCounter,
} from "@/components/IndustryPartnerSlider";
import { MatouShowcaseSection } from "@/components/MatouShowcaseSection";
import { IndustryHero, IndustryHeroProps } from "@/components/IndustryHero";
import { IndustryServicesGrid } from "@/components/IndustryServicesGrid";
import {
  TestimonialsAndFaq,
  TestimonialItem,
  FaqItem,
} from "@/components/TestimonialsAndFaq";

export interface IndustryPageProps {
  hero: IndustryHeroProps;
  painPoints: {
    icon: string;
    title: string;
  }[];
  leadMagnet: {
    title: string;
    description: string;
    buttonText: string;
    image: string;
  };
  workflow: {
    title: string;
    description: string;
    image?: string;
    video?: string;
  };
  benefits?: {
    title: string;
    description: string;
    image: string;
  };
  checkmarksSection: {
    title: string;
    subtitle: string;
    image: string;
    list: { title: string; description: string }[];
  };
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
  videoTestimonial?: {
    url: string;
    title: string;
    description: string;
  };
  websitePreview?: {
    title: string;
    description: string;
    beforeImage: string;
    afterImage: string;
  };
  customPartnerLogos?: string[];
  customPartnerTitle?: string;
  hidePartnerSlider?: boolean;
  showMatouShowcase?: boolean;
}

export const IndustryPage = ({ data }: { data: IndustryPageProps }) => {
  const { openForm } = useContactForm();
  const { t } = useLanguage();

  const stats = [
    {
      value: "90",
      label: t("home", "stat1Label"),
      description: t("home", "stat1Desc"),
    },
    {
      value: "0",
      label: t("home", "stat2Label"),
      description: t("home", "stat2Desc"),
    },
    {
      value: "∞",
      label: t("home", "stat3Label"),
      description: t("home", "stat3Desc"),
    },
    {
      value: "100",
      label: t("home", "stat4Label"),
      description: t("home", "stat4Desc"),
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <IndustryHero data={data.hero} />

      {/* Video Testimonial Section */}
      {data.videoTestimonial && (
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl text-primary">
                {data.videoTestimonial.title}
              </h2>
              {data.videoTestimonial.description && (
                <p className="text-lg text-muted-foreground font-semibold">
                  {data.videoTestimonial.description}
                </p>
              )}
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-card border-4 border-primary">
              <div className="aspect-video bg-black relative flex items-center justify-center">
                <ExternalEmbed src={data.videoTestimonial.url} title={data.videoTestimonial.title} className="absolute inset-0 w-full h-full" allowFullScreen />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Matou Custom Showcase if enabled */}
      {data.showMatouShowcase && <MatouShowcaseSection />}

      {/* Pain Points Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            {data.painPoints.map((point, i) => (
              <div key={i} className="flex flex-col items-center">
                <img
                  src={point.icon}
                  alt="Icon"
                  className="h-20 w-20 mb-6 object-contain"
                />
                <h3 className="text-lg font-bold leading-snug">
                  {point.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <IndustryServicesGrid />

      {/* Partner Slider Section */}
      <IndustryPartnerSlider
        customPartnerLogos={data.customPartnerLogos}
        customPartnerTitle={data.customPartnerTitle}
        hidePartnerSlider={data.hidePartnerSlider}
      />

      {/* Stats Section */}
      <section className="py-16 md:py-20 text-center bg-background">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-3xl font-bold text-primary">
            {t("home", "whyTitle")}
          </h2>
          <h3 className="mb-8 text-2xl font-semibold">
            {t("home", "whySubtitle")}
          </h3>
          <p className="mx-auto mb-16 max-w-3xl text-lg text-muted-foreground">
            {t("home", "whyDesc")}
          </p>
          <div className="mb-16">
            <Button
              size="lg"
              className="h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-base sm:text-lg font-semibold shadow-xl bg-primary hover:bg-primary/90 text-white border-none w-full sm:w-auto whitespace-normal"
              onClick={() =>
                openForm("contact", `Branche: ${data.hero.title} - Stats`)
              }
            >
              {t("home", "heroBtn")}
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center"
              >
                <div className="mb-2 text-4xl font-bold text-primary md:text-5xl lg:text-7xl">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="mb-1 text-lg font-semibold">{stat.label}</div>
                <div className="text-sm text-muted-foreground max-w-[200px]">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkmarks Section */}
      <section className="bg-secondary py-16 text-white md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 leading-tight">
                {data.checkmarksSection.title}
              </h2>
              <p className="text-lg text-white/80 mb-8">
                {data.checkmarksSection.subtitle}
              </p>
              <div className="space-y-6">
                {data.checkmarksSection.list.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-white/70 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex justify-center">
              <img
                src={data.checkmarksSection.image}
                alt="Checkmarks visual"
                className="rounded-3xl shadow-2xl max-h-[500px] object-cover border-4 border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & FAQs */}
      <TestimonialsAndFaq
        testimonials={data.testimonials}
        faqs={data.faqs}
        title={data.hero.title}
      />
    </div>
  );
};
