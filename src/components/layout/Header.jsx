import { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import logo from '../../assets/iso-mechanical-logo.jpg';
import Button from '../ui/Button';
import MobileNavigation from './MobileNavigation';

function useActiveSection() {
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const sections = siteConfig.navigation
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const closeRef = useRef(null);
  const activeHref = useActiveSection();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 32);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const light = !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,box-shadow,border-color] duration-500 ${
          scrolled
            ? 'border-b border-navy/10 bg-navy-deep/50 backdrop-blur-md shadow-[0_10px_30px_-24px_rgba(20,44,86,0.6)]'
            : 'border-b border-white/10 bg-transparent'
        }`}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
          <a
            href="#home"
            className="group flex items-center gap-3"
            aria-label={`${siteConfig.name} — home`}
          >
            <span
              className={`grid h-14 w-14 shrink-0 place-items-center overflow-hidden bg-white transition ${
                light ? 'ring-1 ring-white/25' : 'ring-1 ring-navy/10'
              }`}
            >
              <img
                src={logo}
                alt="ISO Mechanical — Heating & Cooling Services"
                className="h-full w-full object-contain"
                width={56}
                height={56}
                loading="eager"
                decoding="async"
              />
            </span>
            <span className="hidden flex-col leading-none xs:flex">
              <span
                className={`font-display text-[1.02rem] font-extrabold uppercase tracking-[0.06em] ${
                  light ? 'text-white' : 'text-navy'
                }`}
              >
                ISO Mechanical
              </span>
              <span
                className={`mt-1 font-display text-[0.56rem] font-semibold uppercase tracking-wide2 ${
                  light ? 'text-white/55' : 'text-iso-charcoal/70'
                }`}
              >
                Heating &amp; Cooling Services
              </span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {siteConfig.navigation.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  data-active={isActive}
                  aria-current={isActive ? 'page' : undefined}
                  className={`link-underline font-display text-[0.76rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                    light
                      ? 'text-white/75 hover:text-white'
                      : 'text-navy/70 hover:text-navy'
                  } ${isActive ? (light ? 'text-white' : 'text-navy') : ''}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {siteConfig.phone && (
              <a
                href={`tel:${siteConfig.phone.replace(/[^+\d]/g, '')}`}
                className={`hidden font-display text-[0.78rem] font-semibold uppercase tracking-[0.12em] md:block ${
                  light ? 'text-white/80 hover:text-white' : 'text-navy/75 hover:text-navy'
                }`}
              >
                {siteConfig.phone}
              </a>
            )}

            <Button href={siteConfig.cta.primary.href} variant="primary" className="hidden sm:inline-flex">
              {siteConfig.cta.primary.label}
            </Button>

            <button
              type="button"
              ref={closeRef}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className={`grid h-11 w-11 place-items-center border transition lg:hidden ${
                light
                  ? 'border-white/25 text-white hover:border-white/70'
                  : 'border-navy/20 text-navy hover:border-navy/60'
              }`}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="h-[2px] w-full bg-transparent"
          aria-hidden="true"
        >
          <div
            className="h-full origin-left bg-gradient-to-r from-iso-orange via-iso-orange to-iso-blue transition-transform duration-200 ease-out"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      <MobileNavigation open={open} onClose={() => setOpen(false)} activeHref={activeHref} />
    </>
  );
}
