import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { onConsentOpen, saveConsent, useConsent } from "@/lib/consent";

// Einwilligungs-Banner: „Alle akzeptieren“ und „Nur notwendige“ sind gleichwertig,
// externe Medien und Google Analytics werden erst nach Zustimmung geladen.
export const CookieBanner = () => {
  const { decided, media, stats } = useConsent();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [mediaChoice, setMediaChoice] = useState(media);
  const [statsChoice, setStatsChoice] = useState(stats);

  useEffect(() => setOpen(!decided), [decided]);
  useEffect(
    () =>
      onConsentOpen(() => {
        setMediaChoice(media);
        setStatsChoice(stats);
        setDetails(true);
        setOpen(true);
      }),
    [media, stats],
  );

  if (!open) return null;

  const choose = (mediaValue: boolean, statsValue: boolean) => {
    saveConsent(mediaValue, statsValue);
    setOpen(false);
    setDetails(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Datenschutz-Einstellungen"
      className="fixed inset-x-0 bottom-0 z-[80] p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[#0f222d] p-5 text-white shadow-2xl">
        <p className="font-semibold mb-2">Ihre Privatsphäre</p>
        <p className="text-sm text-white/80">
          Wir verwenden technisch notwendige Speicherungen (z. B. Ihre Sprachauswahl). Mit Ihrer Zustimmung
          nutzen wir zusätzlich Google Analytics, um zu verstehen, wie unsere Website genutzt wird (dabei werden
          Cookies gesetzt), und laden externe Medien wie YouTube-Videos, Instagram-Beiträge und unser TikTok-Profil.
          Dabei werden Daten (z. B. Ihre IP-Adresse) an Google, Meta bzw. TikTok übermittelt, auch in Länder außerhalb
          der EU. Sie können Ihre Auswahl jederzeit über „Cookie-Einstellungen“ im Seitenfuß ändern. Mehr in der{" "}
          <Link to="/datenschutz" className="underline underline-offset-2" onClick={() => setOpen(false)}>
            Datenschutzerklärung
          </Link>
          .
        </p>

        {details && (
          <div className="mt-4 space-y-3 rounded-xl bg-white/5 p-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">Notwendig</p>
                <p className="text-white/70">Sprachauswahl und diese Einstellung. Immer aktiv.</p>
              </div>
              <Switch checked disabled aria-label="Notwendig" />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">Statistik</p>
                <p className="text-white/70">Google Analytics (Google Ireland Ltd.): Auswertung, welche Seiten wie genutzt werden. Setzt Cookies (_ga), Speicherdauer bis zu 2 Jahre.</p>
              </div>
              <Switch checked={statsChoice} onCheckedChange={setStatsChoice} aria-label="Statistik" />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">Externe Medien</p>
                <p className="text-white/70">YouTube-Videos (Google Ireland Ltd.), Instagram-Beiträge (Meta Platforms Ireland Ltd.) und TikTok-Videos (TikTok Technology Limited).</p>
              </div>
              <Switch checked={mediaChoice} onCheckedChange={setMediaChoice} aria-label="Externe Medien" />
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          {details ? (
            <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white" onClick={() => choose(mediaChoice, statsChoice)}>
              Auswahl speichern
            </Button>
          ) : (
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white" onClick={() => setDetails(true)}>
              Einstellungen
            </Button>
          )}
          <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white" onClick={() => choose(false, false)}>
            Nur notwendige
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => choose(true, true)}>
            Alle akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
};
