import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Reiter „Akquise“: Betriebe finden, KI-Nachricht schreiben lassen, selbst per WhatsApp/Instagram/E-Mail senden.
type Prospect = {
  id: string;
  name: string;
  category: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  instagram: string;
  status: string;
  note: string;
  messages: string;
  updated_at: string;
};
type Messages = { whatsapp?: string; instagram?: string; email_subject?: string; email_body?: string };

const STATUS: { key: string; label: string; color: string }[] = [
  { key: "neu", label: "Neu", color: "bg-muted" },
  { key: "angeschrieben", label: "Angeschrieben", color: "bg-blue-100 text-blue-900" },
  { key: "infos", label: "Will Infos ✉️ (Auto-E-Mails)", color: "bg-teal-100 text-teal-900" },
  { key: "antwort", label: "Antwort", color: "bg-amber-100 text-amber-900" },
  { key: "termin", label: "Termin", color: "bg-purple-100 text-purple-900" },
  { key: "kunde", label: "Kunde 🎉", color: "bg-green-100 text-green-900" },
  { key: "kein-interesse", label: "Kein Interesse", color: "bg-red-100 text-red-900" },
];

// Deutsche Telefonnummer → Format für wa.me (nur Handynummern haben meist WhatsApp)
const waNumber = (phone: string) => {
  let d = phone.replace(/[^\d+]/g, "");
  if (d.startsWith("+")) d = d.slice(1);
  else if (d.startsWith("00")) d = d.slice(2);
  else if (d.startsWith("0")) d = `49${d.slice(1)}`;
  return d;
};
const isMobile = (phone: string) => /^491[5-7]/.test(waNumber(phone));

