import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Anruf-Modus: ein Betrieb nach dem anderen – anrufen, Ergebnis antippen, weiter.
// Alles Weitere (E-Mails, WhatsApp-Text, CRM, Wiedervorlage) erledigt das System.
type P = {
  id: string;
  name: string;
  category: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  status: string;
  note: string;
  messages: string;
  attempts?: number;
  next_call_at?: string;
};
type Call = (method: string, body?: unknown, query?: string) => Promise<{ warning?: string | null; messages?: Record<string, string> }>;

const waNumber = (phone: string) => {
  let d = phone.replace(/[^\d+]/g, "");
  if (d.startsWith("+")) d = d.slice(1);
  else if (d.startsWith("00")) d = d.slice(2);
  else if (d.startsWith("0")) d = `49${d.slice(1)}`;
  return d;
};

export const CallMode = ({ items, categories, call, onClose }: { items: P[]; categories: Record<string, string>; call: Call; onClose: () => void }) => {
  const now = new Date().toISOString();
  // Warteschlange: neue Betriebe mit Telefonnummer, deren Wiedervorlage fällig ist – fertige Skripte zuerst
  const queue = useMemo(
    () =>
      items
        .filter((p) => p.phone && p.status === "neu" && (!p.next_call_at || p.next_call_at <= now))
        .sort((a, b) => Number(Boolean(b.messages)) - Number(Boolean(a.messages)) || (a.attempts || 0) - (b.attempts || 0)),
    // nur beim Öffnen berechnen, damit die Reihenfolge während des Telefonierens stabil bleibt
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [askEmail, setAskEmail] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [scripts, setScripts] = useState<Record<string, Record<string, string>>>({});
  const [done, setDone] = useState({ calls: 0, yes: 0 });

  const p = queue[index];
  const messages: Record<string, string> = (p && (scripts[p.id] || (p.messages ? JSON.parse(p.messages) : {}))) || {};

  const next = () => {
    setIndex((i) => i + 1);
    setEmail("");
    setNote("");
    setAskEmail(false);
  };

  const result = async (r: string) => {
    if (!p) return;
    if (r === "infos-email" && !askEmail && !p.email) {
      setAskEmail(true);
      return;
    }
    setBusy(true);
    setMsg("");
    try {
      const res = await call("POST", { action: "call-result", id: p.id, result: r, email: email || undefined, note: note || undefined });
      if (r === "infos-whatsapp") {
        window.open(`https://wa.me/${waNumber(p.phone)}?text=${encodeURIComponent(messages.whatsapp || "")}`, "_blank");
      }
      setDone((d) => ({ calls: d.calls + 1, yes: d.yes + (["infos-email", "infos-whatsapp", "termin"].includes(r) ? 1 : 0) }));
      setMsg(
        res.warning ||
          {
            "infos-email": "✅ Infos-E-Mail geht automatisch raus, Nachfassen nach 3 und 8 Tagen.",
            "infos-whatsapp": "✅ WhatsApp ist geöffnet – nur noch „Senden“ tippen.",
            termin: "✅ Als Termin eingetragen.",
            "kein-interesse": "Notiert – wird nicht mehr angerufen.",
            "nicht-erreicht": "Morgen wieder in der Liste.",
            spaeter: "In 3 Tagen wieder in der Liste.",
          }[r] ||
          "",
      );
      next();
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const writeScript = async () => {
    if (!p) return;
    setBusy(true);
    try {
      const r = await call("POST", { action: "write", id: p.id });
      if (r.messages) setScripts((s) => ({ ...s, [p.id]: r.messages! }));
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">
          📞 Anruf-Modus · {Math.min(index + 1, queue.length)} von {queue.length} · heute {done.calls} Anrufe, {done.yes}× Ja
        </p>
        <Button variant="outline" size="sm" onClick={onClose}>
          Beenden
        </Button>
      </div>
      {msg && <p className="text-sm bg-muted rounded-md p-2">{msg}</p>}

      {!p ? (
        <div className="bg-background rounded-xl shadow p-6 text-center">
          <p className="font-semibold">Für heute alle durch 🎉</p>
          <p className="text-sm text-muted-foreground">Morgen früh kommen automatisch neue Betriebe dazu.</p>
        </div>
      ) : (
        <div className="bg-background rounded-xl shadow p-4 flex flex-col gap-3">
          <div>
            <p className="text-xl font-bold">{p.name}</p>
            <p className="text-sm text-muted-foreground">
              {categories[p.category] || p.category} · {p.address || p.city}
              {p.attempts ? ` · ${p.attempts}× nicht erreicht` : ""}
            </p>
            <a
              className="text-sm text-primary"
              href={`https://www.google.com/maps/search/${encodeURIComponent(`${p.name} ${p.address || p.city}`)}`}
              target="_blank"
              rel="noreferrer"
            >
              Vorher kurz bei Google Maps ansehen ↗
            </a>
          </div>

          <a href={`tel:${p.phone}`}>
            <Button className="w-full h-14 text-lg">📞 {p.phone} anrufen</Button>
          </a>

          <div className="rounded-lg border p-3 text-sm whitespace-pre-wrap">
            {messages.call_script ? (
              messages.call_script
            ) : (
              <Button variant="outline" size="sm" onClick={writeScript} disabled={busy}>
                {busy ? "KI schreibt …" : "✨ Gesprächsleitfaden schreiben lassen"}
              </Button>
            )}
          </div>

          <Input placeholder="Notiz zum Gespräch (optional, z. B. Name der Inhaberin)" value={note} onChange={(e) => setNote(e.target.value)} />
          {askEmail && (
            <div className="flex gap-2">
              <Input autoFocus type="email" placeholder="E-Mail-Adresse vom Telefonat" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button disabled={busy || !email.includes("@")} onClick={() => result("infos-email")}>
                Senden
              </Button>
            </div>
          )}

          <p className="text-sm font-medium">Wie lief's?</p>
          <div className="grid grid-cols-2 gap-2">
            <Button disabled={busy} onClick={() => result("infos-email")} className="bg-teal-600 hover:bg-teal-700">
              ✉️ Ja – Infos per E-Mail
            </Button>
            <Button disabled={busy} onClick={() => result("infos-whatsapp")} className="bg-green-600 hover:bg-green-700">
              💬 Ja – Infos per WhatsApp
            </Button>
            <Button disabled={busy} onClick={() => result("termin")} className="bg-purple-600 hover:bg-purple-700">
              📅 Termin vereinbart
            </Button>
            <Button disabled={busy} variant="outline" onClick={() => result("spaeter")}>
              ⏰ Später anrufen
            </Button>
            <Button disabled={busy} variant="outline" onClick={() => result("nicht-erreicht")}>
              📵 Nicht erreicht
            </Button>
            <Button disabled={busy} variant="outline" onClick={() => result("kein-interesse")}>
              ✋ Kein Interesse
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="self-start" onClick={next}>
            Überspringen →
          </Button>
        </div>
      )}
    </div>
  );
};

export default CallMode;
