import React from "react";
import { Button } from "@/components/ui/button";
import { useContactForm } from "@/components/ContactFormDialog";

export interface IndustryHeroProps {
  videoSrc?: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

export const IndustryHero = ({ data }: { data: IndustryHeroProps }) => {
  const { openForm } = useContactForm();

  return (
    <section className="relative overflow-hidden py-16 md:py-28 lg:py-36 bg-gradient-to-br from-secondary via-[#153a48] to-[#1e9fae]">
      {/* Background video when provided */}
      {data.videoSrc && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-25 filter blur-[1px]"
          >
            <source src={data.videoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/70 to-secondary/90" />
        </div>
      )}

      {/* Subtle modern geometric background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(30,159,174,0.18),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="mx-auto max-w-5xl text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl drop-shadow-lg leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {data.title}
        </h1>
        <p className="mx-auto mt-4 md:mt-6 max-w-3xl text-lg md:text-xl text-white/90 font-medium drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {data.subtitle}
        </p>
        <div className="mt-8 md:mt-10 flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Button
            size="lg"
            className="h-auto min-h-[3.5rem] py-3 rounded-full px-6 md:px-8 text-base md:text-lg font-semibold shadow-xl bg-primary hover:bg-primary/90 hover:scale-105 transition-all text-white border-none w-full sm:w-auto whitespace-normal"
            onClick={() => openForm("contact", `Branche: ${data.title} - Hero`)}
          >
            {data.buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
};
