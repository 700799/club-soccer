'use client';

import { useEffect, useState } from 'react';
import { sections } from './nav';

/**
 * A two-row floating menu with EVERY section always visible — no hover, no
 * open/close. A fixed bar at the bottom of the screen holds all sections in a
 * two-row grid; the active section is highlighted (scroll-spy). One tap to jump.
 *
 * A small always-floating back-to-top button sits just above the bar.
 */
export default function FloatingMenu() {
  const [active, setActive] = useState('top');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Always-floating back-to-top, just above the menu bar */}
      <button
        onClick={() => go('top')}
        aria-label="Back to top"
        title="Back to top"
        className="fixed bottom-[6.5rem] right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-pitch-600 text-xl text-white shadow-2xl shadow-black/30 transition hover:scale-110 hover:bg-pitch-500 active:scale-95 sm:bottom-28"
      >
        <span aria-hidden>↑</span>
      </button>

      {/* Two-row floating menu — all sections always present */}
      <nav
        aria-label="Section navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-950/95 shadow-[0_-8px_30px_rgba(0,0,0,0.25)] backdrop-blur"
      >
        <div className="mx-auto grid max-w-5xl grid-cols-4 gap-1.5 px-2 py-2 sm:grid-cols-6 sm:gap-2 sm:px-4 sm:py-3">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`flex flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-center transition ${
                  isActive
                    ? 'bg-pitch-500 text-white'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-lg leading-none" aria-hidden>
                  {s.icon}
                </span>
                <span className="text-[10px] font-semibold leading-tight sm:text-[11px]">
                  {s.short}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Spacer so the fixed bottom bar never covers page content / footer */}
      <div className="h-[5.5rem] sm:h-[6rem]" aria-hidden />
    </>
  );
}
