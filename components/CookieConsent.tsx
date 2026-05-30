'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'norcal-soccer-cookie-consent';

/**
 * A lightweight cookie-consent banner. Remembers the choice in localStorage so
 * it only appears until the visitor accepts (or dismisses). This is a static
 * site that doesn't set tracking cookies itself, but affiliate links and any
 * future analytics may, so we disclose and ask.
 */
export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const close = (value: 'accepted' | 'dismissed') => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore storage errors (private mode) */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      aria-live="polite"
      className="fixed inset-x-0 bottom-[6rem] z-[70] animate-fade-up px-3 sm:bottom-28 sm:px-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/95 p-4 text-slate-200 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl leading-none" aria-hidden>
            🍪
          </span>
          <div>
            <p className="text-sm font-bold text-white">Cookie notice</p>
            <p className="mt-0.5 text-sm text-slate-300">
              This site uses cookies for a better experience and may earn from
              affiliate links. We don&apos;t sell your personal information. By
              continuing, you agree to cookies being saved on your device.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
          <button
            onClick={() => close('dismissed')}
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Dismiss
          </button>
          <button
            onClick={() => close('accepted')}
            className="rounded-full bg-pitch-500 px-5 py-2 text-sm font-bold text-white shadow-lg transition hover:bg-pitch-400"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
