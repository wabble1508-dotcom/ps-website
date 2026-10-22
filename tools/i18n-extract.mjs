// Sammelt alle Texte, die in einer Sprache noch auf Deutsch (oder Englisch als Ersatz) angezeigt
// werden, und schreibt sie nach tools/i18n-todo/<sprache>.json. Bereits vorhandene Übersetzungen
// in src/lib/i18n/dict/<sprache>.json werden dabei berücksichtigt (nur Neues landet im Todo).
// Aufruf: npm run build && node tools/i18n-extract.mjs <playwright-pfad> [sprachen,…]
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] || "playwright");
const LANGS = (process.argv[3] || "en,tr,es,fr,it,ro,ru,bg,ar,zh,fa,ps").split(",");
const PORT = 4181;
const BASE = `http://127.0.0.1:${PORT}`;
const routes = [...readFileSync("src/App.tsx", "utf8").matchAll(/path="(\/[^"]*)"/g)]
  .map((m) => m[1])
  .filter((p) => p !== "/admin");

const server = spawn("npx", ["vite", "preview", "--host", "127.0.0.1", "--port", String(PORT), "--strictPort"], {
  stdio: "ignore",
});
await new Promise((r) => setTimeout(r, 4000));
const browser = await chromium.launch({ args: ["--no-proxy-server"] });

// Liest alle Texte der Seite aus, klappt dabei Akkordeons, Tabs und Menüs nacheinander auf
const collectPage = async (page) =>
  page.evaluate(async () => {
    const found = new Set();
    const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
    const grab = () => {
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) {
        const el = w.currentNode.parentElement;
        if (!el || el.closest("script,style,noscript,[data-no-translate],[role=progressbar]")) continue;
        const t = norm(w.currentNode.nodeValue);
        if (t) found.add(t);
      }
      for (const el of document.querySelectorAll("[placeholder],[title],[aria-label],img[alt]")) {
        if (el.closest("[data-no-translate]")) continue;
        for (const a of ["placeholder", "title", "aria-label", "alt"]) {
          const t = norm(el.getAttribute(a));
          if (t) found.add(t);
        }
      }
    };
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    grab();
    const triggers = [
      ...document.querySelectorAll('[aria-expanded="false"], [role="tab"], [data-state="closed"]'),
    ].filter((el) => el.tagName !== "A" && el.getAttribute("type") !== "submit");
    for (const el of triggers.slice(0, 80)) {
      try {
        el.click();
        await sleep(120);
        grab();
      } catch {}
    }
    return [...found];
  });

const crawl = async (lang) => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript((l) => {
    localStorage.setItem("app_language", l);
    window.open = () => null;
  }, lang);
  await ctx.route(/youtube|instagram|ipapi|googleapis|wa\.me/, (r) => r.abort());
  const page = await ctx.newPage();
  const all = new Set();
  for (const r of routes) {
    await page.goto(BASE + r);
    await page.waitForTimeout(2600);
    for (const t of await collectPage(page)) all.add(t);
    // Mobiles Menü
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    for (const t of await collectPage(page)) all.add(t);
    await page.setViewportSize({ width: 1280, height: 900 });
  }
  await ctx.close();
  return all;
};

const useful = (t) =>
  /\p{L}{2}/u.test(t) && !/^(https?:|www\.|\+?\d[\d\s/-]+$|[\w.+-]+@[\w.-]+$)/.test(t) && t.length < 3000;

const [de, en] = await Promise.all([crawl("de"), crawl("en")]);
mkdirSync("tools/i18n-todo", { recursive: true });
for (let i = 0; i < LANGS.length; i += 4) {
  await Promise.all(
    LANGS.slice(i, i + 4).map(async (lang) => {
      const seen = await crawl(lang);
      const dictFile = `src/lib/i18n/dict/${lang}.json`;
      const dict = existsSync(dictFile) ? JSON.parse(readFileSync(dictFile, "utf8")) : {};
      const todo = [...seen].filter(
        (t) => useful(t) && !(t in dict) && (de.has(t) || (lang !== "en" && en.has(t) && !de.has(t) ? true : false)),
      );
      writeFileSync(`tools/i18n-todo/${lang}.json`, JSON.stringify(todo.sort(), null, 1) + "\n");
      console.log(lang, "noch zu übersetzen:", todo.length);
    }),
  );
}
await browser.close();
server.kill();
