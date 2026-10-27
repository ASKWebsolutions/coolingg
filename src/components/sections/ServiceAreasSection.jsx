import { useEffect, useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { gsap, EASE } from '../../animations/gsap';
import useReveals from '../../animations/useReveals';
import useReducedMotion from '../../hooks/useReducedMotion';
import { siteConfig } from '../../data/siteConfig';
import { hq, communities, coverageNote } from '../../data/serviceAreas';
import { mapMeta, mapPaths } from '../../data/marylandMap';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const CONTEXT_STATES = [
  'pennsylvania',
  'virginia',
  'westVirginia',
  'delaware',
  'newJersey',
  'ohio',
  'districtOfColumbia',
];

const CONTEXT_LABELS = [
  { text: 'PA', x: 300, y: 40 },
  { text: 'VA', x: 340, y: 470 },
  { text: 'WV', x: 60, y: 300 },
  { text: 'DE', x: 775, y: 150 },
];

export default function ServiceAreasSection() {
  const rootRef = useRef(null);
  const mapRef = useRef(null);
  const reduced = useReducedMotion();

  useReveals(rootRef, { reduced, start: 'top 82%' });

  useEffect(() => {
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      const maryland = mapRef.current?.querySelector('[data-state="maryland"]');
      if (maryland) {
        const length = maryland.getTotalLength();
        gsap.set(maryland, { strokeDasharray: length, strokeDashoffset: length, fill: 'transparent' });
        gsap.to(maryland, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: EASE,
          scrollTrigger: { trigger: mapRef.current, start: 'top 75%', once: true },
        });
        gsap.to(maryland, {
          fill: 'rgba(255,255,255,1)',
          duration: 1,
          delay: 1.2,
          scrollTrigger: { trigger: mapRef.current, start: 'top 75%', once: true },
        });
      }

      gsap.from('[data-context]', {
        opacity: 0,
        duration: 1,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: { trigger: mapRef.current, start: 'top 78%', once: true },
      });

      gsap.from('[data-point]', {
        opacity: 0,
        scale: 0.4,
        transformOrigin: '50% 50%',
        duration: 0.7,
        stagger: 0.1,
        ease: EASE,
        scrollTrigger: { trigger: mapRef.current, start: 'top 72%', once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  const marker = mapMeta.marker;
  const points = mapMeta.points;

  return (
    <section
      id="service-areas"
      ref={rootRef}
      aria-labelledby="areas-heading"
      className="relative overflow-hidden bg-iso-ice py-24 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-navy/10"
      />

      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              as="h2"
              align="center"
              id="areas-heading"
              eyebrow="States & Service Areas"
              lines={['Your Comfort Deserves a', 'Better Standard.']}
              lead={coverageNote}
            />

            <address className="fade-up mt-10 not-italic">
              <div className="flex items-start gap-4 border-l-2 border-iso-orange pl-5">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-iso-orange" strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <p className="font-display text-[0.6rem] font-semibold uppercase tracking-wide2 text-navy/55">
                    {hq.label}
                  </p>
                  <p className="mt-2 font-display text-[1.15rem] font-bold leading-snug text-navy">
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.line2}
                  </p>
                  <p className="mt-1 text-[0.9rem] text-iso-charcoal/75">{siteConfig.address.country}</p>
                </div>
              </div>
            </address>

            <div className="fade-up mt-10">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-iso-orange" aria-hidden="true" />
                <h3 className="font-display text-[0.66rem] font-semibold uppercase tracking-wide2 text-navy/60">
                  Communities near our base
                </h3>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {communities.map((community) => (
                  <li key={community.name}>
                    <span
                      className={`inline-flex items-center gap-2 border px-3.5 py-2 text-[0.78rem] transition ${
                        community.status === 'hq'
                          ? 'border-iso-orange bg-iso-orange text-white'
                          : 'border-navy/15 bg-white text-iso-charcoal/80'
                      }`}
                    >
                      {community.name}
                      {community.status === 'hq' && (
                        <span className="font-display text-[0.55rem] uppercase tracking-[0.16em]">
                          HQ
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 flex items-start gap-2 text-[0.76rem] leading-relaxed text-iso-charcoal/60">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full border border-navy/40" aria-hidden="true" />
                Unmarked communities are listed for confirmation — coverage is confirmed request by
                request.
              </p>
            </div>

            <div className="fade-up mt-9">
              <Button href="#contact" variant="primary">
                Ask about your area
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              ref={mapRef}
              className="fade-up relative border border-navy/10 bg-white p-3 shadow-[0_30px_70px_-50px_rgba(20,44,86,0.8)] sm:p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-3 border-b border-navy/10 pb-3">
                <span className="font-display text-[0.6rem] font-semibold uppercase tracking-wide2 text-navy/55">
                  {siteConfig.address.state} · {siteConfig.address.stateAbbr}
                </span>
                <span className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.16em] text-iso-charcoal/55">
                  <Navigation className="h-3.5 w-3.5 text-iso-blue" aria-hidden="true" />
                  {hq.city}
                </span>
              </div>

              <svg
                viewBox={`0 0 ${mapMeta.viewWidth} ${mapMeta.viewHeight}`}
                role="img"
                aria-label={`Map of Maryland with the ISO Mechanical headquarters marked in ${hq.city}`}
                className="h-auto w-full"
              >
                <defs>
                  <pattern id="area-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M30 0H0V30" fill="none" stroke="#142C56" strokeOpacity="0.06" strokeWidth="1" />
                  </pattern>
                  <radialGradient id="marker-glow">
                    <stop offset="0%" stopColor="#F45A0A" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#F45A0A" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width={mapMeta.viewWidth} height={mapMeta.viewHeight} fill="url(#area-grid)" />

                {CONTEXT_STATES.map((key) =>
                  mapPaths[key] ? (
                    <path
                      key={key}
                      data-context
                      d={mapPaths[key]}
                      fill="#D9E4EE"
                      fillOpacity="0.55"
                      stroke="#142C56"
                      strokeOpacity="0.18"
                      strokeWidth="1"
                    />
                  ) : null,
                )}

                <path
                  data-state="maryland"
                  d={mapPaths.maryland}
                  fill="#FFFFFF"
                  stroke="#142C56"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                {CONTEXT_LABELS.map((label) => (
                  <text
                    key={label.text}
                    x={label.x}
                    y={label.y}
                    fill="#142C56"
                    fillOpacity="0.35"
                    fontSize="15"
                    fontWeight="700"
                    letterSpacing="3"
                  >
                    {label.text}
                  </text>
                ))}

                {Object.entries(points).map(([key, point]) => {
                  if (point.primary) return null;
                  return (
                    <g data-point key={key}>
                      <circle cx={point.x} cy={point.y} r="4" fill="#142C56" fillOpacity="0.55" />
                      <text
                        x={point.x + 10}
                        y={point.y + 4}
                        fill="#142C56"
                        fillOpacity="0.6"
                        fontSize="13"
                        fontWeight="600"
                      >
                        {point.label}
                      </text>
                    </g>
                  );
                })}

                <g data-point>
                  <circle cx={marker.x} cy={marker.y} r="34" fill="url(#marker-glow)" />
                  <circle
                    cx={marker.x}
                    cy={marker.y}
                    r="14"
                    fill="none"
                    stroke="#F45A0A"
                    strokeWidth="2"
                    className={reduced ? '' : 'animate-ping-slow'}
                    style={{ transformOrigin: `${marker.x}px ${marker.y}px` }}
                  />
                  <circle cx={marker.x} cy={marker.y} r="6.5" fill="#F45A0A" />
                  <path
                    d={`M${marker.x - 44} ${marker.y}h22M${marker.x + 22} ${marker.y}h22M${marker.x} ${
                      marker.y - 44
                    }v22M${marker.x} ${marker.y + 22}v22`}
                    stroke="#F45A0A"
                    strokeOpacity="0.5"
                    strokeWidth="1.5"
                  />
                  <text
                    x={marker.x + 52}
                    y={marker.y - 6}
                    fill="#142C56"
                    fontSize="17"
                    fontWeight="800"
                    letterSpacing="0.5"
                  >
                    {points.millersville.label}
                  </text>
                  <text
                    x={marker.x + 52}
                    y={marker.y + 13}
                    fill="#142C56"
                    fillOpacity="0.55"
                    fontSize="12"
                    fontWeight="600"
                    letterSpacing="1.6"
                  >
                    HEADQUARTERS
                  </text>
                </g>
              </svg>

              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-navy/10 pt-3 text-[0.66rem] uppercase tracking-[0.14em] text-iso-charcoal/55">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-iso-orange" aria-hidden="true" />
                  Headquarters
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-navy/50" aria-hidden="true" />
                  Nearby reference cities
                </span>
                <span className="hidden sm:block">Boundary data: us-atlas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
