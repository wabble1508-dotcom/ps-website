import { FeaturePage } from "@/components/FeaturePage";
import { useLanguage } from "@/components/LanguageContext";
import { webseiten } from "@/lib/pageContent/webseiten";
import { buildFeaturePage } from "@/lib/pageContent/builder";
import type { LanguageCode } from "@/lib/pageContent/types";

export default function WebseitenPage() {
  const { language } = useLanguage();
  const textContent = webseiten[language as LanguageCode] || webseiten.de;

  const data = buildFeaturePage(textContent, {
    heroIconUrl:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Laptop/3D/laptop_3d.png",
    problemImage:
      "/media/vibe.filesafe.space/1778931020193405557/assets/89a297ba-38fa-4d32-868f-8fced24edf8b.png",
    cardIcons: [
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Laptop/3D/laptop_3d.png",
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Magnifying_glass_tilted_left/3D/magnifying_glass_tilted_left_3d.png",
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
    ],
    videoUrl: "https://www.youtube.com/embed/FVhB4JsqCbA?rel=0",
  });

  return <FeaturePage data={data} />;
}
