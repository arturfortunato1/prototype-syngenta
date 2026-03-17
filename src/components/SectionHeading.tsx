type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={className} data-animate="reveal">
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-syngenta-blue/80">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-heading text-3xl font-semibold leading-tight text-syngenta-deep md:text-4xl lg:text-5xl ${
          titleClassName ?? ''
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-syngenta-deep/80 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
