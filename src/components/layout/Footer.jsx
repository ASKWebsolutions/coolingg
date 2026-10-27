import { siteConfig } from '../../data/siteConfig';
import { activeServices } from '../../data/services';
import { communities, hq } from '../../data/serviceAreas';
import logo from '../../assets/iso-mechanical-logo.jpg';

const year = new Date().getFullYear();

function ColumnHeading({ children }) {
  return (
    <h3 className="mb-5 font-display text-[0.6rem] font-semibold uppercase tracking-wide2 text-iso-blue">
      {children}
    </h3>
  );
}

export default function Footer() {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative isolate overflow-hidden bg-navy-deep pt-0 text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(55% 55% at 85% 10%, rgba(7,133,214,0.16), transparent 65%), radial-gradient(45% 45% at 5% 95%, rgba(244,90,10,0.12), transparent 70%)',
        }}
      />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 -z-10 h-[30rem] w-[30rem] text-white/[0.07]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="198" stroke="currentColor" />
        <circle cx="200" cy="200" r="150" stroke="currentColor" />
        <circle cx="200" cy="200" r="102" stroke="currentColor" strokeDasharray="4 8" />
        <circle cx="200" cy="200" r="54" stroke="currentColor" />
      </svg>

      <div className="shell relative">
        <div className="grid gap-12 pb-16 lg:gap-14 lg:pb-20">
          <div>
            <span className="eyebrow mb-7 inline-flex items-center gap-3 text-iso-orange fade-up">
              <span aria-hidden="true" className="h-px w-8 bg-iso-orange" />
              Request Service
            </span>

            <h2
              id="footer-heading"
              className="text-[clamp(2.4rem,6vw,4.6rem)] font-extrabold leading-[0.94] tracking-mega text-white"
            >
              <span className="reveal-line">
                <span>Comfort,</span>
              </span>
              <span className="reveal-line">
                <span>Engineered for</span>
              </span>
              <span className="reveal-line">
                <span className="text-iso-orange">Every Season.</span>
              </span>
            </h2>

            <p className="fade-up mt-7 max-w-[42ch] text-[1rem] leading-relaxed text-white/60">
              {siteConfig.description}
            </p>

            <div className="fade-up mt-8 border-t border-white/12 pt-6">
              <p className="font-display text-[0.6rem] font-semibold uppercase tracking-wide2 text-white/45">
                Visit
              </p>
              <address className="mt-3 not-italic text-[1.05rem] leading-relaxed text-white/85">
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
                <br />
                {siteConfig.address.country}
              </address>

              {siteConfig.phone || siteConfig.email ? (
                <p className="mt-4 text-[0.9rem] text-white/70">
                  {siteConfig.phone && <span className="block">{siteConfig.phone}</span>}
                  {siteConfig.email && <span className="block">{siteConfig.email}</span>}
                </p>
              ) : (
                <p className="mt-4 max-w-[34ch] text-[0.8rem] leading-relaxed text-white/45">
                  Phone and email will appear here as soon as they are confirmed for publication.
                </p>
              )}
            </div>
          </div>

        </div>

        {/* link grid */}
        <div className="grid gap-10 border-t border-white/12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <span className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden bg-white ring-1 ring-white/20">
                <img
                  src={logo}
                  alt="ISO Mechanical — Heating & Cooling Services"
                  className="h-full w-full object-contain"
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-[1.15rem] font-extrabold uppercase tracking-[0.05em] text-white">
                  ISO Mechanical
                </span>
                <span className="mt-1.5 font-display text-[0.55rem] font-semibold uppercase tracking-wide2 text-white/55">
                  {siteConfig.tagline}
                </span>
              </span>
            </div>

            <p className="mt-6 max-w-[36ch] text-[0.9rem] leading-relaxed text-white/55">
              Heating and cooling services for homes and light commercial spaces, planned with
              precision and delivered with care.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="border border-iso-orange/50 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.16em] text-iso-orange">
                Heating
              </span>
              <span className="border border-iso-blue/50 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.16em] text-iso-blue">
                Cooling
              </span>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="lg:col-span-2">
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="flex flex-col gap-3">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-underline text-[0.9rem] text-white/65 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="HVAC services" className="lg:col-span-3">
            <ColumnHeading>Services</ColumnHeading>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {activeServices.slice(0, 8).map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="link-underline text-[0.9rem] text-white/65 transition hover:text-white"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#services"
              className="mt-4 inline-block font-display text-[0.62rem] font-bold uppercase tracking-[0.16em] text-iso-orange"
            >
              All {activeServices.length} services
            </a>
          </nav>

          <nav aria-label="Service areas" className="lg:col-span-3">
            <ColumnHeading>Service Areas</ColumnHeading>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-[0.9rem] font-semibold text-white">
                  {hq.city}, {hq.stateAbbr}
                </span>
              </li>
              {communities.slice(0, 6).map((community) => (
                <li key={community.name}>
                  <a
                    href="#service-areas"
                    className="link-underline text-[0.9rem] text-white/65 transition hover:text-white"
                  >
                    {community.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#service-areas"
              className="mt-4 inline-block font-display text-[0.62rem] font-bold uppercase tracking-[0.16em] text-iso-blue"
            >
              Coverage details
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/12 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-white/45">
            © {year} {siteConfig.fullName}. All rights reserved.
          </p>
          <p className="text-[0.75rem] text-white/35">
            {siteConfig.address.line1}, {siteConfig.address.line2}
          </p>
        </div>
      </div>
    </footer>
  );
}
