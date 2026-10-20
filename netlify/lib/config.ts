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
