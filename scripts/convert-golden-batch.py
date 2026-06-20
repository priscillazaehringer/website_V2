#!/usr/bin/env python3
"""
Convert the Golden Batch .ttf into self-hosted web fonts.

Usage:
    python3 scripts/convert-golden-batch.py path/to/golden-batch.ttf

Produces, in assets/fonts/:
    golden-batch.woff2   (primary, brotli-compressed)
    golden-batch.woff    (fallback for older browsers)

These filenames match the @font-face src in assets/css/tokens.css.
Requires: fonttools, brotli  (pip install fonttools brotli)
"""
import sys
from pathlib import Path
from fontTools.ttLib import TTFont

OUT_DIR = Path(__file__).resolve().parent.parent / "assets" / "fonts"


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit("Usage: convert-golden-batch.py path/to/golden-batch.ttf")

    src = Path(sys.argv[1])
    if not src.exists():
        sys.exit(f"Not found: {src}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for flavor, ext in (("woff2", "woff2"), ("woff", "woff")):
        font = TTFont(str(src))
        font.flavor = flavor
        out = OUT_DIR / f"golden-batch.{ext}"
        font.save(str(out))
        print(f"wrote {out}  ({out.stat().st_size:,} bytes)")

    print("Done. Golden Batch is ready and matches tokens.css.")


if __name__ == "__main__":
    main()
