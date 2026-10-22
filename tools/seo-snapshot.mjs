// Liest Titel, Beschreibung und strukturierte Daten aller Seiten aus der gebauten Website
// und schreibt sie nach server/seo-meta.json (für functions/_middleware.ts) sowie die
// public/sitemap.xml. Aufruf nach Text-Änderungen: npm run build && node tools/seo-snapshot.mjs <playwright-pfad>
import { readFileSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] || "playwright");
const PORT = 4179;
const DOMAIN = "https://ps-professional-solutions.de";

const routes = [...readFileSync("src/App.tsx", "utf8").matchAll(/path="(\/[^"]*)"/g)]
  .map((m) => m[1])
  .filter((p) => p !== "/admin");

const server = spawn("npx", ["vite", "preview", "--host", "127.0.0.1", "--port", String(PORT), "--strictPort"], {
  stdio: "ignore",
});
await new Promise((r) => setTimeout(r, 4000));

const browser = await chromium.launch({ args: ["--no-proxy-server"] });
const page = await browser.newPage({ locale: "de-DE" });
await page.route(/youtube|instagram|ipapi|googleapis/, (r) => r.abort());
const meta = {};
for (const path of routes) {
  await page.goto(`http://127.0.0.1:${PORT}${path}`);
  await page.waitForTimeout(3500);
  meta[path] = await page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
    robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") || "index, follow",
    image: document.querySelector('meta[property="og:image"]')?.getAttribute("content") || "",
    schemas: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
  }));
  console.log(path, "→", meta[path].title);
}
await browser.close();
server.kill();

writeFileSync("server/seo-meta.json", JSON.stringify(meta, null, 2) + "\n");

const today = new Date().toISOString().slice(0, 10);
const urls = Object.entries(meta)
  .filter(([, m]) => !m.robots.includes("noindex"))
  .map(([p]) => {
    const prio = p === "/" ? "1.0" : ["/webseiten", "/preise"].includes(p) ? "0.9" : "0.7";
    return `  <url>\n    <loc>${DOMAIN}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${prio}</priority>\n  </url>`;
  });
writeFileSync(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);
console.log(`${Object.keys(meta).length} Seiten, ${urls.length} in der Sitemap`);
