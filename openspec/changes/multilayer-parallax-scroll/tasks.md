## 1. Assets Generation

- [x] 1.1 Generate multi-layer background images (sky, back mountains, mid mountains, front mountains) matching Montfort colors.

## 2. Structure Component Refactoring

- [x] 2.1 Refactor `index.html` structure from discrete 100vh sections into a unified sticky wrapper with an extended `500vh` body height.
- [x] 2.2 Rebuild the background layers using the new absolute-positioned image layers inside the sticky container.
- [x] 2.3 Position content blocks (Trading, Capital, etc.) in the center of the screen, initially hidden.

## 3. ScrollTrigger Implementation

- [x] 3.1 Initialize a main GSAP ScrollTrigger timeline linked to the full page scroll progress.
- [x] 3.2 Add translation tweens (`x` and `y`) for each background layer across the timeline to create the slow-panning horizon effect.
- [x] 3.3 Sequence the `opacity` and `transform` tweens for the text content blocks so they fade in and out at specific scroll percentages.

## 4. Verification

- [x] 4.1 Verify seamless horizontal parallax scrolling without hard cuts on desktop.
- [x] 4.2 Measure animation performance and apply `will-change: transform` where necessary.
