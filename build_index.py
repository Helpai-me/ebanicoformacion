import re

with open("public/montfort/index.html", "r") as f:
    text = f.read()

head_match = re.search(r'(<head>.*?</head>)', text, re.DOTALL)
header_match = re.search(r'(<header.*?/header>)', text, re.DOTALL)
menu_match = re.search(r'(<div id="menuOverlay">.*?</div>\n\n<!-- HEADER -->)', text, re.DOTALL)
footer_match = re.search(r'(<footer.*?</footer>)', text, re.DOTALL)

head = head_match.group(1) if head_match else ""
header = header_match.group(1) if header_match else ""
menu = menu_match.group(1).replace("<!-- HEADER -->", "") if menu_match else ""
footer = footer_match.group(1) if footer_match else ""

# Insert new styles
new_styles = """
    /* ===== SCROLL-TRACK ===== */
    body { background: #0d1c2b; overflow-x: hidden; }
    #scroll-track {
      height: 600vh; /* 6 full screens of scroll */
      position: relative;
    }
    #sticky-container {
      position: sticky;
      top: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background: #0d1c2b;
    }

    #parallax-wrapper {
      position: absolute;
      top: 0; left: 0;
      width: 400vw;
      height: 100vh;
      will-change: transform;
    }

    .horizon-layer {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      will-change: transform;
    }

    .horizon-layer svg {
      width: 400vw;
      height: 100vh;
      display: block;
    }

    /* Content Panels */
    .panel {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 100%; max-width: 800px;
      padding: 0 40px;
      text-align: center;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      z-index: 50;
      will-change: transform, opacity;
    }
    .panel.active { pointer-events: auto; visibility: visible; }

    #panel-hero { opacity: 1; visibility: visible; pointer-events: auto; }
"""

head = head.replace("</style>", new_styles + "\n</style>")

# SVG definitions + 4x repeats for layers
svg_defs = """
  <!-- HORIZON PARALLAX BACKGROUNDS -->
  <div id="parallax-wrapper">
    <!-- Sky -->
    <div class="horizon-layer" id="h-layer-bg" data-speed="0.1">
      <svg viewBox="0 0 5760 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8fb3cc"/><stop offset="35%" stop-color="#b5d0e3"/><stop offset="70%" stop-color="#ccdde9"/><stop offset="100%" stop-color="#d8e9f2"/></linearGradient>
        </defs>
        <rect width="5760" height="900" fill="url(#skyGrad)"/>
      </svg>
    </div>

    <!-- Far mountains -->
    <div class="horizon-layer" id="h-layer-m1" data-speed="0.2">
      <svg viewBox="0 0 5760 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="m1g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8fafc9"/><stop offset="100%" stop-color="#a8c4d8"/></linearGradient>
          <g id="m1_obj">
            <path d="M-100,900 L-100,560 L80,440 L200,520 L340,390 L460,480 L580,350 L680,430 L780,310 L880,415 L960,300 L1050,380 L1140,260 L1240,370 L1350,240 L1440,330 L1440,900 Z" fill="url(#m1g)" opacity="0.6"/>
            <path d="M780,310 L800,330 L820,315 L840,340 L780,310Z" fill="rgba(230,240,248,0.6)"/><path d="M1140,260 L1160,285 L1180,268 L1200,290 L1140,260Z" fill="rgba(230,240,248,0.5)"/><path d="M340,390 L360,410 L380,395 L340,390Z" fill="rgba(230,240,248,0.5)"/>
          </g>
        </defs>
        <use href="#m1_obj" x="0"/><use href="#m1_obj" x="1440"/><use href="#m1_obj" x="2880"/><use href="#m1_obj" x="4320"/>
      </svg>
    </div>

    <!-- Mid mountains -->
    <div class="horizon-layer" id="h-layer-m2" data-speed="0.4">
      <svg viewBox="0 0 5760 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
           <linearGradient id="m2g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5c839e"/><stop offset="100%" stop-color="#7aa0b8"/></linearGradient>
           <g id="m2_obj">
             <path d="M-100,900 L-100,600 L60,520 L180,570 L320,460 L440,540 L580,400 L700,490 L840,360 L960,450 L1080,320 L1180,410 L1300,280 L1420,380 L1540,260 L1440,900 Z" fill="url(#m2g)" opacity="0.82"/>
             <path d="M580,400 L610,430 L640,408 L660,438 L580,400Z" fill="rgba(220,235,248,0.7)"/><path d="M1080,320 L1105,348 L1130,328 L1155,356 L1080,320Z" fill="rgba(220,235,248,0.7)"/><path d="M840,360 L868,390 L892,372 L840,360Z" fill="rgba(220,235,248,0.6)"/>
           </g>
        </defs>
        <use href="#m2_obj" x="0"/><use href="#m2_obj" x="1440"/><use href="#m2_obj" x="2880"/><use href="#m2_obj" x="4320"/>
      </svg>
    </div>

    <!-- Foreground mountains -->
    <div class="horizon-layer" id="h-layer-m5" data-speed="0.75">
      <svg viewBox="0 0 5760 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
           <linearGradient id="m5g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#243d52"/><stop offset="100%" stop-color="#2e526a"/></linearGradient>
           <g id="m5_obj">
             <path d="M-100,900 L-100,750 L100,640 L280,730 L420,600 L560,720 L1440,900 Z" fill="url(#m5g)" opacity="0.9"/>
             <path d="M560,720 L700,580 L840,700 L1000,550 L1150,680 L1300,530 L1440,660 L1440,900 L-100,900 Z" fill="url(#m5g)" opacity="0.85"/>
             <path d="M420,600 L455,640 L490,615 L525,650 L420,600Z" fill="rgba(235,245,255,0.8)"/><path d="M1000,550 L1035,588 L1068,568 L1000,550Z" fill="rgba(235,245,255,0.75)"/>
           </g>
        </defs>
        <use href="#m5_obj" x="0"/><use href="#m5_obj" x="1440"/><use href="#m5_obj" x="2880"/><use href="#m5_obj" x="4320"/>
      </svg>
    </div>
  </div>
"""

