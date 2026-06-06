'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { sections } from './nav';

interface DrawerApi {
  isOpen: (id: string) => boolean;
  /** Has this drawer ever been opened? Used to mount-gate heavy children (the map). */
  hasOpened: (id: string) => boolean;
  toggle: (id: string) => void;
  open: (id: string) => void;
}

const DrawerContext = createContext<DrawerApi | null>(null);

// Valid drawer ids = every nav section except the Hero ('top'), which isn't a drawer.
const DRAWER_IDS = new Set(sections.map((s) => s.id).filter((id) => id !== 'top'));

export function DrawerProvider({ children }: { children: ReactNode }) {
  // Empty on first render so the server HTML and client hydration agree
  // ("all collapsed"). The hash effect below opens drawers only after hydration.
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());
  const [everOpened, setEverOpened] = useState<Set<string>>(() => new Set());

  const markOpened = (id: string) =>
    setEverOpened((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));

  const open = useCallback((id: string) => {
    if (!DRAWER_IDS.has(id)) return;
    setOpenIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
    markOpened(id);
  }, []);

  const toggle = useCallback((id: string) => {
    if (!DRAWER_IDS.has(id)) return;
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    markOpened(id);
  }, []);

  const isOpen = useCallback((id: string) => openIds.has(id), [openIds]);
  const hasOpened = useCallback((id: string) => everOpened.has(id), [everOpened]);

  // Deep-linking: open the drawer whose id matches the URL hash — on first load
  // and whenever an in-page #anchor link changes the hash (Hero/Levels/Girls have
  // several). Runs only after hydration, so initial render stays "all collapsed".
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.replace(/^#/, '');
      if (id && DRAWER_IDS.has(id)) open(id);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [open]);

  return (
    <DrawerContext.Provider value={{ isOpen, hasOpened, toggle, open }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawers(): DrawerApi {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error('useDrawers must be used within a DrawerProvider');
  return ctx;
}
