import React, { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmokeEffect from './components/SmokeEffect';

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  {
    id: 'hero',
    bg: '/img/bg-4.png',
    kicker: 'PROGRAMA',
    titleTop: 'Formación',
    titleBottom: 'clínica real',
    desc: 'Maestría en Estética Clínica dentro de una clínica real.',
    obj: '/img/seccion-1.png',
    objClass: 'obj-hero',
  },
  {
    id: 'problem',
    bg: '/img/bg-1.png',
    kicker: 'EL PROBLEMA',
    titleTop: 'has estudiado',
    titleBottom: 'teoría que no aplicas',
    desc: 'Sabes infiltrar, pero no tienes claro cuándo, por qué ni para quién. Consigues empezar y sientes que improvisas.',
    obj: '/img/seccion-2-2.png',
    objClass: 'obj-problem',
  },
  {
    id: 'bridge',
    bg: '/img/bg-2.png',
    kicker: 'LA SOLUCIÓN',
    titleTop: 'este programa',
    titleBottom: 'cierra la brecha',
    desc: 'Una inmersión completa en una clínica real. Paciente, tratamiento y gestión forman parte del mismo proceso.',
    obj: '/img/seccion-3.png',
    objClass: 'obj-bridge',
  },
  {
    id: 'pillars',
    bg: '/img/bg-3.png',
    kicker: 'NUESTRO OBJETIVO',
    titleTop: 'piensa, diseña',
    titleBottom: 'y trabaja',
    desc: 'Piensa como un clínico. Diseña tratamientos con sentido. Trabaja en una clínica real desde el primer día.',
    obj: '/img/seccion-4-2.png',
    objClass: 'obj-pillars',
  },
  {
    id: 'cta',
    bg: '/img/bg-4.png',
    kicker: '¿ES PARA TI?',
    titleTop: 'para quienes',
    titleBottom: 'quieren más',
    desc: 'Para profesionales que sienten que les falta seguridad, que no quieren seguir improvisando y quieren trabajar con criterio.',
    obj: '/img/seccion-4-1.png',
    objClass: 'obj-cta',
  },
];

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const sceneEls = gsap.utils.toArray<HTMLElement>('.scene');
    const total = sceneEls.length;

    gsap.set(sceneEls, { autoAlpha: 0 });
    gsap.set(sceneEls[0], { autoAlpha: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-height',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          const idx = Math.min(
            total - 1,
            Math.floor(self.progress * total),
          );
          setActiveIndex(idx);
        },
      },
    });

    sceneEls.forEach((scene, i) => {
      const bg = scene.querySelector('.full-bg') as HTMLElement;
      const text = scene.querySelector('.text-layer') as HTMLElement;
      const objWrapper = scene.querySelector('.scene-obj-wrapper') as HTMLElement;
      const t = i; // scene start time

      // ── Fade in (skip first) ──
      if (i > 0) {
        tl.fromTo(scene, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, t);
      }

      // ── Background: zoom in from 1.4 → 1, then zoom out ──
      if (bg) {
        tl.fromTo(
          bg,
          { scale: 1.4, filter: 'blur(16px)' },
          { scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
          t,
        ).to(
          bg,
          { scale: 1.15, filter: 'blur(12px)', duration: 0.6, ease: 'none' },
          t + 0.9,
        );
      }

      // ── Text: enter from bottom with stagger ──
      if (text) {
        const fromY = i === 0 ? 0 : 40;
        tl.fromTo(
          text,
          { yPercent: fromY, autoAlpha: i === 0 ? 1 : 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
          t + 0.1,
        ).to(
          text,
          { yPercent: -30, autoAlpha: 0, duration: 0.5, ease: 'power2.in' },
          t + 1,
        );
      }

      // ── Object: enter with delay, parallax float ──
      if (objWrapper) {
        if (i === 0) {
          // Hero object: fully visible on initial load
          tl.to(
            objWrapper,
            { yPercent: -40, scale: 1.1, autoAlpha: 0, duration: 0.6, ease: 'none' },
            t + 0.9,
          );
        } else {
          // Other scenes: animate in
          tl.fromTo(
            objWrapper,
            { yPercent: 60, scale: 0.7, autoAlpha: 0 },
            { yPercent: 0, scale: 1, autoAlpha: 1, duration: 0.6, ease: 'power2.out' },
            t + 0.15,
          ).to(
            objWrapper,
            { yPercent: -40, scale: 1.1, autoAlpha: 0, duration: 0.6, ease: 'none' },
            t + 0.9,
          );
        }
      }

      // ── Fade out (skip last) ──
      if (i < total - 1) {
        tl.to(scene, { autoAlpha: 0, duration: 0.3 }, t + 1.3);
      }
    });
  }, { scope: mainRef });

  const scrollToScene = useCallback((dir: 'up' | 'down') => {
    const total = SCENES.length;
    const next = dir === 'down'
      ? Math.min(activeIndex + 1, total - 1)
      : Math.max(activeIndex - 1, 0);
    const scrollTarget = (next / total) * document.querySelector('.scroll-height')!.scrollHeight;
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
  }, [activeIndex]);

  return (
    <div ref={mainRef} className="slider-app">
      {/* ── Fixed Top Menu ── */}
      <header className="slider-header">
        <div className="header-logo">EBÁNICO</div>
        <nav className="header-nav">
          <a href="#">Programa</a>
          <a href="#">Metodología</a>
          <a href="#" className="nav-cta">Solicitar admisión</a>
        </nav>
      </header>

      <div id="viewport">
        {SCENES.map((sc, i) => (
          <section key={sc.id} className="scene" id={sc.id}>
            <div
              className="layer full-bg"
              style={{ backgroundImage: `url(${sc.bg})` }}
            />
            <div className="layer text-layer">
              <span className="scene-kicker">{sc.kicker}</span>
              <h2>
                {sc.titleTop}
                <br />
                <em>{sc.titleBottom}</em>
              </h2>
              <p className="scene-desc">{sc.desc}</p>
            </div>
            <div className="layer object-layer">
              <div className={`scene-obj-wrapper ${sc.objClass}`}>
                <img src={sc.obj} className="scene-obj" alt="" />
              </div>
            </div>
          </section>
        ))}

        {/* ── Bottom Bar ── */}
        <div className="slide-bar">
          <span className="slide-counter">
            {String(activeIndex + 1).padStart(2, '0')}-
            {String(SCENES.length).padStart(2, '0')}
          </span>
          <div className="slide-nav">
            <button onClick={() => scrollToScene('up')} aria-label="Previous">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
            <button onClick={() => scrollToScene('down')} aria-label="Next">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="scroll-height" />
    </div>
  );
}
