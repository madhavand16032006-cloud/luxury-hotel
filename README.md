# BR Velluto

Scroll-storytelling website for the BR Velluto Italian café.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · GSAP + ScrollTrigger · Lenis

## Run

```bash
npm install
npm run dev
```

## Structure

```
app/                 routes, layout, global styles
components/
  hero/              cinematic hero
  editorial/         scroll-scrubbed manifesto
  products/          product chapters with parallax
  ingredients/       glass cards with scroll rotation
  providers/         Lenis + GSAP ticker sync
lib/                 GSAP registration, fonts, product data
public/
  videos/cafe.mp4    hero loop (muted, optimized, see below)
  images/            product and interior photography
```

Animation ownership: GSAP ScrollTrigger handles pinned and scrubbed storytelling (`Manifesto`). Motion handles UI and entrance animations. Lenis drives smooth scrolling and is ticked by GSAP's ticker so the loops never conflict.

## Adding assets

Hero video: export a web version from your master file, then place it at `public/videos/cafe.mp4`:

```bash
ffmpeg -i cafe_master.mp4 -vf "scale=1920:-2" -c:v libx264 -crf 24 \
  -preset slow -pix_fmt yuv420p -an -movflags +faststart public/videos/cafe.mp4
ffmpeg -i cafe_master.mp4 -ss 00:00:02 -vframes 1 -q:v 2 public/images/cafe-poster.jpg
```

Product photos: add `espresso.jpg`, `cappuccino.jpg`, `tiramisu.jpg`, `pastry.jpg` to `public/images/`, then replace the gradient placeholder in `ProductShowcase.tsx` with `next/image`.

## Next steps

- Replace the placeholder gradients with photography.
- Add an interior/atmosphere section and a visit/hours block.
- Add a custom cursor (Motion `useMotionValue` with spring) on desktop only.
- Verify reduced-motion behavior and run Lighthouse on mobile before launch.
