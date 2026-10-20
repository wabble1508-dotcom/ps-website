import { FeaturePage } from "@/components/FeaturePage";
import { useLanguage } from "@/components/LanguageContext";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  BarChart,
  Smartphone,
  Laptop,
} from "lucide-react";
import { crmDashboard } from "@/lib/pageContent/crmDashboard";
import { buildFeaturePage } from "@/lib/pageContent/builder";
import type { LanguageCode } from "@/lib/pageContent/types";

export default function DashboardPage() {
  const { language } = useLanguage();
  const textContent = crmDashboard[language as LanguageCode] || crmDashboard.de;

  const data = buildFeaturePage(textContent, {
    heroIconUrl:
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Clipboard/3D/clipboard_3d.png",
    problemImage:
      "/media/vibe.filesafe.space/1778931020193405557/assets/adb2ec8d-535e-4ec8-925c-0679789d5c46.png",
    cardIcons: [
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile_phone/3D/mobile_phone_3d.png",
      "/media/raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Laptop/3D/laptop_3d.png",
    ],
    checkmarkIcons: ["euro", "euro", "euro"],
    einsatzIcons: ["wrench", "flower", "users", "dumbbell"],
  });

  return <FeaturePage data={data} />;
}
