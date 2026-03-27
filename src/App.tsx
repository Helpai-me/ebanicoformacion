import React, { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmokeEffect from './components/SmokeEffect';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

interface SceneConfig {
  id: string;
  bg?: string;
  bgClass?: string;
  kicker: string;
  titleTop: string;
  titleBottom: string;
  desc: string | React.ReactNode;
  obj?: string;
  objClass: string;
  objFromX?: number; // Start offset from right (positive) or left (negative)
  secondaryObj?: string;
  secondaryObjClass?: string;
  secondaryObjFromX?: number; // Start offset from left (negative) or right (positive)
  secondaryObjFromY?: number;
}

type LegalModalKey = 'privacy' | 'cookies' | 'legal';

const LEGAL_CONTENT: Record<LegalModalKey, { title: string; sections: Array<{ heading: string; body: React.ReactNode }> }> = {
  privacy: {
    title: 'Política de privacidad',
    sections: [
      { heading: 'Responsable del tratamiento', body: 'Programa Ebánico actúa como responsable del tratamiento de los datos enviados a través del formulario de contacto.' },
      { heading: 'Finalidad', body: 'Los datos se utilizan para atender solicitudes de información, gestionar el contacto con personas interesadas en la formación y, cuando exista base legítima, realizar seguimiento relacionado con el programa.' },
      { heading: 'Base jurídica', body: 'La base jurídica es el consentimiento prestado al remitir el formulario y, en su caso, la aplicación de medidas precontractuales solicitadas por la persona interesada.' },
      { heading: 'Conservación', body: 'Los datos se conservarán durante el tiempo necesario para responder a la solicitud y durante los plazos legales aplicables.' },
      { heading: 'Derechos', body: 'La persona interesada puede solicitar acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, así como presentar una reclamación ante la Agencia Española de Protección de Datos.' },
      { heading: 'Referencia normativa', body: 'Texto redactado conforme al Reglamento (UE) 2016/679 y a la Ley Orgánica 3/2018, siguiendo criterios generales de transparencia de la AEPD.' },
    ],
  },
  cookies: {
    title: 'Política de cookies',
    sections: [
      { heading: 'Qué son las cookies', body: 'Las cookies son pequeños archivos que se descargan en el dispositivo al acceder a determinadas páginas web y permiten recordar información sobre la navegación.' },
      { heading: 'Tipos de cookies', body: 'Este sitio puede utilizar cookies técnicas necesarias para el funcionamiento básico y, en su caso, cookies analíticas o de personalización si se habilitan con consentimiento válido.' },
      { heading: 'Consentimiento y configuración', body: 'Las cookies no técnicas solo deben instalarse con consentimiento. La persona usuaria puede modificar su configuración desde el navegador o desde el panel de gestión de cookies si se incorpora al sitio.' },
      { heading: 'Terceros', body: 'Si se integran servicios de terceros, sus cookies y tratamientos estarán sujetos a sus propias políticas.' },
      { heading: 'Referencia oficial', body: 'Texto alineado con la Guía sobre el uso de cookies de la AEPD y los criterios del RGPD sobre transparencia y consentimiento.' },
    ],
  },
  legal: {
    title: 'Aviso legal',
    sections: [
      { heading: 'Titularidad', body: 'Este sitio es un espacio informativo del Programa Ebánico. Los datos identificativos completos del titular deberán incorporarse antes de la publicación definitiva.' },
      { heading: 'Uso del sitio', body: 'La persona usuaria se compromete a utilizar este sitio de conformidad con la ley, la buena fe y el orden público, evitando usos ilícitos o lesivos.' },
      { heading: 'Propiedad intelectual', body: 'Los textos, diseños, marcas, imágenes y demás contenidos del sitio están protegidos por la normativa de propiedad intelectual e industrial.' },
      { heading: 'Responsabilidad', body: 'Programa Ebánico no garantiza la disponibilidad permanente del sitio ni responde de incidencias técnicas ajenas a su control o del uso indebido realizado por terceros.' },
      { heading: 'Legislación aplicable', body: 'Este sitio se rige por la legislación española, sin perjuicio de la normativa específica de protección de consumidores y usuarios que resulte aplicable.' },
    ],
  },
};

const FAQS = [
  {
    value: 'faq-1',
    question: '¿Para quién es este programa?',
    answer: (
      <div className="faq-answer-rich">
        <p>Este programa es para profesionales que:</p>
        <ul className="faq-answer-list">
          <li>Sienten que les falta seguridad en consulta.</li>
          <li>No quieren seguir improvisando.</li>
          <li>Quieren trabajar con criterio.</li>
          <li>Entienden que la estética es un todo en sí misma y no la suma de partes separadas.</li>
        </ul>
      </div>
    ),
  },
  {
    value: 'faq-2',
    question: '¿Qué problema viene a resolver?',
    answer: (
      <div className="faq-answer-rich">
        <p>Has estudiado teoría que luego no sabes aplicar. Sabes infiltrar, pero no tienes claro cuándo, por qué ni para quién.</p>
        <p>“Tengo el título, pero ¿por dónde empiezo?” Precios sin criterio, dudas en la elección del mejor tratamiento y pacientes tratados sin mirada a futuro.</p>
        <p>Este programa cierra esa brecha dentro de una clínica real.</p>
      </div>
    ),
  },
  {
    value: 'faq-3',
    question: '¿Qué voy a aprender exactamente?',
    answer: (
      <div className="faq-answer-rich">
        <p>Trabajarás situaciones reales de principio a fin. Entre otras:</p>
        <ul className="faq-answer-list">
          <li>Simularemos una necrosis y actuarás desde que la detectas, cargas la medicación y la administras al paciente, hasta cómo tranquilizarle y cómo actuar en las siguientes horas.</li>
          <li>Recibirás la llamada de un paciente que sufre una complicación al día siguiente y aprenderás a convertir una complicación en confianza.</li>
          <li>Manejarás una crisis de ansiedad real, síncopes, alergias y una parada cardiorrespiratoria.</li>
          <li>Tendrás que decidir entre diferentes tratamientos para un resultado parecido.</li>
          <li>Aprenderás a decir “no” cuando es lo correcto usando cognitive reframing para gestionar expectativas irreales sin perder al paciente.</li>
          <li>Tomarás decisiones sin tener a nadie detrás diciéndote qué hacer.</li>
          <li>Aprenderás cómo actuar cuando el resultado no es el esperado.</li>
          <li>Te entrenamos en técnicas básicas y también complejas con pacientes reales.</li>
          <li>Situaciones reales desde el primer día hasta el último.</li>
        </ul>
      </div>
    ),
  },
  {
    value: 'faq-4',
    question: '¿Cómo está estructurado el programa?',
    answer: (
      <div className="faq-answer-rich">
        <p>Son 6 días de formación clínica real en medicina estética. Una inmersión completa en los entresijos de la estética, donde aprenderás a trabajar y a gestionar una clínica desde cero.</p>
        <p>La idea es organizar, clasificar y archivar en tu mente todo lo que ya sabes, y enriquecerte con lo que aún no.</p>
      </div>
    ),
  },
  {
    value: 'faq-5',
    question: '¿Cuál es el objetivo real del programa?',
    answer: (
      <div className="faq-answer-rich">
        <p>Nuestro objetivo es que:</p>
        <ul className="faq-answer-list">
          <li>Pienses como un clínico y no como un técnico.</li>
          <li>Diseñes tratamientos con sentido a corto, medio y largo plazo.</li>
          <li>Te desenvuelvas en una clínica real como uno más.</li>
        </ul>
      </div>
    ),
  },
  {
    value: 'faq-6',
    question: '¿Con qué salgo al terminar?',
    answer: (
      <div className="faq-answer-rich">
        <p>Finalizas preparad@ para trabajar y seguir formándote por tu cuenta.</p>
        <p>Saldrás con más criterio clínico, más capacidad de decisión, más estructura mental y una visión más completa de cómo se recibe, se valora, se trata y se gestiona un paciente dentro de una clínica real.</p>
      </div>
    ),
  },
];

const SCENES: SceneConfig[] = [
  {
    id: 'hero',
    bg: '/img/bg-hero.png',
    kicker: 'EN EBÁNICO PROPORCIONAMOS',
    titleTop: 'Formación',
    titleBottom: 'clínica real',
    desc: <strong className="hero-highlight">6 días de formación clínica real en medicina estética</strong>,
    obj: '/img/obj-hero.png',
    objClass: 'obj-hero',
    secondaryObj: '/img/nubecilllas.png',
    secondaryObjClass: 'obj-nubecillas',
    secondaryObjFromX: -45,
    secondaryObjFromY: -35,
  },
  {
    id: 'problem',
    bg: '/img/bg-problem.png',
    kicker: 'EL PROBLEMA',
    titleTop: '¿A ti también',
    titleBottom: 'te pasa?',
    desc: (
      <div className="narrative-v2">
        <p className="narrative-body">
          Sabes infiltrar, pero no tienes claro cuándo, por qué ni para quién.
          <span className="narrative-question"> ¿Sientes que improvisas?</span></p>
        <p className="narrative-insight">
          Se estudia la teoría, pero nadie te enseña la práctica
        </p>
      </div>
    ),
    obj: '/img/obj-problem.png',
    objClass: 'obj-problem',
    secondaryObj: '/img/pajaros.png',
    secondaryObjClass: 'obj-birds',
  },
  {
    id: 'situation',
    bg: '/img/bg-situation.png',
    kicker: '¿ESTÁS EN ESTA SITUACIÓN?',
    titleTop: 'Tengo el título',
    titleBottom: '¿Pero por dónde empiezo?',
    desc: 'Precios sin criterio. Dudas en la elección del mejor tratamiento. Pacientes sin miradas a futuro.',
    obj: '/img/obj-situation.png',
    objClass: 'obj-bridge',
    secondaryObj: '/img/pillars.png',
    secondaryObjClass: 'obj-pillars-secondary',
    secondaryObjFromX: -120,
  },
  {
    id: 'bridge',
    bg: '/img/bg-6.png',
    kicker: 'LA SOLUCIÓN QUE TE PROPONEMOS',
    titleTop: 'Este programa',
    titleBottom: 'cierra la brecha',
    desc: 'Es una inmersión completa dentro de una clínica real, donde aprenderás cómo se trabaja de verdad',
    obj: '/img/sillon.png',
    objClass: 'obj-sillon',
    objFromX: 100,
    secondaryObj: '/img/lampara.png',
    secondaryObjClass: 'obj-lampara',
    secondaryObjFromX: -100,
  },
  {
    id: 'pillars',
    bg: '/img/bg-pillars.png',
    kicker: 'NUESTRO OBJETIVO',
    titleTop: 'piensa, diseña',
    titleBottom: 'y trabaja',
    desc: 'Piensa como un clínico. Diseña tratamientos con sentido. Trabaja en una clínica real desde el primer día.',
    objClass: 'obj-none',
    objFromX: -95,
    secondaryObj: '/img/medicos.webp',
    secondaryObjClass: 'obj-medicos',
    secondaryObjFromX: 92,
  },
  {
    id: 'cta',
    bg: '/img/bg-teory.png',
    kicker: 'ES PARA TI SI QUIERES:',
    titleTop: 'Poner la teoría',
    titleBottom: 'en práctica',
    desc: 'Y no sentir que improvisas. Decidir con criterio. Diseñar tratamientos con sentido. Trabajar en una clínica real desde el primer día.',
    obj: '/img/img.webp',
    objClass: 'obj-cta',
    secondaryObj: '/img/enseñando2.webp',
    secondaryObjClass: 'obj-cta-secondary',
    secondaryObjFromX: -85,
    secondaryObjFromY: -42,
  },
  {
    id: 'faq',
    bg: '/img/bg-faqs.png',
    bgClass: 'faq-bg',
    kicker: 'PREGUNTAS FRECUENTES',
    titleTop: 'Tienes dudas?',
    titleBottom: 'te ayudamos a resolverlas',
    desc: (
      <div className="faq-scene-content">
        <p className="faq-intro">
          Si estás valorando entrar en una formación clínica real, estas son las dudas más habituales antes de dar el paso.
        </p>
        <Accordion
          type="multiple"
          className="faq-accordion"
          onWheelCapture={(event) => event.stopPropagation()}
          onTouchMoveCapture={(event) => event.stopPropagation()}
        >
          {FAQS.map((faq) => (
            <AccordionItem key={faq.value} value={faq.value} className="faq-item">
              <AccordionTrigger className="faq-trigger">{faq.question}</AccordionTrigger>
              <AccordionContent className="faq-content">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    ),
    obj: '/img/obj-pillars.png',
    objClass: 'obj-faq',
  },
  {
    id: 'footer',
    bg: '/img/bg-end.png',
    bgClass: 'footer-bg',
    kicker: '',
    titleTop: '',
    titleBottom: '',
    desc: (
      <section className="contact-scene-content">
        <div className="contact-copy">
          <span className="contact-eyebrow">Última sección</span>
          <h3>¿Tienes dudas? <em>Contáctanos</em></h3>
          <div className="contact-list">
            <div className="contact-item">
              <span className="contact-item-label">WhatsApp</span>
              <a href="tel:+34910123456">+34 910 123 456</a>
            </div>
            <div className="contact-item">
              <span className="contact-item-label">Email</span>
              <a href="mailto:hola@programaebanico.com">hola@programaebanico.com</a>
            </div>
          </div>
        </div>
        <form className="contact-form-card">
          <label className="contact-field">
            <span>Nombre completo</span>
            <input type="text" name="name" placeholder="Tu nombre y apellidos" />
          </label>
          <label className="contact-field">
            <span>Email</span>
            <input type="email" name="email" placeholder="tu@email.com" />
          </label>
          <label className="contact-field">
            <span>Teléfono</span>
            <input type="tel" name="phone" placeholder="+34 600 000 000" />
          </label>
          <label className="contact-field">
            <span>¿Por qué quieres hacer este máster?</span>
            <textarea name="motivation" rows={5} placeholder="Cuéntanos brevemente tus motivaciones y objetivos..." />
          </label>
          <button type="submit" className="contact-submit">Enviar</button>
        </form>
      </section>
    ),
    objClass: 'obj-none',
  },
];

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalKey | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const sceneStopsRef = useRef<number[]>([]);

  useEffect(() => {
    let isCancelled = false;
    const minimumLoaderTime = 700;
    const startedAt = Date.now();
    const assetSources = [
      ...SCENES.flatMap((scene) => [scene.bg, scene.obj, scene.secondaryObj]),
      '/img/enseñar3.webp',
      '/img/Smoke-Element.png',
    ].filter((src): src is string => Boolean(src));

    const uniqueSources = [...new Set(assetSources)];
    const preloadImage = (src: string) => new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
    });

    Promise.all(uniqueSources.map(preloadImage)).finally(() => {
      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, minimumLoaderTime - elapsed);

      window.setTimeout(() => {
        if (!isCancelled) {
          setIsInitialLoading(false);
        }
      }, wait);
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  useGSAP(() => {
    const sceneEls = gsap.utils.toArray<HTMLElement>('.scene');
    const total = sceneEls.length;
    const getNearestSceneIndex = (progress: number) => {
      const stops = sceneStopsRef.current;

      if (!stops.length) {
        return Math.max(
          0,
          Math.min(total - 1, Math.round(progress * (total - 1))),
        );
      }

      let nearestIndex = 0;
      let smallestDistance = Infinity;

      stops.forEach((stop, index) => {
        const distance = Math.abs(progress - stop);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          nearestIndex = index;
        }
      });

      return nearestIndex;
    };

    gsap.set(sceneEls, { autoAlpha: 0 });
    gsap.set(sceneEls[0], { autoAlpha: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-height',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        snap: {
          delay: 0.12,
          duration: { min: 0.06, max: 0.12 },
          ease: 'power1.out',
          inertia: false,
          snapTo: (progress: number) => {
            const stops = sceneStopsRef.current;

            if (!stops.length) {
              return progress;
            }

            const closest = stops.reduce((closestStop, stop) =>
              Math.abs(stop - progress) < Math.abs(closestStop - progress) ? stop : closestStop
            );

            return Math.abs(closest - progress) <= 0.035 ? closest : progress;
          },
        },
        onUpdate: (self) => {
          const idx = getNearestSceneIndex(self.progress);
          setActiveIndex(idx);
        },
      },
    });

    sceneEls.forEach((scene, i) => {
      const bg = scene.querySelector('.full-bg') as HTMLElement;
      const text = scene.querySelector('.text-layer') as HTMLElement;
      const objWrapper = scene.querySelector('.scene-obj-wrapper') as HTMLElement;
      const secondaryObjWrapper = scene.querySelector('.secondary-obj-wrapper') as HTMLElement;
      const tertiaryObjWrapper = scene.querySelector('.tertiary-obj-wrapper') as HTMLElement;
      const t = i; // scene start time

      // ── Fade in (skip first) ──
      if (i > 0) {
        tl.fromTo(scene, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, t);
      }

      // ── Background: zoom in from 1.4 → 1, then zoom out ──
      if (bg) {
        if (SCENES[i].id === 'faq' || SCENES[i].id === 'footer') {
          tl.set(bg, { scale: 1, filter: 'blur(0px)' }, t);
        } else if (i === 0) {
          tl.set(bg, { scale: 1, filter: 'blur(0px)' }, t).to(
            bg,
            { scale: 1.15, filter: 'blur(32px)', duration: 0.6, ease: 'none' },
            t + 0.9,
          );
        } else {
          tl.fromTo(
            bg,
            { scale: 1.4, filter: 'blur(22px)' },
            { scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
            t,
          ).to(
            bg,
            { scale: 1.15, filter: 'blur(32px)', duration: 0.6, ease: 'none' },
            t + 0.9,
          );
        }
      }

      // ── Text: enter from bottom with stagger ──
      if (text) {
        const isUtilityScene = SCENES[i].id === 'faq' || SCENES[i].id === 'footer';
        const fromY = isUtilityScene ? 0 : 18;
        const fromX = isUtilityScene ? 0 : -16;
        const exitX = isUtilityScene ? 0 : 8;
        if (i === 0) {
          tl.set(
            text,
            { xPercent: 0, yPercent: 0, autoAlpha: 1 },
            t,
          ).to(
            text,
            { xPercent: exitX, yPercent: -18, autoAlpha: 0, duration: 0.5, ease: 'power2.in' },
            t + 1,
          );
        } else {
          tl.fromTo(
            text,
            { xPercent: fromX, yPercent: fromY, autoAlpha: 0 },
            { xPercent: 0, yPercent: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
            t + 0.1,
          ).to(
            text,
            { xPercent: exitX, yPercent: -18, autoAlpha: 0, duration: 0.5, ease: 'power2.in' },
            t + 1,
          );
        }
      }

      // ── Object: enter with delay, parallax float ──
      if (objWrapper) {
        if (i === 0) {
          // Hero object: fully visible on initial load
          tl.to(
            objWrapper,
            { yPercent: -40, scale: 1.1, filter: 'blur(24px)', autoAlpha: 0, duration: 0.6, ease: 'none' },
            t + 0.9,
          );
        } else {
          // Other scenes: animate in
          tl.fromTo(
            objWrapper,
            {
              yPercent: 60,
              xPercent: SCENES[i].objFromX || 0,
              scale: 0.7,
              filter: 'blur(18px)',
              autoAlpha: 0,
            },
            {
              yPercent: 0,
              xPercent: 0,
              scale: 1,
              filter: 'blur(0px)',
              autoAlpha: 1,
              duration: 0.6,
              ease: 'power2.out',
            },
            t + 0.15,
          ).to(
            objWrapper,
            {
              yPercent: -40,
              xPercent: (SCENES[i].objFromX || 0) * -0.2, // Subtle horizontal exit
              scale: 1.1,
              filter: 'blur(24px)',
              autoAlpha: 0,
              duration: 0.6,
              ease: 'none',
            },
            t + 0.9,
          );
        }
      }

      // ── Secondary Object: enter from left (parallax) ──
      if (secondaryObjWrapper) {
        if (i === 0) {
          tl.set(
            secondaryObjWrapper,
            { xPercent: 0, yPercent: 0, filter: 'blur(0px)', autoAlpha: 1 },
            t,
          ).to(
            secondaryObjWrapper,
            {
              xPercent: (SCENES[i].secondaryObjFromX || -50) * -0.2,
              yPercent: (SCENES[i].secondaryObjFromY || 0) * -0.2,
              filter: 'blur(20px)',
              autoAlpha: 0,
              duration: 0.6,
              ease: 'none',
            },
            t + 0.9,
          );
        } else {
          tl.fromTo(
            secondaryObjWrapper,
            {
              xPercent: SCENES[i].secondaryObjFromX || -50,
              yPercent: SCENES[i].secondaryObjFromY || 0,
              filter: 'blur(14px)',
              autoAlpha: 0,
            },
            {
              xPercent: 0,
              yPercent: 0,
              filter: 'blur(0px)',
              autoAlpha: 1,
              duration: 0.6,
              ease: 'power2.out',
            },
            t + 0.2,
          ).to(
            secondaryObjWrapper,
            {
              xPercent: (SCENES[i].secondaryObjFromX || -50) * -0.2,
              yPercent: (SCENES[i].secondaryObjFromY || 0) * -0.2,
              filter: 'blur(20px)',
              autoAlpha: 0,
              duration: 0.6,
              ease: 'none',
            },
            t + 0.9,
          );
        }
      }

      if (tertiaryObjWrapper) {
        tl.fromTo(
          tertiaryObjWrapper,
          {
            xPercent: -90,
            yPercent: -18,
            filter: 'blur(12px)',
            autoAlpha: 0,
          },
          {
            xPercent: 0,
            yPercent: 0,
            filter: 'blur(0px)',
            autoAlpha: 1,
            duration: 0.62,
            ease: 'power2.out',
          },
          t + 0.24,
        ).to(
          tertiaryObjWrapper,
          {
            xPercent: 18,
            yPercent: 4,
            filter: 'blur(18px)',
            autoAlpha: 0,
            duration: 0.58,
            ease: 'none',
          },
          t + 0.94,
        );
      }

      // ── Fade out (skip last) ──
      if (i < total - 1) {
        tl.to(scene, { autoAlpha: 0, duration: 0.3 }, t + 1.3);
      }
    });

    const timelineDuration = tl.duration();
    sceneStopsRef.current = sceneEls.map((_, index) => {
      const offset = getSceneFocusOffset(SCENES[index].id);
      return Math.min((index + offset) / timelineDuration, 1);
    });
  }, { scope: mainRef });

  const scrollToScene = useCallback((dir: 'up' | 'down') => {
    const total = SCENES.length;
    const next = dir === 'down'
      ? Math.min(activeIndex + 1, total - 1)
      : Math.max(activeIndex - 1, 0);
    const maxScroll = ScrollTrigger.maxScroll(window);
    const stop = sceneStopsRef.current[next] ?? (total > 1 ? next / (total - 1) : 0);
    const scrollTarget = stop * maxScroll;
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
  }, [activeIndex]);

  const scrollToSceneId = useCallback((sceneId: string) => {
    const index = SCENES.findIndex((scene) => scene.id === sceneId);

    if (index === -1) {
      return;
    }

    const total = SCENES.length;
    const maxScroll = ScrollTrigger.maxScroll(window);
    const stop = sceneStopsRef.current[index] ?? (total > 1 ? index / (total - 1) : 0);
    window.scrollTo({ top: stop * maxScroll, behavior: 'smooth' });
  }, []);

  return (
    <div ref={mainRef} className="slider-app">
      {isInitialLoading && (
        <div className="initial-skeleton" aria-hidden="true">
          <div className="initial-skeleton-header">
            <div className="skeleton-block skeleton-logo" />
            <div className="initial-skeleton-nav">
              <div className="skeleton-block skeleton-link" />
              <div className="skeleton-block skeleton-link skeleton-link-short" />
              <div className="skeleton-block skeleton-cta" />
            </div>
          </div>
          <div className="initial-skeleton-body">
            <div className="initial-skeleton-copy">
              <div className="initial-skeleton-clouds">
                <div className="skeleton-cloud skeleton-cloud-left" />
                <div className="skeleton-cloud skeleton-cloud-right" />
              </div>
              <div className="skeleton-block skeleton-kicker" />
              <div className="skeleton-block skeleton-title-lg" />
              <div className="skeleton-block skeleton-title-md" />
              <div className="skeleton-block skeleton-highlight" />
            </div>
            <div className="initial-skeleton-media">
              <div className="skeleton-hero-cloud" />
              <div className="skeleton-hero-needle" />
            </div>
          </div>
        </div>
      )}

      {/* ── Fixed Top Menu ── */}
      <header className="slider-header">
        <a href="#hero" className="header-logo" onClick={(event) => { event.preventDefault(); scrollToSceneId('hero'); }}>PROGRAMA EBÁNICO</a>
        <nav className="header-nav">
          <a href="#">Ver programa</a>
          <a href="#faq" onClick={(event) => { event.preventDefault(); scrollToSceneId('faq'); }}>FAQs</a>
          <a href="#footer" onClick={(event) => { event.preventDefault(); scrollToSceneId('footer'); }} className="nav-cta">Solicitar admisión</a>
        </nav>
      </header>

      <div id="viewport">
        {SCENES.map((sc, i) => {
          const sceneDescription = sc.id === 'footer'
            ? (
              <section className="contact-scene-content">
                <div className="contact-copy">
                  <span className="contact-eyebrow">Última sección</span>
                  <h3>¿Tienes dudas? <em>Contáctanos</em></h3>
                  <div className="contact-list">
                    <div className="contact-item">
                      <span className="contact-item-label">WhatsApp</span>
                      <a href="tel:+34910123456">+34 910 123 456</a>
                    </div>
                    <div className="contact-item">
                      <span className="contact-item-label">Email</span>
                      <a href="mailto:hola@programaebanico.com">hola@programaebanico.com</a>
                    </div>
                  </div>
                </div>
                <form className="contact-form-card">
                  <label className="contact-field">
                    <span>Nombre completo</span>
                    <input type="text" name="name" placeholder="Tu nombre y apellidos" />
                  </label>
                  <label className="contact-field">
                    <span>Email</span>
                    <input type="email" name="email" placeholder="tu@email.com" />
                  </label>
                  <label className="contact-field">
                    <span>Teléfono</span>
                    <input type="tel" name="phone" placeholder="+34 600 000 000" />
                  </label>
                  <label className="contact-field">
                    <span>¿Por qué quieres hacer este máster?</span>
                    <textarea name="motivation" rows={5} placeholder="Cuéntanos brevemente tus motivaciones y objetivos..." />
                  </label>
                  <button type="submit" className="contact-submit">Enviar</button>
                  <div className="contact-legal">
                    <span className="contact-copyright">Copyright 2026 Programa Ebánico. Todos los derechos reservados.</span>
                    <div className="contact-legal-links">
                      <button type="button" onClick={() => setActiveLegalModal('privacy')}>Política de privacidad</button>
                      <button type="button" onClick={() => setActiveLegalModal('cookies')}>Política de cookies</button>
                      <button type="button" onClick={() => setActiveLegalModal('legal')}>Aviso legal</button>
                    </div>
                  </div>
                </form>
              </section>
            )
            : sc.desc;

          return <section key={sc.id} className={`scene scene-${sc.id}`} id={sc.id}>
            <div
              className={`layer full-bg ${sc.bgClass ?? ''}`}
              style={sc.bg ? { backgroundImage: `url(${sc.bg})` } : undefined}
            />
            {/* ── 3D Full-Screen Atmospheric Smoke ── */}
            {(sc.id === 'situation' || sc.id === 'pillars') && (
              <div className={`layer scene-smoke ${sc.id === 'pillars' ? 'scene-smoke-pillars' : ''}`}>
                <SmokeEffect />
              </div>
            )}
            <div className="layer text-layer">
              <span className="scene-kicker">{sc.kicker}</span>
              <h2>
                {sc.titleTop}
                {sc.titleBottom && (
                  <>
                    <br />
                    <em>{sc.titleBottom}</em>
                  </>
                )}
              </h2>
              <div className="scene-desc">{sceneDescription}</div>
            </div>

            {/* ── Secondary Object Layer (Left Parallax) ── */}
            {sc.secondaryObj && (
              <div className="layer secondary-object-layer">
                <div className={`secondary-obj-wrapper ${sc.secondaryObjClass}`}>
                  <img src={sc.secondaryObj} alt="" />
                </div>
              </div>
            )}
            {sc.id === 'cta' && (
              <div className="layer secondary-object-layer">
                <div className="tertiary-obj-wrapper obj-cta-third">
                  <img src="/img/enseñar3.webp" alt="" />
                </div>
              </div>
            )}
            {sc.obj && (
              <div className="layer object-layer">
                <div className={`scene-obj-wrapper ${sc.objClass}`}>
                  <img src={sc.obj} className="scene-obj" alt="" />
                </div>
              </div>
            )}
          </section>;
        })}

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

      {activeLegalModal && (
        <div className="legal-modal-backdrop" onClick={() => setActiveLegalModal(null)}>
          <div className="legal-modal" onClick={(event) => event.stopPropagation()}>
            <div className="legal-modal-header">
              <span className="legal-modal-eyebrow">Información legal</span>
              <button type="button" className="legal-modal-close" onClick={() => setActiveLegalModal(null)}>Cerrar</button>
            </div>
            <h4>{LEGAL_CONTENT[activeLegalModal].title}</h4>
            <div className="legal-modal-body">
              {LEGAL_CONTENT[activeLegalModal].sections.map((section) => (
                <section key={section.heading} className="legal-modal-section">
                  <h5>{section.heading}</h5>
                  <div>{section.body}</div>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const getSceneFocusOffset = (sceneId: string) => {
  switch (sceneId) {
    case 'hero':
      return 0.18;
    case 'footer':
      return 0.34;
    case 'faq':
      return 0.48;
    default:
      return 0.72;
  }
};
