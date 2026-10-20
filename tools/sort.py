#!/usr/bin/env python3
"""Sortiert hochgeladene .ts/.tsx-Dateien anhand der Importe in src/ ein und listet Fehlendes."""
import os, re, shutil, glob
UP = "/root/.claude/uploads/3baeaf3e-c121-5a2f-9098-e7cb788dad84"
SRC = "/home/user/website/src"
IMP = re.compile(r'''(?:from|import)\s*["']((?:@/|\.{1,2}/)[^"']+)["']''')
EXTS = ("", ".ts", ".tsx", "/index.ts", "/index.tsx")

def needed():
    out = set()
    for root, _, files in os.walk(SRC):
        for f in files:
            if not f.endswith((".ts", ".tsx")): continue
            for m in IMP.findall(open(os.path.join(root, f), encoding="utf-8").read()):
                p = os.path.join(SRC, m[2:]) if m.startswith("@/") else os.path.join(root, m)
                p = os.path.relpath(os.path.normpath(p), SRC)
                if not p.endswith((".css", ".json")): out.add(re.sub(r"\.tsx?$", "", p))
    return out

def exists(p): return any(os.path.isfile(os.path.join(SRC, p + e)) for e in EXTS)

uploads = {}
for f in sorted(glob.glob(UP + "/*"), key=os.path.getmtime):
    base = os.path.basename(f).split("-", 1)[1]
    if base.endswith((".ts", ".tsx")): uploads[base] = f
for _ in range(10):
    changed = False
    for p in needed():
        if exists(p): continue
        name = os.path.basename(p)
        for ext in (".ts", ".tsx"):
            if name + ext in uploads:
                dst = os.path.join(SRC, p + ext)
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                shutil.copy(uploads[name + ext], dst); changed = True; break
    if not changed: break
# Unbekannte Komponenten (Großbuchstabe, .tsx) landen in components/
for b, f in uploads.items():
    if b.endswith(".tsx") and b[0].isupper() and not any(os.path.exists(os.path.join(r, b)) for r, _, _ in os.walk(SRC)):
        shutil.copy(f, os.path.join(SRC, "components", b))
placed = {os.path.basename(f) for _, _, fs in os.walk(SRC) for f in fs}
root_cfg = {"vite.config.ts", "vitest.config.ts", "tailwind.config.ts"}
for b in sorted(set(uploads) - placed - root_cfg): print("UNZUGEORDNET:", b)
for p in sorted(needed()):
    if not exists(p): print(p)
