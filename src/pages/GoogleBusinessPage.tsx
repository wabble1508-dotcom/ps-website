import { FeaturePage } from "@/components/FeaturePage";
import { useLanguage } from "@/components/LanguageContext";
import { googleBusiness } from "@/lib/pageContent/googleBusiness";
import { buildFeaturePage } from "@/lib/pageContent/builder";
import type { LanguageCode } from "@/lib/pageContent/types";

export default function GoogleBusinessPage() {
  const { language } = useLanguage();
  const textContent =
    googleBusiness[language as LanguageCode] || googleBusiness.de;

  const data = buildFeaturePage(textContent, {
    heroIconUrl:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Round_pushpin/3D/round_pushpin_3d.png",
    problemImage:
      "/media/vibe.filesafe.space/1778931020193405557/assets/7835fc00-e089-4e7f-91c5-702f90c939ec.jpg",
    cardIcons: [
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Round_pushpin/3D/round_pushpin_3d.png",
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Star/3D/star_3d.png",
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Calendar/3D/calendar_3d.png",
    ],
    checkmarkIcons: ["clock", "shield", "euro"],
    einsatzIcons: ["wrench", "flower", "users", "dumbbell"],
  });

  return <FeaturePage data={data} />;
}
