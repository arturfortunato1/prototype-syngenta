import { useMemo, useState } from 'react';

import { SectionHeading } from './SectionHeading';
import {
  portfolioCategories,
  portfolioItems,
  type PortfolioCategory,
  type PortfolioItem,
} from '../data/content';

function cardAccent(category: PortfolioItem['category']) {
  const accents: Record<PortfolioItem['category'], string> = {
    'Proteção de cultivos': 'from-[#0f3a6d] to-[#1f6cb8]',
    Sementes: 'from-[#275e4a] to-[#5f9b4f]',
    'Tratamento de sementes': 'from-[#4a5e73] to-[#7f8fa1]',
    'Soluções integradas': 'from-[#264563] to-[#4f7f98]',
    Digital: 'from-[#1a5ca8] to-[#47a4c7]',
  };

  return accents[category];
}

export function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>('Todos');

  const visibleItems = useMemo(
    () =>
      selectedCategory === 'Todos'
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === selectedCategory),
    [selectedCategory],
  );

  return (
    <section id="portfolio" className="bg-syngenta-offwhite py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Portfólio"
          title="Um portfólio pensado para desafios reais do campo."
          description="Soluções integradas para apoiar diferentes culturas, contextos de manejo e metas de produtividade."
        />

        <div className="mt-10 flex flex-wrap gap-2.5">
          {portfolioCategories.map((category) => {
            const isSelected = category === selectedCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-syngenta-yellow ${
                  isSelected
                    ? 'border-syngenta-blue bg-syngenta-blue text-white'
                    : 'border-syngenta-deep/15 bg-white text-syngenta-deep hover:border-syngenta-blue/35 hover:text-syngenta-blue'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map((item) => (
            <article
              key={item.title}
              className="group rounded-3xl border border-syngenta-deep/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-syngenta-blue/30 hover:shadow-soft"
            >
              <span
                className={`mb-6 block h-1 w-full rounded-full bg-gradient-to-r ${cardAccent(item.category)}`}
                aria-hidden="true"
              />
              <p className="text-xs uppercase tracking-[0.2em] text-syngenta-blue/70">{item.category}</p>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-syngenta-deep">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-syngenta-deep/78">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
