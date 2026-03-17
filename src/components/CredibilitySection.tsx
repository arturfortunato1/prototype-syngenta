import { SectionHeading } from './SectionHeading';
import { credibilityBlocks } from '../data/content';

export function CredibilitySection() {
  return (
    <section id="credibilidade" className="bg-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Confiança"
          title="Tecnologia relevante é a que gera confiança no campo."
          description="Pesquisa, experiência agronômica e inteligência digital atuam em conjunto para entregar valor real na operação."
          className="max-w-3xl"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {credibilityBlocks.map((block) => (
            <article
              key={block.axis}
              className="rounded-3xl border border-syngenta-deep/10 bg-syngenta-offwhite/60 p-8 transition duration-300 hover:border-syngenta-blue/30 hover:bg-white"
              data-animate="reveal"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-syngenta-blue/70">{block.axis}</p>
              <p className="mt-6 font-heading text-3xl font-semibold leading-tight text-syngenta-deep">“{block.quote}”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
