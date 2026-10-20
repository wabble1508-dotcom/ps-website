import type { IndustryPageProps } from "@/components/IndustryPage";
import type { IndustryTextContent, LanguageCode } from "./industryTypes";

const HERO_VIDEO =
  "/media/assets.cdn.filesafe.space/VkExHAgs8XW3SXXelIlC/media/69c04a4a3b3a582edddbee4d.mp4";
const LEAD_IMAGE =
  "/media/vibe.filesafe.space/1778931020193405557/assets/d081e0c4-994b-433f-b736-7dcf367fda58.png";

const PAIN_ICONS = [
  "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Spiral_calendar/3D/spiral_calendar_3d.png",
  "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Bell/3D/bell_3d.png",
  "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
];

export interface IndustryBuildOpts {
  workflowImage: string;
  benefitsImage?: string;
  checkmarksImage: string;
  testimonialImages: string[];
  videoUrl?: string;
  websitePreview?: { beforeImage: string; afterImage: string };
  showMatouShowcase?: boolean;
  hidePartnerSlider?: boolean;
  customPartnerLogos?: string[];
  customPartnerTitle?: string;
  heroVideoSrc?: string;
  leadMagnetImage?: string;
  painIcons?: string[];
}

export function buildIndustryPage(
  text: IndustryTextContent,
  opts: IndustryBuildOpts,
): IndustryPageProps {
  const painIcons = opts.painIcons || PAIN_ICONS;
  return {
    hero: {
      videoSrc: opts.heroVideoSrc || HERO_VIDEO,
      title: text.hero.title,
      subtitle: text.hero.subtitle,
      buttonText: text.hero.buttonText,
    },
    painPoints: text.painPoints.map((p, i) => ({
      icon: painIcons[i % painIcons.length],
      title: p.title,
    })),
    leadMagnet: {
      title: text.leadMagnet.title,
      description: text.leadMagnet.description,
      buttonText: text.leadMagnet.buttonText,
      image: opts.leadMagnetImage || LEAD_IMAGE,
    },
    workflow: {
      title: text.workflow.title,
      description: text.workflow.description,
      image: opts.workflowImage,
    },
    benefits: text.benefits
      ? {
          title: text.benefits.title,
          description: text.benefits.description,
          image: opts.benefitsImage || opts.checkmarksImage,
        }
      : undefined,
    checkmarksSection: {
      title: text.checkmarksSection.title,
      subtitle: text.checkmarksSection.subtitle,
      image: opts.checkmarksImage,
      list: text.checkmarksSection.list,
    },
    testimonials: text.testimonials.map((t, i) => ({
      title: t.title,
      description: t.description,
      image: opts.testimonialImages[i] || opts.testimonialImages[0],
    })),
    videoTestimonial: text.videoTestimonial
      ? {
          url: opts.videoUrl || "",
          title: text.videoTestimonial.title,
          description: text.videoTestimonial.description,
        }
      : undefined,
    websitePreview: text.websitePreview
      ? {
          title: text.websitePreview.title,
          description: text.websitePreview.description,
          beforeImage: opts.websitePreview?.beforeImage || "",
          afterImage: opts.websitePreview?.afterImage || "",
        }
      : undefined,
    showMatouShowcase: opts.showMatouShowcase,
    hidePartnerSlider: opts.hidePartnerSlider,
    customPartnerLogos: opts.customPartnerLogos,
    customPartnerTitle: opts.customPartnerTitle,
    faqs: text.faqs,
  };
}

export type { LanguageCode };
