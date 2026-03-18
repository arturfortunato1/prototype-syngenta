import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { SectionHeading } from './SectionHeading';
import { solutionCards } from '../data/content';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { assetUrl } from '../utils';

export function SolutionsHorizontalSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useMediaQuery('(max-width: 1024px)');
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (isMobile || reducedMotion || !sectionRef.current || !trackRef.current || !viewportRef.current) return;

    const context = gsap.context(() => {
      const distance = Math.max(trackRef.current!.scrollWidth - viewportRef.current!.clientWidth, 0);

      gsap.to(trackRef.current, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top+=200 top',
          end: () => `+=${distance + window.innerHeight * 0.45}`,
          scrub: 0.85,
          pin: true,
          anticipatePin: 1,
        },
      });

      gsap.fromTo(
        '[data-solution-card]',
        { opacity: 0.45, scale: 0.96, filter: 'blur(6px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 62%',
            end: 'bottom bottom',
            scrub: 0.7,
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, [isMobile, reducedMotion]);

  return (
    <section id="solucoes" ref={sectionRef} className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          title="Da proteção ao digital, uma arquitetura de valor para cada decisão no campo."
          description="Enquanto a produção ganha complexidade, a estratégia precisa integrar tecnologia, agronomia e visão operacional."
        />
      </div>

      {isMobile ? (
        <div className="mt-12 space-y-5 px-6 md:px-10">
          {solutionCards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-3xl border border-syngenta-deep/10 bg-syngenta-offwhite/70 shadow-soft"
              data-animate="reveal"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={assetUrl(card.image)}
                  alt={card.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-syngenta-deep/45 to-transparent" />
              </div>
              <div className="space-y-3 p-6">
                <h3 className="font-heading text-2xl font-semibold text-syngenta-deep">{card.title}</h3>
                <p className="text-sm leading-relaxed text-syngenta-deep/80">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="relative mt-16">
          <div ref={viewportRef} className="overflow-hidden px-6 md:px-10">
            <div ref={trackRef} className="flex items-stretch gap-6">
              {solutionCards.map((card) => (
              <article
                key={card.title}
                data-solution-card
                className="relative h-[68vh] min-h-[500px] w-[min(1100px,calc(100vw-120px))] flex-shrink-0 overflow-hidden rounded-[38px] border border-syngenta-deep/10 bg-syngenta-offwhite shadow-panel"
              >
                <img
                  src={assetUrl(card.image)}
                  alt={card.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,34,64,0.02)_0%,rgba(10,34,64,0.55)_55%,rgba(10,34,64,0.92)_100%)]" />
                <div className="absolute bottom-0 p-10 md:p-12">
                  <h3 className="font-heading text-3xl font-semibold leading-tight text-white md:text-4xl">
                    {card.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/95 drop-shadow-sm">{card.description}</p>
                </div>
              </article>
            ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
