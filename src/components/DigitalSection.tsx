import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SectionHeading } from './SectionHeading';
import { digitalSteps } from '../data/content';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

function generateBars(step: number) {
  const base = [42, 58, 66, 52, 70, 48, 74];
  return base.map((value, index) => {
    const factor = (step + 1) * (index % 3 === 0 ? 0.55 : 0.35);
    return Math.min(86, Math.max(22, Math.round(value + factor)));
  });
}

export function DigitalSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mockupWrapperRef = useRef<HTMLDivElement | null>(null);
  const activeStepRef = useRef(0);

  const [activeStep, setActiveStep] = useState(0);

  const isMobile = useMediaQuery('(max-width: 1024px)');
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    const context = gsap.context(() => {
      if (!reducedMotion) {
        gsap.from('[data-digital-item]', {
          y: 28,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        });
      }

      if (!isMobile && !reducedMotion && mockupWrapperRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 12%',
          end: 'bottom bottom',
          pin: mockupWrapperRef.current,
          pinSpacing: false,
        });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const next = Math.min(digitalSteps.length - 1, Math.floor(self.progress * digitalSteps.length));

          if (next !== activeStepRef.current) {
            activeStepRef.current = next;
            setActiveStep(next);
          }
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, [isMobile, reducedMotion]);

  return (
    <section id="syngenta-digital" ref={sectionRef} className="bg-[#edf3f8] py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Syngenta Digital"
          title="Dados que ajudam o campo a decidir melhor."
          description="Quando informação e recomendação trabalham juntas, o manejo ganha velocidade, contexto e precisão."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.18fr_1fr] lg:items-start">
          <div ref={mockupWrapperRef} className="lg:top-24">
            <div className="relative overflow-hidden rounded-[34px] border border-syngenta-deep/10 bg-white shadow-panel">
              <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(0,87,184,0.08),transparent_42%,rgba(120,190,32,0.08))]" />
              <div className="absolute -right-28 top-16 h-60 w-60 rounded-full bg-syngenta-blue/10 blur-3xl" />
              <div className="absolute -left-24 bottom-10 h-56 w-56 rounded-full bg-syngenta-green/15 blur-3xl" />

              <div className="relative p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between border-b border-syngenta-deep/10 pb-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-syngenta-blue/70">Plataforma</p>
                    <h3 className="font-heading text-2xl font-semibold text-syngenta-deep">Syngenta Digital</h3>
                  </div>
                  <span className="rounded-full border border-syngenta-deep/10 bg-white px-4 py-1 text-xs text-syngenta-deep/70">
                    Estado {activeStep + 1}/{digitalSteps.length}
                  </span>
                </div>

                <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-syngenta-deep/10 bg-white/70 p-6 backdrop-blur">
                  {digitalSteps.map((step, index) => {
                    const bars = generateBars(index);
                    const isActive = index === activeStep;

                    return (
                      <div
                        key={step.label}
                        className={`absolute inset-0 p-6 transition-all duration-500 ${
                          isActive ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
                        }`}
                        style={{ clipPath: isActive ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)' }}
                      >
                        <div className="mb-6 flex items-center justify-between">
                          <p className="text-xs uppercase tracking-[0.2em] text-syngenta-blue/75">{step.title}</p>
                          <p className="text-sm font-semibold text-syngenta-deep">{step.label}</p>
                        </div>

                        <div className="grid h-[140px] grid-cols-7 items-end gap-2">
                          {bars.map((barHeight, barIndex) => (
                            <span
                              key={`${step.label}-${barIndex}`}
                              className="rounded-md bg-gradient-to-t from-syngenta-blue to-syngenta-green/80"
                              style={{ height: `${barHeight}%` }}
                            />
                          ))}
                        </div>

                        <div className="mt-6 grid gap-3 md:grid-cols-2">
                          <div className="rounded-xl border border-syngenta-deep/10 bg-white p-3">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-syngenta-deep/50">Indicador</p>
                            <p className="mt-2 text-lg font-semibold text-syngenta-deep">Precisão operacional</p>
                          </div>
                          <div className="rounded-xl border border-syngenta-deep/10 bg-white p-3">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-syngenta-deep/50">Leitura</p>
                            <p className="mt-2 text-lg font-semibold text-syngenta-deep">Contexto por talhão</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {digitalSteps.map((step, index) => {
              const isActive = index === activeStep;

              return (
                <article
                  key={step.label}
                  data-digital-item
                  className={`rounded-2xl border p-6 transition-all duration-300 ${
                    isActive
                      ? 'border-syngenta-blue/30 bg-white shadow-soft'
                      : 'border-syngenta-deep/10 bg-white/65 hover:border-syngenta-blue/20'
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-syngenta-blue/70">{step.title}</p>
                  <h3 className="mt-3 font-heading text-2xl font-semibold text-syngenta-deep">{step.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-syngenta-deep/78">{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
