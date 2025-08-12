'use client';

import { useEffect } from 'react';
import { reloadPage } from '@/components/reload';

const BUILD_JSON_URL = '/build.json';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export default function VersionCheck() {
  useEffect(() => {
    let cancelled = false;
    const intervalMs = process.env.NODE_ENV === 'test' ? 60 * 1000 : 5 * 60 * 1000;

    async function check() {
      try {
        if (typeof document !== 'undefined' && document.hidden) return;
        const res = await fetch(`${BUILD_JSON_URL}?t=${Date.now()}`, {
          cache: 'no-store',
        });
        if (!res.ok) return;
        const data = await res.json();
        const currentVersion = data?.version || null;
        const builtAt = Number(data?.builtAt || 0);
        if (cancelled) return;

        const storedVersion = localStorage.getItem('build:version');
        const storedTime = Number(localStorage.getItem('build:time') || 0);

        const isTooOld = Date.now() - storedTime > THIRTY_DAYS_MS;
        const isDifferent = storedVersion && currentVersion && storedVersion !== currentVersion;

        if (!storedVersion || !storedTime) {
          localStorage.setItem('build:version', currentVersion || 'unknown');
          localStorage.setItem('build:time', String(builtAt || Date.now()));
          return;
        }

        if (isDifferent || isTooOld) {
          if (currentVersion) {
            localStorage.setItem('build:version', currentVersion);
          }
          localStorage.setItem('build:time', String(Date.now()));
          reloadPage();
        }
      } catch (_) {
        // ignore network or JSON errors
      }
    }

    check();
    const id = setInterval(check, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return null;
} 