export const ProspectsTab = ({ password }: { password: string }) => {
  const [items, setItems] = useState<Prospect[]>([]);
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [category, setCategory] = useState("friseur");
  const [city, setCity] = useState("Dortmund");
  const [onlyWithout, setOnlyWithout] = useState(true);
  const [filter, setFilter] = useState("aktiv");
  const [busy, setBusy] = useState("");
  const [info, setInfo] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Messages>>({});
  const [crm, setCrm] = useState(false);

  const call = useCallback(
    async (method: string, body?: unknown, query = "") => {
      const res = await fetch(`/api/prospects${query}`, {
        method,
        headers: { Authorization: `Bearer ${password}`, "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Fehler ${res.status}`);
      return data;
    },
    [password],
  );

  const load = useCallback(async () => {
    try {
      const data = await call("GET");
      setItems(data.items || []);
      setCategories(data.categories || {});
      setCrm(Boolean(data.crm));
    } catch (e) {
      setInfo((e as Error).message);
    }
  }, [call]);

  useEffect(() => {
    load();
  }, [load]);

  const search = async () => {
    setBusy("search");
    setInfo("");
    try {
      const r = await call("POST", { action: "search", category, city, onlyWithoutWebsite: onlyWithout });
      setInfo(`${r.found} Betriebe gefunden, ${r.added} neu in deiner Liste.`);
      setFilter("neu");
      await load();
    } catch (e) {
      setInfo((e as Error).message);
    } finally {
      setBusy("");
    }
  };

  const update = async (id: string, fields: Partial<Prospect>) => {
    setItems((list) => list.map((p) => (p.id === id ? { ...p, ...fields } : p)));
    const r = await call("POST", { action: "update", id, ...fields }).catch((e) => setInfo((e as Error).message));
    if (r?.warning) setInfo(r.warning);
    else if (fields.status === "infos") setInfo("✅ Automatische E-Mails gestartet: Infos sofort, Nachfassen nach 3 und 8 Tagen. Stoppt automatisch bei Termin oder anderem Status.");
  };

  const write = async (p: Prospect) => {
    setBusy(p.id);
    try {
      const r = await call("POST", { action: "write", id: p.id });
      setDrafts((d) => ({ ...d, [p.id]: r.messages }));
    } catch (e) {
      setInfo((e as Error).message);
    } finally {
      setBusy("");
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Aus der Liste löschen?")) return;
    await call("DELETE", undefined, `?id=${encodeURIComponent(id)}`);
    setItems((list) => list.filter((p) => p.id !== id));
  };

  // Nach dem Öffnen von WhatsApp/Instagram/E-Mail: als „angeschrieben“ markieren und den Text im CRM-Verlauf ablegen
  const sent = (p: Prospect, channel: "whatsapp" | "instagram" | "email", text: string) => {
    if (p.status === "neu") setItems((list) => list.map((x) => (x.id === p.id ? { ...x, status: "angeschrieben" } : x)));
    call("POST", { action: "contacted", id: p.id, channel, text }).catch((e) => setInfo((e as Error).message));
  };

  const shown = useMemo(
    () =>
      items.filter((p) =>
        filter === "alle" ? true : filter === "aktiv" ? !["kunde", "kein-interesse"].includes(p.status) : p.status === filter,
      ),
    [items, filter],
  );
  const counts = useMemo(() => Object.fromEntries(STATUS.map((s) => [s.key, items.filter((p) => p.status === s.key).length])), [items]);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-background rounded-xl shadow p-4 flex flex-col gap-3">
        <p className="font-semibold">Neue Betriebe finden</p>
        <div className="flex flex-wrap gap-2 items-center">
          <select className="border rounded-md h-10 px-3 bg-background" value={category} onChange={(e) => setCategory(e.target.value)}>
            {Object.entries(categories).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <Input className="w-44" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Stadt, z. B. Dortmund" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={onlyWithout} onChange={(e) => setOnlyWithout(e.target.checked)} /> nur ohne Website
          </label>
          <Button onClick={search} disabled={busy === "search"}>
            {busy === "search" ? "Suche …" : "Suchen"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Quelle: OpenStreetMap (nicht jeder Betrieb ist dort eingetragen, Telefonnummern fehlen manchmal – dann kurz bei Google nachsehen und eintragen).
        </p>
        <p className="text-xs text-amber-800 bg-amber-50 rounded-md p-2">
          Rechtlicher Hinweis: Werbung per E-Mail, WhatsApp oder Instagram-DM an Betriebe, die nicht zugestimmt haben, kann in Deutschland abgemahnt werden (§ 7 UWG).
          Am sichersten: erst anrufen oder vorbeigehen und fragen, ob du Infos schicken darfst – dann schreiben. Ein Anruf bei Firmen ist erlaubt, wenn ein Interesse anzunehmen ist.
        </p>
        <p className={`text-xs rounded-md p-2 ${crm ? "bg-green-50 text-green-900" : "bg-muted text-muted-foreground"}`}>
          {crm
            ? "✅ Mit WebsiteNova verbunden: Wer angeschrieben wird, landet automatisch im CRM – mit gesendetem Text und jedem Statuswechsel."
            : "WebsiteNova (CRM) ist noch nicht verbunden – Schlüssel im Reiter „Einstellungen“ eintragen."}
        </p>
        {info && <p className="text-sm">{info}</p>}
      </div>

      <div className="flex flex-wrap gap-2">
        {[{ key: "aktiv", label: "Offen" }, ...STATUS, { key: "alle", label: "Alle" }].map((s) => (
          <Button key={s.key} size="sm" variant={filter === s.key ? "default" : "outline"} onClick={() => setFilter(s.key)}>
            {s.label}
            {s.key in counts ? ` (${counts[s.key]})` : ""}
          </Button>
        ))}
      </div>

      {shown.length === 0 && <p className="text-muted-foreground">Keine Einträge – oben eine Branche suchen.</p>}

      {shown.map((p) => {
        const msg: Messages = drafts[p.id] || (p.messages ? JSON.parse(p.messages) : {});
        const st = STATUS.find((s) => s.key === p.status) || STATUS[0];
        const maps = `https://www.google.com/maps/search/${encodeURIComponent(`${p.name} ${p.address || p.city}`)}`;
        return (
          <div key={p.id} className="bg-background rounded-xl shadow p-4 flex flex-col gap-2">
            <div className="flex flex-wrap justify-between gap-2">
              <button className="text-left" onClick={() => setOpen(open === p.id ? null : p.id)}>
                <p className="font-semibold">
                  {p.name} <span className={`ms-2 text-xs rounded-full px-2 py-0.5 ${st.color}`}>{st.label}</span>
                  {p.status === "neu" && p.messages && <span className="ms-1 text-xs rounded-full px-2 py-0.5 bg-green-100 text-green-900">✉️ Nachricht fertig</span>}
                </p>
                <p className="text-sm text-muted-foreground">
                  {categories[p.category] || p.category} · {p.address || p.city} · {p.website ? "hat Website" : "keine Website bekannt"}
                </p>
              </button>
              <select className="border rounded-md h-9 px-2 text-sm bg-background" value={p.status} onChange={(e) => update(p.id, { status: e.target.value })}>
                {STATUS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {open === p.id && (
              <div className="flex flex-col gap-3 border-t pt-3">
                <div className="flex flex-wrap gap-3 text-sm">
                  <a className="text-primary" href={maps} target="_blank" rel="noreferrer">Google Maps ↗</a>
                  {p.website && <a className="text-primary" href={p.website} target="_blank" rel="noreferrer">Website ↗</a>}
                  {p.phone && <a className="text-primary" href={`tel:${p.phone}`}>📞 {p.phone}</a>}
                </div>
                <div className="grid sm:grid-cols-3 gap-2">
                  <Input placeholder="Telefon/Handy" defaultValue={p.phone} onBlur={(e) => e.target.value !== p.phone && update(p.id, { phone: e.target.value })} />
                  <Input placeholder="E-Mail" defaultValue={p.email} onBlur={(e) => e.target.value !== p.email && update(p.id, { email: e.target.value })} />
                  <Input placeholder="Instagram-Name" defaultValue={p.instagram} onBlur={(e) => e.target.value !== p.instagram && update(p.id, { instagram: e.target.value.replace(/^@/, "") })} />
                </div>
                <Textarea placeholder="Notiz (z. B. „Inhaberin heißt Frau Yilmaz, will Online-Termine“) – die KI nutzt sie für die Nachricht" defaultValue={p.note} onBlur={(e) => e.target.value !== p.note && update(p.id, { note: e.target.value })} />

                <Button variant="outline" onClick={() => write(p)} disabled={busy === p.id}>
                  {busy === p.id ? "KI schreibt …" : msg.whatsapp ? "Neue Nachricht schreiben lassen" : "✨ Nachricht von KI schreiben lassen"}
                </Button>

                {msg.whatsapp && (
                  <div className="grid gap-3">
                    <MessageBox
                      title="WhatsApp"
                      text={msg.whatsapp}
                      onChange={(t) => setDrafts((d) => ({ ...d, [p.id]: { ...msg, whatsapp: t } }))}
                      action={
                        p.phone ? (
                          <a href={`https://wa.me/${waNumber(p.phone)}?text=${encodeURIComponent(msg.whatsapp)}`} target="_blank" rel="noreferrer" onClick={() => sent(p, "whatsapp", msg.whatsapp || "")}>
                            <Button size="sm">In WhatsApp öffnen{isMobile(p.phone) ? "" : " (Festnetz?)"}</Button>
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground">Handynummer oben eintragen</span>
                        )
                      }
                    />
                    <MessageBox
                      title="Instagram-DM"
                      text={msg.instagram || ""}
                      onChange={(t) => setDrafts((d) => ({ ...d, [p.id]: { ...msg, instagram: t } }))}
                      action={
                        <Button
                          size="sm"
                          onClick={() => {
                            navigator.clipboard?.writeText(msg.instagram || "");
                            window.open(
                              p.instagram ? `https://ig.me/m/${p.instagram}` : `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(p.name)}`,
                              "_blank",
                            );
                            sent(p, "instagram", msg.instagram || "");
                          }}
                        >
                          Text kopieren & Instagram öffnen
                        </Button>
                      }
                    />
                    <MessageBox
                      title={`E-Mail – Betreff: ${msg.email_subject || ""}`}
                      text={msg.email_body || ""}
                      onChange={(t) => setDrafts((d) => ({ ...d, [p.id]: { ...msg, email_body: t } }))}
                      action={
                        p.email ? (
                          <a
                            href={`mailto:${p.email}?subject=${encodeURIComponent(msg.email_subject || "")}&body=${encodeURIComponent(msg.email_body || "")}`}
                            onClick={() => sent(p, "email", `${msg.email_subject}\n\n${msg.email_body}`)}
                          >
                            <Button size="sm">E-Mail öffnen</Button>
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground">E-Mail oben eintragen</span>
                        )
                      }
                    />
                  </div>
                )}
                <Button variant="ghost" size="sm" className="self-start" onClick={() => remove(p.id)}>
                  Aus Liste löschen
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const MessageBox = ({ title, text, onChange, action }: { title: string; text: string; onChange: (t: string) => void; action: React.ReactNode }) => (
  <div className="rounded-lg border p-3 flex flex-col gap-2">
    <p className="text-sm font-medium">{title}</p>
    <Textarea rows={5} value={text} onChange={(e) => onChange(e.target.value)} />
    <div>{action}</div>
  </div>
);

export default ProspectsTab;
