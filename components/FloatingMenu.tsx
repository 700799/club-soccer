'use client';

import { useEffect, useState } from 'react';
import { sections } from './nav';

/**
 * A prominent, standout navigation:
 *  - A big sticky top BAR (brand + current section + a large "Menu" button) that
 *    gains a shadow once you scroll.
 *  - A full-screen OVERLAY menu with large, tappable section tiles (scroll-spy
 *    highlights the active one).
 *  - A compact right-edge progress rail on desktop for quick jumping.
 */
export default function FloatingMenu() {
  const [active, setActive] = useState('top');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  const activeSection = sections.find((s) => s.id === active) ?? sections[0];

  return (
    <>
      {/* Sticky top bar */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all ${
          scrolled
            ? 'bg-slate-950/95 shadow-lg shadow-black/20 backdrop-blur'
            : 'bg-slate-950/80 backdrop-blur'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <button
            onClick={() => go('top')}
            className="flex items-center gap-2 text-white"
            aria-label="Back to top"
          >
            <span className="text-2xl" aria-hidden>
              ⚽
            </span>
            <span className="hidden text-base font-extrabold tracking-tight sm:inline">
              NorCal Soccer Guide
            </span>
          </button>

          {/* current section pill */}
          <div className="hidden items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-pitch-200 md:flex">
            <span aria-hidden>{activeSection.icon}</span>
            <span>{activeSection.label}</span>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-full bg-pitch-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-pitch-500/30 transition hover:bg-pitch-400"
            aria-expanded={open}
            aria-haspopup="dialog"
          >
            <span className="flex flex-col gap-[3px]" aria-hidden>
              <span className="block h-0.5 w-5 rounded bg-white" />
              <span className="block h-0.5 w-5 rounded bg-white" />
              <span className="block h-0.5 w-5 rounded bg-white" />
            </span>
            Menu
          </button>
        </div>
        {/* thin progress accent */}
        <div className="h-0.5 w-full bg-gradient-to-r from-pitch-500 via-pitch-400 to-transparent" />
      </header>

      {/* spacer so content doesn't hide under the fixed bar */}
      <div className="h-16" aria-hidden />

      {/* Full-screen overlay menu */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col bg-slate-950/95 backdrop-blur-md animate-fade-up"
        >
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <span className="flex items-center gap-2 text-base font-extrabold text-white">
              <span aria-hidden>⚽</span> Jump to a section
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
            >
              ✕
            </button>
          </div>

          <nav className="mx-auto grid w-full max-w-4xl flex-1 content-start gap-3 overflow-y-auto px-4 pb-10 pt-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => go(s.id)}
                  className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                    isActive
                      ? 'border-pitch-400 bg-pitch-500/20 ring-1 ring-pitch-400'
                      : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  <span className="text-2xl" aria-hidden>
                    {s.icon}
                  </span>
                  <span>
                    <span className="block font-bold text-white">{s.label}</span>
                    {isActive && (
                      <span className="text-xs font-semibold text-pitch-300">
                        You&apos;re here
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Desktop right-edge progress rail (quick jump) */}
      <nav
        aria-label="Section progress"
        className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
      >
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              aria-label={s.label}
              aria-current={isActive ? 'true' : undefined}
              className="group relative flex items-center justify-end"
            >
              <span
                className={`pointer-events-none absolute right-6 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs font-semibold text-white opacity-0 shadow transition group-hover:opacity-100`}
              >
                {s.icon} {s.label}
              </span>
              <span
                className={`block rounded-full transition-all ${
                  isActive
                    ? 'h-6 w-2 bg-pitch-500'
                    : 'h-2 w-2 bg-slate-300 group-hover:bg-pitch-400'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Back-to-top */}
      <button
        onClick={() => go('top')}
        aria-label="Back to top"
        className={`fixed bottom-5 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-pitch-600 text-xl text-white shadow-xl transition-all hover:scale-110 ${
          scrolled ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        ↑
      </button>
    </>
  );
}
