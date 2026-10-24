import { useEffect, useState } from "react";

// Einwilligung für externe Medien (YouTube, Instagram). Notwendige Speicherungen
// (Sprache, diese Auswahl) brauchen keine Einwilligung.
const KEY = "ps_consent";
const EVENT = "ps-consent-change";
const OPEN_EVENT = "ps-consent-open";

export type Consent = { media: boolean; date: string };

export const readConsent = (): Consent | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
};

export const saveConsent = (media: boolean) => {
  try {
    localStorage.setItem(KEY, JSON.stringify({ media, date: new Date().toISOString() }));
  } catch {
    // ohne Speicher gilt die Auswahl nur für diesen Besuch
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: media }));
};

/** Öffnet die Cookie-Einstellungen erneut (z. B. über den Link im Footer). */
export const openConsentSettings = () => window.dispatchEvent(new Event(OPEN_EVENT));

export const useConsent = () => {
  const [consent, setConsent] = useState<Consent | null>(readConsent);
  const [media, setMedia] = useState<boolean>(() => readConsent()?.media ?? false);
  useEffect(() => {
    const onChange = (e: Event) => {
      setMedia((e as CustomEvent<boolean>).detail);
      setConsent(readConsent());
    };
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);
  return { decided: consent !== null, media };
};

export const onConsentOpen = (fn: () => void) => {
  window.addEventListener(OPEN_EVENT, fn);
  return () => window.removeEventListener(OPEN_EVENT, fn);
};
