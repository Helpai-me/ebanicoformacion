import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Luxury text reveal component (line by line or block)
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      initial={{ y: "100%", opacity: 0, filter: "blur(12px)" }}
      whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

export default function App() {
  const { scrollY } = useScroll();
  
  // Parallax effects for Hero
  const heroTextY = useTransform(scrollY, [0, 1000], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const heroBgScale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const heroBlur = useTransform(scrollY, [0, 800], ["blur(0px)", "blur(20px)"]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
      
      {/* Minimalist Fixed Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <div className="font-serif text-2xl md:text-3xl tracking-[0.15em] uppercase pointer-events-auto cursor-pointer">
          Ebánico
        </div>
        <div className="hidden md:flex items-center gap-12 text-[10px] tracking-[0.2em] uppercase font-medium pointer-events-auto">
          <a href="#filosofia" className="hover:opacity-60 transition-opacity">Filosofía</a>
          <a href="#programa" className="hover:opacity-60 transition-opacity">Programa</a>
          <a href="#contacto" className="hover:opacity-60 transition-opacity">Contacto</a>
        </div>
        <button className="text-[10px] tracking-[0.2em] uppercase font-medium pointer-events-auto border-b border-white/30 pb-1 hover:border-white transition-colors">
          Aplicar
        </button>
      </nav>

      {/* 1. Hero Fullscreen with Parallax */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <motion.div 
          style={{ scale: heroBgScale, filter: heroBlur }} 
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop" 
            alt="Clínica estética" 
            className="w-full h-full object-cover opacity-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
        </motion.div>

        <motion.div 
          style={{ y: heroTextY, opacity: heroOpacity, filter: heroBlur }}
          className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-24 md:pb-32 z-10 text-white"
        >
          <div className="overflow-hidden mb-6">
            <p className="text-xs md:text-sm tracking-[0.4em] uppercase font-light text-white/80">
              {"Maestría en Estética Clínica".split(' ').map((word, wordIndex, array) => (
                <React.Fragment key={wordIndex}>
                  <span className="inline-block whitespace-nowrap">
                    {word.split('').map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, delay: 0.2 + (wordIndex * 0.1) + (charIndex * 0.02), ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                  {wordIndex !== array.length - 1 && " "}
                </React.Fragment>
              ))}
            </p>
          </div>
          
          <h1 className="font-serif text-[15vw] md:text-[12vw] leading-[0.85] tracking-tighter uppercase">
            <div className="overflow-hidden">
              {"El arte de la".split(' ').map((word, wordIndex, array) => (
                <React.Fragment key={wordIndex}>
                  <span className="inline-block whitespace-nowrap">
                    {word.split('').map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        initial={{ y: "100%", filter: "blur(8px)" }}
                        animate={{ y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.4, delay: 0.4 + (wordIndex * 0.1) + (charIndex * 0.03), ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                  {wordIndex !== array.length - 1 && " "}
                </React.Fragment>
              ))}
            </div>
            <div className="overflow-hidden italic font-light text-white/90 lowercase">
              {"precisión clínica".split(' ').map((word, wordIndex, array) => (
                <React.Fragment key={wordIndex}>
                  <span className="inline-block whitespace-nowrap">
                    {word.split('').map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        initial={{ y: "100%", filter: "blur(8px)" }}
                        animate={{ y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.4, delay: 0.8 + (wordIndex * 0.1) + (charIndex * 0.03), ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                  {wordIndex !== array.length - 1 && " "}
                </React.Fragment>
              ))}
            </div>
          </h1>
        </motion.div>
      </section>

      {/* 2. Intro Statement (Massive Editorial Typography) */}
      <section className="min-h-screen flex items-center justify-center py-32 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto w-full">
          <Reveal>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] text-primary mb-16 tracking-tight">
              Has estudiado teoría que luego no aplicas. Sabes infiltrar, pero sin tener muy claro <span className="italic text-primary/70">cuándo, por qué y para quién.</span>
            </h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-32">
            <div className="md:col-span-4">
              <Reveal delay={0.2}>
                <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-primary/50 mb-6">El Desafío</p>
              </Reveal>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
              <Reveal delay={0.3}>
                <p className="text-lg md:text-xl text-primary/80 leading-relaxed font-light">
                  Al terminar el máster, iniciarte se convierte en un desafío. ¿Dónde empiezo? ¿Con quién practico? ¿Estoy preparado? Consigues empezar y sientes que improvisas. Precios sin criterio. Presupuestos sin estructura. Marketing sin estrategia.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="text-lg md:text-xl text-primary/80 leading-relaxed font-light">
                  Este programa nace de una profunda comprensión de estas carencias. No solo te ofrecemos una formación práctica, sino una inmersión completa en la estética como una disciplina clínica integral.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sticky Split Section (Philosophy) */}
      <section id="filosofia" className="relative bg-secondary">
        <div className="flex flex-col lg:flex-row">
          {/* Sticky Image Left */}
          <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop" 
              alt="Profesional médico" 
              className="w-full h-full object-cover grayscale opacity-90"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Scrolling Content Right */}
          <div className="w-full lg:w-1/2 py-32 px-6 md:px-16 lg:px-24 flex flex-col justify-center min-h-screen">
            <Reveal>
              <p className="text-[10px] tracking-[0.2em] uppercase mb-12 text-primary/50 font-medium">Nuestra Filosofía</p>
              <h3 className="text-6xl md:text-8xl font-serif text-primary mb-24 leading-[0.85] tracking-tight">
                Lo hacemos <br/><span className="italic text-primary/70">al revés.</span>
              </h3>
            </Reveal>

            <div className="space-y-24">
              <Reveal delay={0.1}>
                <div className="border-t border-primary/20 pt-8">
                  <span className="font-serif text-4xl text-primary/30 block mb-6">01</span>
                  <h4 className="text-4xl font-serif text-primary mb-6 tracking-tight">Primero entiendes</h4>
                  <p className="text-lg text-primary/70 leading-relaxed font-light">
                    Adquieres el conocimiento fundamental y el criterio clínico. Más allá de lo superficial, profundizamos en cada aspecto: psicológico e historial clínico.
                  </p>
                </div>
              </Reveal>
              
              <Reveal delay={0.2}>
                <div className="border-t border-primary/20 pt-8">
                  <span className="font-serif text-4xl text-primary/30 block mb-6">02</span>
                  <h4 className="text-4xl font-serif text-primary mb-6 tracking-tight">Luego decides</h4>
                  <p className="text-lg text-primary/70 leading-relaxed font-light">
                    Desarrollas la capacidad de tomar decisiones informadas y estratégicas. Aprenderás a diseñar planes de tratamiento a corto, medio y largo plazo.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="border-t border-primary/20 pt-8">
                  <span className="font-serif text-4xl text-primary/30 block mb-6">03</span>
                  <h4 className="text-4xl font-serif text-primary mb-6 tracking-tight">Y solo entonces tratas</h4>
                  <p className="text-lg text-primary/70 leading-relaxed font-light">
                    Aplicas tus habilidades con confianza, precisión y resultados excepcionales. Todo el programa se desarrolla en la clínica utilizando la vida real como eje.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Fullscreen Program / Accordion */}
      <section id="programa" className="py-32 md:py-48 bg-primary text-primary-foreground px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-primary-foreground/20 pb-16 mb-20">
              <h2 className="font-serif text-[12vw] md:text-[9vw] leading-[0.8] tracking-tighter uppercase">
                El <br/><span className="italic font-light text-primary-foreground/80 lowercase">Programa</span>
              </h2>
              <p className="text-primary-foreground/60 max-w-sm text-lg mt-12 md:mt-0 font-light leading-relaxed">
                Ganar criterio clínico y profesional requiere tiempo, orden y la repetición de patrones correctos.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              
              <AccordionItem value="item-1" className="border-primary-foreground/20 py-6">
                <AccordionTrigger className="text-3xl md:text-5xl font-serif hover:no-underline hover:text-accent transition-colors [&[data-state=open]>svg]:rotate-45 tracking-tight">
                  <div className="flex items-center gap-8 text-left">
                    <span className="text-sm font-sans tracking-widest text-primary-foreground/30 hidden md:block">01</span>
                    Dominio Clínico Integral
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-lg md:text-xl text-primary-foreground/60 leading-relaxed pt-8 pb-16 md:pl-16 max-w-4xl font-light">
                  Estudio Integral del Paciente, Diagnósticos Precisos (estudio cefalométrico, análisis de piel), Estrategias de Tratamiento combinadas, Manejo Avanzado de Materiales y Cuidado Domiciliario.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-primary-foreground/20 py-6">
                <AccordionTrigger className="text-3xl md:text-5xl font-serif hover:no-underline hover:text-accent transition-colors [&[data-state=open]>svg]:rotate-45 tracking-tight">
                  <div className="flex items-center gap-8 text-left">
                    <span className="text-sm font-sans tracking-widest text-primary-foreground/30 hidden md:block">02</span>
                    Gestión Clínica Estratégica
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-lg md:text-xl text-primary-foreground/60 leading-relaxed pt-8 pb-16 md:pl-16 max-w-4xl font-light">
                  Marco Legal y Licencias, Economía y Finanzas, Presupuestos Efectivos, Imagen y Organización de la Clínica, y Relación con el paciente (vías de comunicación, circuito de complicaciones).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-primary-foreground/20 py-6">
                <AccordionTrigger className="text-3xl md:text-5xl font-serif hover:no-underline hover:text-accent transition-colors [&[data-state=open]>svg]:rotate-45 tracking-tight">
                  <div className="flex items-center gap-8 text-left">
                    <span className="text-sm font-sans tracking-widest text-primary-foreground/30 hidden md:block">03</span>
                    Anatomía e Inyección Segura
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-lg md:text-xl text-primary-foreground/60 leading-relaxed pt-8 pb-16 md:pl-16 max-w-4xl font-light">
                  Exploraremos la anatomía en la vida real con modelos 3D y paciente. Dominarás el arte de la inyección segura sobre material biológico real. Cada calibre y material tiene una técnica específica.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-primary-foreground/20 py-6">
                <AccordionTrigger className="text-3xl md:text-5xl font-serif hover:no-underline hover:text-accent transition-colors [&[data-state=open]>svg]:rotate-45 tracking-tight">
                  <div className="flex items-center gap-8 text-left">
                    <span className="text-sm font-sans tracking-widest text-primary-foreground/30 hidden md:block">04</span>
                    Toxina, Rellenos e Inductores
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-lg md:text-xl text-primary-foreground/60 leading-relaxed pt-8 pb-16 md:pl-16 max-w-4xl font-light">
                  Dominio integral de la toxina botulínica, manejo experto de rellenos aprobados (tipos, jeringas, reconstitución), y entendimiento profundo del PRP e Inductores de Colágeno.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-primary-foreground/20 py-6">
                <AccordionTrigger className="text-3xl md:text-5xl font-serif hover:no-underline hover:text-accent transition-colors [&[data-state=open]>svg]:rotate-45 tracking-tight">
                  <div className="flex items-center gap-8 text-left">
                    <span className="text-sm font-sans tracking-widest text-primary-foreground/30 hidden md:block">05</span>
                    Terapias Físicas y Visión Holística
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-lg md:text-xl text-primary-foreground/60 leading-relaxed pt-8 pb-16 md:pl-16 max-w-4xl font-light">
                  Práctica de terapias físicas (láser e IPL), manipulación de Alfa y Beta Hidroxiácidos, gestión de complicaciones (RCP) y una visión holística del envejecimiento para que tus pacientes elijan envejecer contigo.
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* 5. Fullscreen CTA (Image Background) */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" 
            alt="Procedimiento clínico" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-6 text-white max-w-5xl w-full">
          <Reveal>
            <h2 className="font-serif text-[10vw] md:text-[8vw] leading-[0.85] tracking-tighter uppercase mb-12">
              Inicia tu <br/><span className="italic font-light text-white/80 lowercase">Maestría</span>
            </h2>
            <p className="text-xl md:text-3xl text-white/70 mb-16 font-light max-w-2xl mx-auto leading-relaxed">
              Conocerás y podrás inspirar confianza en aquellos que necesitan personas como tú en su equipo.
            </p>
            <button className="group flex items-center gap-6 mx-auto text-[10px] tracking-[0.3em] uppercase font-medium border-b border-white/30 pb-3 hover:text-accent hover:border-accent transition-all">
              Solicitar Admisión
              <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="bg-background text-foreground py-16 px-6 md:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <div className="font-serif text-4xl tracking-[0.15em] uppercase text-primary mb-6">
              Ebánico
            </div>
            <div className="text-[10px] tracking-[0.2em] text-primary/50 uppercase">
              &copy; {new Date().getFullYear()} Ebánico. Todos los derechos reservados.
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-[10px] tracking-[0.2em] uppercase text-primary/70 font-medium">
            <a href="#" className="hover:text-primary transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

