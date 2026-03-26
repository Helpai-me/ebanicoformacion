## Why
The current Montfort website uses standard section-based scrolling with distinct slides. To elevate the brand experience to a truly premium level, we need a seamless, fluid storytelling experience without hard section breaks (inspired by high-end parallax sites like the Horizon effect). This immerses the user in the "Montfort story" through a continuous, multilayered 3D environment rather than a traditional slideshow.

## What Changes
- **Completely fluid scroll journey**: Removing hard visual stops and background swaps between the main divisions (Trading, Capital, Maritime, Energy).
- **Multilayer Parallax Environment**: Generating bespoke, separated image layers (e.g., sky, distant mountains, mid-ground, foreground) that move at varying speeds based on scroll progress to create continuous continuous depth.
- **Story-driven Content Reveal**: The camera will "pan" through a vast, continuous landscape where Montfort's divisions are seamlessly introduced as waypoints in the scroll journey.
- **Custom Image Assets**: Generating new multilayered landscape assets tailored to the Montfort color palette (blues, greys, whites) to replace the flat Unsplash photographs.

## Capabilities

### New Capabilities
- `seamless-parallax-journey`: A new architecture supporting a single continuous GSAP ScrollTrigger timeline with deeply layered parallax elements mapped to scroll progress.

### Modified Capabilities
- `homepage-layout`: Existing layout structure will be converted from independent `100vh` stacked sections to a single expansive scrolling canvas.

## Impact
- **HTML/CSS Structure**: Requires a rewrite of `index.html` structure to support fixed viewports with moving absolute-positioned scenery rather than normal document flow.
- **JavaScript**: Heavy reliance on advanced GSAP ScrollTrigger scrubbing and timelines to sync layer movements with typography reveals.
- **Assets**: Replaces existing background background images with a custom set of transparent PNG/WebP layers specifically designed to overlap and parallax.
