import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/components/LanguageContext";

export const AnimatedCounter = ({ value }: { value: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (value === "∞") return;

    const end = parseInt(value, 10);
    if (isNaN(end)) return;

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  if (value === "∞") {
    return <span ref={ref}>∞</span>;
  }

  return <span ref={ref}>{count}</span>;
};

export interface IndustryServicesProps {
  services: {
    image: string;
    title: string;
    description: string;
    link: string;
  }[];
  customPartnerLogos?: string[];
  customPartnerTitle?: string;
  hidePartnerSlider?: boolean;
}

export const IndustryPartnerSlider = ({
  customPartnerLogos,
  customPartnerTitle,
  hidePartnerSlider,
}: {
  customPartnerLogos?: string[];
  customPartnerTitle?: string;
  hidePartnerSlider?: boolean;
}) => {
  const { t } = useLanguage();

  if (hidePartnerSlider) {
    return null;
  }

  const logos = customPartnerLogos || [
    "/media/vibe.filesafe.space/1778931020193405557/attachments/0aed8fdd-4881-47a3-be5c-3df062f0d503.jpg",
    "/media/vibe.filesafe.space/1778931020193405557/attachments/13ef37d7-4c1d-41ec-81ce-a10efeb84752.jpg",
    "/media/vibe.filesafe.space/1778931020193405557/attachments/9ad3b078-d54a-4b51-8362-4747e5f662f4.png",
    "/media/vibe.filesafe.space/1778931020193405557/attachments/b644a54f-e4a4-4718-846c-d73a3ab96bb2.png",
    "/media/vibe.filesafe.space/1778931020193405557/attachments/3c0772b0-8ceb-4ebb-84cd-f7152044fa7c.png",
    "/media/vibe.filesafe.space/1778931020193405557/attachments/36aa3eed-d489-42d6-b968-05cf870092c3.png",
    "/media/vibe.filesafe.space/1778931020193405557/attachments/2ffe9c2a-bd0d-4ad8-a0f9-cdde2678adf3.png",
    "/media/vibe.filesafe.space/1778931020193405557/attachments/e537852e-63c5-4073-b66d-82ce11df5233.png",
    "/media/vibe.filesafe.space/1778931020193405557/attachments/d290e9e6-da6c-4e4c-9522-a24ec18ef546.png",
    "/media/vibe.filesafe.space/1778931020193405557/attachments/d6882ce2-4b5e-46f6-b8d9-80581a6e4199.png",
  ];

  return (
    <section className="py-12 overflow-hidden bg-background border-t border-border">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h3 className="text-2xl font-bold text-primary">
          {customPartnerTitle || t("home", "partnersTitle")}
        </h3>
      </div>
      <div className="flex w-full overflow-hidden whitespace-nowrap relative">
        <div className="flex animate-marquee min-w-full shrink-0 items-center justify-around gap-8 md:gap-16 px-4 md:px-8">
          {logos.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt="Partner Logo"
              className="h-24 md:h-40 w-auto object-contain max-w-none rounded-xl shadow-sm"
            />
          ))}
        </div>
        <div
          className="flex animate-marquee min-w-full shrink-0 items-center justify-around gap-8 md:gap-16 px-4 md:px-8"
          aria-hidden="true"
        >
          {logos.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt="Partner Logo"
              className="h-24 md:h-40 w-auto object-contain max-w-none rounded-xl shadow-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
