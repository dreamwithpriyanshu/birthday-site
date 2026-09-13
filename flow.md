# Flow Log — Birthday Website for Sampada

A decision-by-decision log of how this project was built, what choices were made, and why.

---

## 🗓️ Session 1 — Sept 13, 2026

### Decision 1: Hero Photo Selection
**Options considered:**
- `photo-01` — Yellow sharara, pink wall (smiling, vibrant)
- `photo-07` — Yellow gown, poolside mehendi decor (elegant)

**Decision:** `photo-01` (yellow sharara, pink wall)
**Reasoning:** She's smiling, the yellow outfit perfectly matches the site's yellow primary palette, and the pink wall creates a beautiful contrast. The warmth of the photo matches the tone of the site — personal and joyful, not posed or formal.

---

### Decision 2: Footer Credit Name
**Options considered:** "Priyanshu", "Your Best Friend", "A friend who cares"

**Decision:** "A friend who cares"
**Reasoning:** User's explicit choice. It's sincere without being overly personal — it keeps the focus on Sampada rather than the creator, which matches the gift-like tone of the site.

---

### Decision 3: Letter Addendum
**Options considered:** Leave blank vs. write something

**Decision:** Added a third paragraph to the letter — *"You know, there aren't many people who make you feel comfortable being yourself..."*
**Reasoning:** User asked me to write something heartfelt but keep the option to edit. This addendum complements the existing letter by adding a specific emotional note about comfort and friendship, which feels personal without overstepping. The letter section is editable in plain HTML so the user can tweak or remove it before sending.

---

### Decision 4: Technology & Architecture
**Decision:** Plain HTML + CSS + vanilla JS (single-page, no build step)
**Reasoning:** Specified in `project.md §3`. No framework needed — the site is a personal gift, not a web app. Static files = hostable anywhere (Netlify, GitHub Pages, Vercel, or just opened locally). Zero dependencies, zero maintenance.

---

