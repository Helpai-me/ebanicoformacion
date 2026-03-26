## ADDED Requirements

### Requirement: Continuous Scrolling Canvas
The application MUST implement a single continuous scrolling canvas that tracks the user's progress through an elongated vertical height (e.g., `<body style="height: 500vh">`) instead of using individual 100vh sections.

#### Scenario: User starts scrolling
- **WHEN** the user scrolls down from the top of the page
- **THEN** the main visual container remains fixed to the viewport while the internal GSAP timeline progresses forward.

### Requirement: Multilayer Parallax Translation (Horizon Effect)
The system MUST render multiple separate background layers (e.g., sky, back mountains, mid mountains, foreground) that translate horizontally across the screen at varying speeds driven by the scroll progress.

#### Scenario: Fast foreground movement
- **WHEN** the user scrolls down
- **THEN** the foreground mountain layer moves rapidly to the left, creating the illusion of proximity.

#### Scenario: Slow background movement
- **WHEN** the user scrolls down
- **THEN** the distant mountain layer moves slowly to the left, creating the illusion of distance.

### Requirement: Seamless Story Content Reveal
The system MUST reveal the company's content sections (Trading, Capital, Maritime, Energy) asynchronously in response to the scroll timeline progress, without swapping background textures forcefully.

#### Scenario: Reaching a content waypoint
- **WHEN** the scroll progress reaches a specific percentage (e.g., 20%)
- **THEN** the "Trading" text block fades in smoothly over the moving landscape.

#### Scenario: Leaving a content waypoint
- **WHEN** the user scrolls past the waypoint percentage
- **THEN** the text block fades out, leaving only the landscape until the next content block triggers.
