import type { ReactNode } from 'react';

interface SectionShellProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  tinted?: boolean;
}

/** Consistent, anchorable section wrapper. scroll-mt offsets the sticky header. */
export default function SectionShell({
  id,
  eyebrow,
  title,
  intro,
  children,
  tinted = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 ${tinted ? 'bg-slate-50' : 'bg-white'}`}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:pr-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-pitch-600">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h2>
        {intro && (
          <div className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            {intro}
          </div>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
