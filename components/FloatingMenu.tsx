'use client';

import { useEffect, useState } from 'react';
import { sections } from './nav';

/**
 * A vertical FLOATING menu — pinned to the right edge, floating over the content
 * (it does not consume a column or shift the page). Always visible, one click to
 * jump, scroll-spy highlights the current section, labels expand on hover.
 *
 *  - Desktop (md+): vertical icon dock on the right; hovering a row (or the dock)
 *    reveals the section label.
 *  - Mobile (<md): a floating round launcher bottom-right that opens a compact
 *    floating panel with the full list.
 */
export default function FloatingMenu() {
  const [active, setActive] = useState('top');
  const [open, setOpen] = useState(false);

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
    setOpen(false);
  };

  return (
    <>
      {/* Desktop: vertical floating dock on the right edge */}
      <nav
        aria-label="Section navigation"
        className="group fixed right-3 top-1/2 z-50 hidden max-h-[88vh] -translate-y-1/2 flex-col gap-1 overflow-y-auto rounded-2xl border border-white/10 bg-slate-900/90 p-2 shadow-2xl shadow-black/30 backdrop-blur md:flex"
      >
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              aria-current={isActive ? 'true' : undefined}
              title={s.label}
              className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-all ${
                isActive
                  ? 'bg-pitch-500 text-white'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center text-lg leading-none" aria-hidden>
                {s.icon}
              </span>
              {/* label reveals when hovering anywhere on the dock */}
              <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-200 group-hover:max-w-[12rem] group-hover:opacity-100 md:inline">
                {s.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile: floating launcher + compact panel */}
      <div className="md:hidden">
        {open && (
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/40"
          />
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-pitch-500 text-white shadow-2xl shadow-pitch-500/40 transition active:scale-95"
        >
          {open ? (
            <span className="text-2xl leading-none">✕</span>
          ) : (
            <span className="flex flex-col gap-[3.5px]" aria-hidden>
              <span className="block h-0.5 w-6 rounded bg-white" />
              <span className="block h-0.5 w-6 rounded bg-white" />
              <span className="block h-0.5 w-6 rounded bg-white" />
            </span>
          )}
        </button>

        {open && (
          <nav
            aria-label="Section navigation"
            className="fixed bottom-24 right-5 z-50 max-h-[70vh] w-60 overflow-y-auto rounded-2xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl backdrop-blur animate-fade-up"
          >
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => go(s.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                    isActive
                      ? 'bg-pitch-500 text-white'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-lg leading-none" aria-hidden>
                    {s.icon}
                  </span>
                  <span className="text-sm font-semibold">{s.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </>
  );
}
