import { FeaturePage } from "@/components/FeaturePage";
import { useLanguage } from "@/components/LanguageContext";
import { terminAutomation } from "@/lib/pageContent/terminAutomation";
import { buildFeaturePage } from "@/lib/pageContent/builder";
import type { LanguageCode } from "@/lib/pageContent/types";

export default function TerminAutomationPage() {
  const { language } = useLanguage();
  const textContent =
    terminAutomation[language as LanguageCode] || terminAutomation.de;

  const data = buildFeaturePage(textContent, {
    heroIconUrl:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Calendar/3D/calendar_3d.png",
    problemImage:
      "/media/vibe.filesafe.space/1778931020193405557/assets/7368cfb3-86d7-40ac-a27e-07b12748e90b.png",
    cardIcons: [
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Alarm_clock/3D/alarm_clock_3d.png",
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Check_mark_button/3D/check_mark_button_3d.png",
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Calendar/3D/calendar_3d.png",
    ],
    videoUrl: "https://www.youtube.com/embed/EdMmS0uehe4?rel=0",
  });

  return <FeaturePage data={data} />;
}
