import { describe, expect, it, vi } from "vitest";

vi.mock("../../server/emailFlow", () => ({ sendDueMails: vi.fn(), startFlow: vi.fn(), stopFlows: vi.fn() }));
vi.mock("../../server/articles", () => ({ writeNextArticle: vi.fn() }));
vi.mock("../../server/reminders", () => ({ sendReminders: vi.fn() }));
vi.mock("../../server/crm", () => ({ pushToCrm: vi.fn() }));
import { templateMessages } from "../../server/prospects";

// Akquise-Nachrichten kommen aus Vorlagen – ohne KI, also ohne Claude-Kosten.
describe("Akquise-Vorlagen", () => {
  it("Betrieb ohne Website: Name, Ort und Angebot ab 49 €", () => {
    const m = templateMessages({ name: "Salon Yilmaz", category: "friseur", city: "Dortmund", address: "", website: "" });
    expect(m.whatsapp).toContain("Salon Yilmaz");
    expect(m.whatsapp).toContain("49 €");
    expect(m.email_subject).toBe("Website für Salon Yilmaz");
    expect(m.email_body).toContain("Friseure & Barber in Dortmund");
    expect(m.email_body).toContain("Kein Interesse? Kurze Antwort genügt");
    expect(m.call_script.split("\n")).toHaveLength(7);
  });

  it("Betrieb mit Website: kostenloser Website-Check statt Preis", () => {
    const m = templateMessages({ name: "Café Mitte", category: "cafe", city: "Bochum", address: "", website: "https://cafe-mitte.de" });
    expect(m.email_subject).toBe("Kostenloser Website-Check für Café Mitte");
    expect(m.whatsapp).toContain("Website-Check");
    expect(m.whatsapp).not.toContain("49 €");
    expect(m.instagram).toContain("Bochum");
  });

  it("unbekannte Branche bekommt einen allgemeinen Text", () => {
    const m = templateMessages({ name: "X", category: "sonstiges", city: "Essen", address: "", website: "" });
    expect(m.whatsapp).toContain("lokale Betriebe");
  });
});
