import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap, EASE } from '../../animations/gsap';
import useReducedMotion from '../../hooks/useReducedMotion';
import { siteConfig } from '../../data/siteConfig';
import heroImage from '../../assets/img/hero-home.jpg';
import Button from '../ui/Button';
import AirflowCanvas from './AirflowCanvas';

const HEADLINE = ['Your Comfort Deserves a', 'Better Standard.'];

export default function HeroSection() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.12 });

      tl.from('[data-hero="eyebrow"]', { y: 24, opacity: 0, duration: 0.7 })
        .from(
          '[data-hero="line"] > span',
          { yPercent: 115, duration: 1.05, stagger: 0.09 },
          '-=0.42',
        )
        .from('[data-hero="lead"]', { y: 26, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('[data-hero="cta"]', { y: 22, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.55')
        .from(
          '[data-hero="image"]',
          { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.25 },
          '-=1.15',
        )
        .from('[data-hero="image"] img', { scale: 1.16, duration: 1.6 }, '<')
        .from('[data-hero="badge"]', { y: 18, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.7')
        .from('[data-hero="scroll"]', { opacity: 0, duration: 0.6 }, '-=0.4');

      gsap.to('[data-hero="image"] img', {
        yPercent: 7,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="home"
      ref={rootRef}
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-navy-deep text-white"
    >
      {/* canvas airflow */}
      <div className="absolute inset-0 -z-10 opacity-[0.85]">
        <AirflowCanvas />
      </div>

      {/* brand field gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(70% 90% at 8% 20%, rgba(244,90,10,0.20), transparent 60%), radial-gradient(65% 85% at 95% 75%, rgba(7,133,214,0.22), transparent 62%), linear-gradient(180deg, rgba(10,23,48,0.55), rgba(10,23,48,0.92))',
        }}
      />

      {/* technical rings */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 hidden h-[46rem] w-[46rem] -translate-y-1/2 text-white/10 lg:block"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="196" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="200" cy="200" r="104" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 7" />
        <circle cx="200" cy="200" r="58" stroke="#F45A0A" strokeWidth="0.9" strokeOpacity="0.6" />
        <path d="M200 4v30M200 366v30M4 200h30M366 200h30" stroke="currentColor" strokeWidth="0.8" />
      </svg>

      <div className="shell relative grid min-h-[100svh] items-center gap-12 pb-20 pt-32 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-36">
        <div className="lg:col-span-7 xl:col-span-6">
          <div
            data-hero="eyebrow"
            className="eyebrow mb-8 inline-flex border border-white/15 px-4 py-2 text-white/70"
          >
            <span aria-hidden="true" className="h-px w-7 bg-iso-orange" />
            {siteConfig.fullName}
          </div>

          <h1
            id="hero-heading"
            className="text-[clamp(2rem,6vw,4.8rem)] font-extrabold leading-[0.92] tracking-mega text-white text-left"
          >
            {HEADLINE.map((line) => (
              <span data-hero="line" className="hero-line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h1>

          <p
            data-hero="lead"
            className="mt-6 max-w-[42ch] text-[1rem] leading-relaxed text-white/70 sm:text-[1.12rem]"
          >
            {siteConfig.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div data-hero="cta">
              <Button href={siteConfig.cta.secondary.href} variant="primary">
                {siteConfig.cta.secondary.label}
              </Button>
            </div>
            <div data-hero="cta">
              <Button href={siteConfig.cta.primary.href} variant="light">
                {siteConfig.cta.primary.label}
              </Button>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-6">
            <span data-hero="badge" className="flex items-center gap-2.5 text-[0.72rem] uppercase tracking-[0.2em] text-white/60">
              <span className="h-2 w-2 rounded-full bg-iso-orange" aria-hidden="true" />
              Heating
            </span>
            <span data-hero="badge" className="flex items-center gap-2.5 text-[0.72rem] uppercase tracking-[0.2em] text-white/60">
              <span className="h-2 w-2 rounded-full bg-iso-blue" aria-hidden="true" />
              Cooling
            </span>
            <span data-hero="badge" className="text-[0.72rem] uppercase tracking-[0.2em] text-white/60">
              {siteConfig.address.city}, {siteConfig.address.stateAbbr}
            </span>
          </div>
        </div>

        <div className="relative lg:col-span-5 xl:col-span-6">
          <figure
            data-hero="image"
            className="relative overflow-hidden will-change-[clip-path]"
            style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          >
            <img
              src={heroImage}
              alt="Modern home exterior at dusk with warm interior light"
              width={1200}
              height={1600}
              fetchPriority="high"
              decoding="async"
              className="h-[46vh] w-full object-cover object-center sm:h-[54vh] lg:h-[70vh]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(200deg, rgba(244,90,10,0.16), transparent 42%, rgba(7,133,214,0.18))',
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-iso-orange via-white/30 to-iso-blue" />
          </figure>

          <div
            data-hero="badge"
            className="absolute -bottom-6 left-4 hidden max-w-[15rem] border border-white/15 bg-navy-ink/85 px-5 py-4 backdrop-blur-sm sm:block lg:-left-8"
          >
            <p className="font-display text-[0.62rem] uppercase tracking-wide2 text-iso-blue">
              Precision Engineering
            </p>
            <p className="mt-2 text-[0.84rem] leading-snug text-white/75">
              Year-round comfort, planned around your space.
            </p>
          </div>
        </div>
      </div>

      <div
        data-hero="scroll"
        className="shell relative flex items-center justify-between border-t border-white/10 py-5"
      >
        <a
          href="#why-choose-us"
          className="group flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-white/55 transition hover:text-white"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/25 transition group-hover:border-iso-orange group-hover:text-iso-orange">
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </span>
          Scroll to explore
        </a>

        <div className="hidden items-center gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-white/45 sm:flex">
          <span className="h-px w-16 bg-white/25" aria-hidden="true" />
          {siteConfig.tagline}
        </div>
      </div>
    </section>
  );
}
