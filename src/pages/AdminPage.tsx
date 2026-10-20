import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Lead = { id: string; form: string; fields: Record<string, string>; page: string; createdAt: string };
type Booking = { id: string; slot: string; firstName: string; lastName: string; email: string; phone: string; note: string; createdAt: string };
type ChatLog = { id: string; page: string; messages: { role: string; content: string }[]; createdAt: string; updatedAt: string };
type Tab = "bookings" | "leads" | "chats";

const TABS: { key: Tab; label: string }[] = [
  { key: "bookings", label: "Termine" },
  { key: "leads", label: "Anfragen" },
  { key: "chats", label: "Chats" },
];
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
  const [tab, setTab] = useState<Tab>("bookings");
  // Einträge merken, zu welchem Reiter sie gehören, damit beim Wechseln nichts Falsches angezeigt wird
  const [data, setData] = useState<{ tab: Tab; items: unknown[] }>({ tab: "bookings", items: [] });
  const items = data.tab === tab ? data.items : [];
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openChat, setOpenChat] = useState<string | null>(null);

  const api = useCallback(
    (query: string, method = "GET") =>
      fetch(`/api/admin?${query}`, { method, headers: { Authorization: `Bearer ${password}` } }),
    [password],
  );

  const load = useCallback(async () => {
    if (!password) return;
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
    <div className="min-h-screen bg-muted/40">
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
            {loading ? (
              <p className="text-muted-foreground">Lade …</p>
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
