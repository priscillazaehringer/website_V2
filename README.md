# website_V2

A brand-new site, built as standalone full HTML pages and deployed to Vercel.
It will replace the current WordPress site. This is a clean staging build, so
self-hosted fonts and a shared CSS file work normally.

## Structure

```
index.html                         Homepage (built from real copy, noindex while staging)
brand.html                         Brand guidelines / reference page (noindex)
sections.html                      Section treatments demo (noindex)
assets/
  css/tokens.css                   Design tokens · the single source of truth
  fonts/
    hanken-grotesk-var.woff2       Body font, variable 100–900 (self-hosted)
    golden-batch.woff2 / .woff     Headline font, regular 400 only (see below)
    OFL-HankenGrotesk.txt          Hanken Grotesk license
scripts/
  convert-golden-batch.py          Turns the Golden Batch .ttf into web fonts
```

## Design tokens

All color, type, spacing, and shape live in `assets/css/tokens.css` as CSS
variables. Every page links it. Change a token there and the whole site
follows. Use the role tokens (`--bg`, `--text`, `--accent`) in pages, not the
raw hex.

## Fonts

- **Golden Batch** · elegant serif, headlines only. Regular (400) only, never
  bold. The token sets `font-synthesis: none` so browsers cannot fake a bold.
- **Hanken Grotesk** · body, buttons, labels. Variable weights 100–900,
  self-hosted as a single woff2.

### Adding Golden Batch

The `.ttf` is converted, not committed as-is. Once you have the file:

```bash
pip install fonttools brotli
python3 scripts/convert-golden-batch.py path/to/golden-batch.ttf
```

That writes `golden-batch.woff2` and `golden-batch.woff` into `assets/fonts/`,
matching the `@font-face` in `tokens.css`. Until then, headlines fall back to
Georgia (the next font in the `--font-display` stack).

## Brand voice

Warm, direct, plain language. Talk to the reader (you/your). Be specific. No em
dashes. Avoid "elevate / unlock / leverage / seamless / robust."

## Deploy

Static files served from the repo root on Vercel. No build step.
