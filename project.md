# Project: Happy Birthday, Sampada 🎂

A gated, personalized birthday website for **Sampada Srivastava**, unlocking fully at
**15 September, 00:00 IST**. Built for a CS-major best friend — should feel personal,
playful, a little arcade/retro-game coded, and genuinely warm, not templated.

---

## 1. Goal & Tone

- Before 15 Sept 00:00 IST: a **teaser/countdown lock screen** — playful, builds anticipation,
  gives just enough (a silhouette/blurred photo, a hint) without revealing the full site.
- From 15 Sept 00:00 IST onward: the **full site unlocks** automatically (no refresh needed —
  poll the clock client-side) with confetti/balloons, birthday songs, all photos, the letter,
  and the gift section.
- Tone: warm, sincere, a little playful/teasing (matches how the letter is written), arcade-game
  coded but never gimmicky — the game motifs should feel like *her* aesthetic, not a generic
  "8-bit template."

## 2. Design Direction (per design-studio brief, not defaults)

**Avoid:** generic SaaS card kit, cream+terracotta AI palette, ALL-CAPS eyebrow labels, em-dash
labels, numbered 01/02/03 markers unless truly sequential (the countdown *is* sequential, so
digits are fine there).

**Palette** (bold black & yellow, her stated favorite combo, with a warm accent so it doesn't
read as a caution-tape cliché):
- `#0A0A0C` — near-black base (not pure #000, slightly warm)
- `#F4C531` — primary yellow (marigold, not neon-lemon — ties to the yellow suit/yellow dress
  photos she already has)
- `#FFF7DE` — warm off-white for light sections / text on dark
- `#E8412C` — Doraemon red-orange accent, used sparingly (his collar bell, "gift unlocked" states)
- `#3E7CB1` — muted Doraemon blue, used sparingly as a secondary accent (not primary — palette
  should still read black & yellow first)
- `#1C1C22` — card/panel surface on dark backgrounds

**Type:**
- Display/headline face: a rounded, slightly chunky pixel-adjacent display font (e.g. "Press
  Start 2P" only for tiny accents like the countdown digits — NOT full paragraphs, it's
  unreadable at body size). For real headlines use a bold geometric sans with character (e.g.
  "Fredoka" or "Baloo 2" — rounded, warm, game-shop-sign energy) paired with a clean sans body
  face (e.g. "Inter" or "Manrope").
- Two-family system max: [chunky rounded display] + [clean sans body]. Pixel font reserved for
  the countdown clock and small "level/badge" labels only.

**Layout concept:**
- Lock screen: centered, one focal countdown, dark background, single blurred/silhouetted photo
  behind it, minimal chrome.
- Main site: vertical scroll, single-page app with anchored sections (not separate page loads)
  — Hero → About Her (favorites) → Gallery → Letter → Gift Room → Future Wishes → Footer.
- Arcade motifs used *structurally*, not decoratively: section transitions styled like level
  transitions ("Level 1: The Basics" → "Level 2: Gallery" etc. is optional/playful, only if it
  doesn't feel forced — gut-check this while building), a "health bar"-style scroll progress
  indicator, buttons styled like game buttons with a pressed state (translate + shadow drop on
  click, not just a color hover).

**Motion:** one orchestrated reveal moment when the countdown hits zero (confetti + unlock
animation), plus a subtle press/hover on interactive elements. Avoid fade-slide-up on every
single section — pick 1–2 moments that matter (the unlock, and maybe the gift box opening) and
keep the rest calm.

**Doraemon touch:** don't slap the character on (copyright + also reads as a sticker, not a
design). Instead reference him abstractly: his bell as a small icon/favicon motif, his blue+red
+white color trio echoed subtly in accent moments, a hidden "dorayaki" emoji easter egg
somewhere in the gift section copy.

## 3. Tech Stack

Keep it simple and hostable anywhere (Netlify/GitHub Pages/Vercel static, or just opened
locally):
- Plain **HTML + CSS + vanilla JS** — no build step needed, easiest for you to tweak text/links
  yourself later without a dev environment.
- One main `index.html` (the whole scrolling experience), lock/unlock state handled with JS by
  comparing `Date.now()` to the target timestamp.
- No backend, no database — everything client-side. All "unlock" logic is time-based in JS
  (client clock), which is fine for a personal gift site.

## 4. Folder Structure

```
sampada-birthday/
├── index.html
├── style.css
├── script.js
├── /assets
│   ├── /photos
│   │   ├── photo-01.jpg   ... photo-15.jpg   (rename from uploads, see §7)
│   ├── /audio
│   │   ├── kaise-mujhe-tum-mil-gayi.mp3   ← you provide the actual file/link
│   │   ├── happy-birthday.mp3             ← you provide
│   │   ├── woh-din.mp3                    ← you provide
│   │   ├── gilehriyaan.mp3                ← you provide
│   └── /icons
│       ├── bell-favicon.svg
└── README.md   (how to add/replace photos, songs, and edit the letter)
```

## 5. Countdown Logic

- Target: **2026-09-15T00:00:00+05:30** (IST, hardcoded offset — don't rely on visitor's local
  timezone).
- On page load: if `now < target` → show **Lock Screen**. Set an interval (every 1s) that
  re-checks; the instant `now >= target`, trigger the unlock transition automatically (no
  refresh needed) — confetti burst, lock screen fades, main site scrolls into view.
- If `now >= target` already (i.e. she opens the link after the 15th) → skip straight to the
  unlocked main site, still play the unlock animation once on load as a welcome moment.
- Countdown display: Days / Hours / Minutes / Seconds, styled with the pixel font, each unit in
  its own "cartridge" panel.

## 6. Site Sections (unlocked experience)

1. **Hero** — Big personal headline (e.g. her name + "Happy Birthday" in the display font), one
   great photo (pick the smiling one from the yellow-suit shoot), short warm opening line.
2. **About Her / What She Loves** — a playful "stat card" or "character select" style panel
   (arcade nod, but content-driven, not decoration) listing, from what you told me:
   - Favorite cartoon: Doraemon
   - Food: loves eating in general 🍛, momos are her favorite
   - Colors: mostly black, currently manifesting a yellow dress
   - Style: both Indian & Western depending on mood
   - Hair goals: long wavy hair
   - Music taste: soft, peaceful, love-type songs
   - Movies: no fixed genre — rom-com, thriller, all sorts, with a soft spot for dreamy love
     stories sometimes
   *(Write these as short, warm, first-person-to-her lines, not a dry bullet dump — e.g. "The
   friend who'll pick momos over anything, any day.")*
3. **Gallery** — all 15 photos in a mixed masonry/collage grid (not a rigid uniform grid — mix
   portrait/landscape sizes for visual interest), lightbox on click.
4. **The Letter** — her letter, full width, on a warm card, styled like a handwritten note (nice
   serif or script accent for just this section is fine as an exception, since it's meant to feel
   personal/handwritten — see §8 for the actual text).
5. **Gift Room** — the section that stays visually "wrapped/locked" even within the unlocked site
   until clicked open (small extra delight: a click-to-open gift box animation). Inside: 2–3
   personalized quotes about her, a couple of favorite photos again as a mini "for you" collage,
   and a short "wishing you all the best in your future" note.
6. **Future Wishes** — a short section imagining/wishing good things for her future (career,
   happiness, friendship) — 3–4 short wish cards, sincere, not generic ("may you ace every
   interview," etc. — personalize based on what you know of her goals if you want to add more
   later).
7. **Music Player** — small persistent player (mini bar, bottom of screen or floating) with the
   four songs queued: *Kaise Mujhe Tum Mil Gayi*, *Happy Birthday*, *Woh Din*, *Gilehriyaan*.
   Play/pause, track name, simple progress bar. Autoplay is unreliable in browsers — show a
   friendly "🎵 tap to play her songs" prompt instead of relying on autoplay.
8. **Footer** — small closing line, maybe the bell icon, "made with ❤️ by [your name]".

## 7. Photos (from your 15 uploads — suggested placement)

| # | Original filename (starts with) | Suggested use |
|---|---|---|
| 1 | `801578063_...` (yellow sharara, pink wall) | Hero candidate |
| 2 / 13 | `799502159_...` / `802069224_...` (black sparkly top selfie) | Gallery |
| 3 / 11 | `801304621_...` / `801640456_...` (red jacket, green field) | Gallery |
| 4 | `803924412_...` (teal suit, doorway) | Gallery |
| 5 | `805812513_...` (green suit, gold earrings, event hall) | Gallery |
| 6 | `800316888_...` (yellow outfit, hugging knees) | Gift Room mini-collage |
| 7 | `800841467_...` (yellow gown, poolside mehendi decor) | Hero candidate / Gallery |
| 8 | `804955043_...` (teal-blue suit, seated, roses) | Gallery |
| 9 | `800008614_...` (green floral dress, plants) | Gallery |
| 10 / 15 | `802697435_...` / `800258446_...` (black velvet gown) | Gallery |
| 12 | `801055683_...` (olive dress, mountains/temple) | Gallery — great for "future adventures" vibe |
| 14 | `800468491_...` (café, casual top) | Gallery — nice candid/casual contrast |

Rename sequentially (`photo-01.jpg` … `photo-15.jpg`) when copying into `/assets/photos/` to
keep the gallery loop simple in code.

## 8. Personalized Letter (final copy to use verbatim, lightly cleaned up)

> Dear Sampada,
>
> Thank you for being in my life. As a friend, you have always helped me — whenever I talk to
> you, I feel really good. You are truly a gem, and I wish you a very happy birthday from the
> bottom of my heart. May God bless you and help you achieve whatever you want.
>
> This is just a small initiative from my side, since I can't gift you something physical —
> so please take this as my gift to you. You are smart, beautiful, and your words are never
> harsh to me — they are sweet, and they always will be.
>
> [— leave a blank/expandable line or two here for you to add anything else before sending]

*(Built as an editable text block in the HTML so you can tweak wording anytime without touching
the rest of the code.)*

## 9. Songs (you're providing the mp3s/links)

Placeholder queue, in this order:
1. Kaise Mujhe Tum Mil Gayi
2. Happy Birthday
3. Woh Din
4. Gilehriyaan

Drop your mp3 files into `/assets/audio/` using the filenames in §4, or swap in direct URLs in
`script.js` — either works.

## 10. Nice-to-have stretch features (only if time allows, don't block launch on these)

- Tiny arcade mini-game easter egg in the Gift Room (e.g. a 5-question "how well do I know you"
  quiz with playful right/wrong feedback) — optional, skip if it adds too much scope.
- Confetti burst specifically shaped like little bells/dorayakis on unlock.
- A small "scroll health bar" at the top styled like a retro game HP bar, filling as she scrolls.

## 11. Non-negotiables / Quality bar

- Fully responsive — she'll very likely open this on her phone first.
- Countdown must auto-unlock without a page refresh.
- No copyrighted song files bundled by default — audio sources are yours to add (mp3 links you
  provide), consistent with fair use of personal-use content you control.
- Visible focus states, reduced-motion respected for the confetti/animations.
- Everything editable in plain text (letter, quotes, wish cards) without touching layout code.

## 12. Build Checklist (for whoever builds this — e.g. Claude Code)

- [ ] Scaffold folder structure per §4
- [ ] Build lock screen + live countdown (§5)
- [ ] Build unlock transition (confetti + reveal)
- [ ] Build Hero, About Her, Gallery (masonry + lightbox), Letter, Gift Room, Future Wishes,
      Music Player, Footer (§6)
- [ ] Wire up gallery with the 15 renamed photos (§7)
- [ ] Insert final letter copy (§8)
- [ ] Wire up music player with placeholder audio paths (§9)
- [ ] Responsive pass (mobile-first check)
- [ ] Accessibility pass (focus states, reduced motion, alt text on all photos)
- [ ] Final design self-critique against §2 (make sure nothing reads as generic AI-template)