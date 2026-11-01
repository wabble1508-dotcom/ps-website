import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Instagram, Play, Images } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { useLanguage } from "@/components/LanguageContext";
import { saveConsent, useConsent } from "@/lib/consent";
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
  pinnedLoad: { de: "Video laden", en: "Load video", tr: "Videoyu yükle" },
  pinnedNotice: {
    de: "Das Video wird von Instagram geladen. Mit Klick stimmen Sie zu, dass Daten an Meta übermittelt werden.",
    en: "The video is loaded from Instagram. By clicking you agree that data will be transmitted to Meta.",
    tr: "Video Instagram'dan yüklenir. Tıklayarak verilerin Meta'ya aktarılmasını kabul etmiş olursunuz.",
  },
  pinnedOpen: { de: "Direkt auf Instagram ansehen", en: "Watch directly on Instagram", tr: "Doğrudan Instagram'da izle" },
  tiktokLoad: { de: "TikTok-Videos laden", en: "Load TikTok videos", tr: "TikTok videolarını yükle" },
  tiktokNotice: {
    de: "Unsere neuesten Videos werden von TikTok geladen. Mit Klick stimmen Sie zu, dass Daten an TikTok übermittelt werden.",
    en: "Our latest videos are loaded from TikTok. By clicking you agree that data will be transmitted to TikTok.",
    tr: "En yeni videolarımız TikTok'tan yüklenir. Tıklayarak verilerin TikTok'a aktarılmasını kabul etmiş olursunuz.",
  },
};

// Beiträge nur einmal pro Besuch laden
let postsPromise: Promise<Post[]> | null = null;
const loadPosts = () =>
  (postsPromise ??= fetch("/api/social")
    .then((r) => (r.ok ? r.json() : { instagram: [] }))
    .then((d: { instagram?: Post[] }) => d.instagram || [])
    .catch(() => []));

const TikTokProfile = ({ pick }: { pick: (t: L) => string }) => {
  const { media } = useConsent();
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!media || !box.current) return;
    box.current.innerHTML = `<blockquote class="tiktok-embed" cite="${TIKTOK_URL}" data-unique-id="${TIKTOK_USER}" data-embed-type="creator" style="max-width:780px;min-width:288px;margin:0"><section><a target="_blank" rel="noopener" href="${TIKTOK_URL}?refer=creator_embed">@${TIKTOK_USER}</a></section></blockquote>`;
    // embed.js wandelt den Platzhalter in das Profil mit den neuesten Videos um
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    box.current.appendChild(script);
  }, [media]);

  if (media) return <div ref={box} className="min-h-[420px] w-full" />;
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-[#111] via-[#1d1d2b] to-[#0f2533] p-6 text-center text-white">
      <button
        type="button"
        onClick={() => saveConsent(true)}
        className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:scale-105"
      >
        <Play className="h-4 w-4" fill="currentColor" /> {pick(UI.tiktokLoad)}
      </button>
      <p className="max-w-xs text-xs text-white/70">{pick(UI.tiktokNotice)}</p>
      <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#7ee3ee] hover:underline">
        @{TIKTOK_USER}
      </a>
    </div>
  );
};

const PinnedInstagram = ({ pick }: { pick: (t: L) => string }) => {
  const { media } = useConsent();
  if (media) {
    return (
      <div className="mx-auto max-w-[420px] overflow-hidden rounded-2xl border border-border bg-white">
        <iframe
          src={`${PINNED_POST}embed/captioned/`}
          title="Angepinntes Instagram-Video"
          className="h-[620px] w-full"
          loading="lazy"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-6 text-center text-white">
      <Instagram className="h-10 w-10" />
      <p className="text-lg font-bold">{pick(UI.pinnedTitle)}</p>
      <button
        type="button"
        onClick={() => saveConsent(true)}
        className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:scale-105"
      >
        <Play className="h-4 w-4" fill="currentColor" /> {pick(UI.pinnedLoad)}
      </button>
      <p className="max-w-sm text-xs text-white/85">{pick(UI.pinnedNotice)}</p>
      <a href={PINNED_POST} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline">
        {pick(UI.pinnedOpen)}
      </a>
    </div>
  );
};

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
        <FadeIn className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">{pick(UI.kicker)}</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">{pick(UI.title)}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{pick(UI.subtitle)}</p>
        </FadeIn>

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
                    <img
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
