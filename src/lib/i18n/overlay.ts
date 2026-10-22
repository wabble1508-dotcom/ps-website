// Ergänzende Übersetzungen: Viele Texte der Seite gibt es nur auf Deutsch (oder Englisch).
// Dieser Baustein tauscht sie beim Anzeigen gegen die Übersetzung aus src/lib/i18n/dict/<sprache>.json.
// Die Wörterbücher erzeugt tools/i18n-extract.mjs (Liste der fehlenden Texte) plus Übersetzung.

type Dict = Record<string, string>;

const ATTRS = ["placeholder", "title", "aria-label", "alt"] as const;
const SKIP = "script,style,noscript,textarea,[data-no-translate]";

// Jede Sprache wird erst geladen, wenn sie gebraucht wird (eigene kleine Datei)
const loaders = import.meta.glob<Dict>("./dict/*.json", { import: "default" });

let dict: Dict | null = null;
let observer: MutationObserver | null = null;
// Merkt sich den Originaltext, damit beim Sprachwechsel zurückübersetzt werden kann
const originalText = new WeakMap<Node, string>();
const shownText = new WeakMap<Node, string>();
const originalAttr = new WeakMap<Element, Record<string, string>>();

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

const translateText = (node: Text) => {
  const el = node.parentElement;
  if (!el || el.closest(SKIP)) return;
  const current = node.nodeValue ?? "";
  // Hat React den Text inzwischen selbst geändert, gilt der neue Text als Original
  const source = shownText.get(node) === current ? (originalText.get(node) ?? current) : current;
  const key = norm(source);
  const target = dict && key ? dict[key] : undefined;
  const next = target
    ? (source.match(/^\s*/)?.[0] ?? "") + target + (source.match(/\s*$/)?.[0] ?? "")
    : source;
  originalText.set(node, source);
  shownText.set(node, next);
  if (current !== next) node.nodeValue = next;
};

const translateAttrs = (el: Element) => {
  if (el.closest(SKIP)) return;
  const saved = originalAttr.get(el) ?? {};
  for (const a of ATTRS) {
    const current = el.getAttribute(a);
    if (current === null) continue;
    const source = saved[`${a}:shown`] === current ? (saved[a] ?? current) : current;
    const target = dict?.[norm(source)];
    const next = target ?? source;
    saved[a] = source;
    saved[`${a}:shown`] = next;
    if (current !== next) el.setAttribute(a, next);
  }
  originalAttr.set(el, saved);
};

const walk = (root: Node) => {
  if (root.nodeType === Node.TEXT_NODE) return translateText(root as Text);
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  const el = root as Element;
  translateAttrs(el);
  const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  while (tw.nextNode()) {
    const n = tw.currentNode;
    if (n.nodeType === Node.TEXT_NODE) translateText(n as Text);
    else translateAttrs(n as Element);
  }
};

const start = () => {
  if (observer) return;
  observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "characterData") translateText(m.target as Text);
      else if (m.type === "attributes") translateAttrs(m.target as Element);
      else m.addedNodes.forEach(walk);
    }
  });
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: [...ATTRS],
  });
};

/** Lädt das Wörterbuch der Sprache und übersetzt die ganze Seite (Deutsch: zurück zum Original). */
export const applyLanguage = async (language: string) => {
  const load = loaders[`./dict/${language}.json`];
  const next = load ? await load() : null;
  dict = next && Object.keys(next).length ? next : null;
  start();
  walk(document.body);
};