panels = """
    <div class="panel" id="panel-hero">
      <span class="hero-eyebrow">The Montfort Group</span>
      <span class="hero-wordmark">MONTFORT</span>
      <div class="scroll-hint" style="position:relative; margin-top:20px; justify-content:center; bottom:auto; left:auto;">
        <span>Scroll Down to Discover</span>
        <div class="scroll-line"></div>
      </div>
    </div>
    <div class="panel" id="panel-intro">
      <h2 class="intro-headline" style="color:var(--blue-light);">Montfort is a global commodity trading and asset investment company.</h2>
      <p class="intro-body" style="color:#d0d0d0; margin-top:20px;">We trade, refine, store, and transport energy and commodities. We also invest in related assets to create long-term value.</p>
    </div>
    <div class="panel" id="panel-trading">
      <div class="div-num" style="margin:0 auto 28px;"><span>1</span></div>
      <p class="div-label">Montfort Trading</p>
      <h2 class="div-title" style="margin:0 auto;">Operating Efficiently by Leading with Innovation.</h2>
    </div>
    <div class="panel" id="panel-capital">
      <div class="div-num" style="margin:0 auto 28px;"><span>2</span></div>
      <p class="div-label">Montfort Capital</p>
      <h2 class="div-title" style="margin:0 auto;">Investing in Opportunities Across the Energy Spectrum.</h2>
    </div>
    <div class="panel" id="panel-maritime">
      <div class="div-num" style="margin:0 auto 28px;"><span>3</span></div>
      <p class="div-label">Montfort Maritime</p>
      <h2 class="div-title" style="margin:0 auto;">Connecting Markets Through Efficient Logistics Solutions.</h2>
    </div>
    <div class="panel" id="panel-energy">
      <div class="div-num" style="margin:0 auto 28px;"><span>4</span></div>
      <p class="div-label">Fort Energy</p>
      <h2 class="div-title" style="margin:0 auto;">Powering the Future Through Sustainable Energy Solutions.</h2>
    </div>
"""

