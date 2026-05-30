'use client';

import { useEffect, useState } from 'react';
import { sections } from './nav';

/**
 * A floating navigation menu.
 *  - Desktop (md+): a vertical dock pinned to the right edge that expands labels
 *    on hover and highlights the section currently in view (scroll-spy).
 *  - Mobile: a horizontal floating pill along the bottom of the screen.
 */
export default function FloatingMenu() {
  const [active, setActive] = useState('top');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  return (
    <>
      {/* Desktop vertical dock */}
      <nav
        aria-label="Section navigation"
        className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-1.5 rounded-2xl border border-white/10 bg-slate-900/80 p-2 shadow-2xl backdrop-blur md:flex"
      >
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              aria-current={isActive ? 'true' : undefined}
              className={`group flex items-center gap-2 rounded-xl px-2.5 py-2 text-left transition-all ${
                isActive
                  ? 'bg-pitch-500 text-white'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-base leading-none" aria-hidden>
                {s.icon}
              </span>
              <span
                className={`max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-200 group-hover:max-w-[12rem] group-hover:opacity-100 ${
                  isActive ? 'max-w-[12rem] opacity-100' : ''
                }`}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile floating pill */}
      <nav
        aria-label="Section navigation"
        className="fixed inset-x-0 bottom-3 z-50 mx-auto flex w-[95%] max-w-md items-center justify-between gap-1 rounded-full border border-white/10 bg-slate-900/90 px-2 py-1.5 shadow-2xl backdrop-blur md:hidden"
      >
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              aria-label={s.label}
              aria-current={isActive ? 'true' : undefined}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg transition-colors ${
                isActive ? 'bg-pitch-500 text-white' : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <span aria-hidden>{s.icon}</span>
            </button>
          );
        })}
      </nav>

      {/* Back-to-top, bottom-right, away from the mobile pill */}
      <button
        onClick={() => go('top')}
        aria-label="Back to top"
        className="fixed bottom-20 right-4 z-40 hidden h-11 w-11 items-center justify-center rounded-full bg-pitch-600 text-white shadow-lg transition-transform hover:scale-110 md:bottom-4 md:right-24 md:flex"
      >
        ↑
      </button>
    </>
  );
}
