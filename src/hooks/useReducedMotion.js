import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Returns true when the visitor asks for reduced motion.
 * Listens for live changes to the OS-level preference.
 */
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const onChange = (event) => setReduced(event.matches);
    media.addEventListener('change', onChange);
    setReduced(media.matches);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
