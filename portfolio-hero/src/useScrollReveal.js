import { useEffect, useRef } from 'react';

/**
 * useScrollReveal
 * 
 * IntersectionObserver hook for luxury Apple/Linear-grade staggered blur-dissolve reveals.
 * - Targets elements with `.reveal-on-scroll` class
 * - Adds `.is-revealed` when elements intersect viewport
 * - Respects `prefers-reduced-motion` media query
 * - Configuration: rootMargin: '50px 0px 0px 0px', threshold: 0.05
 * 
 * @param {Array} deps - Dependency array to re-evaluate observed elements (e.g., on filter changes)
 * @param {React.RefObject} containerRef - Optional container ref to restrict query selector scope
 * @returns {React.RefObject} containerRef
 */
export default function useScrollReveal(deps = [], containerRef = null) {
  const internalRef = useRef(null);
  const targetRef = containerRef || internalRef;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const root = targetRef.current || document;
    const elements = root.querySelectorAll
      ? root.querySelectorAll('.reveal-on-scroll')
      : document.querySelectorAll('.reveal-on-scroll');

    // If reduced motion is preferred or IntersectionObserver is not supported, reveal immediately
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '50px 0px 0px 0px',
        threshold: 0.05,
      }
    );

    elements.forEach((el) => {
      if (!el.classList.contains('is-revealed')) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return targetRef;
}
