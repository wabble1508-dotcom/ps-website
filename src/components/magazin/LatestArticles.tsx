import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Neueste Ratgeber-Artikel (vom SEO-Writer) oben im Magazin
type Item = { slug: string; title: string; description: string; published_at: string };

export const LatestArticles = () => {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    fetch("/api/articles")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .catch(() => {});
  }, []);
  if (!items.length) return null;
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-6xl" data-no-translate>
        <h2 className="text-2xl font-bold mb-6">Neueste Ratgeber</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {items.slice(0, 9).map((a) => (
            <Link key={a.slug} to={`/magazin/${a.slug}`} className="rounded-2xl border p-6 hover:shadow-lg transition-shadow bg-background">
              <p className="font-semibold text-lg leading-snug">{a.title}</p>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{a.description}</p>
              <p className="mt-4 text-sm text-primary">Weiterlesen →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
