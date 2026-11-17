import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

// Magazin-Artikel aus der Datenbank (geschrieben vom SEO-Writer, freigegeben im Admin)
type Section = { heading: string; paragraphs: string[]; bullets: string[] };
type Article = { slug: string; title: string; description: string; intro: string; sections: string; faq: string; published_at: string; created_at: string };

export default function ArticlePage() {
  const { slug = "" } = useParams();
  const [a, setA] = useState<Article | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    fetch(`/api/articles?slug=${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setA(d.article))
      .catch(() => setMissing(true));
  }, [slug]);

  if (missing)
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-lg">Dieser Artikel ist nicht (mehr) verfügbar.</p>
        <Link className="text-primary" to="/magazin">
          Zum Magazin
        </Link>
      </div>
    );
  if (!a) return <div className="container mx-auto px-4 py-24 text-center text-muted-foreground">Lade …</div>;

  const sections = JSON.parse(a.sections || "[]") as Section[];
  const faq = JSON.parse(a.faq || "[]") as { q: string; a: string }[];
  const date = new Date(a.published_at || a.created_at).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <div className="w-full" data-no-translate>
      <SEO title={`${a.title} | PS Professional Solutions`} description={a.description} canonical={`https://ps-professional-solutions.de/magazin/${a.slug}`} />
      <article className="container mx-auto px-4 max-w-3xl py-16">
        <Link to="/magazin" className="text-sm text-primary">
          ← Magazin
        </Link>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">{a.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Pankaj Mondjal · {date}</p>
        <p className="mt-6 text-lg leading-relaxed">{a.intro}</p>
        {sections.map((s, i) => (
          <section key={i} className="mt-10">
            <h2 className="text-2xl font-semibold">{s.heading}</h2>
            {s.paragraphs.map((p, j) => (
              <p key={j} className="mt-4 leading-relaxed">
                {p}
              </p>
            ))}
            {s.bullets.length > 0 && (
              <ul className="mt-4 list-disc ps-6 space-y-1">
                {s.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        {faq.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">Häufige Fragen</h2>
            {faq.map((f, i) => (
              <details key={i} className="mt-4 rounded-lg border p-4">
                <summary className="font-medium cursor-pointer">{f.q}</summary>
                <p className="mt-2 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </section>
        )}
        <div className="mt-12 rounded-2xl bg-secondary text-white p-8 text-center">
          <p className="text-xl font-semibold">Kostenloses Erstgespräch</p>
          <p className="mt-2 text-white/80">15 Minuten, unverbindlich – wir schauen gemeinsam, was Ihr Betrieb braucht.</p>
          <Link to="/termin">
            <Button className="mt-4">Termin buchen</Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
