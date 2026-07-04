# Marketing Field Notes — episode workflow

How the podcast pages fit together and how to publish a new episode.

## The pieces

| File | What it is |
| --- | --- |
| `/field-notes.html` | Show home: hero, "The Latest" (featured newest + list), signup |
| `/episodes.html` | Full archive ("Show Notes") — searchable grid of every episode |
| `/field-notes/episode-template.html` | The template you copy for each new episode |
| `/field-notes/<slug>.html` | One page per published episode |
| `/partials/sidebar.html` | **Shared** episode sidebar (bio, offers, favorite tools, newsletter) |

**Publishing model:** the site is on Vercel with no build step, so **pushing to `main` deploys live in ~30 seconds**. (Everything is `noindex` until launch.)

## Publish a new episode (weekly)

Send this to Claude, filling in the blanks (attach the audio embed, episode image, and pin graphic if you have them):

```
New Field Notes episode — create the page and publish:
- Episode #:        07
- Title:            <title>
- Publish date:     Sept 16, 2026
- Duration:         14 min
- Player embed:     <paste Spotify/Apple/YouTube embed code, or the links>
- Show notes:       <a few paragraphs>
- Timestamps:       00:00 …, 02:15 …, 06:40 …
- Links mentioned:  <list>
- Transcript:       <paste, or "add later">
- Episode image:    <attach, or "use placeholder">
- Pin graphic:      <attach, or "add later">

Make it the featured "Latest" episode, add it to the archive, and push to main.
```

What Claude does with that:

1. Copy `episode-template.html` → `/field-notes/<slug>.html`.
2. Fill in the title, date, duration, player embed, show notes, timestamps, links, transcript.
3. Add/replace the episode image and Pinterest pin.
4. Make it the **featured** episode in "The Latest" on `field-notes.html`, and shift the old featured into the list.
5. Add a card to the archive on `episodes.html` (and bump the count).
6. Wire the previous/next episode links.
7. Commit and push → live on Vercel. You review the deploy.

## Editing the sidebar (changes every episode at once)

The sidebar is a **single shared file**: `/partials/sidebar.html`. Every episode page loads it via
`data-include="/partials/sidebar.html"`, so:

> Edit `/partials/sidebar.html` once → **all** episode pages update automatically.

That covers the bio, the "Get in touch" card, the Lead Stream / Podcast Production promos, the "favorite tools"
list, and the newsletter box. Just say e.g. *"update the favorite tools in the episode sidebar"* and it changes
everywhere.

(Note: sidebar **copy/links** are shared. Sidebar **styling** still lives in each page's CSS — ask Claude if you
want a global style change and it'll update all at once.)

## Still to wire up (one-time)

- **Player embed** — provide your podcast host (Spotify/Apple/YouTube) so the real player replaces the placeholder.
- **Kit form ID** — replace `KIT_FORM_ID` so the "Get notified" signups go live.
- **Real assets** — swap the placeholder episode images, Pinterest pin graphics, and favorite-tool links.
