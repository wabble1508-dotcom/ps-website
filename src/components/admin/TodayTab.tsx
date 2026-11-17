import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Reiter „Heute“: Morgen-Briefing wie „marketing status --today“ + Freigaben
type Status = { stats: Record<string, number>; waiting: { text: string; tab: string }[]; setup: string[] };
type Article = { slug: string; title: string; description: string; keyword: string; status: string; created_at: string };
type Section = { heading: string; paragraphs?: string[]; bullets?: string[] };
type FullArticle = Article & { intro?: string; sections?: string; faq?: string };

const parse = <T,>(v: string | undefined): T[] => {
  try {
    return v ? (JSON.parse(v) as T[]) : [];
  } catch {
    return [];
  }
};

// Entwurf direkt im Admin lesen (ohne neues Fenster – Entwürfe sind nur mit Passwort abrufbar)
const DraftPreview = ({ article }: { article: FullArticle }) => (
  <div className="mt-2 max-h-[70vh] overflow-y-auto rounded-lg border bg-muted/30 p-4 text-sm leading-relaxed">
    <h3 className="text-lg font-bold">{article.title}</h3>
    {article.intro && <p className="mt-2">{article.intro}</p>}
    {parse<Section>(article.sections).map((sec) => (
      <div key={sec.heading} className="mt-4">
        <h4 className="font-semibold">{sec.heading}</h4>
        {sec.paragraphs?.map((p) => <p key={p} className="mt-1">{p}</p>)}
        {!!sec.bullets?.length && (
          <ul className="mt-1 list-disc pl-5">
            {sec.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        )}
      </div>
    ))}
    {parse<{ q: string; a: string }>(article.faq).map((f) => (
      <div key={f.q} className="mt-3">
        <p className="font-semibold">{f.q}</p>
        <p>{f.a}</p>
      </div>
    ))}
  </div>
);

export const TodayTab = ({ password, goTo }: { password: string; goTo: (tab: string) => void }) => {
  const [status, setStatus] = useState<Status | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [busy, setBusy] = useState("");
  const [info, setInfo] = useState("");
  const [reading, setReading] = useState<Record<string, FullArticle | "loading" | "error">>({});
  const headers = { Authorization: `Bearer ${password}`, "Content-Type": "application/json" };

  const load = useCallback(async () => {
    const auth = { Authorization: `Bearer ${password}` };
    const [s, a] = await Promise.all([
      fetch("/api/admin?type=today", { headers: auth }).then((r) => r.json()),
      fetch("/api/articles", { headers: auth }).then((r) => r.json()),
    ]);
    setStatus(s);
    setArticles(a.items || []);
  }, [password]);

  useEffect(() => {
    load().catch(() => setInfo("Konnte nicht geladen werden."));
  }, [load]);

  const act = async (action: string, slug?: string) => {
    setBusy(action + (slug || ""));
    setInfo("");
    try {
      const r = await fetch("/api/articles", { method: "POST", headers, body: JSON.stringify({ action, slug }) }).then((x) => x.json());
      if (r.error) throw new Error(r.error);
      if (action === "write") setInfo(r.article ? `Neuer Entwurf: „${r.article.title}“` : "Alle geplanten Themen sind schon geschrieben.");
      if (action === "publish") setInfo("✅ Online – Google findet ihn über die Sitemap.");
      await load();
    } catch (e) {
      setInfo((e as Error).message);
    } finally {
      setBusy("");
    }
  };

  const toggleRead = async (slug: string) => {
    if (reading[slug]) {
      setReading(({ [slug]: _, ...rest }) => rest);
      return;
    }
    setReading((r) => ({ ...r, [slug]: "loading" }));
    try {
      const d = await fetch(`/api/articles?slug=${encodeURIComponent(slug)}`, { headers: { Authorization: `Bearer ${password}` } }).then((r) => r.json());
      setReading((r) => ({ ...r, [slug]: d.article || "error" }));
    } catch {
      setReading((r) => ({ ...r, [slug]: "error" }));
    }
  };

  const s = status?.stats || {};
  const line = (label: string, value: number | string, warn = false) => (
    <div className="flex justify-between gap-6">
      <span className="text-green-300">{label}</span>
      <span className={warn ? "text-amber-300" : "text-white"}>{value}</span>
    </div>
  );
  const drafts = articles.filter((a) => a.status === "entwurf");

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl bg-neutral-950 text-sm font-mono p-5 shadow">
        <p className="text-neutral-400 mb-3">$ marketing status --today</p>
        {!status ? (
          <p className="text-neutral-400">lade …</p>
        ) : (
          <div className="flex flex-col gap-1">
            {line("reels verteilt (7 Tage)", `${s.reels_7d} → ${s.posts_7d} posts`)}
            {s.post_errors_7d ? line("posting-fehler", s.post_errors_7d, true) : null}
            {line("betriebe gefunden (24 h)", s.found_24h)}
            {line("bereit zum anrufen", s.ready_to_call, s.ready_to_call > 0)}
            {line("kontaktiert (7 Tage)", `${s.contacted_7d} · ${s.yes_7d}× ja`)}
            {line("e-mail-strecken aktiv", `${s.emails_running} · ${s.emails_sent_7d} gesendet`)}
            {line("anfragen website (7 Tage)", s.inquiries_7d)}
            {line("chats (7 Tage)", s.chats_7d)}
            {line("termine geplant", s.bookings_upcoming)}
            {line("magazin-artikel online", s.articles_live)}
            {line("kunden aus akquise", s.customers)}
            {line("wartet auf dich", status.waiting.length, status.waiting.length > 0)}
          </div>
        )}
      </div>

      {status && status.setup.length > 0 && (
        <div className="rounded-xl bg-red-50 text-red-900 p-4 text-sm flex flex-col gap-1">
          <p className="font-semibold">Einrichtung fehlt:</p>
          {status.setup.map((t) => (
            <p key={t}>• {t}</p>
          ))}
          <Button size="sm" variant="outline" className="self-start mt-2" onClick={() => goTo("config")}>
            Zu den Einstellungen
          </Button>
        </div>
      )}

      {status && status.waiting.length > 0 && (
        <div className="bg-background rounded-xl shadow p-4 flex flex-col gap-2">
          <p className="font-semibold">Wartet auf dich</p>
          {status.waiting.map((w) => (
            <button key={w.text} className="text-left text-sm hover:underline" onClick={() => w.tab !== "heute" && goTo(w.tab)}>
              → {w.text}
            </button>
          ))}
        </div>
      )}

      <div className="bg-background rounded-xl shadow p-4 flex flex-col gap-3">
        <div className="flex flex-wrap justify-between gap-2 items-center">
          <p className="font-semibold">SEO-Writer: Magazin-Artikel</p>
          <Button size="sm" variant="outline" disabled={busy === "write"} onClick={() => act("write")}>
            {busy === "write" ? "Claude schreibt (ca. 1 Min.) …" : "✨ Neuen Artikel schreiben lassen"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Jeden Sonntag schreibt Claude automatisch einen neuen Entwurf. Online geht er erst, wenn du ihn freigibst.</p>
        {info && <p className="text-sm">{info}</p>}
        {drafts.length === 0 && <p className="text-sm text-muted-foreground">Keine Entwürfe offen.</p>}
        {drafts.map((a) => (
          <div key={a.slug} className="rounded-lg border p-3 flex flex-col gap-2">
            <p className="font-medium">{a.title}</p>
            <p className="text-sm text-muted-foreground">Suchbegriff: {a.keyword}</p>
            <p className="text-sm">{a.description}</p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => toggleRead(a.slug)}>
                {reading[a.slug] ? "Schließen" : "Lesen"}
              </Button>
              <Button size="sm" disabled={busy === "publish" + a.slug} onClick={() => act("publish", a.slug)}>
                ✅ Freigeben & online stellen
              </Button>
              <Button size="sm" variant="ghost" onClick={() => window.confirm("Entwurf löschen?") && act("delete", a.slug)}>
                Löschen
              </Button>
            </div>
            {reading[a.slug] === "loading" && <p className="text-sm text-muted-foreground">Lade Entwurf …</p>}
            {reading[a.slug] === "error" && <p className="text-sm text-destructive">Entwurf konnte nicht geladen werden.</p>}
            {typeof reading[a.slug] === "object" && <DraftPreview article={reading[a.slug] as FullArticle} />}
          </div>
        ))}
        {articles.filter((a) => a.status === "live").length > 0 && (
          <div className="text-sm">
            <p className="font-medium mt-2">Online:</p>
            {articles
              .filter((a) => a.status === "live")
              .map((a) => (
                <p key={a.slug}>
                  <a className="text-primary" href={`/magazin/${a.slug}`} target="_blank" rel="noreferrer">
                    {a.title}
                  </a>
                </p>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayTab;
