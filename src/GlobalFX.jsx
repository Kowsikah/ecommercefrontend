import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* Mount once in App. Powers two things via CSS classes, so pages need no extra code:
   .spotlight → soft glow follows the mouse inside the card
   .reveal    → fades up once when scrolled into view (skipped if the user prefers reduced motion) */
export default function GlobalFX() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const move = (e) => {
      const el = e.target.closest?.('.spotlight');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', move, { passive: true });
    return () => document.removeEventListener('pointermove', move);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('fx');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const t = setTimeout(() => document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el)), 50);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [pathname]);

  return null;
}
