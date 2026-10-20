#!/usr/bin/env python3
"""Lädt alle Bilder/Videos von GoHighLevel & GitHub herunter, legt sie unter public/media ab
und ersetzt die Links im Code durch lokale Pfade. Fehlgeschlagene Downloads bleiben unverändert."""
import os, re, subprocess, sys

ROOT = "/home/user/website"
HOSTS = r"(?:vibe\.filesafe\.space|assets\.cdn\.filesafe\.space|raw\.githubusercontent\.com)"
URL = re.compile(r"https://" + HOSTS + r"""[^"'\s)`$]+""")
FILES = [os.path.join(r, f) for d in ("src",) for r, _, fs in os.walk(os.path.join(ROOT, d))
         for f in fs if f.endswith((".ts", ".tsx", ".css"))] + [os.path.join(ROOT, "index.html")]

urls = sorted({u for p in FILES for u in URL.findall(open(p, encoding="utf-8").read())})
local, failed = {}, []
for u in urls:
    rel = "media/" + u.split("://", 1)[1].replace("%20", "_")
    dst = os.path.join(ROOT, "public", rel)
    if not os.path.exists(dst):
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        r = subprocess.run(["curl", "-sSfL", "--max-time", "120", "-A", "Mozilla/5.0", "-o", dst, u],
                           capture_output=True, text=True)
        if r.returncode:
            if os.path.exists(dst):
                os.remove(dst)
            failed.append(f"{u}  ({r.stderr.strip()})")
            continue
    local[u] = "/" + rel

for p in FILES:
    s = open(p, encoding="utf-8").read()
    n = URL.sub(lambda m: local.get(m.group(0), m.group(0)), s)
    if n != s:
        open(p, "w", encoding="utf-8").write(n)

print(f"{len(local)} von {len(urls)} Dateien lokal übernommen.")
if failed:
    print("Fehlgeschlagen:\n" + "\n".join(failed))
    sys.exit(1)
