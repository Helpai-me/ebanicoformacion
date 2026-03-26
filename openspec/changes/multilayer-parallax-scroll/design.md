## Context
The Montfort website currently uses standard, discrete section-based transitions (slides). The user requested a substantial uplift to a completely seamless, story-driven parallax experience inspired by the "Horizon" parallax effect. The main requirement is a fluid continuous journey where there are **no hard section changes** or background swaps. Instead, the user "travels" through a continuous 3D landscape, and the core content (Trading, Capital, Maritime, Energy) reveals itself organically along the path.

## Goals / Non-Goals

**Goals:**
- Implement a unified master scroll timeline using GSAP ScrollTrigger.
- Create a continuous panning/traveling illusion using separate layers moving at varying speeds.
- Seamlessly fade and translate Montfort's text content in and out as the user reaches specific points in the scroll track.
- Maintain high performance (60fps+) despite the heavy visual layer manipulation.

**Non-Goals:**
- Snap-scrolling or locked full-screen slides.
- Hard cuts or abrupt background image changes between divisions.

## Decisions

- **Single Sticky Container Architecture**: Instead of normal document flow, we will use a `position: sticky` or `fixed` wrapper for the visuals (`100vh`), while the `body` height is set to `500vh+` to create a scroll track.
- **ScrollTrigger Scrub**: GSAP's `ScrollTrigger` will map the track's scroll progress (0 to 1) directly to a master timeline.
- **Layer Translation (Horizon Effect)**: 
    - Sky/Sun: Moves extremely slowly (data-speed low).
    - Distant mountains: Move slowly horizontally.
    - Foreground elements: Move rapidly horizontally across the screen.
    - This creates a majestic sweeping camera pan across a vast landscape.
- **Content Sequencing**: Text blocks for Trading, Capital, Maritime, and Energy will be positioned absolutely in the center of the screen. The GSAP timeline will sequence their `opacity` and `y` transforms to appear, pause, and disappear sequentially as the landscape rolls by behind them.
- **Custom Assets**: We will generate and export custom foreground, midground, and background mountain layers using the `generate_image` or SVG tools to fit the Montfort brand (dark blues, greys).

## Risks / Trade-offs

- **[Risk] Scrolling Performance & Paint Lag** → *Mitigation*: We will strictly animate only `transform` and `opacity`. We will apply `will-change: transform` and `transform: translateZ(0)` (hardware acceleration) to all large moving layers. Avoid CSS `filter` animations on heavy layers.
- **[Risk] Mobile Experience** → *Mitigation*: The parallax horizontal translation will be scaled down based on viewport width to ensure the layers don't pan out of frame too quickly on narrow screens.
