import { FeaturePage } from "@/components/FeaturePage";
import { useLanguage } from "@/components/LanguageContext";
import { kiTelefonAssistent } from "@/lib/pageContent/kiTelefonAssistent";
import { buildFeaturePage } from "@/lib/pageContent/builder";
import type { LanguageCode } from "@/lib/pageContent/types";

export default function KiTelefonAssistentPage() {
  const { language } = useLanguage();
  const textContent =
    kiTelefonAssistent[language as LanguageCode] || kiTelefonAssistent.de;

  const data = buildFeaturePage(textContent, {
    heroIconUrl:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Telephone/3D/telephone_3d.png",
    problemImage:
      "/media/vibe.filesafe.space/1778931020193405557/assets/7368cfb3-86d7-40ac-a27e-07b12748e90b.png",
    cardIcons: [
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Telephone/3D/telephone_3d.png",
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Calendar/3D/calendar_3d.png",
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Telephone_receiver/3D/telephone_receiver_3d.png",
    ],
    videoUrl: "https://www.youtube.com/embed/EdMmS0uehe4?rel=0",
    checkmarkIcons: ["clock", "shield", "euro"],
    einsatzIcons: ["wrench", "flower", "users", "dumbbell"],
  });

  return <FeaturePage data={data} />;
}