scripts = """
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
  gsap.registerPlugin(ScrollTrigger);

  // Setup GSAP master timeline linked to scroll
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#scroll-track",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
    }
  });

  // 1. Move Background Layers
  const layers = document.querySelectorAll('.horizon-layer');
  layers.forEach(layer => {
    const speed = parseFloat(layer.dataset.speed || 0.5);
    // Move to the left by -300vw based on speed
    tl.to(layer, { x: `-${300 * speed}vw`, ease: "none" }, 0);
  });

  // 2. Sequence Panels (Start at 0, end at 1 duration relative sequence)
  // Panel Hero (0% - 10%)
  tl.to("#panel-hero", { opacity: 0, y: -50, duration: 0.1 }, 0);
  
  // Panel Intro (15% - 25%)
  tl.fromTo("#panel-intro", { opacity: 0, y: 50, visibility: 'hidden' }, { opacity: 1, y: 0, visibility: 'visible', duration: 0.05 }, 0.15);
  tl.to("#panel-intro", { opacity: 0, y: -50, duration: 0.05 }, 0.25);

  // Panel Trading (30% - 40%)
  tl.fromTo("#panel-trading", { opacity: 0, scale: 0.9, visibility: 'hidden' }, { opacity: 1, scale: 1, visibility: 'visible', duration: 0.05 }, 0.3);
  tl.to("#panel-trading", { opacity: 0, scale: 1.1, duration: 0.05 }, 0.4);

  // Panel Capital (45% - 55%)
  tl.fromTo("#panel-capital", { opacity: 0, scale: 0.9, visibility: 'hidden' }, { opacity: 1, scale: 1, visibility: 'visible', duration: 0.05 }, 0.45);
  tl.to("#panel-capital", { opacity: 0, scale: 1.1, duration: 0.05 }, 0.55);

  // Panel Maritime (60% - 70%)
  tl.fromTo("#panel-maritime", { opacity: 0, scale: 0.9, visibility: 'hidden' }, { opacity: 1, scale: 1, visibility: 'visible', duration: 0.05 }, 0.6);
  tl.to("#panel-maritime", { opacity: 0, scale: 1.1, duration: 0.05 }, 0.7);

  // Panel Energy (75% - 85%)
  tl.fromTo("#panel-energy", { opacity: 0, scale: 0.9, visibility: 'hidden' }, { opacity: 1, scale: 1, visibility: 'visible', duration: 0.05 }, 0.75);
  tl.to("#panel-energy", { opacity: 0, scale: 1.1, duration: 0.05 }, 0.85);

  // Footer reveal wrapper (90% - 100%)
  const footerWrap = document.querySelector('.footer-fade');
  if(footerWrap) {
    tl.fromTo(footerWrap, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.9);
  }

  // Active Nav
  window.addEventListener('scroll', () => {
     // Optional: Map scroll progress to nav links
  });

  // Overlay Menu Logic
  const overlay = document.getElementById('menuOverlay');
  const menuTrigger = document.getElementById('menuTrigger');
  const menuClose = document.getElementById('menuClose');
  if(menuTrigger) menuTrigger.addEventListener('click', () => { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; });
  if(menuClose) {
      const closeMenu = () => { overlay.classList.remove('open'); document.body.style.overflow = ''; };
      menuClose.addEventListener('click', closeMenu);
      overlay.addEventListener('click', e => { if(e.target === overlay) closeMenu(); });
      document.querySelectorAll('#menuOverlay a').forEach(a => a.addEventListener('click', closeMenu));
  }
</script>
"""

final_html = f"""<!DOCTYPE html>
<html lang="en">
{head}
<body>
{menu}
{header}

<div id="scroll-track">
  <div id="sticky-container">
    {svg_defs}
    {panels}
    
    <div class="panel footer-fade" id="panel-footer" style="top:auto; bottom:0; left:0; transform:none; max-width:100%; padding:0;">
      {footer}
    </div>
  </div>
</div>

{scripts}
</body>
</html>
"""

with open("public/montfort/index2.html", "w") as fw:
    fw.write(final_html)
