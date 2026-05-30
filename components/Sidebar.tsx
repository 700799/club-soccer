'use client';

import { useEffect, useState } from 'react';
import { sections } from './nav';

/**
 * Docs-style navigation:
 *  - Desktop (lg+): a persistent left sidebar listing every section. Always
 *    visible, one click to jump, scroll-spy highlights the current section.
 *    The page content is offset to the right (see app/page.tsx lg:pl-64) so
 *    nothing hides behind it.
 *  - Mobile/tablet (<lg): a slim sticky top bar with a hamburger that opens a
 *    slide-in left drawer with the same list.
 */
export default function Sidebar() {
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

  // Lock body scroll while the mobile drawer is open.
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

  const NavList = ({ onPick }: { onPick: (id: string) => void }) => (
    <nav className="flex flex-col gap-0.5">
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => onPick(s.id)}
            aria-current={isActive ? 'true' : undefined}
            className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
              isActive
                ? 'bg-pitch-500/15 font-bold text-white'
                : 'font-medium text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-base ${
                isActive ? 'bg-pitch-500 text-white' : 'bg-white/5 group-hover:bg-white/10'
              }`}
              aria-hidden
            >
              {s.icon}
            </span>
            <span className="truncate">{s.label}</span>
            {isActive && (
              <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-pitch-400" />
            )}
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop persistent sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-slate-950 lg:flex">
        <button
          onClick={() => go('top')}
          className="flex items-center gap-2 px-5 py-5 text-left"
          aria-label="Back to top"
        >
          <span className="text-2xl" aria-hidden>
            ⚽
          </span>
          <span className="text-base font-extrabold tracking-tight text-white">
            NorCal Soccer Guide
          </span>
        </button>
        <div className="flex-1 overflow-y-auto px-3 pb-6">
          <NavList onPick={go} />
        </div>
        <p className="border-t border-white/10 px-5 py-3 text-[11px] text-slate-500">
          Boys &amp; girls · youth soccer
        </p>
      </aside>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-slate-950/95 px-4 backdrop-blur lg:hidden">
        <button
          onClick={() => go('top')}
          className="flex items-center gap-2 text-white"
          aria-label="Back to top"
        >
          <span className="text-xl" aria-hidden>
            ⚽
          </span>
          <span className="text-sm font-extrabold tracking-tight">
            NorCal Soccer Guide
          </span>
        </button>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-bold text-white"
        >
          <span className="flex flex-col gap-[3px]" aria-hidden>
            <span className="block h-0.5 w-4 rounded bg-white" />
            <span className="block h-0.5 w-4 rounded bg-white" />
            <span className="block h-0.5 w-4 rounded bg-white" />
          </span>
          Menu
        </button>
      </header>
      {/* spacer under the mobile bar */}
      <div className="h-14 lg:hidden" aria-hidden />

      {/* Mobile slide-in drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col border-r border-white/10 bg-slate-950 shadow-2xl animate-fade-up">
            <div className="flex items-center justify-between px-4 py-4">
              <span className="flex items-center gap-2 text-sm font-extrabold text-white">
                <span aria-hidden>⚽</span> Jump to a section
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xl text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 pb-6">
              <NavList onPick={go} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
