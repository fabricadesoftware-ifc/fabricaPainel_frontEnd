"""Gera src/assets/mdi/mdi-subset.woff2 só com os ícones MDI usados.

Coleta nomes `mdi-*` de src/ e os ícones padrão do Vuetify, mapeia para
codepoints do @mdi/font e roda fontTools.subset. Precisa de fonttools e brotli
(`pip install fonttools brotli`). Rode de novo depois de usar um ícone novo.

    python scripts/subset-mdi.py
"""
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
MDI_CSS = ROOT / "node_modules/@mdi/font/css/materialdesignicons.css"
MDI_WOFF2 = ROOT / "node_modules/@mdi/font/fonts/materialdesignicons-webfont.woff2"
VUETIFY_ICONSET = ROOT / "node_modules/vuetify/lib/iconsets/mdi.js"
OUT = ROOT / "src/assets/mdi/mdi-subset.woff2"

RULE = re.compile(r'\.mdi-([a-z0-9-]+)::?before\s*\{\s*content:\s*"\\([0-9A-Fa-f]+)"')
NAME = re.compile(r"mdi-[a-z0-9-]+")


def names_in(paths):
    found = set()
    for path in paths:
        found.update(NAME.findall(path.read_text(encoding="utf-8", errors="ignore")))
    return {n[len("mdi-"):] for n in found}


def main():
    codepoints_by_name = {
        m.group(1): int(m.group(2), 16)
        for m in RULE.finditer(MDI_CSS.read_text(encoding="utf-8"))
    }
    sources = (
        p for p in (ROOT / "src").rglob("*")
        if p.suffix in {".vue", ".ts", ".tsx", ".js", ".html", ".css"} and "assets/mdi" not in p.as_posix()
    )
    used = names_in(sources)
    used |= names_in([VUETIFY_ICONSET])

    missing = sorted(n for n in used if n not in codepoints_by_name)
    print(f"icones usados: {len(used)}, sem glifo no @mdi/font: {missing}")

    unicodes = ",".join(f"U+{c:04X}" for c in sorted({codepoints_by_name[n] for n in used if n in codepoints_by_name}))
    subprocess.run(
        [
            sys.executable, "-m", "fontTools.subset", str(MDI_WOFF2),
            f"--unicodes={unicodes}", "--flavor=woff2", f"--output-file={OUT}",
        ],
        check=True,
    )
    print(f"subset gravado: {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
