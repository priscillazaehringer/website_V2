# website_V2

A brand-new site, built as standalone full HTML pages and deployed to Vercel.
It will replace the current WordPress site. This is a clean staging build, so
self-hosted fonts and a shared CSS file work normally.

## Structure

```
index.html                         Homepage (built from real copy, noindex while staging)
about.html                         About page (noindex while staging)
ads.html                           The Lead Stream / Meta ads sales page (noindex while staging)
podcast.html                       The Signal / podcast launch sales page (noindex while staging)
brand.html                         Brand guidelines / reference page (noindex)
sections.html                      Section treatments demo (noindex)
assets/
  css/tokens.css                   Design tokens · the single source of truth
  fonts/
    hanken-grotesk-var.woff2       Body font, variable 100–900 (self-hosted)
    golden-batch.woff2 / .woff     Headline font, regular 400 only (see below)
    caveat-var.woff2               Casual marker script, accent words only
                                   (subset to Latin + punctuation, see below)
    OFL-HankenGrotesk.txt          Hanken Grotesk license
    OFL-Caveat.txt                 Caveat license
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
- **Caveat** · casual marker script for small handwritten accent words only
  (never body text). Self-hosted variable woff2. Token: `--font-script`.
  Subset to Latin + Latin Extended-A + common punctuation (170 KB → 78 KB),
  because the full file also carried Cyrillic, math, and currency glyphs the
  site never uses. If you ever need a character outside Western European
  Latin in a script accent, re-subset from the upstream Caveat release.

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

## Mobile conventions

Every page carries the same three mobile mechanisms. If you add a page, copy
them from an existing one.

**The header stack.** `#hdr-stack` holds the promo bar plus the nav and is
`position: fixed`, so nothing in the normal flow sits under it by default. Its
height is not a constant: the promo bar wraps to two or three lines on a narrow
screen. A few lines of JS keep `--stack-h` in sync with the measured height, and
`body { padding-top: var(--stack-h) }` clears it. Do not hardcode a top padding
to clear the header. If a first section needs extra air on top of that, add only
the leftover slack (see `#top.section` in `episodes.html`).

**The mobile menu.** Below 760px the desktop nav is hidden and `#navToggle`
opens `#mobileMenu`, a panel that drops out of the header. The panel is
`position: absolute` inside the stack on purpose, so opening it does not change
the measured header height. It is closed by tapping a link, tapping outside,
pressing Escape, or crossing back above 760px. Its CTA mirrors the page's own
header pill, so keep the two in step.

**Images.** Give every `<img>` a `width` and `height`. Note that the `height`
attribute becomes a real CSS height when your rule sets only `width`, which
silently defeats `aspect-ratio`. Pair `width: 100%` with `height: auto`.
Anything below the first screen gets `loading="lazy" decoding="async"`; the
first image on the page gets `fetchpriority="high"` instead. Serve WebP, and
add a `srcset` when the natural width is more than about twice what a phone
paints at 2x.
