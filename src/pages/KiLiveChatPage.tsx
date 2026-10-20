import { FeaturePage } from "@/components/FeaturePage";
import { useLanguage } from "@/components/LanguageContext";
import { kiLiveChat } from "@/lib/pageContent/kiLiveChat";
import { buildFeaturePage } from "@/lib/pageContent/builder";
import type { LanguageCode } from "@/lib/pageContent/types";

export default function KiLiveChatPage() {
  const { language } = useLanguage();
  const textContent = kiLiveChat[language as LanguageCode] || kiLiveChat.de;

  const data = buildFeaturePage(textContent, {
    heroIconUrl:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Speech_balloon/3D/speech_balloon_3d.png",
    problemImage:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Chart_decreasing/3D/chart_decreasing_3d.png",
    cardIcons: [
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Speech_balloon/3D/speech_balloon_3d.png",
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Flag_in_hole/3D/flag_in_hole_3d.png",
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Calendar/3D/calendar_3d.png",
    ],
    checkmarkIcons: ["clock", "shield", "euro"],
    einsatzIcons: ["wrench", "flower", "users", "dumbbell"],
  });

  return <FeaturePage data={data} />;
}
