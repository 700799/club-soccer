'use client';

import { useEffect, useState } from 'react';
import { sections } from './nav';

/**
 * A two-row floating menu fixed at the TOP of the screen, with every section
 * always visible (no hover / open-close). The active section is highlighted and
 * marked with a little soccer ball. A thin contrasting accent row sits under the
 * bar. A back-to-top button floats bottom-right.
 */
export default function FloatingMenu() {
  const [active, setActive] = useState('top');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Two-row floating menu, fixed at the TOP — all sections always present */}
      <nav
        aria-label="Section navigation"
        className="fixed inset-x-0 top-0 z-50 bg-blue-950/95 shadow-[0_6px_24px_rgba(0,0,0,0.28)] backdrop-blur"
      >
        <div className="mx-auto grid max-w-5xl grid-cols-4 gap-1.5 px-2 py-2 sm:grid-cols-6 sm:gap-2 sm:px-4 sm:py-2.5">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-center transition ${
                  isActive
                    ? 'bg-pitch-500 text-white shadow-sm'
                    : 'text-blue-100/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="text-sm leading-none" aria-hidden>
                    ⚽
                  </span>
                )}
                <span className="text-xs font-semibold leading-tight sm:text-sm">
                  {s.short}
                </span>
              </button>
            );
          })}
        </div>
        {/* Thin contrasting accent row under the bar */}
        <div className="h-1 w-full bg-gradient-to-r from-pitch-400 via-emerald-300 to-pitch-500" />
      </nav>

      {/* Spacer so the fixed top bar never covers page content */}
      <div className="h-[5.25rem] sm:h-[5rem]" aria-hidden />

      {/* Always-floating back-to-top button (bottom-right), shown after scrolling */}
      <button
        onClick={() => go('top')}
        aria-label="Back to top"
        title="Back to top"
        className={`fixed bottom-5 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-pitch-600 text-xl text-white shadow-2xl shadow-black/30 transition-all hover:scale-110 hover:bg-pitch-500 active:scale-95 ${
          scrolled ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <span aria-hidden>↑</span>
      </button>
    </>
  );
}
