import { useEffect } from 'react';
import { gsap, ScrollTrigger } from './gsap';

/** 
 * Reveals every `.reveal-line`, `.fade-up` and `.mask-reveal` element inside
 * `ref` as it enters the viewport by toggling the `is-revealed` class.
 * CSS owns the actual transition, which keeps scroll work cheap.
 */
export default function useReveals(ref, { reduced = false, start = 'top 85%' } = {}) {
  useEffect(() => {
    const scope = ref.current;
    if (!scope) return undefined;

    const targets = Array.from(
      scope.querySelectorAll('.reveal-line, .fade-up, .mask-reveal'),
    );

    if (!targets.length) return undefined;

    if (reduced) {
      targets.forEach((target) => target.classList.add('is-revealed'));
      return undefined;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(targets, {
        start,
        once: true,
        onEnter: (batch) => {
          batch.forEach((target) => target.classList.add('is-revealed'));
        },
      });
      ScrollTrigger.refresh();
    }, scope);

    return () => ctx.revert();
  }, [ref, reduced, start]);

  return null;
}
