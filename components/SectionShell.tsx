'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { sections } from './nav';
import { useDrawers } from './DrawerContext';

interface SectionShellProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  tinted?: boolean;
  /**
   * When true, the body (children) is only mounted after the drawer has been
   * opened at least once. Used for the Leaflet map so it initializes into a
   * visible, sized container rather than a collapsed one.
   */
  gateUntilOpen?: boolean;
}

/**
 * Collapsible, anchorable section drawer. The header is a full-width toggle; the
 * body collapses via a dependency-free CSS grid-rows animation and is marked
 * `inert` while closed (kept in the DOM for SEO/Ctrl-F, but out of the tab order
 * and accessibility tree). `scroll-mt` offsets the fixed menu for anchor jumps.
 */
export default function SectionShell({
  id,
  eyebrow,
  title,
  intro,
  children,
  tinted = false,
  gateUntilOpen = false,
}: SectionShellProps) {
  const { isOpen, hasOpened, toggle } = useDrawers();
  const open = isOpen(id);
  const bodyRef = useRef<HTMLDivElement>(null);

  const icon = sections.find((s) => s.id === id)?.icon ?? '⚽';
  const headingId = `${id}-header`;
  const panelId = `${id}-panel`;

  // Hide collapsed content from the tab order / assistive tech without removing
  // it from the DOM. HTMLElement.inert is set imperatively because the JSX
  // `inert` prop is not typed in @types/react@18.3.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.inert = !open;
  }, [open]);

  const showChildren = !gateUntilOpen || hasOpened(id);

  return (
    <section
      id={id}
      className={`scroll-mt-20 border-b border-slate-200 ${tinted ? 'bg-slate-50' : 'bg-white'}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="m-0">
          <button
            type="button"
            id={headingId}
            onClick={() => toggle(id)}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex w-full items-center gap-3 rounded-lg py-5 text-left transition hover:bg-black/[0.03] sm:gap-4"
          >
            <span
              aria-hidden
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pitch-50 text-xl sm:h-12 sm:w-12 sm:text-2xl"
            >
              {icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold uppercase tracking-wider text-pitch-600">
                {eyebrow}
              </span>
              <span className="block text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                {title}
              </span>
            </span>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-6 w-6 shrink-0 text-slate-400 transition-transform duration-300 ${
                open ? 'rotate-180' : ''
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </h2>

        <div
          id={panelId}
          ref={bodyRef}
          role="region"
          aria-labelledby={headingId}
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          {/* overflow-visible when open so Levels' lg:sticky column can stick */}
          <div className={open ? 'overflow-visible' : 'overflow-hidden'}>
            <div className="pb-16 pt-2 sm:pb-20">
              {intro && (
                <div className="max-w-3xl text-lg leading-relaxed text-slate-600">
                  {intro}
                </div>
              )}
              <div className="mt-10">{showChildren ? children : null}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