### Decision 5: Font System
**Decision:** Three-font system — Fredoka (headlines), Inter (body), Press Start 2P (countdown + tiny labels), Caveat (letter section)
**Reasoning:** Per `project.md §2`:
- **Fredoka**: Rounded, warm, "game-shop-sign energy" — perfect for the arcade motif without being unreadable
- **Inter**: Clean, modern body text for readability
- **Press Start 2P**: Pixel font reserved ONLY for countdown digits and small labels like "PLAYER SELECT", "GALLERY", "GIFT ROOM" — never for body text (it's unreadable at small sizes)
- **Caveat**: Exception for the letter section — handwritten feel to match the personal/heartfelt tone, as spec suggested a "nice serif or script accent" is acceptable for this one section

---

### Decision 6: Color Palette
**Decision:** Black + Yellow primary, Doraemon accents used sparingly
**Reasoning:** Directly from spec:
- `#0A0A0C` — near-black (not pure #000, slightly warm) for the dark theme
- `#F4C531` — marigold yellow (not neon) as primary accent — ties to her yellow dress photos and stated favorite combo
- `#FFF7DE` — warm off-white for text readability
- `#E8412C` — Doraemon red-orange, used only for special moments (the gradient bar on the character card, the scroll health bar)
- `#3E7CB1` — muted Doraemon blue, used sparingly in accent gradients
- The palette reads as "black & yellow" first — the Doraemon colors are subtle nods, not dominant

---

### Decision 7: Countdown Unlock Logic
**Decision:** Client-side time comparison with hardcoded IST offset, 1-second interval, auto-unlock transition
**Reasoning:** Per spec §5:
- Target: `2026-09-15T00:00:00+05:30` — hardcoded ISO string with IST offset so it works correctly regardless of visitor timezone
- `setInterval(1000)` checks if `now >= target` every second
- When countdown hits zero: confetti burst → lock screen fades out with scale animation → main site fades in
- If already past unlock date on load: skip lock screen, still play confetti as a welcome moment
- No refresh needed — all handled client-side

---

### Decision 8: Gallery Layout
**Decision:** CSS `columns: 3` masonry layout (not CSS Grid)
**Reasoning:** The spec explicitly asked for "mixed masonry/collage grid (not a rigid uniform grid)." CSS columns naturally create a Pinterest-style masonry where portrait and landscape photos flow into different-height tiles. This creates visual interest without needing a JS masonry library. Falls to 2 columns on tablet, 1 on mobile.

---

### Decision 9: Lightbox Implementation
**Decision:** Custom-built lightbox (no library)
**Reasoning:** Zero-dependency approach. Simple overlay with:
- Backdrop blur + dark overlay
- Image scale-up animation on open
- Prev/Next/Close buttons
- Keyboard navigation (Escape, ArrowLeft, ArrowRight)
- Backdrop click to close
- Full ARIA attributes for accessibility
All in ~60 lines of JS. No Lightbox2, no GLightbox, no Fancybox — keeps the project dependency-free.

---

### Decision 10: Confetti Animation
**Decision:** Custom canvas confetti (no library like canvas-confetti)
**Reasoning:** Staying true to zero-dependency spec. 150 rectangular particles with:
- Colors from the site palette (yellow, red, blue, off-white)
- Physics simulation (gravity, random velocities, rotation)
- Fade-out over last 60 frames (~1 second)
- Respects `prefers-reduced-motion` — skips entirely if set
- 3-second duration, then canvas clears

---

### Decision 11: Music Player Design
**Decision:** Fixed bottom bar (Spotify-style mini player)
**Reasoning:** The spec asked for a "small persistent player (mini bar, bottom of screen or floating)." A fixed bottom bar is familiar UX (like Spotify/Apple Music), doesn't obstruct content, and stays accessible on scroll. Features:
- Play/Pause button with visual state change (▶ / ⏸)
- Track name display
- Progress bar with click-to-seek
- Skip button
- "🎵 Tap play to start her songs" prompt (spec noted autoplay is unreliable)
- Audio files are placeholder paths — user drops in their own mp3s

---

### Decision 12: Gift Room Interaction
**Decision:** Click-to-open toggle (not a complex 3D unwrap)
**Reasoning:** The spec wanted a "click-to-open gift box animation" but warned against being "gimmicky." Simple solution:
- 🎁 emoji bounces gently (CSS keyframe)
- Click → emoji changes to 🎉, hidden content slides open (max-height + opacity transition)
- Click again → folds back up
- Inside: 3 personalized quotes + mini photo collage + closing note
- Hidden dorayaki easter egg 🍩 in the third quote (spec §2 requested this)

---

### Decision 13: Doraemon References
**Decision:** Abstract, not literal
**Reasoning:** Spec §2 was very clear: "don't slap the character on." Instead:
- **Bell favicon**: Abstract yellow bell SVG with red clapper — Doraemon's bell, not Doraemon himself
- **Color accents**: Red-orange (`#E8412C`) and muted blue (`#3E7CB1`) echo Doraemon's color scheme in the gradient bar on the character card and scroll health bar
- **Dorayaki easter egg**: Hidden 🍩 emoji in the gift room quote ("sweeter than even a plate of dorayaki 🍩")
- **"Favorite cartoon: Doraemon" stat**: Natural mention in the About Her section

---

### Decision 14: Scroll Health Bar
**Decision:** Implemented as a stretch feature
**Reasoning:** Spec §10 listed this as a "nice-to-have stretch feature" but it was trivial to add (~15 lines of CSS + JS). It's a gradient bar (yellow → red-orange) that fills as you scroll — styled like a retro game HP bar without being over-the-top. Adds visual feedback and matches the arcade motif.

---

### Decision 15: Responsive Strategy
**Decision:** Mobile-first CSS with 768px and 480px breakpoints
**Reasoning:** Spec §11 says "she'll very likely open this on her phone first." Key responsive adaptations:
- Gallery: 3 columns → 2 columns (tablet) → 1 column (mobile)
- Character card header: horizontal → vertical stack on mobile
- Stat grid: 2 columns → 1 column on mobile
- Countdown cartridges: shrink padding on small screens
- Lightbox nav buttons: shrink on mobile
- Font sizes: `clamp()` throughout for fluid scaling

---

### Decision 16: Accessibility
**Decision:** Full accessibility pass built-in from the start
**Reasoning:** Spec §11 listed "visible focus states, reduced-motion respected" as non-negotiable:
- `:focus-visible` outline on all interactive elements
- `prefers-reduced-motion: reduce` — disables all animations and transitions
- ARIA labels on all buttons (lightbox close/prev/next, play/pause, gift box)
- `role="dialog"` on lightbox with `aria-hidden` toggle
- `role="button"` and `tabindex="0"` on gallery items
- Alt text on every image
- Keyboard navigation (Enter/Space to activate, Escape to close)

---

### Decision 17: Photo Renaming
**Decision:** Renamed from original long filenames to `photo-01.jpg` through `photo-15.jpg`
**Reasoning:** Spec §7 requested sequential renaming to "keep the gallery loop simple in code." Mapping follows the suggested placement table in the spec. Original files preserved in `assests/img/`, copies in `assets/photos/`.

---

### Decision 18: Section-Based Autoplay Music
**User Request:** Songs should auto-start on unlock. Specific songs tied to specific sections:
- Happy Birthday → Hero (first screen on unlock)
- Gilehriyaan → Gallery (memories)
- Kaise Mujhe Tum Mil Gayi → Letter section
- Woh Din → Future Wishes

**Decision:** IntersectionObserver-based section-song switching with autoplay
**Reasoning:**
- On unlock (or load if already past date): auto-play "Happy Birthday" immediately
- As user scrolls, IntersectionObserver watches 4 key sections (hero, gallery, letter, wishes)
- When 40% of a mapped section enters the viewport, the track switches automatically
- If user manually pauses, section switching respects that (won't force-resume)
- If browser blocks autoplay (common on mobile), shows "🎵 Tap ▶ to play" prompt and starts on first user interaction
- Manual play/pause/skip still works alongside the auto-switching

---

## Summary of Files Created

| File | Purpose |
|------|---------|
| `index.html` | Single-page app with all sections |
| `style.css` | Complete design system + responsive + accessibility |
| `script.js` | Countdown, confetti, lightbox, music player, gift box, scroll bar |
| `assets/icons/bell-favicon.svg` | Doraemon bell-inspired favicon |
| `assets/photos/photo-01.jpg` … `photo-15.jpg` | 15 renamed photos |
| `assets/audio/` | 4 songs |
