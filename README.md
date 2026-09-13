# 🎂 Happy Birthday, Sampada!

A gated, personalized birthday website that auto-unlocks at **September 15, 2026 at midnight IST**. Before that, visitors see a beautiful countdown lock screen. After, the full celebration unfolds — photos, a heartfelt letter, gifts, music, and wishes.

Built with zero dependencies — just HTML, CSS, and vanilla JavaScript.

![Lock Screen → Unlocked Site]

---

## ✨ Features

- **Countdown Lock Screen** — Pixel-font timer in arcade-style "cartridge" panels with a blurred silhouette photo
- **Auto-Unlock at Midnight** — No refresh needed; the site transitions live with a confetti burst
- **Hero Section** — Stunning hero photo with animated headline
- **"Meet Sampada" Card** — Arcade-style "Player Select" character card with fun stats
- **Photo Gallery** — All 15 photos in a masonry grid with lightbox (click/keyboard navigation)
- **Handwritten Letter** — Personal letter in Caveat handwriting font, editable in plain HTML
- **Gift Room** — Click-to-open gift box revealing personalized quotes and a mini photo collage
- **Future Wishes** — 4 wish cards for career, happiness, friendships, and adventures
- **Music Player** — Persistent mini-bar with play/pause, skip, and progress seek
- **Scroll HP Bar** — Retro game-style progress bar at the top
- **Responsive** — Mobile-first, tested at 375px / 768px / 1024px / 1440px
- **Accessible** — Focus states, ARIA labels, keyboard navigation, reduced-motion support
- **Doraemon Easter Eggs** — Bell favicon, subtle color accents, hidden dorayaki reference

---

## 📁 Folder Structure

```
birthday-website/
├── index.html              ← The entire site (single page)
├── style.css               ← All styles + design system
├── script.js               ← All interactivity
├── flow.md                 ← Decision log (how & why)
├── project.md              ← Original specification
├── README.md               ← You're reading this
├── assets/
│   ├── photos/
│   │   ├── photo-01.jpg    ← Hero (yellow sharara)
│   │   ├── photo-02.jpg    ... through photo-15.jpg
│   ├── audio/
│   │   ├── kaise-mujhe-tum-mil-gayi.mp3   ← YOU provide this
│   │   ├── happy-birthday.mp3              ← YOU provide this
│   │   ├── woh-din.mp3                     ← YOU provide this
│   │   ├── gilehriyaan.mp3                 ← YOU provide this
│   └── icons/
│       └── bell-favicon.svg
```

---

## 🎵 Adding Your Songs

The music player is wired up but **you need to add the actual mp3 files**. Drop them into `assets/audio/` with these exact filenames:

| Filename | Song |
|----------|------|
| `kaise-mujhe-tum-mil-gayi.mp3` | Kaise Mujhe Tum Mil Gayi |
| `happy-birthday.mp3` | Happy Birthday |
| `woh-din.mp3` | Woh Din |
| `gilehriyaan.mp3` | Gilehriyaan |

**To add/change songs**, edit the `SONGS` array at the top of `script.js`:

```javascript
const SONGS = [
  { title: 'Kaise Mujhe Tum Mil Gayi', src: 'assets/audio/kaise-mujhe-tum-mil-gayi.mp3' },
  { title: 'Happy Birthday',           src: 'assets/audio/happy-birthday.mp3' },
  // Add more here...
];
```

---

## 📝 Editing the Letter

Open `index.html` and find the `<section id="letter">` block. The letter text is in plain HTML `<p>` tags inside `.letter-body` — just edit the text directly:

```html
<div class="letter-body">
  <p>Your letter text here...</p>
  <p>Another paragraph...</p>
</div>
```

---

## 🖼️ Adding/Replacing Photos

1. Drop new photos into `assets/photos/`
2. Name them `photo-XX.jpg` (sequential numbering)
3. In `index.html`, find `<div class="gallery-grid">` and add/edit gallery items:

```html
<div class="gallery-item" data-index="15">
  <img src="assets/photos/photo-16.jpg" alt="Description" loading="lazy" />
</div>
```

**Important:** Keep the `data-index` values sequential (0, 1, 2, ...).

---

## 🎁 Editing Wish Cards & Gift Quotes

**Wish cards** are in `<section id="wishes">` — each `.wish-card` has an icon, title, and text.

**Gift quotes** are in `<section id="gift-room">` inside `.gift-quote-card` elements.

All text is in plain HTML — no config files or build steps needed.

---

## 🗓️ Changing the Unlock Date

Edit line 8 of `script.js`:

```javascript
const UNLOCK_DATE = new Date('2026-09-15T00:00:00+05:30');
```

Format: `YYYY-MM-DDTHH:MM:SS+05:30` (the `+05:30` is IST — don't remove it).

---

## 🚀 Deployment

This is a static site — no build step, no server needed.

### Option 1: GitHub Pages
1. Push to a GitHub repo
2. Go to **Settings → Pages → Deploy from branch → main**
3. Your site is live at `https://yourusername.github.io/repo-name/`

### Option 2: Netlify
1. Drag and drop the entire folder into [Netlify Drop](https://app.netlify.com/drop)
2. Instant live URL

### Option 3: Vercel
1. `npx vercel` in the project directory
2. Follow the prompts

### Option 4: Just Open Locally
Double-click `index.html` — it works offline (fonts need initial internet load).

---

## 🎨 Design Details

| Element | Value |
|---------|-------|
| **Primary Palette** | Black (`#0A0A0C`) + Yellow (`#F4C531`) |
| **Headline Font** | Fredoka (Google Fonts) |
| **Body Font** | Inter (Google Fonts) |
| **Pixel Font** | Press Start 2P (countdown only) |
| **Letter Font** | Caveat (handwriting) |
| **Favicon** | Doraemon bell (SVG) |

---

## 🙏 Credits

Made with ❤️ by a friend who cares.
