import type { FeaturePageProps } from "@/components/FeaturePage";
import type { FeatureTextContent, LanguageCode } from "./types";
import {
  Shield,
  Clock,
  Euro,
  Flower2,
  Users,
  Dumbbell,
  Wrench,
} from "lucide-react";

const ICONS = {
  clock: <Clock className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  euro: <Euro className="w-6 h-6" />,
  wrench: <Wrench className="w-12 h-12" />,
  flower: <Flower2 className="w-12 h-12" />,
  users: <Users className="w-12 h-12" />,
  dumbbell: <Dumbbell className="w-12 h-12" />,
};

export const heroIcon = (emoji: string) =>
  `/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/${emoji}/3D/${emoji.toLowerCase().replace(/%20/g, "_").replace(/\s/g, "_")}_3d.png`;

export function buildFeaturePage(
  text: FeatureTextContent,
  opts: {
    heroIconUrl: string;
    problemImage: string;
    cardIcons: string[];
    videoUrl?: string;
    checkmarkIcons?: ("clock" | "shield" | "euro")[];
    einsatzIcons?: ("wrench" | "flower" | "users" | "dumbbell")[];
  },
): FeaturePageProps {
  const ci = opts.checkmarkIcons || ["clock", "shield", "euro"];
  const ei = opts.einsatzIcons || ["wrench", "flower", "users", "dumbbell"];
  return {
    seo: text.seo,
    hero: {
      icon: opts.heroIconUrl,
      title: text.hero.title,
      highlight: text.hero.highlight,
      subtitle: text.hero.subtitle,
    },
    problem: {
      image: opts.problemImage,
      items: text.problem.items,
      buttonText: text.problem.buttonText,
    },
    solution: {
      title: text.solution.title,
      checkmarks: text.solution.checkmarks.map((c, i) => ({
        text: c.text,
        icon: ICONS[ci[i] || ci[i % ci.length]],
      })),
      cards: text.solution.cards.map((card, i) => ({
        icon: opts.cardIcons[i] || opts.cardIcons[0],
        title: card.title,
        description: card.description,
      })),
    },
    einsatzgebiete: text.einsatzgebiete.map((e, i) => ({
      icon: ICONS[ei[i] || ei[i % ei.length]],
      title: e.title,
    })),
    videoTestimonial: text.videoTestimonial
      ? {
          url: opts.videoUrl || "",
          title: text.videoTestimonial.title,
          description: text.videoTestimonial.description,
        }
      : undefined,
    faqs: text.faqs,
  };
}

export type { LanguageCode };
