import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useContactForm } from "@/components/ContactFormDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/components/LanguageContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const pick = (lang: string, obj: { de: string; en: string; tr: string }) =>
  (obj as Record<string, string>)[lang] || obj.de;

const localeMap: Record<string, string> = {
  en: "en-US",
  tr: "tr-TR",
};

export function RoiCalculator() {
  const { language } = useLanguage();
  const [industry, setIndustry] = useState("allgemein");
  const [callsPerDay, setCallsPerDay] = useState([20]);
  const [minutesPerCall, setMinutesPerCall] = useState([5]);
  const [hourlyRate, setHourlyRate] = useState([35]);
  const { openForm } = useContactForm();

  // Calculate monthly stats based on ~21 working days
  const hoursPerMonth = (callsPerDay[0] * minutesPerCall[0] * 21) / 60;
  const hoursSaved = Math.round(hoursPerMonth * 0.85); // Assuming 85% of tasks can be automated
  const moneySaved = Math.round(hoursSaved * hourlyRate[0]);

  const handleIndustryChange = (val: string) => {
    setIndustry(val);
    if (val === "handwerk") {
      setCallsPerDay([15]);
      setMinutesPerCall([6]);
      setHourlyRate([45]);
    } else if (val === "beauty") {
      setCallsPerDay([30]);
      setMinutesPerCall([4]);
      setHourlyRate([35]);
    } else if (val === "praxis") {
      setCallsPerDay([50]);
      setMinutesPerCall([3]);
      setHourlyRate([40]);
    } else {
      setCallsPerDay([20]);
      setMinutesPerCall([5]);
      setHourlyRate([35]);
    }
  };

  // Generate chart data comparing without AI vs with AI over 6 months
  const chartData = Array.from({ length: 6 }, (_, i) => {
    const month = i + 1;
    return {
      name: pick(language, {
        de: `Monat ${month}`,
        en: `Month ${month}`,
        tr: `Ay ${month}`,
      }),
      ohneKI: Math.round(hoursPerMonth * hourlyRate[0] * month),
      mitKI: Math.round((hoursPerMonth - hoursSaved) * hourlyRate[0] * month),
    };
  });

  return (
    <section className="py-24 bg-white border-t border-muted/50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold md:text-4xl mb-4 text-primary">
            {pick(language, {
              de: "Interaktiver ROI-Rechner",
              en: "Interactive ROI Calculator",
              tr: "Etkileşimli ROI Hesaplayıcı",
            })}
          </h2>
          <p className="text-lg text-muted-foreground font-semibold max-w-2xl mx-auto">
            {pick(language, {
              de: "Spielen Sie mit den Reglern und sehen Sie sofort, wie viel Zeit und Geld Sie jeden Monat durch unsere KI-Automatisierung sparen können.",
              en: "Play with the sliders and see instantly how much time and money you can save every month through our AI automation.",
              tr: "Kaydırıcılarla oynayın ve yapay zeka otomasyonumuz sayesinde her ay ne kadar zaman ve para tasarruf edebileceğinizi hemen görün.",
            })}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Input Controls */}
          <Card className="p-6 md:p-8 border-none shadow-xl bg-muted/30 rounded-3xl">
            <CardHeader className="px-0 pt-0 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-2xl text-secondary">
                {pick(language, {
                  de: "Ihre aktuellen Aufwände",
                  en: "Your Current Effort",
                  tr: "Mevcut Emek Harcamanız",
                })}
              </CardTitle>
              <Select value={industry} onValueChange={handleIndustryChange}>
                <SelectTrigger className="w-full md:w-[200px] bg-white">
                  <SelectValue
                    placeholder={pick(language, {
                      de: "Branche wählen",
                      en: "Select industry",
                      tr: "Sektör seçin",
                    })}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allgemein">
                    {pick(language, {
                      de: "Allgemein",
                      en: "General",
                      tr: "Genel",
                    })}
                  </SelectItem>
                  <SelectItem value="handwerk">
                    {pick(language, {
                      de: "Handwerk & Bau",
                      en: "Crafts & Construction",
                      tr: "Zanaatkârlık & İnşaat",
                    })}
                  </SelectItem>
                  <SelectItem value="beauty">
                    {pick(language, {
                      de: "Beauty & Salons",
                      en: "Beauty & Salons",
                      tr: "Güzellik & Salonlar",
                    })}
                  </SelectItem>
                  <SelectItem value="praxis">
                    {pick(language, {
                      de: "Gesundheitswesen & Praxen",
                      en: "Healthcare & Practices",
                      tr: "Sağlık & Muayenehaneler",
                    })}
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="px-0 pb-0 space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-foreground">
                    {pick(language, {
                      de: "Kundenanrufe pro Tag",
                      en: "Customer calls per day",
                      tr: "Günlük müşteri aramaları",
                    })}
                  </label>
                  <span className="font-bold text-xl text-primary bg-primary/10 px-3 py-1 rounded-lg">
                    {callsPerDay[0]}
                  </span>
                </div>
                <Slider
                  value={callsPerDay}
                  onValueChange={setCallsPerDay}
                  max={100}
                  step={1}
                  className="py-2"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-foreground">
                    {pick(language, {
                      de: "Dauer pro Anruf / Termin (Min.)",
                      en: "Duration per call (min.)",
                      tr: "Arama / randevu başına süre (dk.)",
                    })}
                  </label>
                  <span className="font-bold text-xl text-primary bg-primary/10 px-3 py-1 rounded-lg">
                    {minutesPerCall[0]}
                  </span>
                </div>
                <Slider
                  value={minutesPerCall}
                  onValueChange={setMinutesPerCall}
                  max={30}
                  step={1}
                  className="py-2"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-foreground">
                    {pick(language, {
                      de: "Ø Stundenlohn (€)",
                      en: "Avg. hourly rate (€)",
                      tr: "Ort. saatlik ücret (€)",
                    })}
                  </label>
                  <span className="font-bold text-xl text-primary bg-primary/10 px-3 py-1 rounded-lg">
                    {hourlyRate[0]}
                  </span>
                </div>
                <Slider
                  value={hourlyRate}
                  onValueChange={setHourlyRate}
                  max={150}
                  step={1}
                  className="py-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Results Display */}
          <Card className="p-8 md:p-10 border-none shadow-2xl bg-gradient-to-br from-secondary via-[#153a48] to-primary text-white rounded-3xl relative overflow-hidden flex flex-col">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

            <CardHeader className="px-0 pt-0 text-center relative z-10 shrink-0">
              <CardTitle className="text-2xl md:text-3xl text-white">
                {pick(language, {
                  de: "Ihr Einsparpotenzial",
                  en: "Your Savings Potential",
                  tr: "Tasarruf Potansiyeliniz",
                })}
              </CardTitle>
              <p className="text-white/80 mt-2 text-lg">
                {pick(language, {
                  de: "pro Monat (bei 85% Automatisierung)",
                  en: "per month (at 85% automation)",
                  tr: "ay başına (%85 otomasyonda)",
                })}
              </p>
            </CardHeader>

            <CardContent className="px-0 pb-0 flex flex-col space-y-8 mt-8 relative z-10 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center w-full bg-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10">
                  <div className="text-3xl md:text-5xl font-bold text-white mb-1">
                    {hoursSaved}{" "}
                    {pick(language, { de: "Std.", en: "hrs", tr: "sa." })}
                  </div>
                  <div className="text-sm md:text-base text-white/90 font-medium">
                    {pick(language, {
                      de: "Freizeit",
                      en: "Free Time",
                      tr: "Boş Zaman",
                    })}
                  </div>
                </div>

                <div className="text-center w-full bg-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-white/10">
                  <div className="text-3xl md:text-5xl font-bold text-white mb-1">
                    {moneySaved.toLocaleString(localeMap[language] || "de-DE")}{" "}
                    €
                  </div>
                  <div className="text-sm md:text-base text-white/90 font-medium">
                    {pick(language, {
                      de: "Gespart",
                      en: "Saved Costs",
                      tr: "Tasarruf",
                    })}
                  </div>
                </div>
              </div>

              {/* Animated Chart */}
              <div className="w-full h-[200px] md:h-[250px] bg-white/5 rounded-2xl p-4 border border-white/10 mt-4">
                <p className="text-center text-sm font-semibold mb-4 text-white/80">
                  {pick(language, {
                    de: "Kumulierte Kosten über 6 Monate",
                    en: "Cumulative Costs over 6 Months",
                    tr: "6 Ayda Kümülatif Maliyetler",
                  })}
                </p>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorOhneKI"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ef4444"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ef4444"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorMitKI"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#22c55e"
                          stopOpacity={0.5}
                        />
                        <stop
                          offset="95%"
                          stopColor="#22c55e"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="rgba(255,255,255,0.5)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.9)",
                        border: "none",
                        borderRadius: "8px",
                        color: "white",
                      }}
                      itemStyle={{ color: "white" }}
                      formatter={(value: number) => [
                        `${value.toLocaleString()} €`,
                        "",
                      ]}
                      labelStyle={{
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: "4px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="ohneKI"
                      name={pick(language, {
                        de: "Ohne KI",
                        en: "Without AI",
                        tr: "Yapay Zeka Yok",
                      })}
                      stroke="#ef4444"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorOhneKI)"
                    />
                    <Area
                      type="monotone"
                      dataKey="mitKI"
                      name={pick(language, {
                        de: "Mit KI",
                        en: "With AI",
                        tr: "Yapay Zeka ile",
                      })}
                      stroke="#22c55e"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorMitKI)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-auto pt-4">
                <Button
                  size="lg"
                  className="w-full h-16 text-lg font-bold bg-white text-secondary hover:bg-white/90 shadow-xl"
                  onClick={() => openForm("contact", "ROI Calculator")}
                >
                  {pick(language, {
                    de: "Jetzt Potenzial sichern",
                    en: "Secure Potential Now",
                    tr: "Potansiyeli şimdi güvence altına al",
                  })}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
