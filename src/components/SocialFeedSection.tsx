import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Instagram, Play, Images } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
import { useLanguage } from "@/components/LanguageContext";
import { pickPosts, SOCIAL_HIDDEN } from "@/lib/socialTopics";
import { activeSocialLinks, PINNED_POST } from "../../server/socialLinks";

// Neueste Instagram-Beiträge (passend zur Seite) und das TikTok-Profil mit den neuesten Videos.
// Instagram-Bilder kommen über die eigene Domain (/api/social-image), TikTok erst nach Einwilligung.
const TIKTOK_USER = "psprofessional.solutions";
const TIKTOK_URL = `https://www.tiktok.com/@${TIKTOK_USER}`;

type Post = { id: string; caption: string; type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"; permalink: string; timestamp: string };
type L = { de: string; en: string; tr: string };

const UI = {
  kicker: { de: "Social Media", en: "Social media", tr: "Sosyal medya" },
  title: { de: "Folgen Sie uns", en: "Follow us", tr: "Bizi takip edin" },
  subtitle: {
    de: "Aktuelle Projekte, Tipps und Einblicke hinter die Kulissen – direkt aus unseren Kanälen.",
    en: "Current projects, tips and behind-the-scenes insights – straight from our channels.",
    tr: "Güncel projeler, ipuçları ve perde arkası – doğrudan kanallarımızdan.",
  },

  pinnedTitle: { de: "Unser angepinntes Video", en: "Our pinned video", tr: "Sabitlenmiş videomuz" },
  pinnedOpen: { de: "Direkt auf Instagram ansehen", en: "Watch directly on Instagram", tr: "Doğrudan Instagram'da izle" },
  tiktokTitle: { de: "Kurze Videos rund um Websites, Apps & KI", en: "Short videos about websites, apps & AI", tr: "Web siteleri, uygulamalar ve AI hakkında kısa videolar" },
  tiktokText: {
    de: "Tipps für Selbstständige, Einblicke in echte Projekte und ehrliche Antworten – direkt aus Dortmund.",
    en: "Tips for business owners, insights into real projects and honest answers – straight from Dortmund.",
    tr: "Serbest çalışanlar için ipuçları, gerçek projelerden kareler ve dürüst cevaplar – doğrudan Dortmund'dan.",
  },
  tiktokOpen: { de: "Auf TikTok ansehen", en: "Watch on TikTok", tr: "TikTok'ta izle" },
};

// Beiträge nur einmal pro Besuch laden
let postsPromise: Promise<Post[]> | null = null;
const loadPosts = () =>
  (postsPromise ??= fetch("/api/social")
    .then((r) => (r.ok ? r.json() : { instagram: [] }))
    .then((d: { instagram?: Post[] }) => d.instagram || [])
    .catch(() => []));

// TikTok: eigene Karte statt TikToks Profil-Einbettung (die lud oft nur leer) – keine Daten an TikTok
const TikTokProfile = ({ pick }: { pick: (t: L) => string }) => (
  <div className="dark">
  <a
    href={TIKTOK_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="glass group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl p-7 text-white"
  >
    <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#25F4EE]/25 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
    <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#FE2C55]/25 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
    <div className="relative flex items-center gap-3">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="white" aria-hidden="true">
          <path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.2V2h-3.4v13.4a2.9 2.9 0 1 1-2-2.7V9.2a6.3 6.3 0 1 0 5.4 6.2V8.6a8.2 8.2 0 0 0 3.8 1V6.7Z" />
        </svg>
      </span>
      <span>
        <span className="block font-semibold">TikTok</span>
        <span className="block text-sm text-white/70">@{TIKTOK_USER}</span>
      </span>
    </div>
    <div className="relative">
      <p className="font-display text-3xl font-semibold leading-tight">{pick(UI.tiktokTitle)}</p>
      <p className="mt-3 text-sm text-white/75">{pick(UI.tiktokText)}</p>
      <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition group-hover:scale-[1.03]">
        <Play className="h-4 w-4" fill="currentColor" /> {pick(UI.tiktokOpen)}
      </span>
    </div>
  </a>
  </div>
);

// Angepinntes Video: Vorschaubild von der eigenen Domain + Play-Knopf → öffnet Instagram.
// (Instagrams Einbettung blieb bei Werbeblockern oder Sperren oft leer.)
const PinnedInstagram = ({ pick }: { pick: (t: L) => string }) => (
  <a
    href={PINNED_POST}
    target="_blank"
    rel="noopener noreferrer"
    className="dark group relative block aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 sm:aspect-[16/10]"
  >
    <img
      src="/media/hero/pankaj-hero.jpg"
      alt={pick(UI.pinnedTitle)}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover object-[60%_center] transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
    <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
      <Play className="ml-1 h-8 w-8 text-white" fill="currentColor" />
    </span>
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white">
      <div>
        <p className="flex items-center gap-2 text-sm text-white/80">
          <Instagram className="h-4 w-4" /> @ps_professional_solutions
        </p>
        <p className="mt-1 font-display text-2xl font-semibold">{pick(UI.pinnedTitle)}</p>
      </div>
      <span className="glass hidden shrink-0 rounded-full px-4 py-2 text-sm font-semibold sm:inline-flex">{pick(UI.pinnedOpen)}</span>
    </div>
  </a>
);

export const SocialFeedSection = () => {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const pick = (t: L) => (language === "en" ? t.en : language === "tr" ? t.tr : t.de);
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    loadPosts().then(setPosts);
  }, []);

  if (SOCIAL_HIDDEN.includes(pathname)) return null;
  const shown = posts ? pickPosts(posts, pathname) : [];
  const dateFormat = new Intl.DateTimeFormat(language, { day: "numeric", month: "short", year: "numeric" });

  return (
    <section className="border-t border-border bg-muted/30 py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHead index="@" kicker={pick(UI.kicker)} title={pick(UI.title)} sub={pick(UI.subtitle)} />

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            {posts === null ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="aspect-square animate-pulse rounded-2xl bg-muted" />
                ))}
              </div>
            ) : shown.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {shown.map((post) => (
                  <a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square overflow-hidden rounded-2xl bg-muted"
                    data-no-translate
                  >
                    <img decoding="async"
                      src={`/api/social-image?id=${post.id}`}
                      alt={post.caption.slice(0, 120) || "Instagram-Beitrag"}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {post.type !== "IMAGE" && (
                      <span className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white">
                        {post.type === "VIDEO" ? <Play className="h-3.5 w-3.5" fill="currentColor" /> : <Images className="h-3.5 w-3.5" />}
                      </span>
                    )}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/0 to-black/0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="line-clamp-3 text-xs text-white">{post.caption}</p>
                      <p className="mt-1 text-[11px] text-white/70">{dateFormat.format(new Date(post.timestamp))}</p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <PinnedInstagram pick={pick} />
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              {activeSocialLinks().map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill={link.color === "#000000" ? "currentColor" : link.color} aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d={link.path} />
                  </svg>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <TikTokProfile pick={pick} />
        </div>
      </div>
    </section>
  );
};
