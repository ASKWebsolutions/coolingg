import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import useReveals from '../../animations/useReveals';
import useReducedMotion from '../../hooks/useReducedMotion';
import { partnerCategories, partnersNote } from '../../data/partners';
import SectionHeading from '../ui/SectionHeading';
import bandImage from '../../assets/img/home-exterior.jpg';

function CategoryCard({ category, index }) {
  return (
    <article className="group flex h-44 w-[15rem] shrink-0 flex-col justify-between border-r border-navy/10 px-6 py-6 transition-colors duration-300 hover:bg-iso-ice sm:h-52 sm:w-[17rem] sm:px-7">
      <div className="flex items-start justify-between">
        <span className="font-display text-[0.62rem] font-semibold tracking-[0.2em] text-navy/40">
          {String(index + 1).padStart(2, '0')}
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-navy/30 transition duration-300 group-hover:-translate-y-0.5 group-hover:text-iso-orange"
          aria-hidden="true"
        />
      </div>

      <div>
        <span className="mb-4 block h-px w-10 origin-left bg-iso-blue transition-all duration-500 group-hover:w-16 group-hover:bg-iso-orange" />
        <h3 className="text-[1.15rem] font-bold leading-tight text-navy sm:text-[1.3rem]">
          {category.label}
        </h3>
        <p className="mt-2 text-[0.82rem] text-iso-charcoal/70">{category.hint}</p>
      </div>
    </article>
  );
}

export default function PartnersSection() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useReveals(rootRef, { reduced, start: 'top 85%' });

  return (
    <section
      id="partners"
      ref={rootRef}
      aria-labelledby="partners-heading"
      className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              as="h2"
              align="center"
              id="partners-heading"
              eyebrow="Equipment & Partners"
              lines={['Your Comfort Deserves a', 'Better Standard.']}
            />
          </div>
          <div className="flex items-end lg:col-span-5 lg:justify-end">
            <p className="fade-up max-w-[34ch] border-l-2 border-iso-blue pl-5 text-[0.92rem] leading-relaxed text-iso-charcoal/75">
              {partnersNote}
            </p>
          </div>
        </div>
      </div>

      <div className="fade-up mt-14 border-y border-navy/10 bg-iso-soft-white py-2">
        <div className={`marquee ${reduced ? 'marquee-static' : ''}`}>
          <div className="marquee__track">
            {[0, 1].map((copy) => (
              <div className="flex shrink-0" key={copy} aria-hidden={copy === 1}>
                {partnerCategories.map((category, index) => (
                  <CategoryCard key={`${copy}-${category.id}`} category={category} index={index} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="shell mt-16">
        <div className="mask-reveal relative overflow-hidden">
          <img
            src={bandImage}
            alt="Contemporary home exterior representing residential comfort"
            width={1200}
            height={700}
            loading="lazy"
            decoding="async"
            className="h-56 w-full object-cover object-center sm:h-72 lg:h-80"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(12,28,58,0.92) 0%, rgba(12,28,58,0.7) 45%, rgba(12,28,58,0.25) 100%)',
            }}
          />
          <div className="absolute inset-0 flex items-center">
            <div className="shell">
              <p className="max-w-[30ch] font-display text-[clamp(1.3rem,3vw,2.2rem)] font-bold leading-tight text-white">
                Homes and light commercial spaces, engineered for year-round comfort.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="border border-iso-orange/60 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.18em] text-iso-orange">
                  Heating
                </span>
                <span className="border border-iso-blue/60 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.18em] text-iso-blue">
                  Cooling
                </span>
                <span className="border border-white/30 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.18em] text-white/75">
                  Air Quality
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
