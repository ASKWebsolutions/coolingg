/**
 * Editorial section heading: marker, eyebrow, masked headline lines, lead copy.
 * `lines` drives the mask reveal â€” one `.reveal-line` per line of type.
 */
export default function SectionHeading({
  eyebrow,
  lines = [],
  lead,
  tone = 'dark',
  number,
  align = 'left',
  id,
  className = '',
  leadClassName = '',
  as: HeadingTag = 'h2',
}) {
  const isLight = tone === 'light';

  return (
    <div
      className={[
        'flex flex-col gap-6',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      ].join(' ')}
    >
      {(eyebrow || number) && (
        <div
          className={`eyebrow ${isLight ? 'text-iso-blue' : 'text-iso-orange'} fade-up`}
        >
          {number && (
            <span
              className={`grid h-7 w-7 place-items-center rounded-full border text-[0.6rem] ${
                isLight ? 'border-white/25 text-white' : 'border-navy/20 text-navy'
              }`}
            >
              {number}
            </span>
          )}
          <span
            aria-hidden="true"
            className={`h-px w-8 ${isLight ? 'bg-iso-blue' : 'bg-iso-orange'}`}
          />
          <span className={isLight ? 'text-white/70' : 'text-navy/70'}>{eyebrow}</span>
        </div>
      )}

      {lines.length > 0 && (
        <HeadingTag
          id={id}
          className={`max-w-[16ch] text-[clamp(2.4rem,6vw,5.2rem)] font-bold ${
            isLight ? 'text-white' : 'text-navy'
          }`}
        >
          {lines.map((line, index) => (
            <span className="reveal-line" key={`${line}-${index}`}>
              <span style={{ transitionDelay: `${index * 90}ms` }}>{line}</span>
            </span>
          ))}
        </HeadingTag>
      )}

      {lead && (
        <p
          className={`max-w-[46ch] text-[1.02rem] leading-relaxed ${
            isLight ? 'text-white/70' : 'text-iso-charcoal/80'
          } fade-up ${leadClassName}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
