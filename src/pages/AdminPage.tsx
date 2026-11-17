import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProspectsTab } from "@/components/admin/ProspectsTab";
import { TodayTab } from "@/components/admin/TodayTab";

type Lead = { id: string; form: string; fields: Record<string, string>; page: string; createdAt: string };
type Booking = { id: string; slot: string; firstName: string; lastName: string; email: string; phone: string; note: string; createdAt: string };
type ChatLog = { id: string; page: string; messages: { role: string; content: string }[]; createdAt: string; updatedAt: string };
type ConfigItem = { id: string; name: string; set: boolean; inAdmin: boolean };
type PlanPost = {
  nr: number; date: string; time: string; format: string; topic: string; details: string; hook: string;
  captions: Record<string, string | string[]>;
};
type Tab = "heute" | "bookings" | "leads" | "chats" | "akquise" | "content" | "config";

const TABS: { key: Tab; label: string }[] = [
  { key: "heute", label: "Heute" },
  { key: "bookings", label: "Termine" },
  { key: "leads", label: "Anfragen" },
  { key: "chats", label: "Chats" },
  { key: "akquise", label: "Akquise" },
  { key: "content", label: "Content-Woche" },
  { key: "config", label: "Einstellungen" },
];

// Zugangsschlüssel für den Social-Media-Autopiloten (Anleitung: social/ANLEITUNG-SOCIAL.md)
const CONFIG_HELP: Record<string, { label: string; help: string }> = {
  INSTAGRAM_TOKEN: {
    label: "Instagram-Zugangsschlüssel",
    help: "developers.facebook.com → deine App → Instagram → API-Einrichtung mit Instagram-Login → bei deinem Konto „Token generieren“ → kopieren.",
  },
  INSTAGRAM_APP_SECRET: {
    label: "Instagram-App-Geheimschlüssel",
    help: "Gleiche Seite → „Instagram-App-Geheimschlüssel“ → Anzeigen → kopieren.",
  },
  INSTAGRAM_VERIFY_TOKEN: { label: "Webhook-Prüfwort", help: "Ist schon eingetragen. Dasselbe Wort im Meta-Portal beim Webhook als „Verify Token“ eintragen." },
  MAKE_SECRET: { label: "Make.com-Schlüssel", help: "Ist schon eingetragen – Make.com nutzt ihn automatisch." },
  SMTP_PASSWORD: {
    label: "E-Mail-Versand: Passwort von mondjal@ps-professional-solutions.de – WICHTIG",
    help: "Das Passwort deines E-Mail-Postfachs bei Strato (dasselbe wie beim Anmelden im Webmail/E-Mail-Programm). Danach gehen alle E-Mails der Website direkt von mondjal@ps-professional-solutions.de raus. Mit „Test-E-Mail senden“ unten prüfen.",
  },
  RESEND_API_KEY: {
    label: "Alternative: E-Mail-Versand über Resend (nicht nötig, wenn das Postfach-Passwort eingetragen ist)",
    help: "Ohne diesen Schlüssel verschickt die Website KEINE E-Mails (Bestätigungen, Benachrichtigungen, Nachfass-E-Mails). resend.com → kostenlos registrieren → Domains → „Add Domain“ ps-professional-solutions.de → „Sign in to Cloudflare“ (trägt alles automatisch ein) → API Keys → „Create API Key“ → hier einfügen.",
  },
  MAIL_FROM: {
    label: "Absender-Adresse",
    help: "Ist schon eingetragen (info@ps-professional-solutions.de). Funktioniert, sobald die Domain bei Resend bestätigt ist.",
  },
  WEBSITENOVA_API_KEY: {
    label: "WebsiteNova (CRM) verbinden",
    help: "websitenova.de → Einstellungen → API-Schlüssel → Name „Website“ → Erstellen → Schlüssel kopieren und hier einfügen. Danach landen Akquise, Kontaktformulare, Termine und Instagram-Anfragen automatisch in deinem CRM.",
  },
  BUSY_CALENDAR_URL: {
    label: "Apple-Kalender: belegte Zeiten sperren",
    help: "iPhone: Kalender-App → Kalender → (i) neben deinem Kalender → „Öffentlicher Kalender“ einschalten → „Link teilen“ → Kopieren und hier einfügen. Alles, was dort eingetragen ist, kann dann nicht mehr gebucht werden.",
  },
};
const FORM_LABELS: Record<string, string> = { ebook: "E-Book", newsletter: "Newsletter", bewerbung: "Bewerbung" };

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("de-DE", { timeZone: "Europe/Berlin", weekday: "short", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

const PW_KEY = "admin-pw";

// Einfacher Admin-Bereich: alle Termine, Formular-Anfragen und Chat-Verläufe
export const AdminPage = () => {
  const [password, setPassword] = useState(() => {
    try {
      return sessionStorage.getItem(PW_KEY) || "";
    } catch {
      return "";
    }
  });
  const [input, setInput] = useState("");
  const [tab, setTab] = useState<Tab>("heute");
  // Einträge merken, zu welchem Reiter sie gehören, damit beim Wechseln nichts Falsches angezeigt wird
  const [data, setData] = useState<{ tab: Tab; items: unknown[] }>({ tab: "bookings", items: [] });
  const items = data.tab === tab ? data.items : [];
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openChat, setOpenChat] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState("");
  const [pwForm, setPwForm] = useState({ current: "", next: "", repeat: "" });
  const [pwMsg, setPwMsg] = useState("");
  const [mailTest, setMailTest] = useState("");
  const [calendarLink, setCalendarLink] = useState<{ https: string; webcal: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const api = useCallback(
    (query: string, method = "GET") =>
      fetch(`/api/admin?${query}`, { method, headers: { Authorization: `Bearer ${password}` } }),
    [password],
  );

  // Abo-Adresse für Apple Kalender (nur im Reiter „Termine“)
  useEffect(() => {
    if (!password || tab !== "bookings" || calendarLink) return;
    api("type=calendar")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.webcal && setCalendarLink({ https: d.https, webcal: d.webcal }))
      .catch(() => {});
  }, [api, password, tab, calendarLink]);

  const load = useCallback(async () => {
    if (!password || tab === "akquise" || tab === "heute") return;
    setLoading(true);
    setError("");
    try {
      const res = await api(`type=${tab}`);
      if (res.status === 401) {
        setError("Falsches Passwort.");
        setPassword("");
        sessionStorage.removeItem(PW_KEY);
        return;
      }
      const data = await res.json();
      let list = data.items || [];
      if (tab === "bookings") list = [...list].sort((a: Booking, b: Booking) => a.slot.localeCompare(b.slot));
      setData({ tab, items: list });
    } catch {
      setError("Daten konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, [api, password, tab]);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (id: string) => {
    if (!window.confirm("Wirklich löschen?")) return;
    await api(`type=${tab}&id=${encodeURIComponent(id)}`, "DELETE");
    load();
  };

  const saveConfig = async (name: string, value: string) => {
    setSaved("");
    const res = await fetch("/api/admin?type=config", {
      method: "POST",
      headers: { Authorization: `Bearer ${password}`, "Content-Type": "application/json" },
      body: JSON.stringify({ name, value }),
    });
    if (res.ok) {
      setDrafts((d) => ({ ...d, [name]: "" }));
      setSaved(name);
      load();
    } else setError((await res.json().catch(() => ({}))).error || "Speichern hat nicht geklappt.");
  };

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      sessionStorage.setItem(PW_KEY, input);
    } catch {
      // ignorieren
    }
    setPassword(input);
    setInput("");
  };

  const now = new Date().toISOString();

  return (
    <div className="min-h-screen bg-muted/40" data-no-translate>
      <Helmet>
        <title>Admin – PS Professional Solutions</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-primary mb-6">Admin-Bereich</h1>

        {!password ? (
          <form onSubmit={login} className="max-w-sm flex flex-col gap-3 bg-background p-6 rounded-xl shadow">
            <label className="font-medium">Passwort</label>
            <Input type="password" value={input} onChange={(e) => setInput(e.target.value)} autoFocus />
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button type="submit">Anmelden</Button>
          </form>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {TABS.map((t) => (
                <Button key={t.key} variant={tab === t.key ? "default" : "outline"} onClick={() => setTab(t.key)}>
                  {t.label}
                </Button>
              ))}
              <Button variant="ghost" onClick={load}>Aktualisieren</Button>
              <Button
                variant="ghost"
                className="ms-auto"
                onClick={() => {
                  sessionStorage.removeItem(PW_KEY);
                  setPassword("");
                }}
              >
                Abmelden
              </Button>
            </div>

            {error && <p className="text-destructive mb-4">{error}</p>}
            {tab === "bookings" && calendarLink && (
              <div className="mb-4 rounded-xl border border-primary/30 bg-primary/5 p-4">
                <p className="font-semibold">📅 Termine im Apple Kalender anzeigen</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Einmal abonnieren – danach erscheint jede neue Buchung automatisch in deinem Kalender (iPhone, iPad, Mac). Den Link nicht weitergeben.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button asChild>
                    <a href={calendarLink.webcal}>Im Apple Kalender abonnieren</a>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard?.writeText(calendarLink.https).then(() => setCopied(true));
                    }}
                  >
                    {copied ? "Kopiert ✔" : "Link kopieren (Google/Outlook)"}
                  </Button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Am Mac: Kalender → Ablage → Neues Kalenderabonnement → Link einfügen → „Automatisch aktualisieren: Alle 15 Minuten“.
                  Belegte Zeiten aus deinem Kalender sperren: Reiter „Einstellungen“.
                </p>
              </div>
            )}
            {tab === "heute" ? (
              <TodayTab password={password} goTo={(t) => setTab(t as Tab)} />
            ) : tab === "akquise" ? (
              <ProspectsTab password={password} />
            ) : loading ? (
              <p className="text-muted-foreground">Lade …</p>
            ) : tab === "content" ? (
              items.length === 0 ? (
                <p className="text-muted-foreground">Noch keine Content-Woche geplant. Sie wird jeden Sonntagabend automatisch erstellt.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-muted-foreground">
                    Dein Plan für diese Woche: Video nach dem Skript aufnehmen, mit der Nummer am Anfang des Dateinamens (z. B. „3.mp4“) in den
                    Dropbox-Ordner „Social-Autopost“ legen – die Texte unten werden dann automatisch verwendet.
                  </p>
                  {(items as PlanPost[]).map((p) => (
                    <details key={p.nr} className="bg-background rounded-xl shadow p-4">
                      <summary className="cursor-pointer">
                        <span className="font-semibold">
                          {p.nr}. {p.topic}
                        </span>
                        <span className="text-muted-foreground text-sm"> · {p.date}, {p.time} Uhr · {p.format}</span>
                        <p className="text-sm mt-1">🎣 {p.hook}</p>
                      </summary>
                      <div className="mt-3 flex flex-col gap-3 text-sm">
                        {[
                          ["🎬 Video-Skript", p.captions?.video_script],
                          ["Instagram", p.captions?.instagram],
                          ["TikTok", p.captions?.tiktok],
                          ["Facebook", p.captions?.facebook],
                          ["LinkedIn", p.captions?.linkedin],
                          ["YouTube-Titel", p.captions?.youtube_title],
                          ["YouTube-Beschreibung", p.captions?.youtube_description],
                          ["Erster Kommentar", p.captions?.first_comment],
                          ["Text fürs Bild", p.captions?.image_text],
                        ]
                          .filter(([, v]) => v)
                          .map(([label, v]) => (
                            <div key={label as string}>
                              <div className="flex items-center justify-between gap-2">
                                <p className="font-semibold">{label}</p>
                                <Button size="sm" variant="ghost" onClick={() => navigator.clipboard?.writeText(String(v))}>
                                  Kopieren
                                </Button>
                              </div>
                              <p className="whitespace-pre-wrap text-muted-foreground">{String(v)}</p>
                            </div>
                          ))}
                      </div>
                    </details>
                  ))}
                </div>
              )
            ) : tab === "config" ? (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">
                  Hier trägst du Zugangsschlüssel und Verknüpfungen ein (Instagram-Autopilot, Apple-Kalender). Gespeicherte Werte werden aus Sicherheitsgründen nicht wieder angezeigt.
                </p>
                <form
                  className="bg-background rounded-xl shadow p-4 flex flex-col gap-2"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setPwMsg("");
                    if (pwForm.next !== pwForm.repeat) return setPwMsg("Die beiden neuen Passwörter sind nicht gleich.");
                    if (pwForm.next.length < 12) return setPwMsg("Das neue Passwort braucht mindestens 12 Zeichen.");
                    const res = await fetch("/api/admin?type=password", {
                      method: "POST",
                      headers: { Authorization: `Bearer ${pwForm.current}`, "Content-Type": "application/json" },
                      body: JSON.stringify({ next: pwForm.next }),
                    });
                    if (res.status === 401) return setPwMsg("Das aktuelle Passwort stimmt nicht.");
                    const d = await res.json().catch(() => ({}));
                    if (!res.ok) return setPwMsg(d.error || "Hat nicht geklappt.");
                    try {
                      sessionStorage.setItem(PW_KEY, pwForm.next);
                    } catch {
                      // ignorieren
                    }
                    setPassword(pwForm.next);
                    setCalendarLink(null);
                    setPwForm({ current: "", next: "", repeat: "" });
                    setPwMsg("✅ Neues Passwort gespeichert. Das alte gilt ab sofort nicht mehr. Wichtig: Den Apple-Kalender bitte einmal neu abonnieren (Reiter „Termine“), der alte Abo-Link funktioniert nicht mehr.");
                  }}
                >
                  <p className="font-semibold">🔒 Admin-Passwort ändern</p>
                  <p className="text-sm text-muted-foreground">
                    Mindestens 12 Zeichen. Am besten im Passwort-Manager (z. B. iCloud-Schlüsselbund) speichern und nirgends in Chats einfügen.
                  </p>
                  <Input type="password" autoComplete="current-password" placeholder="Aktuelles Passwort" value={pwForm.current} onChange={(e) => setPwForm((f) => ({ ...f, current: e.target.value }))} />
                  <Input type="password" autoComplete="new-password" placeholder="Neues Passwort" value={pwForm.next} onChange={(e) => setPwForm((f) => ({ ...f, next: e.target.value }))} />
                  <Input type="password" autoComplete="new-password" placeholder="Neues Passwort wiederholen" value={pwForm.repeat} onChange={(e) => setPwForm((f) => ({ ...f, repeat: e.target.value }))} />
                  <Button type="submit" className="self-start">Passwort ändern</Button>
                  {pwMsg && <p className="text-sm">{pwMsg}</p>}
                </form>
                {(items as ConfigItem[]).map((c) => (
                  <div key={c.id} className="bg-background rounded-xl shadow p-4 flex flex-col gap-2">
                    <p className="font-semibold">
                      {c.set ? "✅" : "❌"} {CONFIG_HELP[c.name]?.label || c.name}
                      <span className="text-muted-foreground font-normal text-sm"> · {c.set ? (c.inAdmin ? "eingetragen" : "in Cloudflare eingetragen") : "fehlt noch"}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{CONFIG_HELP[c.name]?.help}</p>
                    <form
                      className="flex gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (drafts[c.name]?.trim()) saveConfig(c.name, drafts[c.name]);
                      }}
                    >
                      <Input
                        type="password"
                        autoComplete="off"
                        placeholder={c.set ? "Neuen Wert einfügen, um ihn zu ersetzen" : "Hier einfügen"}
                        value={drafts[c.name] || ""}
                        onChange={(e) => setDrafts((d) => ({ ...d, [c.name]: e.target.value }))}
                      />
                      <Button type="submit">Speichern</Button>
                    </form>
                    {saved === c.name && <p className="text-sm text-green-700">Gespeichert ✔</p>}
                    {c.name === "SMTP_PASSWORD" && c.set && (
                      <div className="flex flex-col gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="self-start"
                          onClick={async () => {
                            setMailTest("Sende …");
                            const r = await fetch("/api/admin?type=mailtest", { headers: { Authorization: `Bearer ${password}` } }).then((x) => x.json()).catch(() => ({ ok: false, error: "Verbindung fehlgeschlagen" }));
                            setMailTest(r.ok ? `✅ Test-E-Mail an ${r.to} verschickt – bitte Postfach prüfen.` : `❌ ${r.error} – Passwort prüfen und neu speichern.`);
                          }}
                        >
                          Test-E-Mail senden
                        </Button>
                        {mailTest && <p className="text-sm">{mailTest}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : items.length === 0 ? (
              <p className="text-muted-foreground">Noch keine Einträge.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {tab === "bookings" &&
                  (items as Booking[]).map((b) => (
                    <div key={b.id} className={`bg-background rounded-xl shadow p-4 ${b.slot < now ? "opacity-60" : ""}`}>
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="font-semibold text-lg">{fmt(b.slot)} Uhr</p>
                          <p>{b.firstName} {b.lastName}</p>
                          <p className="text-sm">
                            <a className="text-primary" href={`mailto:${b.email}`}>{b.email}</a>
                            {b.phone && <> · <a className="text-primary" href={`tel:${b.phone}`}>{b.phone}</a></>}
                          </p>
                          {b.note && <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{b.note}</p>}
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => remove(b.id)}>Absagen</Button>
                      </div>
                    </div>
                  ))}

                {tab === "leads" &&
                  (items as Lead[]).map((l) => (
                    <div key={l.id} className="bg-background rounded-xl shadow p-4">
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="font-semibold">
                            {FORM_LABELS[l.form] || l.form} <span className="text-muted-foreground font-normal text-sm">· {fmt(l.createdAt)}</span>
                          </p>
                          {Object.entries(l.fields).map(([k, v]) => (
                            <p key={k} className="text-sm whitespace-pre-wrap"><span className="text-muted-foreground">{k}:</span> {v}</p>
                          ))}
                          <p className="text-xs text-muted-foreground mt-1">Seite: {l.page}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => remove(l.id)}>Löschen</Button>
                      </div>
                    </div>
                  ))}

                {tab === "chats" &&
                  (items as ChatLog[]).map((c) => (
                    <div key={c.id} className="bg-background rounded-xl shadow p-4">
                      <div className="flex justify-between gap-4">
                        <button className="text-left flex-1" onClick={() => setOpenChat(openChat === c.id ? null : c.id)}>
                          <p className="font-semibold">{fmt(c.createdAt)} <span className="text-muted-foreground font-normal text-sm">· {c.messages.length} Nachrichten · {c.page}</span></p>
                          <p className="text-sm text-muted-foreground truncate">{c.messages.find((m) => m.role === "user")?.content}</p>
                        </button>
                        <Button variant="ghost" size="sm" onClick={() => remove(c.id)}>Löschen</Button>
                      </div>
                      {openChat === c.id && (
                        <div className="mt-3 flex flex-col gap-2 text-sm">
                          {c.messages.map((m, i) => (
                            <div key={i} className={`max-w-[85%] rounded-2xl px-3 py-2 whitespace-pre-wrap ${m.role === "user" ? "ms-auto bg-primary text-white" : "bg-muted"}`}>
                              {m.content}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
