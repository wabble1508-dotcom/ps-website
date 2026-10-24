// Einstellungen für das Buchungssystem – hier können Arbeitszeiten angepasst werden.
export const BOOKING = {
  timeZone: "Europe/Berlin",
  slotMinutes: 30,
  // Wochentag (0 = Sonntag … 6 = Samstag) → Zeitfenster [von, bis] im Format "HH:MM"
  hours: {
    1: [["09:00", "18:00"]],
    2: [["09:00", "18:00"]],
    3: [["09:00", "18:00"]],
    4: [["09:00", "18:00"]],
    5: [["09:00", "16:00"]],
  } as Record<number, [string, string][]>,
  minNoticeHours: 12, // frühestens so viele Stunden im Voraus buchbar
  maxDaysAhead: 31,
};

export const COMPANY = {
  name: "PS Professional Solutions",
  email: "info@ps-professional-solutions.de",
};

// Wie lange Daten gespeichert bleiben (DSGVO: nicht länger als nötig). Danach werden sie
// automatisch gelöscht. Angaben in Monaten.
export const RETENTION = {
  chats: 6, // Chat-Verläufe
  leads: 12, // Formular-Anfragen (E-Book, Newsletter)
  applications: 6, // Bewerbungen
  bookings: 12, // Termine, gerechnet ab dem Termin
};
