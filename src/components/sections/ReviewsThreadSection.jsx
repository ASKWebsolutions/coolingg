import { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsap';
import useReveals from '../../animations/useReveals';
import useReducedMotion from '../../hooks/useReducedMotion';
import { testimonials, reviewsHeading, reviewsNote } from '../../data/testimonials';
import SectionHeading from '../ui/SectionHeading';

/* desktop thread geometry â€” matches the viewBox of the SVG below */
const VIEW_W = 1200;
const VIEW_H = 520;
const POINTS = [
  { x: 0.15, y: 0.27 },
  { x: 0.385, y: 0.73 },
  { x: 0.62, y: 0.27 },
  { x: 0.855, y: 0.73 },
].map((point) => ({ ...point, px: point.x * VIEW_W, py: point.y * VIEW_H }));

const THREAD_PATH = [
  `M0 ${POINTS[0].py - 70}`,
  `C${POINTS[0].px * 0.45} ${POINTS[0].py - 70}, ${POINTS[0].px * 0.72} ${POINTS[0].py}, ${POINTS[0].px} ${POINTS[0].py}`,
  `C${POINTS[0].px + 150} ${POINTS[0].py}, ${POINTS[1].px - 170} ${POINTS[1].py}, ${POINTS[1].px} ${POINTS[1].py}`,
  `C${POINTS[1].px + 170} ${POINTS[1].py}, ${POINTS[2].px - 150} ${POINTS[2].py}, ${POINTS[2].px} ${POINTS[2].py}`,
  `C${POINTS[2].px + 150} ${POINTS[2].py}, ${POINTS[3].px - 170} ${POINTS[3].py}, ${POINTS[3].px} ${POINTS[3].py}`,
  `C${POINTS[3].px + 130} ${POINTS[3].py}, ${VIEW_W - 40} ${POINTS[3].py + 60}, ${VIEW_W} ${POINTS[3].py + 90}`,
].join(' ');

function ReviewCard({ review, index, placement }) {
  return (
    <figure
      data-review
      className="absolute w-[min(18rem,26vw)]"
      style={{
        left: `${POINTS[index].x * 100}%`,
        top: `${POINTS[index].y * 100}%`,
        transform: placement === 'top' ? 'translate(-50%, calc(-100% - 34px))' : 'translate(-50%, 34px)',
      }}
    >
      <blockquote className="border-t border-white/20 pt-5">
        <p className="text-[0.95rem] leading-relaxed text-white/80">{review.quote}</p>
      </blockquote>
      <figcaption className="mt-5 flex items-baseline gap-3">
        <span className="font-display text-[0.7rem] font-bold tracking-[0.14em] text-iso-orange">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex flex-col">
          <span className="font-display text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-white">
            {review.author}
          </span>
          <span className="text-[0.72rem] text-white/45">{review.meta}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function ReviewsThreadSection() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useReveals(rootRef, { reduced, start: 'top 85%' });

  useEffect(() => {
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      const desktopPath = rootRef.current?.querySelector('[data-thread="desktop"]');
      const mobileLine = rootRef.current?.querySelector('[data-thread="mobile"]');

      [desktopPath, mobileLine].forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 65%',
            end: 'bottom 85%',
            scrub: 0.6,
          },
        });
      });

      gsap.from('[data-review]', {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-thread-wrap]', start: 'top 70%', once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  const headingLines = ['Your Comfort Deserves a', 'Better Standard.'];

  return (
    <section
      id="reviews"
      ref={rootRef}
      aria-labelledby="reviews-heading"
      className="relative overflow-hidden bg-navy-ink py-24 text-white sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 0%, rgba(7,133,214,0.14), transparent 70%), radial-gradient(40% 50% at 10% 100%, rgba(244,90,10,0.12), transparent 70%)',
        }}
      />

      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              as="h2"
              align="center"
              id="reviews-heading"
              tone="light"
              eyebrow="Reviews"
              lines={headingLines}
              lead="The thread connects each experience with the next â€” comfort, communication and service that continues after the visit."
            />
          </div>

          <div className="flex items-end lg:col-span-5 lg:justify-end">
            <div className="fade-up max-w-[32ch] border border-white/15 bg-white/5 p-5">
              <p className="font-display text-[0.6rem] font-semibold uppercase tracking-wide2 text-iso-orange">
                Placeholder content
              </p>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-white/65">{reviewsNote}</p>
            </div>
          </div>
        </div>

        <div data-thread-wrap className="relative mt-16 lg:mt-20">
          {/* desktop: woven thread */}
          <div className="relative hidden h-[32rem] w-full lg:block xl:h-[36rem]">
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="thread-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F45A0A" />
                  <stop offset="55%" stopColor="#D9E4EE" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#0785D6" />
                </linearGradient>
              </defs>
              <path data-thread="desktop" d={THREAD_PATH} stroke="url(#thread-gradient)" strokeWidth="2" />
            </svg>

            {POINTS.map((point, index) => (
              <span
                key={`marker-${testimonials[index].id}`}
                data-review
                className="absolute z-10 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-navy-ink font-display text-[0.66rem] font-bold text-white"
                style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            ))}

            {testimonials.map((review, index) => (
              <ReviewCard
                key={review.id}
                review={review}
                index={index}
                placement={index % 2 === 0 ? 'top' : 'bottom'}
              />
            ))}
          </div>

          {/* mobile: vertical timeline */}
          <div className="relative lg:hidden">
            <svg
              aria-hidden="true"
              className="absolute bottom-6 left-[9px] top-2 w-6"
              viewBox="0 0 24 800"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="thread-gradient-mobile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F45A0A" />
                  <stop offset="100%" stopColor="#0785D6" />
                </linearGradient>
              </defs>
              <path
                data-thread="mobile"
                d="M12 0C22 140 2 260 12 400S22 660 12 800"
                stroke="url(#thread-gradient-mobile)"
                strokeWidth="2"
              />
            </svg>

            <ol className="flex flex-col gap-10 pl-12">
              {testimonials.map((review, index) => (
                <li data-review key={review.id} className="relative">
                  <span className="absolute -left-12 top-1 grid h-[19px] w-[19px] place-items-center rounded-full border border-white/35 bg-navy-ink" />
                  <span className="sr-only">{`Review ${index + 1}`}</span>
                  <blockquote className="border-t border-white/15 pt-4">
                    <p className="text-[0.95rem] leading-relaxed text-white/80">{review.quote}</p>
                  </blockquote>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-display text-[0.68rem] font-bold text-iso-orange">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-display text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white">
                        {review.author}
                      </span>
                      <span className="text-[0.72rem] text-white/45">{review.meta}</span>
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="fade-up mt-14 flex flex-wrap items-center gap-4 border-t border-white/12 pt-8">
          <span className="text-[0.7rem] uppercase tracking-[0.2em] text-white/45">
            Comfort is personal â€” so is the service behind it
          </span>
          <span className="h-px flex-1 bg-white/15" aria-hidden="true" />
          <a
            href="#contact"
            className="link-underline font-display text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white hover:text-iso-orange"
          >
            Share your experience
          </a>
        </div>
      </div>
    </section>
  );
}
