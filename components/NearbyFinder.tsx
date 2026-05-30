'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { clubs, type Club } from '@/data/clubs';
import { clubCoords } from '@/data/clubCoords';

const NEAREST_N = 7;

type Located = Club & { lat: number; lng: number };
type Origin = { lat: number; lng: number; label: string };

const located: Located[] = clubs
  .filter((c) => clubCoords[c.name])
  .map((c) => ({ ...c, lat: clubCoords[c.name][0], lng: clubCoords[c.name][1] }));

const levelColor: Record<Club['topLevel'], string> = {
  'MLS NEXT': '#ef4444',
  ECNL: '#a855f7',
  ECRL: '#6366f1',
  NPL: '#0ea5e9',
  'NorCal Premier': '#16a34a',
};

// Haversine distance in miles.
function distMiles(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const lat1 = toRad(aLat);
  const lat2 = toRad(bLat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

export default function NearbyFinder() {
  const mapEl = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const layerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  const [zip, setZip] = useState('');
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [status, setStatus] = useState<string>('');

  const nearest = useMemo(() => {
    if (!origin) return [];
    return [...located]
      .map((c) => ({ ...c, miles: distMiles(origin.lat, origin.lng, c.lat, c.lng) }))
      .sort((a, b) => a.miles - b.miles)
      .slice(0, NEAREST_N);
  }, [origin]);

  // Init map once (Leaflet is imported dynamically to avoid SSR window access).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !mapEl.current || mapRef.current) return;
      LRef.current = L;
      const map = L.map(mapEl.current, { scrollWheelZoom: false }).setView(
        [38.0, -121.6],
        7,
      );
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);
      layerRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      setReady(true);
    })();
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Redraw markers when the origin / nearest set changes.
  useEffect(() => {
    const L = LRef.current;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!ready || !L || !map || !layer) return;
    layer.clearLayers();

    const nearestNames = new Set(nearest.map((c) => c.name));

    for (const c of located) {
      const isNear = nearestNames.has(c.name);
      const marker = L.circleMarker([c.lat, c.lng], {
        radius: isNear ? 8 : 5,
        color: '#fff',
        weight: isNear ? 2 : 1,
        fillColor: levelColor[c.topLevel],
        fillOpacity: isNear ? 1 : 0.45,
      }).bindPopup(
        `<strong>${c.name}</strong><br/>${c.city} · ${c.topLevel}` +
          (c.website ? `<br/><a href="${c.website}" target="_blank" rel="noreferrer">Club site ↗</a>` : ''),
      );
      layer.addLayer(marker);
    }

    if (origin) {
      const o = L.circleMarker([origin.lat, origin.lng], {
        radius: 9,
        color: '#0f172a',
        weight: 3,
        fillColor: '#fde047',
        fillOpacity: 1,
      }).bindPopup(`<strong>You</strong><br/>${origin.label}`);
      layer.addLayer(o);

      const pts = [
        [origin.lat, origin.lng],
        ...nearest.map((c) => [c.lat, c.lng]),
      ] as [number, number][];
      map.fitBounds(L.latLngBounds(pts).pad(0.2));
    }
  }, [ready, origin, nearest]);

  async function useZip(e: React.FormEvent) {
    e.preventDefault();
    const z = zip.trim();
    if (!/^\d{5}$/.test(z)) {
      setStatus('Enter a 5-digit US ZIP code.');
      return;
    }
    setStatus('Looking up ZIP…');
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${z}`);
      if (!res.ok) throw new Error('not found');
      const data = await res.json();
      const place = data.places?.[0];
      if (!place) throw new Error('not found');
      setOrigin({
        lat: parseFloat(place.latitude),
        lng: parseFloat(place.longitude),
        label: `${place['place name']}, ${place['state abbreviation']} ${z}`,
      });
      setStatus('');
    } catch {
      setStatus(`Couldn't find ZIP ${z}. Check it and try again.`);
    }
  }

  function useMyLocation() {
    if (!('geolocation' in navigator)) {
      setStatus('Geolocation is not available in this browser.');
      return;
    }
    setStatus('Getting your location…');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: 'your current location',
        });
        setStatus('');
      },
      () => setStatus('Location permission denied — try entering a ZIP instead.'),
      { enableHighAccuracy: false, timeout: 10000 },
    );
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <form onSubmit={useZip} className="flex flex-1 gap-2">
          <input
            inputMode="numeric"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Enter ZIP code (e.g. 95014)"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none focus:border-pitch-400 focus:ring-2 focus:ring-pitch-200"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-pitch-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-pitch-500"
          >
            Find
          </button>
        </form>
        <button
          onClick={useMyLocation}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          📍 Use my location
        </button>
      </div>
      {status && <p className="mt-2 text-sm text-slate-500">{status}</p>}

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        {/* Map */}
        <div
          ref={mapEl}
          className="h-[380px] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm sm:h-[460px]"
          aria-label="Map of NorCal soccer clubs"
        />

        {/* Nearest list */}
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {origin ? `7 closest clubs to ${origin.label}` : 'Your 7 closest clubs'}
          </h3>
          {!origin ? (
            <p className="mt-2 text-sm text-slate-500">
              Enter a ZIP or use your location to see the nearest clubs ranked by
              distance. {located.length} clubs are on the map.
            </p>
          ) : (
            <ol className="mt-3 space-y-2">
              {nearest.map((c, i) => (
                <li
                  key={c.name}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {c.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {c.city} ·{' '}
                      <span
                        className="font-semibold"
                        style={{ color: levelColor[c.topLevel] }}
                      >
                        {c.topLevel}
                      </span>
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-slate-700">
                    {c.miles.toFixed(1)} mi
                  </span>
                </li>
              ))}
            </ol>
          )}
          <p className="mt-3 text-xs text-slate-400">
            Distances are straight-line from city-level coordinates. ZIP lookup via
            the free Zippopotam.us API; map © OpenStreetMap.
          </p>
        </div>
      </div>
    </div>
  );
}
