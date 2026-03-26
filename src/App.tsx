import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sceneNodes = gsap.utils.toArray<HTMLElement>('.scene');

    gsap.set(sceneNodes, { autoAlpha: 0 });
    gsap.set(sceneNodes[0], { autoAlpha: 1 });

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-height',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });

    sceneNodes.forEach((scene, index) => {
      const bg = scene.querySelector('.full-bg');
      const text = scene.querySelector('.text-layer');
      const object = scene.querySelector('.object-layer');
      const startTime = index;

      if (index !== 0) {
        mainTl.fromTo(
          scene,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5 },
          startTime,
        );
      }

      if (bg) {
        mainTl
          .fromTo(
            bg,
            { scale: 1.5, filter: 'blur(20px)' },
            { scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'none' },
            startTime,
          )
          .to(
            bg,
            { scale: 1.3, filter: 'blur(20px)', duration: 0.8, ease: 'none' },
            startTime + 0.8,
          );
      }

      if (object) {
        mainTl.fromTo(
          object,
          { yPercent: 100, scale: 0.5 },
          { yPercent: -100, scale: 1.4, duration: 1.6, ease: 'none' },
          startTime,
        );
      }

      if (text) {
        const fromY = index === 0 ? 0 : 60;
        mainTl.fromTo(
          text,
          { yPercent: fromY },
          { yPercent: -60, duration: 1.6, ease: 'none' },
          startTime,
        );
      }

      if (index !== sceneNodes.length - 1) {
        mainTl.to(scene, { autoAlpha: 0, duration: 0.5 }, startTime + 1.1);
      }
    });
  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="slider-app">
      <div id="viewport">

        {/* ─── 1. HERO ─── */}
        <section className="scene" id="hero">
          <div
            className="layer full-bg"
            style={{ backgroundImage: 'url(/img/bg-4.png)' }}
          />
          <div className="layer text-layer">
            <div className="scene-kicker">Programa</div>
            <h2>
              Ebánico
              <br />
              <span>Formación clínica real</span>
            </h2>
            <p>Maestría en Estética Clínica</p>
          </div>
          <div className="layer object-layer">
            <div className="scene-asset-wrap">
              <img src="/img/seccion-1.png" className="asset-sc1-main" alt="" />
            </div>
          </div>
        </section>

        {/* ─── 2. THE PROBLEM ─── */}
        <section className="scene" id="problem">
          <div
            className="layer full-bg"
            style={{ backgroundImage: 'url(/img/bg-1.png)' }}
          />
          <div className="layer text-layer">
            <h2>
              Has estudiado
              <br />
              <span>teoría que luego no aplicas</span>
            </h2>
            <p>
              Sabes infiltrar, pero no tienes claro cuándo, por qué ni para
              quién.
            </p>
            <div className="quotes-stack">
              <blockquote>
                "Consigues empezar y sientes que improvisas."
              </blockquote>
              <blockquote>
                "Tengo el título, pero ¿por dónde empiezo?"
              </blockquote>
              <blockquote>
                "Precios sin criterio. Dudas en la elección del mejor
                tratamiento. Pacientes sin miradas a futuro."
              </blockquote>
            </div>
          </div>
          <div className="layer object-layer">
            <div className="scene-asset-wrap">
              <img
                src="/img/seccion-2-2.png"
                className="asset-sc2-top"
                alt=""
              />
              <img
                src="/img/seccion-2-1.png"
                className="asset-sc2-bottom"
                alt=""
              />
            </div>
          </div>
        </section>

        {/* ─── 3. THE SOLUTION ─── */}
        <section className="scene" id="bridge">
          <div
            className="layer full-bg"
            style={{ backgroundImage: 'url(/img/bg-2.png)' }}
          />
          <div className="layer text-layer">
            <h2>
              Este programa
              <br />
              <span>cierra esa brecha</span>
            </h2>
            <p>
              Una inmersión completa dentro de una clínica real, donde aprenderás
              cómo se trabaja de verdad. Paciente, tratamiento y gestión forman
              parte del mismo proceso.
            </p>
            <p className="accent-line">
              Sales preparado para trabajar, no para seguir formándote.
            </p>
          </div>
          <div className="layer object-layer">
            <div className="scene-asset-wrap">
              <img
                src="/img/seccion-3.png"
                className="asset-sc3-main"
                alt=""
              />
            </div>
          </div>
        </section>

        {/* ─── 4. THREE PILLARS ─── */}
        <section className="scene" id="pillars">
          <div
            className="layer full-bg"
            style={{ backgroundImage: 'url(/img/bg-3.png)' }}
          />
          <div className="layer text-layer pillars-text">
            <div className="scene-kicker">Nuestro objetivo</div>
            <div className="pillars-grid">
              <div className="pillar">
                <span className="pillar-num">01</span>
                <h3>Piensa como un clínico</h3>
                <p>
                  Analizar pacientes reales desde cero. Saber cuándo tratar… y
                  cuándo no. Evitar sobretratamientos. Que los pacientes te
                  elijan para cuidarse y envejecer contigo.
                </p>
              </div>
              <div className="pillar">
                <span className="pillar-num">02</span>
                <h3>Diseña tratamientos con sentido</h3>
                <p>
                  Planes a corto, medio y largo plazo. Combinación real de
                  técnicas. Cómo hacer entender al paciente el proceso.
                </p>
              </div>
              <div className="pillar">
                <span className="pillar-num">03</span>
                <h3>Trabaja en una clínica real</h3>
                <p>
                  Cómo se recibe a un paciente. Cómo se plantea un presupuesto.
                  Cómo se estructura un tratamiento completo. Gestión económica,
                  licencias y organización.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. WHO + CTA ─── */}
        <section className="scene" id="cta">
          <div
            className="layer full-bg"
            style={{ backgroundImage: 'url(/img/bg-4.png)' }}
          />
          <div className="layer text-layer">
            <div className="scene-kicker">¿Es para ti?</div>
            <h2>
              Para profesionales
              <br />
              <span>que quieren más</span>
            </h2>
            <div className="who-list">
              <p>Sienten que les falta seguridad en consulta</p>
              <p>No quieren seguir improvisando</p>
              <p>Quieren trabajar con criterio</p>
              <p>
                Entienden que la estética es un todo en sí misma y no la suma de
                sus partes por separado
              </p>
            </div>
          </div>
          <div className="layer object-layer">
            <div className="scene-asset-wrap">
              <img
                src="/img/seccion-4-2.png"
                className="asset-sc4-top"
                alt=""
              />
              <img
                src="/img/seccion-4-1.png"
                className="asset-sc4-bottom"
                alt=""
              />
            </div>
          </div>
        </section>
      </div>

      <div className="scroll-height" />
    </div>
  );
}
